import React from 'react'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import moment from 'moment';
import { removeDelatnost,listDelatnosti } from '../../../actions/delatnosti';

const delatnostRead = ({ username }) => {
    const [delatnosti, setDelatnosti] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadDelatnost();
 
    }, []);

    const loadDelatnost = () => {
        listDelatnosti(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setDelatnosti(data);
             
            }
        });
    };

    const deleteDelatnost = slug => {
        removeDelatnost(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadDelatnost();
     
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete your delatnost?');
        if (answer) {
            deleteDelatnost(slug);
        }
    };

    const showUpdateButton = delatnosti=> {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/delatnost/${delatnosti.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                //<Link >
                    <a  href={`/admin/crud/delatnost/${delatnosti.slug}`} className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                //</Link>
            );
        }
    };

    const showAlldelatnostPage = () => {
        return delatnosti.map((delatnosti, i) => {
            return (
                <div key={i} className="pb-4">
                    <h5 className='pt-1 text-white' >{delatnosti.title}</h5>
                    <p className="text-white small">
                      stranicu kreirao: {delatnosti.postedBy.name} |  {moment(delatnosti.updatedAt).locale('sr').format('LL')}
                    </p>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(delatnosti.slug)}>
                        Delete
                    </button>
                    {showUpdateButton(delatnosti)}
                    <hr/>
                </div>
            );
        });
    };



 






    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12 pt-3">
                    {message && <div className="alert alert-warning">{message}</div>}
                    <p style={{textTransform:'uppercase'}} className='text-white mt-2'>ukupno stranica delatnost:<b> {delatnosti.length}</b></p><br/>
                    {showAlldelatnostPage()}
                </div>
            </div>
        </React.Fragment>
    );
};

export default delatnostRead;