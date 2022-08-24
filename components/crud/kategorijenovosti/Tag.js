import React from 'react';
import { useState, useEffect } from 'react';
import { getCookie } from '../../../actions/auth';
import { create, getTags, removeTag } from '../../../actions/tag';

const Tag = () => {
    const [values, setValues] = useState({
        name: '', nameSp:'',
        nameEn:'',
        error: false,
        success: false,
        tags: [],
        removed: false,
        reload: false
    });

    const { name, error, success, tags, removed, reload ,nameEn,nameSp} = values;
    const token = getCookie('token');

    useEffect(() => {
        loadTags();
    }, [reload]);

    const loadTags = () => {
        getTags().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, tags: data });
            }
        });
    };

    const showTags = () => {
        return tags.map((t, i) => {
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
        let answer = window.confirm(`Da li ste sigurni da zelite da obrisete kategoriju ${slug}?`);
        if (answer) {
            deleteTag(slug);
        }
    };

    const deleteTag = slug => {
        // console.log('delete', slug);
        removeTag(slug, token).then(data => {
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
            return <p className="text-success">PODKATEGORIJA JE USPESNO DODATA</p>;
        }
    };

    const showError = () => {
        if (error) {
            return <p className="text-danger">PODKATEGORIJA VEC POSTOJI</p>;
        }
    };

    const showRemoved = () => {
        if (removed) {
            return <p className="text-danger">PODKATEGORIJA JE OBRISANA</p>;
        }
    };

    const mouseMoveHandler = e => {
        setValues({ ...values, error: false, success: false, removed: '' });
    };

    const newTagFom = () => (
        <form onSubmit={clickSubmit} className='col-md-6 p-0'>
            <div className="form-group">       
             <label className="">NAZIV PODKATEGORIJE</label>
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
                DODAJ PODKATEGORIJU
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
                {newTagFom()}<hr/>
                <div className='pt-4'>
                    <h2>OBRIŠI KATEGORIJU GALERIJE</h2>
               {showTags()}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Tag;