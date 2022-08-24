import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { API } from '../../config';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { createStandard,list,removeStandard } from '../../actions/standardi';
import styles from '../../styles/admin.module.css'


const SunEditor = dynamic(() => import('suneditor-react'), {ssr: false})
import '../../node_modules/suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/src/assets/css/suneditor.css'

const CreateStandard = ({ router }) => {
    const standardsFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('standards')) {
            return JSON.parse(localStorage.getItem('standards'));
        } else {
            return false;
        }
    };

    const [standard, setStandards] = useState([]);
    
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',      
        photo:'',
        hidePublishButton: false
    });

    const { error, sizeError, success, formData, title, hidePublishButton ,photo} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        loadStandards();
    }, [router]);


    const loadStandards = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStandards(data);
          
            }
        });
    };



    const deleteStandard = slug => {
        removeStandard(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
              //  setMessage(data.message);
                loadStandards();
     
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm(`Da li ste sigurni da zelite da obrisete standard ${slug}?`);
        if (answer) {
            deleteStandard(slug);
        }
    };



    const showStandards = () => {
        return standard.map((standards, i) => {
            return (
                <div key={i} className="shadow bg-light text-dark  text-center p-3 m-2 " style={{display:'grid',width:'auto',borderRadius:'12px',boxShadow: 'rgb(38, 57, 77) 0px 20px 15px -10px'}} >
                  <div className='pb-4'  style={{textTransform:'uppercase',fontSize:''}}  >
                        <h5>{standards.title}</h5>
                       <a className='pt-2 pb-2 text-dark' style={{textTransform:'uppercase',fontSize:'',outline:'none',textDecoration:'none'}}  href={`${API}/standard/dokument/${standards.slug}`} target='_blank'> pogledaj dokument  <i class="far fa-file-alt"></i></a>
                      </div> 
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(standards.slug)}>
                    OBRIŠI STANDARD
                    </button>
              
                </div>
            );
        });
    };


    const publishstandards = e => {
        e.preventDefault();
        // console.log('ready to publishstandards');
       
 

        createStandard(formData, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, error: null, success: `Novi standard "${data.title}" je dodat` });
         loadStandards();
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

    const createStandardForm = () => {
        return (
            <form onSubmit={publishstandards}>
                <div className="form-group">
          
                    <input type="text" placeholder='NASLOV DOKUMENTA/STANDARDA' className="form-control col-md-6 mt-2 " value={title} onChange={handleChange('title')} />
                </div>             
                <div>
                    <button type="submit" className="btn btn-primary">
                      NAPRAVI STANDARD
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="">
            <div className="row ">
            <div className="col-md-8">
               <div>
               <label className="btn btn-outline-light">
                                DODAJ DOKUMENT
                                <input onChange={handleChange('photo')} type="file" className='pl-2' accept="image/*,.pdf" />
                            </label>

               </div>
                  
                </div>

                <div className="col-md-8">
                    {createStandardForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>
            </div>
                         
<hr/><h2 className='pt-1 pb-2'> OBRIŠI STANDARD</h2>
            <div className='row ' >
             <div className={styles.adminGrid}>
                   {showStandards()}
                 </div> 
            </div>
        </div>
    );
};

export default withRouter(CreateStandard);