import React from 'react'
import { listSearch } from '../../../actions/preparati';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCookie, isAuth } from '../../../actions/auth';
import { API } from '../../../config';
import { list, removePreparati } from '../../../actions/preparati';
import moment from 'moment';
import styles from '../../../styles/admin.module.css'

const preparatiRead = ({ username }) => {
    const [preparatis, setpreparatis] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadpreparatis();
 
    }, []);

    const loadpreparatis = () => {
        list(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setpreparatis(data);
             
            }
        });
    };

    const deletePreparati = slug => {
        removePreparati(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadpreparatis();
     
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm(`Da li ste sigurni da zelite da obrisete preparat ${slug}?`);
        if (answer) {
            deletePreparati(slug);
        }
    };

    const showUpdateButton = preparati => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/preparati/${preparati.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                //<Link >
                    <a  href={`/admin/crud/preparati/${preparati.slug}`} className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                //</Link>
            );
        }
    };

    const showAllpreparatis = () => {
        return preparatis.map((preparati, i) => {
            return (
                <div key={i} className="   p-3 m-2 text-center  bg-light text-dark  " style={{borderRadius:'12px',boxShadow: 'rgb(38, 57, 77) 0px 20px 15px -10px'}}  >
                    <h5 className='pt-2  '> {preparati.title}</h5>
                    <a className='pt-2 pb-2 mb-2  text-dark' style={{textTransform:'uppercase',fontSize:'',outline:'none',textDecoration:'none'}}  href={`${API}/preparati/dokument/${preparati.slug}`} target='_blank'> pogledaj dokument  <i class="far fa-file-alt"></i></a>
                    <p className="small">
                DOKUMENT DODAO: {preparati.postedBy.name} |  {moment(preparati.updatedAt).locale('sr').format('LL')}
                </p>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(preparati.slug)}>
                      obrisi
                    </button>
                    {showUpdateButton(preparati)}
               
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
            setValues({ ...values, results: data, searched: true, message1: ` preparata pronađena ${data.length} ` });
        });
    };

    const handleChange = e => {
        // console.log(e.target.value);
        setValues({ ...values, search: e.target.value, searched: false, results: [] ,message1:''});
    };

    const searchedpreparatis = (results = []) => {
        return (
            <div className="">

                {results.map((preparati, i) => {
                    return (
                        <div key={i} className='pb-2'>
                    {showUpdateButton(preparati)}
                            <Link href={`/novosti/${preparati.slug}`}>
                                <a className="text-white pl-2">{preparati.title}</a>
                            </Link>
                 
                        </div>
                    );
                })}
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
  
<div className="row">
    <div className="col-md-4">
        <input type="search" className="form-control" placeholder="PRETRAGA REGISTROVANIH PREPARATA" onChange={handleChange} />
    </div>

    <div className="col-md-2">
        <button className="btn btn-block btn-light text-primary" style={{color:''}} type="submit">
           PRETRAŽI
        </button>
    </div>
</div>
</form>
);





    return (
        <React.Fragment>
<div className={styles.adminContainer}>

<div >
          
            <div className="pt-3 ">{searchForm()}</div>
            {message1 && <p  style={{backgroundColor:'',color:'white'}} className=" col-md-6  p-1 small font-italic">{message1}</p>}
            {searched && <div style={{ maxHeight:'300px',overflowY:'scroll',padding:'0'}} className="col-md-6">{searchedpreparatis(results)}</div>}
        </div>
<hr/>
        <div className="row">
                <div className="col-md-12">
                    {message && <div className="alert alert-warning">{message}</div>}
                    <p style={{textTransform:'uppercase',color:'white'}} className='color pl-2'>ukupno preparata:<b> {preparatis.length}</b></p><br/>
         
                </div>
                <div className={styles.adminGrid}>
      {showAllpreparatis()}

</div>

            </div>

            </div>
        </React.Fragment>
    );
};

export default preparatiRead;