import { useState, useEffect } from 'react';
import { API } from '../../config';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { createLogo,list,removeLogo } from '../../actions/logo';
import styles from '../../styles/admin.module.css'

const CreateLogo = ({ router }) => {
    const logoFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('logo')) {
            return JSON.parse(localStorage.getItem('logo'));
        } else {
            return false;
        }
    };

    const [logos, setLogos] = useState([]);
    
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',      
        photo:'',
        hidePublishButton: false,
     
    });

    const { error, sizeError, success, formData, title, hidePublishButton ,photo} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        loadLogos();
    }, [router]);


    const loadLogos = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLogos(data);
        
          
            }
        });
    };



    const deleteLogo = slug => {
        removeLogo(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
              //  setMessage(data.message);
                loadLogos();
     
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm(`Da li ste sigurni da zelite da obrisete logo ${slug}?`);
        if (answer) {
            deleteLogo(slug);
        }
    };



    const showLogos = () => {
        return logos.map((logo, i) => {
            return (
                <div key={i} className=" bg-light p-2 m-2 text-center" style={{borderRadius:'12px',boxShadow: 'rgb(38, 57, 77) 0px 20px 15px -10px'}}>
                    <img style={{height:'120px'}}
                        src={`${API}/logo/photo/${logo.slug}`}
                        />
                        <h5 className='text-dark pt-2 pb-2 '>{logo.title}</h5>
                    <button className="btn btn-sm btn-danger" style={{width:'100%'}} onClick={() => deleteConfirm(logo.slug)}>
                  OBRIŠI LOGO
                    </button>
              
                </div>
            );
        });
    };


    const publishlogo = e => {
        e.preventDefault();
        // console.log('ready to publishlogo');
        createLogo(formData, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, error: null, success: `A new logo titled "${data.title}" is created`,name:'',photo:''  });
             
         loadLogos();
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

    const createLogoForm = () => {
        return (
            <form onSubmit={publishlogo}>
                <div className="form-group ">
               
                    <input type="text"  placeholder='NAZIV LOGA' className="form-control " value={title} onChange={handleChange('title')} />
                </div>

               <div>
                    <button type="submit" className="btn btn-primary col-md-4">
                     NAPRAVI LOGO
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="">
            <div className="row">
            <div className="col-md-12">
               <div>
               <label className="btn btn-outline-light">
                                DODAJ LOGO
                                <input  className='pl-2' onChange={handleChange('photo')} type="file" accept="image/*" />
                            </label>

               </div>
                  
                </div>
                <div className="col-md-4">
                    {createLogoForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>
            </div><hr/>
          
          <h2 className='pb-2 pt-1' >OBRIŠI LOGO</h2>
            <div className='row' >
              <div className={styles.adminGrid} >
                    {showLogos()}
                  </div>
            </div>
        </div>
    );
};

export default withRouter(CreateLogo);