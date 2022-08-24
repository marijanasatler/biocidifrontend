import React from 'react'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { listPinmali, removepinmali } from '../../../actions/pinmali';
import moment from 'moment';

const PinmaliRead = ({ username }) => {
    const [pinmalis, setpinmalis] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadpinmalis();
 
    }, []);

    const loadpinmalis = () => {
        listPinmali(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setpinmalis(data);
             
            }
        });
    };

    const deletepinmali = slug => {
        removepinmali(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadpinmalis();
     
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm(`Da li ste sigurni da želite da obrisete mali pin "${slug}" ?`);
        if (answer) {
            deletepinmali(slug);
        }
    };

    const showUpdateButton = pinmali => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/pinmali/${pinmali.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                //<Link >
                    <a  href={`/admin/crud/pinmali/${pinmali.slug}`} className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                //</Link>
            );
        }
    };

    const showAllpinmalis = () => {
        return pinmalis.map((pinmali, i) => {
            return (
                <div key={i} className="pb-4">
                           <h5 className='pt-1 text-white '>naslov pina: {pinmali.titleLat}</h5>
                    <h5 className='pt-1 text-white small'>naziv pina: {pinmali.title}</h5>
                    <p className="text-white small">
                  stranicu kreirao: {pinmali.postedBy.name} |  {moment(pinmali.updatedAt).locale('sr').format('LL')}
                </p>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(pinmali.slug)}>
                      obrisi
                    </button>
                    {showUpdateButton(pinmali)}
                    <hr/>
                </div>
            );
        });
    };


 




    return (
        <React.Fragment>
<div className=''>



        <div className="row">
                <div className="col-md-12 pt-4">
                    {message && <div className="alert alert-warning">{message}</div>}
                    <p style={{textTransform:'uppercase',color:'white'}} className='color'>ukupno malih pinova:<b> {pinmalis.length}</b></p><br/>
                    {showAllpinmalis()}
                </div>
            </div>
            </div>
        </React.Fragment>
    );
};

export default PinmaliRead;