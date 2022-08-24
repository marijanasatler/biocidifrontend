import React from 'react'
import { listSearch } from '../../../actions/nabavke';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCookie, isAuth } from '../../../actions/auth';
import { list, removeNabavke } from '../../../actions/nabavke';
import moment from 'moment';

const NabavkeRead = ({ username }) => {
    const [nabavkes, setNabavkes] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadNabavkes();
 
    }, []);

    const loadNabavkes = () => {
        list(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setNabavkes(data);
             
            }
        });
    };

    const deleteNabavke = slug => {
        removeNabavke(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadNabavkes();
     
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm(`Da li ste sigurni da želite da obrišete nabavku ${slug}?`);
        if (answer) {
            deleteNabavke(slug);
        }
    };

    const showUpdateButton = nabavke => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/nabavka/${nabavke.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                //<Link >
                    <a  href={`/admin/crud/nabavka/${nabavke.slug}`} className=" btn btn-sm btn-warning text-white">Izmeni</a>
                //</Link>
            );
        }
    };

    const showAllNabavke = () => {
        return nabavkes.map((nabavke, i) => {
            return (
                <div key={i} className="pb-2">

                <h5 className='pt-1 text-white'>{nabavke.title}</h5>
                <p className="text-white small">
                  stranicu kreirao: {nabavke.postedBy.name} |  {moment(nabavke.updatedAt).locale('sr').format('LL')}
                </p>
                <div>

                <button className="btn btn-sm btn-danger mr-2" onClick={() => deleteConfirm(nabavke.slug)}>
                    obriši
                </button>
                {showUpdateButton(nabavke)}
                </div>
          <hr />
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
            setValues({ ...values, results: data, searched: true, message1: `PRONAĐENO NABAVKI ${data.length}` });
        });
    };

    const handleChange = e => {
        // console.log(e.target.value);
        setValues({ ...values, search: e.target.value, searched: false, results: [] ,message1:''});
    };

    const searchednabavkes = (results = []) => {
        return (
            <div className="">

                {results.map((nabavke, i) => {
                    return (
                        <div key={i} className='pb-2 text-white'>
                    {showUpdateButton(nabavke)}
                            <Link href={`/nabavka/${nabavke.slug}`}>
                                <a className="text-white pl-3">{nabavke.title}</a>
                            </Link>
                 
                        </div>
                    );
                })}
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
  
<div className="row pt-2">
    <div className="col-md-4">
        <input type="search" className="form-control" placeholder="PRETRAGA NABAVKI" onChange={handleChange} />
    </div>

    <div className="col-md-2">
        <button className="btn btn-block btn-light small text-primary " style={{textTransform:'uppercase'}} type="submit">
           traži
        </button>
    </div>
</div>
</form>
);





    return (
        <React.Fragment>
<div className=''>

<div className="">
          
            <div className="pt-3">{searchForm()}</div>
            {message1 && <p  style={{backgroundColor:'',color:'white'}} className="   p-1 small  font-italic">{message1}</p>}
            {searched && <div  className=' text-white' style={{ maxHeight:'300px',overflowY:'scroll'}}>{searchednabavkes(results)}</div>}
        </div>
            <div className="">
                <div className="mt-5">
                    {message && <div className="alert alert-warning">{message}</div>}
                    <p style={{textTransform:'uppercase',color:'white'}} >ukupno nabavki:<b> {nabavkes.length}</b></p>
                    {showAllNabavke()}
                </div>
            </div>
</div>
        </React.Fragment>
    );
};

export default NabavkeRead;