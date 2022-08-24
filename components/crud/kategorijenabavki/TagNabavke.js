import React from 'react';
import { useState, useEffect } from 'react';
import { getCookie } from '../../../actions/auth';
import { create, getTagnabavke, removeTagnabavke } from '../../../actions/tagnabavke';

const TagNabavke = () => {
    const [values, setValues] = useState({
        name: '',
        nameSp:'',
        nameEn:'',
        error: false,
        success: false,
        tagnabavkes: [],
        removed: false,
        reload: false
    });

    const { name, error, success, tagnabavkes, removed, reload,nameEn,nameSp } = values;
    const token = getCookie('token');

    useEffect(() => {
        loadTagnabavkes();
    }, [reload]);

    const loadTagnabavkes = () => {
        getTagnabavke().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, tagnabavkes: data });
            }
        });
    };

    const showTagnabavkes = () => {
        return tagnabavkes.map((t, i) => {
            return (
                <button
                    onDoubleClick={() => deleteConfirm(t.slug)}
                    title="Double click to delete"
                    key={i}
                    className="btn btn-primary mr-1 ml-1 mt-3"   
                >
                    {t.name}
                </button>
            );
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm(`DA LI STE SIGURNI DA ZELITE DA IZBRISETE STATUS ${slug}?`);
        if (answer) {
            deleteTagnabavke(slug);
        }
    };

    const deleteTagnabavke = slug => {
        // console.log('delete', slug);
        removeTagnabavke(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload });
            }
        });
    };

    const clickSubmit = e => {
        e.preventDefault();
        // console.log('create category', name);
        create({ name,nameEn,nameSp }, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, error: false, success: true, name: '',nameEn:'',nameSp:'' , removed: '', reload: !reload });
            }
        });
    };

    const handleChange = e => {
        setValues({ ...values, name: e.target.value, error: false, success: false, removed: '' });
    };

    const handleChangeEn = e => {
        setValues({ ...values, nameEn: e.target.value, error: false, success: false, removed: '' });
    };

    const handleChangeSp = e => {
        setValues({ ...values, nameSp: e.target.value, error: false, success: false, removed: '' });
    };




    const showSuccess = () => {
        if (success) {
            return <p className="text-success">KATEGORIJA STATUS JE USPESNO DODATA</p>;
        }
    };

    const showError = () => {
        if (error) {
            return <p className="text-danger">KATEGORIJA STATUS VEC POSTOJI</p>;
        }
    };

    const showRemoved = () => {
        if (removed) {
            return <p className="text-danger">KATEGORIJA STATUS JE OBRISANA</p>;
        }
    };

    const mouseMoveHandler = e => {
        setValues({ ...values, error: false, success: false, removed: '' });
    };

    const newTagnabavkeFom = () => (
        <form onSubmit={clickSubmit} className='col-md-10 p-0'>
            <div className="form-group">
                <label className="">STATUS NABAVKE</label>
                <input type="text" placeholder='latinica' className="form-control" onChange={handleChange} value={name} required />
            </div>
            <div className="form-group">
           
           <input type="text" placeholder='cirilica' className="form-control" onChange={handleChangeSp} value={nameSp} required />
       </div>
       <div className="form-group">

           <input type="text" placeholder='engleski' className="form-control" onChange={handleChangeEn} value={nameEn} required />
       </div>
            <div>
                <button type="submit" className="btn btn-primary" style={{color:'',backgroundColor:''}}>
              KREIRAJ
                </button>
            </div>
        </form>
    );

    return (
        <React.Fragment>
            {showSuccess()}
            {showError()}
            {showRemoved()}
            <div onMouseMove={mouseMoveHandler} className='pt-2'>
                {newTagnabavkeFom()}
                <hr/>
                <div className='mt-4 col-md-10 p-0'>
                <h2 className='pt-1 pb-2'> OBRIŠI status NABAVKI</h2>
                {showTagnabavkes()}
                </div>
            </div>
        </React.Fragment>
    );
};

export default TagNabavke;