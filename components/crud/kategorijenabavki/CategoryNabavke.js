import React from 'react'; 
import { useState, useEffect } from 'react';
import { getCookie } from '../../../actions/auth';
import { create, getCategoriesnabavke, removeCategorynabavke } from '../../../actions/categorynabavke';

const CategoryNabavke = () => {
    const [values, setValues] = useState({
        name: '',
        nameSp:'',
        nameEn:'',
        error: false,
        success: false,
        categoriesnabavke: [],
        removed: false,
        reload: false
    });

    const { name, error, success, categoriesnabavke, removed, reload ,nameEn,nameSp} = values;
    const token = getCookie('token');

    useEffect(() => {
        loadCategories();
    }, [reload]);

    const loadCategories = () => {
        getCategoriesnabavke().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, categoriesnabavke: data });
            }
        });
    };

    const showCategoriesNabavke = () => {
        return categoriesnabavke.map((c, i) => {
            return (
                <button
                    onDoubleClick={() => deleteConfirm(c.slug)}
                    title="Double click to delete"
                    key={i}
                    className="btn btn-primary  mr-1 ml-1 mt-3 "
                >
                    {c.name}
                </button>
            );
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm(`DA LI STE SIGURNI DA ZELITE DA IZBRISETE KATEGORIJU ${slug}?`);
        if (answer) {
            deleteCategorynabavke(slug);
        }
    };

    const deleteCategorynabavke = slug => {
        // console.log('delete', slug);
        removeCategorynabavke(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload });
            }
        });
    };

    const clickSubmit = e => {
        e.preventDefault();
        // console.log('create categorynabavke', name);
        create({ name,nameEn,nameSp }, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, error: false, success: true, name: '',nameEn:'',nameSp:'' ,removed: '', reload: !reload });
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
            return <p className="text-success">KATEGORIJA JE USPESNO DODATA</p>;
        }
    };

    const showError = () => {
        if (error) {
            return <p className="text-danger">KATEGORIJA VEC POSTOJI</p>;
        }
    };

    const showRemoved = () => {
        if (removed) {
            return <p className="text-danger">KATEGORIJA JE OBRISANA</p>;
        }
    };

    const mouseMoveHandler = e => {
        setValues({ ...values, error: false, success: false, removed: '' });
    };

    const newCategorynabavkeFom = () => (
        <form onSubmit={clickSubmit} className='col-md-10 p-0'>
            <div className="form-group">
                <label className="">NAZIV KATEGORIJE</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} placeholder='latinica' required />
            </div>
            <div className="form-group">
           
                <input type="text" placeholder='cirilica' className="form-control" onChange={handleChangeSp} value={nameSp} required />
            </div>
            <div className="form-group">
     
                <input type="text" placeholder='engleski' className="form-control" onChange={handleChangeEn} value={nameEn} required />
            </div>

            <div>
                <button type="submit" className="btn btn-primary"  style={{}}>
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
                {newCategorynabavkeFom()}<hr/>
                <div className='mt-4 col-md-10 p-0'>
  <h2 className='pt-1 pb-2'> OBRIŠI KATEGORIJU NABAVKI</h2>
                {showCategoriesNabavke()}
                </div>
            </div>
        </React.Fragment>
    );
};

export default CategoryNabavke;