import React from 'react'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { list, removeCenovnik } from '../../../actions/cenovnik';
import moment from 'moment';


const CenovnikRead = ({ username }) => {
    const [cenovnik, setCenovniks] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadCenovniks();
    }, []);

    const loadCenovniks = () => {
        list(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCenovniks(data);
            }
        });
    };

    const deletecenovnik = slug => {
        removeCenovnik(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadCnovniks();
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Da li ste sigurni da zelite da obrisete oglas?');
        if (answer) {
            deletecenovnik(slug);
            setValues({ ...values, searched:'',search:'', results: [],message1:'' });
        }

    };

    const showUpdateButton = cenovnik => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/cenovnik/${cenovnik.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning">izmeni</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                //<Link >
                    <a  href={`/admin/crud/cenovnik/${cenovnik.slug}`} className="ml-2 btn btn-sm btn-warning">izmeni</a>
                
                //</Link>
            );
        }
    };

    const showAlls = () => {
        return cenovnik.map((cenovnik, i) => {
            return (
                <div key={i} className="pb-4">

                    <h5 className='pt-1 text-white'>{cenovnik.title}</h5>
                    <p className="text-white small">
                      stranicu kreirao: {cenovnik.postedBy.name} |  {moment(cenovnik.updatedAt).locale('sr').format('LL')}
                    </p>
                    <div>

                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(cenovnik.slug)}>
                    obriši
                    </button>
                    {showUpdateButton(cenovnik)}
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

            <div className="">
                <div className='mt-3'>
                    {message && <div className="alert alert-warning">{message}</div>}
                    <p  style={{color:'white',textTransform:'uppercase'}} >ukupno cenovnika:<b> {cenovnik.length}</b></p>
                    {showAlls()}
                </div>
                
            </div>
        </React.Fragment>
    );
};

export default CenovnikRead;