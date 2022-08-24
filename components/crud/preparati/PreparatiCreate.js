import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { getCategoriesPreparata } from '../../../actions/categorypreparata';

import { createPreparati } from '../../../actions/preparati';

const SunEditor = dynamic(() => import('suneditor-react'), {ssr: false})
import 'suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/src/assets/css/suneditor.css'

const CreatePreparati = ({ router }) => {
    const preparatiFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('preparatis')) {
            return JSON.parse(localStorage.getItem('preparatis'));
        } else {
            return false;
        }
    };

    const [categories, setCategories] = useState([]);


    const [checked, setChecked] = useState([]); // categories



    
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',      
        titleEn:'',
        titleSp:'',
        photo:'',
        hidePublishButton: false
    });

    const { error, sizeError, success, formData, title, hidePublishButton ,photo,titleEn,titleSp} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initCategories();
      
    }, [router]);

    const initCategories = () => {
        getCategoriesPreparata().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

   
    const publishpreparati = e => {
        e.preventDefault();
        // console.log('ready to publishpreparati');
 

        createPreparati(formData, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, error: null, success: `Novi preparat "${data.title}" je dodat`,title:'',name:'' });
               setCategories([]);
               if (isAuth() && isAuth().role === 1) {
                Router.replace(`/admin/crud/preparati`);
              } else if (isAuth() && isAuth().role === 0) {
                Router.replace(`/user/crud/preparati`);
              }
            }
        });
    };

    const handleChange = name => e => {
        // console.log(e.target.value);
        //let formData = new formData();
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

   

    const handleToggle = c => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }
        console.log(all);
        setChecked(all);
        formData.set('categoriespreparati', all);
    };

   

    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (
                <li key={i} className="list-unstyled" style={{textTransform:'uppercase'}} >
                    <input onChange={handleToggle(c._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label" >{c.name}</label>
                </li>
            ))
        );
    };

  

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );

    const createPreparatiForm = () => {
        return (
            <form onSubmit={publishpreparati}>
                    <label className="">NAZIV PREPARATA</label>
                <div className="form-group">
                    <input type="text" className="form-control col-md-8" value={title} onChange={handleChange('title')} placeholder='latinica' />
                </div>

         
            <div className='pt-1'>
               <label className="btn btn-outline-light ">
                                DODAJ DOKUMENT
                                <input onChange={handleChange('photo')} type="file" accept="image/*, .pdf" className='pl-2' />
                            </label>

               </div>
              
                <div className='pt-4'>
                    <button type="submit" className="btn btn-primary">
                      DODAJ PREPARAT
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="">
            <div className="row">
                <div className="col-md-8">
                    {createPreparatiForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>

                <div className="col-md-4">
             
                    <div className=''>  
                    <label className='' style={{textDecoration:''}}><b>KATEGORIJA PREPARATA</b></label>
                        <ul style={{ maxHeight: '220px', overflowY: 'scroll',padding:'0'}}>{showCategories()}</ul>
                    </div>
                  
                </div>
            </div>
        </div>
    );
};

export default withRouter(CreatePreparati);