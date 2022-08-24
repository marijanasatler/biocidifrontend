import React from 'react'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { list, removeLaboratori } from '../../../actions/laboratori';
import moment from 'moment';
import styles from '../../../styles/admin.module.css'

const LaboratoriRead = ({ username }) => {
    const [s, setLaboratoris] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadLaboratoris();
    }, []);

    const loadLaboratoris = () => {
        list(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLaboratoris(data);
            }
        });
    };

    const deletelaboratori = slug => {
        removeLaboratori(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadLaboratoris();
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete your blog?');
        if (answer) {
            deletelaboratori(slug);
            setValues({ ...values, searched:'',search:'', results: [],message1:'' });
        }

    };

    const showUpdateButton = laboratori => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/${laboratori.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning text-white">Update</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                //<Link >
                    <a  href={`/admin/crud/laboratorija/${laboratori.slug}`} className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                
                //</Link>
            );
        }
    };

    const showAlls = () => {
        return s.map((laboratori, i) => {
            return (
                <div key={i} className="pb-4">

                    <h5 className='pt-1 text-white'>{laboratori.title}</h5>
                    <p className="text-white small">
                      stranicu kreirao: {laboratori.postedBy.name} |  {moment(laboratori.updatedAt).locale('sr').format('LL')}
                    </p>
                    <div>

                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(laboratori.slug)}>
                        Obrisi
                    </button>
                    {showUpdateButton(laboratori)}
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

            <div className={styles.adminContainer}>
                <div className='pt-2'>
                    {message && <div className="alert alert-warning">{message}</div>}
                    <p  style={{color:'white',textTransform:'uppercase'}} >ukupno laboratorija:<b> {s.length}</b></p>
                    {showAlls()}
                </div>
                
            </div>
        </React.Fragment>
    );
};

export default LaboratoriRead;