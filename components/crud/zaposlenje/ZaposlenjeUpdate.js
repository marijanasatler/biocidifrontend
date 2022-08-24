import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';

import { singleZaposlenje, updateZaposlenje } from '../../../actions/zaposlenje';

import { API } from '../../../config'; 

const SunEditor = dynamic(() => import('suneditor-react'), {ssr: false})
//import '../../node_modules/suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/src/assets/css/suneditor.css'


const ZaposlenjeUpdate = ({ router }) => {
    const [bodyEn, setBodyEn] = useState('');
    const [bodySp, setBodySp] = useState('');
    const [bodyLat, setBodyLat] = useState('');


    const [values, setValues] = useState({
        title: '',     
        titleEn:'',
        titleSp :'',
        pocetak: '',
        kraj:'',
        sifra:'',
        error: '',
        success: '',
        formData: '',
      //  title: '',
        bodyEn: '',
        bodySp:'',
        bodyLat:'',
        
    });

    const { error, success, formData, title ,   
        titleEn,photo,pocetak,kraj,sifra,
        titleSp ,
        expdate} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initzaposlenje();
        handleBodyEn();
        handleBodySp();
        handleBody();
    }, [router]);

    const initzaposlenje = () => {
        if (router.query.slug) {
            singleZaposlenje(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, title: data.title,    
                        titleEn:data.titleEn,
                        photo:data.photo,
                        titleSp :data.titleSp,pocetak:data.pocetak,kraj:data.kraj,sifra:data.sifra,
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
     


      const editzaposlenje = (e) => {
        e.preventDefault();
       // let formData = new FormData();
        formData.append("title", values.title); 
        formData.append("titleSp", values.titleSp);
        formData.append("titleEn", values.titleEn);
        formData.append("pocetak", values.pocetak);
        formData.append("kraj", values.kraj);
        formData.append("sifra", values.sifra);
        formData.append("bodyEn", bodyEn);
        formData.append("bodySp", bodySp);
        formData.append("bodyLat", bodyLat);
       // formData.append("categories", values.categories);
        updateZaposlenje(formData, token, router.query.slug).then((data) => {
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
              Router.replace(`/admin/crud/zaposlenja`);
            } else if (isAuth() && isAuth().role === 0) {
              Router.replace(`/user/crud/zaposlenja`);
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

    const updateZaposlenjeForm = () => {
        return (
            <form onSubmit={editzaposlenje}>
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
                            
                minHeight: 250
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
                            
                minHeight: 250
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
                  
      minHeight: 250
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
        <div className="">
            <div className="row">
                <div className="col-md-8">
                    {updateZaposlenjeForm()}

                    <div className="pt-3">
                        {showSuccess()}
                        {showError()}
                    </div>
                    
                </div>

                <div className="col-md-4">
                    <div>        <div className='mt-4'>
                                        {title ? (
                                            <a   href={`${API}/zaposlenje/dokument/${router.query.slug}`} alt={title} style={{ width: '100%',textTransform:'uppercase',cursor:'pointer' ,color:'white',textDecoration:'none'}}>vidi  trenutni dokument <i class="far fa-file-alt"></i> </a>
                                            ) :<p>NEMA DOKUMENTA</p>}

                                            </div>

<hr/>
                        <div >
                        <label className="btn btn-outline-light ">
  NOVI DOKUMENT
                                <input className='ml-2'  onChange={handleChange('photo')} type="file" accept="image/*, .pdf" />
                            </label>
                        </div>
                        <hr/>
                    

                    </div><label>DATUM OBJAVLJIVANJA</label>
                    <input type="date" className="form-control col-md-10 " value={pocetak} onChange={handleChange('pocetak')} />
                    <label className='mt-3'>ROK ZA PRIJAVU</label>
                    <input type="datetime-local" className="form-control col-md-10" value={kraj} onChange={handleChange('kraj')} />
                    <input type="text" className="form-control col-md-10  mt-4"  placeholder='SIFRA OGLASA' value={sifra} onChange={handleChange('sifra')} />
                </div>
            </div>
        </div>
    );
};

export default withRouter(ZaposlenjeUpdate);