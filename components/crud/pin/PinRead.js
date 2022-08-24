import React from 'react'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCookie, isAuth } from '../../../actions/auth';
import { listPin, removepin } from '../../../actions/pin';
import moment from 'moment';

const PinRead = ({ username }) => {
    const [pins, setpins] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadpins();
 
    }, []);

    const loadpins = () => {
        listPin(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setpins(data);
             
            }
        });
    };

    const deletepin = slug => {
        removepin(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadpins();
     
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm(`Da li ste sigurni da zelite da obrisete slajd ${slug}?`);
        if (answer) {
            deletepin(slug);
        }
    };

    const showUpdateButton = pin => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/pin/${pin.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                //<Link >
                    <a  href={`/admin/crud/pin/${pin.slug}`} className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                //</Link>
            );
        }
    };

    const showAllpins = () => {
        return pins.map((pin, i) => {
            return (
                <div key={i} className="pb-3">
                    <h5 className='pt-1 text-white'> {pin.title}</h5>
                    <p className="text-white small">
                  stranicu kreirao: {pin.postedBy.name} |  {moment(pin.updatedAt).locale('sr').format('LL')}
                </p>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(pin.slug)}>
                      obrisi
                    </button>
                    {showUpdateButton(pin)}
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
                    <p style={{textTransform:'uppercase',color:'white'}} className='color'>ukupno slajdova:<b> {pins.length}</b></p><br/>
                    {showAllpins()}
                </div>
            </div>
            </div>
        </React.Fragment>
    );
};

export default PinRead;