import React from 'react'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCookie, isAuth } from '../../../actions/auth';
import moment from 'moment';
import { removeZavod,list } from '../../../actions/zavod';

const ZavodRead = ({ username }) => {
    const [zavod, setZavod] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadZavod();
 
    }, []);

    const loadZavod = () => {
        list(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setZavod(data);
             
            }
        });
    };

    const deleteZavod = slug => {
        removeZavod(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadZavod();
     
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm(`Da li ste sigurni da zelite da obrisete stranicu ${slug}?`);
        if (answer) {
            deleteZavod(slug);
        }
    };

    const showUpdateButton = zavod => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/zavod/${zavod.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                //<Link >
                    <a  href={`/admin/crud/zavod/${zavod.slug}`} className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                //</Link>
            );
        }
    };

    const showAllZavodPage = () => {
        return zavod.map((zavod, i) => {
            return (
                <div key={i} className="pb-1">
                    <h5 className='text-white pt-1'>{zavod.title}</h5>
                    <p className="text-white small">
                      stranicu kreirao: {zavod.postedBy.name} |  {moment(zavod.updatedAt).locale('sr').format('LL')}
                    </p>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(zavod.slug)}>
                      obrisi
                    </button>
                    {showUpdateButton(zavod)}
                    <hr/>
                </div>
            );
        });
    };



 






    return (
        <React.Fragment>

        <div className="">
            <div className="mt-4 mb-2">
                {message && <div className="alert alert-warning">{message}</div>}
                <p  style={{color:'white',textTransform:'uppercase'}} >ukupno stranica o zavodu:<b> {zavod.length}</b></p>
                {showAllZavodPage()}
            </div>
            
        </div>
    </React.Fragment>
    );
};

export default ZavodRead;