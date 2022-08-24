import { useState, useEffect } from 'react';
import { API } from '../../config';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getTags } from '../../actions/tag';
import { createGaleri,list,removeGaleri } from '../../actions/galeri';
import styles from '../../styles/admin.module.css'

const CreateGaleri = ({ router }) => {
    const galeriFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('galeri')) {
            return JSON.parse(localStorage.getItem('galeri'));
        } else {
            return false;
        }
    };
    const [checked, setChecked] = useState([]); 
    const [galeris, setGaleris] = useState([]);
    const [tags, setTags] = useState([]);
    const [checkedTag, setCheckedTag] = useState([]); 
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',     
        titleEn:'',
        titleSp:'' ,
        photo:'',
        hidePublishButton: false,
     
    });

    const { error, sizeError, success, formData, title, hidePublishButton ,photo,titleEn,titleSp} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initTags();
        loadGaleris();
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

    const loadGaleris = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
              setMessage(data.error)
            } else {
                setGaleris(data);
        
          
            }
        });
    };



    const deleteGaleri = slug => {
        removeGaleri(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
       
            } else {
              setMessage(data.message);
                loadGaleris();
     
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm(`Da li ste sigurni da zelite da obrisete fotografiju "${slug}"`);
        if (answer) {
            deleteGaleri(slug);
        }
    };



    const showgaleris = () => {
        return galeris.map((galeri, i) => {
            return (
                <div key={i} className="shadow p-2 bg-light text-dark m-2 text-left" style={{borderRadius:'12px',boxShadow: 'rgb(38, 57, 77) 0px 20px 15px -10px'}}  >
                    <img style={{width:'100%'}}
                        src={`${API}/galeri/photo/${galeri.slug}`}
                        />
                        <h5 className='text-dark'>{galeri.title}</h5>
                        <p className='small'><b>LINK FOTOGRAFIJE: </b><br/>{`${API}/galeri/photo/${galeri.slug}`}</p>
                        <p className="text-DARK small">
                FOTOGRAFIJU DODAO: {galeri.postedBy.name} </p>
                    <button style={{width:'100%'}} className="btn btn-sm btn-danger" onClick={() => deleteConfirm(galeri.slug)}>
                    OBRŠI FOTOGRAFIJU
                    </button>
              
                </div>
            );
        });
    };


    const publishgaleri = e => {
        e.preventDefault();
        // console.log('ready to publishgaleri');
        createGaleri(formData, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, error: null, success: `A new galeri titled "${data.title}" is created`,name:'',photo:''  });
                setTags([]);
         loadGaleris();
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


    const handleTagsToggle = t => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedTag = checked.indexOf(t);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            all.push(t);
        } else {
            all.splice(clickedTag, 1);
        }
        console.log(all);
        setCheckedTag(all);
        formData.set('tags', all);
    };



    const showTags = () => {
        return (
            tags &&
            tags.map((t, i) => (
                <li key={i} className="list-unstyled" style={{textTransform:'uppercase'}} >
                    <input onChange={handleTagsToggle(t._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
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

    const createGaleriForm = () => {
        return (
            <form onSubmit={publishgaleri}>
                <div className="form-group">
               
                    <input type="text" required  placeholder='NAZIV LOGA' className="form-control " value={title} onChange={handleChange('title')} />
                </div>
                <div className="form-group">
               
               <input type="text"  required placeholder='NAZIV LOGA' className="form-control " value={titleEn} onChange={handleChange('titleEn')} />
           </div>
           <div className="form-group">
               
               <input type="text"  required placeholder='NAZIV LOGA' className="form-control " value={titleSp} onChange={handleChange('titleSp')} />
           </div>
<hr/>
               <div>
                    <button type="submit" className="btn btn-primary">
                   DODAJ FOTOGRAFIJU
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div >
            <div className="row">
          
                <div className="col-md-8">
                <div>
               <label className="btn btn-outline-light mb-3">
                             DODAJ FOTOGRAFIJU
                                <input required className='pl-2' onChange={handleChange('photo')} type="file" accept="image/*" />
                            </label>

               </div>
                  
                    {createGaleriForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>
            <div  className='col-md-4'>
                        <h5>KATEGORIJA FOTOGRAFIJA</h5>
                        <hr />
                        <ul style={{ maxHeight: '220px', overflowY: 'scroll',padding:'0' }}>{showTags()}</ul>
                    </div>
            </div>
            <hr/>
                <h2> OBRŠI FOTOGRAFIJU</h2>
            <div className='row' >
              <div className={styles.adminGrid} >
                    {showgaleris()}
                  </div>
            </div>
        </div>
    );
};

export default withRouter(CreateGaleri);