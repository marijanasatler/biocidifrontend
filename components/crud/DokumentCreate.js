import { useState, useEffect } from 'react';
import { API } from '../../config';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getTags } from '../../actions/tag';
import { createdokument,list,removedokument } from '../../actions/dokument';
import styles from '../../styles/admin.module.css'


const CreateDokument = ({ router }) => {
    const dokumentFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('dokument')) {
            return JSON.parse(localStorage.getItem('dokument'));
        } else {
            return false;
        }
    };
    const [checked, setChecked] = useState([]); 
    const [dokuments, setdokuments] = useState([]);
    const [tags, setTags] = useState([]);
    const [checkedTag, setCheckedTag] = useState([]); 
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',     
    
        photo:'',
        hidePublishButton: false,
     
    });

    const { error, sizeError, success, formData, title, hidePublishButton ,photo,titleEn,titleSp} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initTags();
        loaddokuments();
    }, [router]);

    const initTags = () => {
        getTags().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setTags(data);
            }
        });
    };

    const loaddokuments = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setdokuments(data);
        
          
            }
        });
    };



    const deletedokument = slug => {
        removedokument(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
              //  setMessage(data.message);
                loaddokuments();
     
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm(`Da li ste sigurni da zelite da obrisete dokument "${slug}"`);
        if (answer) {
            deletedokument(slug);
        }
    };



    const showdokuments = () => {
        return dokuments.map((dokument, i) => {
            return (
                <div key={i} className=" p-3 bg-light text-dark m-2 text-left" style={{display:'grid',width:'auto',borderRadius:'12px',boxShadow: 'rgb(38, 57, 77) 0px 20px 15px -10px'}}>
                  
                        <h5>{dokument.title}</h5>
                        <p className=''><b>LINK DOKUMENTA </b><br/>{`${API}/dokumenti/dokument/${dokument.slug}`}</p>
                        <p className="text-DARK small">
                 DOKUMENT DODAO: {dokument.postedBy.name} </p>
                    <button className="btn   btn-danger" onClick={() => deleteConfirm(dokument.slug)}>
           OBRIŠI DOKUMENT
                    </button>
              
                </div>
            );
        });
    };


    const publishdokument = e => {
        e.preventDefault();
        // console.log('ready to publishdokument');
        createdokument(formData, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, error: null, success: `A new dokument titled "${data.title}" is created`,name:'',photo:''  });
         loaddokuments();
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

    const createdokumentForm = () => {
        return (
            <form onSubmit={publishdokument}>
                <div className="form-group ">
               
                    <input type="text" required  placeholder='NAZIV DOKUMENTA ' className="form-control " value={title} onChange={handleChange('title')} />
                </div>
         

               <div>
                    <button type="submit" className="btn btn-primary ">
                    DODAJ DOKUMENT
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className={styles.adminContainer}>
            <div className="row p-1">
          
                <div className="">
                <div>
               <label className="btn btn-outline-light mb-3">
                             DODAJ DOKUMENT
                                <input required className='pl-2' onChange={handleChange('photo')} type="file" accept="image/*, .pdf" />
                            </label>

               </div>
                  
                    {createdokumentForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>
          
            </div>
            <hr/>
                <h2 className='pb-2'>OBRIŠI DOKUMENT</h2>
            <div className='row' >
              <div className={styles.adminGrid} >
                    {showdokuments()}
                  </div>
            </div>
        </div>
    );
};

export default withRouter(CreateDokument);