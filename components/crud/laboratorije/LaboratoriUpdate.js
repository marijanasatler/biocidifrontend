import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import styles from '../../../styles/admin.module.css'
import { singleLaboratori, updateLaboratori } from '../../../actions/laboratori';

import { API } from '../../../config'; 

const SunEditor = dynamic(() => import('suneditor-react'), {ssr: false})
//import '../../node_modules/suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/src/assets/css/suneditor.css'


const laboratoriUpdate = ({ router }) => {
    const [bodyEn, setBodyEn] = useState('');
    const [bodySp, setBodySp] = useState('');
    const [bodyLat, setBodyLat] = useState('');


    const [values, setValues] = useState({
        title: '',     
        titleEn:'',
        titleSp :'',

        error: '',
        success: '',
        formData: '',
      //  title: '',
        bodyEn: '',
        bodySp:'',
        bodyLat:'',
        
    });

    const { error, success, formData, title ,   
        titleEn,photo,
        titleSp ,
        expdate} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initLaboratori();
        handleBodyEn();
        handleBodySp();
        handleBody();
    }, [router]);

    const initLaboratori = () => {
        if (router.query.slug) {
            singleLaboratori(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, title: data.title,    
                        titleEn:data.titleEn,
                        photo:data.photo,
                        titleSp :data.titleSp,
                     });
                    setBodyEn(data.bodyEn);
                    setBodySp(data.bodySp);
                    setBodyLat(data.bodyLat);
                
                }
            });
        }
    };



  


    const handleChange =( name )=> (e) => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
       formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const handleBodyEn = (e) => {
        let formData = new FormData();
        setBodyEn(e);
        formData.set("bodyEn", e);
      };
     
      const handleBodySp = (e) => {
        let formData = new FormData();
        setBodySp(e);
        formData.set("bodySp", e);
      };
     
      const handleBody = (e) => {
        let formData = new FormData();
        setBodyLat(e);
        formData.set("bodyLat", e);
      };
     


      const editLaboratori = (e) => {
        e.preventDefault();
       // let formData = new FormData();
        formData.append("title", values.title); 
        formData.append("titleSp", values.titleSp);
        formData.append("titleEn", values.titleEn);
  
        formData.append("bodyEn", bodyEn);
        formData.append("bodySp", bodySp);
        formData.append("bodyLat", bodyLat);
       // formData.append("categories", values.categories);
        updateLaboratori(formData, token, router.query.slug).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              ...values,
              title: "", titleEn:'',photo:"",
              titleSp :'',
          
              success: `Blog title ${data.title} is successfully updates`,
            });
            if (isAuth() && isAuth().role === 1) {
              Router.replace(`/admin/crud/laboratorija/${router.query.slug}`);
            } else if (isAuth() && isAuth().role === 0) {
              Router.replace(`/user/crud/laboratorija/${router.query.slug}`);
            }
          }
        });
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

    const updateLaboratoriForm = () => {
        return (
            <form onSubmit={editLaboratori}>

<div className="">
                    <div className='mb-3'>
                  
                        <p className='text-white'>TRENUTNA FOTOGRAFIJA</p>
                        {bodyEn && (
                            <img src={`${API}/laboratori/photo/${router.query.slug}`} alt={title} style={{height:'200px' }} />
                            )}

                    </div>
                    <div>
                        <label className="btn btn-outline-light text-white">
                               DODAJ NOVU FOTOGRAFIJU
                                <input  className='ml-2' onChange={handleChange('photo')} type="file" accept="image/*" />
                            </label>
                        </div>
                </div>

                            <hr/>

                <div className="form-group">
                    <label className="text-light">LATINICA</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />

                </div>
                
                <div className="form-group">
            
            <SunEditor
                        setOptions={{
                          buttonList: [
                              ['undo', 'redo'],
                              ['font', 'fontSize', 'formatBlock'],
                              ['paragraphStyle', 'blockquote'],
                              ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                              ['fontColor', 'hiliteColor', 'textStyle'],
                              ['removeFormat'],
                              ['outdent', 'indent'],
                              ['align', 'horizontalRule', 'list', 'lineHeight'],
                              ['table', 'link', 'image', 'video'],
                              ['fullScreen', 'showBlocks', 'codeView'],
                              ['preview', 'print'],
                              ['save', 'template']
                            ],
                            
                minHeight: 400
                        }}
              
                                setContents={bodyLat}
                                    placeholder="Write something amazing..."
                                    onChange={handleBody}
                              />
          
                          </div>
                
                <hr />
                
                <div className="form-group">
                <label className="text-light">??IRILICA</label>
                    <input type="text" className="form-control" value={titleSp} onChange={handleChange('titleSp')} />
                </div>
               
                <div className="form-group">
            
            <SunEditor
                        setOptions={{
                          buttonList: [
                              ['undo', 'redo'],
                              ['font', 'fontSize', 'formatBlock'],
                              ['paragraphStyle', 'blockquote'],
                              ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                              ['fontColor', 'hiliteColor', 'textStyle'],
                              ['removeFormat'],
                              ['outdent', 'indent'],
                              ['align', 'horizontalRule', 'list', 'lineHeight'],
                              ['table', 'link', 'image', 'video'],
                              ['fullScreen', 'showBlocks', 'codeView'],
                              ['preview', 'print'],
                              ['save', 'template']
                            ],
                            
                minHeight: 400
                        }}
              
                                setContents={bodySp}
                                    placeholder="Write something amazing..."
                                    onChange={handleBodySp}
                              />
          
                          </div>
               
               <hr/>
                <div className="form-group ">
                      
                <label className="text-light">ENGLESKI</label>
           
                      <input type="text" className="form-control" value={titleEn} onChange={handleChange('titleEn')} />
               
                          
                          </div>
             
                <div className="form-group">
            
  <SunEditor
              setOptions={{
                buttonList: [
                    ['undo', 'redo'],
                    ['font', 'fontSize', 'formatBlock'],
                    ['paragraphStyle', 'blockquote'],
                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                    ['fontColor', 'hiliteColor', 'textStyle'],
                    ['removeFormat'],
                    ['outdent', 'indent'],
                    ['align', 'horizontalRule', 'list', 'lineHeight'],
                    ['table', 'link', 'image', 'video'],
                    ['fullScreen', 'showBlocks', 'codeView'],
                    ['preview', 'print'],
                    ['save', 'template']
                  ],
                  
      minHeight: 400
              }}
    
                      setContents={bodyEn}
                          placeholder="Write something amazing..."
                          onChange={handleBodyEn}
                    />

                </div>
                
                <div>
                    <button type="submit" className="btn btn-primary">
                    SACUVAJ IZMENE
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className={styles.adminContainer}>
            <div className="row">
                <div className="col-md-12 p-4">
                    {updateLaboratoriForm()}

                    <div className="pt-3">
                        {showSuccess()}
                        {showError()}
                    </div>
                    
                </div>

               
            </div>
        </div>
    );
};

export default withRouter(laboratoriUpdate);