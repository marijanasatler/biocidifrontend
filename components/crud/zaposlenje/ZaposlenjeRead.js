import React from 'react'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCookie, isAuth } from '../../../actions/auth';
import { listZaposlenje, removeZaposlenje } from '../../../actions/zaposlenje';
import moment from 'moment';


const ZaposlenjeRead = ({ username }) => {
    const [zaposlenje, setZaposlenjes] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadzaposlenjes();
    }, []);

    const loadzaposlenjes = () => {
        listZaposlenje(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setZaposlenjes(data);
            }
        });
    };

    const deletezaposlenje = slug => {
        removeZaposlenje(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadzaposlenjes();
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Da li ste sigurni da zelite da obrisete oglas?');
        if (answer) {
            deletezaposlenje(slug);
            setValues({ ...values, searched:'',search:'', results: [],message1:'' });
        }

    };

    const showUpdateButton = zaposlenje => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/zaposlenje/${zaposlenje.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (

                    <a  href={`/admin/crud/zaposlenje/${zaposlenje.slug}`} className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                
             
            );
        }
    };

    const showAlls = () => {
        return zaposlenje.map((zaposlenje, i) => {
            return (
                <div key={i} className="pb-2">

                    <h5 className='pt-1 text-white'>{zaposlenje.title}</h5>
                    <p className="text-white small">
                      stranicu kreirao: {zaposlenje.postedBy.name} |  {moment(zaposlenje.updatedAt).locale('sr').format('LL')}
                    </p>
                    <div>

                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(zaposlenje.slug)}>
                    obriši
                    </button>
                    {showUpdateButton(zaposlenje)}
                    </div>
              <hr/>
                </div>
            );
        });
    };



    return (
        <React.Fragment>

            <div >
                <div className=" mt-3">
                    {message && <div className="alert alert-warning">{message}</div>}
                    <p  style={{color:'white',textTransform:'uppercase'}} >ukupno stranica:<b> {zaposlenje.length}</b></p>
                    {showAlls()}
                </div>
                
            </div>
        </React.Fragment>
    );
};

export default ZaposlenjeRead;