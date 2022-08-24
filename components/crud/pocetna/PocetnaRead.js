import React from 'react'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCookie, isAuth } from '../../../actions/auth';
import { list, removepocetna } from '../../../actions/pocetna';
import moment from 'moment';

const PocetnaRead = ({ username }) => {
    const [pocetna, setpocetnas] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadpocetnas();
    }, []);

    const loadpocetnas = () => {
        list(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setpocetnas(data);
            }
        });
    };

    const deletepocetna = slug => {
        removepocetna(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadpocetnas();
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete your blog?');
        if (answer) {
            deletepocetna(slug);
            setValues({ ...values, searched:'',search:'', results: [],message1:'' });
        }

    };

    const showUpdateButton = pocetna => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/pocetna/${pocetna.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                //<Link >
                    <a  href={`/admin/crud/pocetna/${pocetna.slug}`} className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                
                //</Link>
            );
        }
    };

    const showAlls = () => {
        return pocetna.map((pocetna, i) => {
            return (
                <div key={i} className="pb-4">

                    <h5 className='pt-1 text-white'>{pocetna.title}</h5>
                    <p className="text-white small">
                      stranicu kreirao: {pocetna.postedBy.name} |  {moment(pocetna.updatedAt).locale('sr').format('LL')}
                    </p>
                    <div>

                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(pocetna.slug)}>
                    obriši
                    </button>
                    {showUpdateButton(pocetna)}
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
                    <p  style={{color:'white',textTransform:'uppercase'}} >ukupno pinova:<b> {pocetna.length}</b></p>
                    {showAlls()}
                </div>
                
            </div>
        </React.Fragment>
    );
}
export default PocetnaRead;