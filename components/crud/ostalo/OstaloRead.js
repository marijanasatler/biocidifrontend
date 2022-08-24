import React from 'react'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCookie, isAuth } from '../../../actions/auth';
import { list, removeostalo } from '../../../actions/ostalo';
import moment from 'moment';
import { API, DOMAIN } from '../../../config';

const OstaloRead = ({ username }) => {
    const [s, setostalos] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadostalos();
    }, []);

    const loadostalos = () => {
        list(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setostalos(data);
            }
        });
    };

    const deleteostalo = slug => {
        removeostalo(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadostalos();
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm(`Da li ste sigurni da zelite da obrisete stranicu ${slug}?`);
        if (answer) {
            deleteostalo(slug);
            setValues({ ...values, searched:'',search:'', results: [],message1:'' });
        }

    };

    const showUpdateButton = ostalo => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/ostalo/${ostalo.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                //<Link >
                    <a  href={`/admin/crud/ostalo/${ostalo.slug}`} className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                
                //</Link>
            );
        }
    };

    const showAlls = () => {
        return s.map((ostalo, i) => {
            return (
                <div key={i} className="pl-4 mb-4" style={{borderLeft:'solid lightblue 2px'}}>

                    <h5 className='pt-1 text-white'> {ostalo.title}</h5>
                    <p> <b>link stranice latinica: </b>{`${DOMAIN}/lat/ostalo/${ostalo.slug}`}   </p>
                    <p> <b>link stranice cirilica: </b>{`${DOMAIN}/ostalo/${ostalo.slug}`}   </p>
                    <p> <b>link stranice engleski: </b> {`${DOMAIN}/en/ostalo/${ostalo.slug}`}   </p>
                    <p className="text-white small">
                      stranicu kreirao: {ostalo.postedBy.name} |  {moment(ostalo.updatedAt).locale('sr').format('LL')}
                    </p>
                    <div>

                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(ostalo.slug)}>
                        obrisi
                    </button>
                    {showUpdateButton(ostalo)}
                    </div>
              <hr/>
                </div>
            );
        });
    };


    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message1: ''
    });

    const { search, results, searched, message1 } = values;

    const searchSubmit = e => {
        e.preventDefault();
        listSearch({ search }).then(data => {
            setValues({ ...values, results: data, searched: true, message1: `${data.length} s found` });
        });
    };

    const handleChange = e => {
        // console.log(e.target.value);
        setValues({ ...values, search: e.target.value, searched: false, results: [] });
    };

  
  



    return (
        <React.Fragment>

            <div className="row">
                <div className="col-md-12 pt-3">
                    {message && <div className="alert alert-warning">{message}</div>}
                    <p  className='' style={{color:'white',textTransform:'uppercase'}} >ukupno stranica:<b> {s.length}</b></p>
                   <div className='mt-4'>
                        {showAlls()}
                       </div>
                </div>
                
            </div>
        </React.Fragment>
    );
};

export default OstaloRead;