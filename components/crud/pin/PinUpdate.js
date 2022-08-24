import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { singlepin, updatepin } from '../../../actions/pin';
import { API } from '../../../config'; 

const SunEditor = dynamic(() => import('suneditor-react'), {ssr: false})
import 'suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/src/assets/css/suneditor.css'


const pinUpdate = ({ router }) => {
    const [bodyLat, setBodyLat] = useState('');
    const [bodyEn, setBodyEn] = useState('');
    const [bodySp, setBodySp] = useState('');

 


    const [values, setValues] = useState({
        title: '',
        linkRef:'',linkRefSp:'',
        linkRefEn:'',
        titleEn:'',
        titleLat:'',
        titleSp :'',
        error: '',
        success: '',
        formData: '',
      //  title: '',
        bodyLat: '',
        bodyEn: '',
        bodySp:'',
    });

    const { error, success, formData, title , titleEn,photo,linkRef,linkRefEn,linkRefSp,titleLat,
        titleSp ,} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initpin();
  
    
        handleBody();
        handleBodyEn();
        handleBodySp();
    }, [router]);

    const initpin = () => {
        if (router.query.slug) {
            singlepin(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, title: data.title, titleEn:data.titleEn,linkRef:data.linkRef,linkRefEn:data.linkRefEn,linkRefSp:data.linkRefSp,titleLat:data.titleLat,
                        photo:data.photo,
                        titleSp :data.titleSp, });
                    setBodyLat(data.bodyLat);
                    setBodyEn(data.bodyEn);
                    setBodySp(data.bodySp);
                
                   
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

    const handleBody = (e) => {
        let formData = new FormData();
        setBodyLat(e);
        formData.set("bodyLat", e);
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
     


     
      const editpin = (e) => {
        e.preventDefault();
       // let formData = new FormData();
        formData.append("title", values.title);
        formData.append("titleSp", values.titleSp);
        formData.append("titleEn", values.titleEn);

        formData.append("titleLat", values.titleLat);
        formData.append("linkRef", values.linkRef);
        formData.append("linkRefSp", values.linkRefSp);
        formData.append("linkRefEn", values.linkRefEn);
        formData.append("bodyEn", bodyEn);
        formData.append("bodySp", bodySp);
        formData.append("bodyLat", bodyLat);
       // formData.append("pincategories", values.pincategories);
        updatepin(formData, token, router.query.slug).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              ...values,
              title: "", titleEn:'',photo:"",
              titleSp :'',linkRef:'',
              linkRefSp:'',linkRefEn:'',titleLat:'',
          
              success: `pin  ${data.title} is successfully updates`,
            });
            if (isAuth() && isAuth().role === 1) {
              Router.replace(`/admin/crud/pin/${router.query.slug}`);
            } else if (isAuth() && isAuth().role === 0) {
              Router.replace(`/user/crud/pin/${router.query.slug}`);
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

    const updatepinForm = () => {
        return (
            <form onSubmit={editpin}>
          <div className="form-group ">
                    <label className="">NAZIV SLAJDA</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                </div>
                <div>
                   
     <div className='mt-2'>
                        <label className="btn btn-outline-light ">
                               DODAJ NOVU FOTOGRAFIJU
                                <input className='ml-2' onChange={handleChange('photo')} type="file" accept="image/*" />
                            </label>
                        </div>     <p className='text-white'>TRENUTNA FOTOGRAFIJA</p>
                        {title && (
                            <img src={`${API}/pin/photo/${router.query.slug}`} alt={title} style={{ height:'200px'}} />
                            )}
                    </div>
                        
                           
                <hr/>
                <div className="form-group">
                    <label className="">LATINICA</label>
                    <input type="text" className="form-control" value={titleLat} onChange={handleChange('titleLat')} />
                </div>
             
                <div className="form-group pt-2">
                    <input type="text" className="form-control" value={linkRef} onChange={handleChange('linkRef')}  placeholder='Link ka postu latinica' />
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
                  
      minHeight: 200
              }}
    
                      setContents={bodyLat}
                          placeholder="Write something amazing..."
                          onChange={handleBody}
                    />

                </div>
    
                <hr />
                
                <div className="form-group">
                <label className="text-light">ĆIRILICA</label>
                    <input type="text" className="form-control" value={titleSp} onChange={handleChange('titleSp')} />
                </div>
                <div className="form-group pt-2">
                    <input type="text" className="form-control" value={linkRefSp} onChange={handleChange('linkRefSp')}  placeholder='Link ka postu cirilica' />
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
                            
                minHeight: 200
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
                          <div className="form-group pt-2">
                    <input type="text" className="form-control" value={linkRefEn} onChange={handleChange('linkRefEn')}  placeholder='Link ka postu engleski' />
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
                  
      minHeight: 200
              }}
    
                      setContents={bodyEn}
                          placeholder="Write something amazing..."
                          onChange={handleBodyEn}
                    />

                </div>
                <div>
                    <button type="submit" className="btn btn-primary ">
                      IZMENI SLAJD
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="">
            <div className="row">
                <div className="col-md-12">
                    {updatepinForm()}

                    <div className="pt-3">
                        {showSuccess()}
                        {showError()}
                    </div>

                </div>

           
           
         
            </div>
        </div>
    );
};

export default withRouter(pinUpdate);