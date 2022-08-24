import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';

import { createpocetna } from '../../../actions/pocetna';


const SunEditor = dynamic(() => import('suneditor-react'), {ssr: false})
import 'suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/src/assets/css/suneditor.css' 


const Pocetna = ({ router }) => {
    const pocetnaFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('pocetna')) {
            return JSON.parse(localStorage.getItem('pocetna'));
        } else {
            return false;
        }
    };


    const [bodySp, setBodySp] = useState(pocetnaFromLS());
    const [bodyEn, setBodyEn] = useState(pocetnaFromLS());
    const [bodyLat, setBodyLat] = useState(pocetnaFromLS());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',  
       titleEn:'',
        titleSp:'',
        titleLat:'',  linkRef:'',linkRefSp:'',videoLink:'',
        linkRefEn:'',
     
        photo:'',
        hidePublishButton: false
    });

    const { error, sizeError, success, formData, title,titleEn,titleSp,expdate,hidePublishButton ,photo,titleLat,linkRef,linkRefEn,linkRefSp, videoLink} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });

    }, [router]);


    const publishpocetna = e => {
        e.preventDefault();
        // console.log('ready to publishBlog');
       
 

        createpocetna(formData, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, error: null, success: `A new add titled "${data.title}" is created` });
                setBodyEn('');
                setBodySp('');
                setBodyLat('');
              
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

    const handleBodyEn = e => {
        // console.log(e);
        setBodyEn(e);
        formData.set('bodyEn', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('pocetna', JSON.stringify(e));
        }
    };

    const handleBodySp = e => {
        // console.log(e);
        setBodySp(e);
        formData.set('bodySp', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('pocetna', JSON.stringify(e));
        }
    };
    const handleBody = e => {
        // console.log(e);
        setBodyLat(e);
        formData.set('bodyLat', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('pocetna', JSON.stringify(e));
        }
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

    const createpocetnaForm = () => {
        return (
            <form onSubmit={publishpocetna}>

<div className="form-group">
                    <label className="">NAZIV PINA</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} placeholder=''  />
                </div>
                <div className="form-grup">
                <label className="btn btn-outline-light">
                                DODAJ FOTOGRAFIJU
                                <input onChange={handleChange('photo')} className='ml-2' required type="file" accept="image/*" />
                            </label>

                    
                    </div>
            
                <hr/>
                <div className="form-group">
                    <label className="">LATINICA</label>
                    <input type="text" className="form-control" value={titleLat} onChange={handleChange('titleLat')} placeholder='Naslov - Latinica'  />
                </div>
                <div className="form-group">
              
              <input type="text" className="form-control" value={linkRef} onChange={handleChange('linkRef')} placeholder='Link ka postu latinica'  />
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
                         
             minHeight: 100
                     }}
   
                     setContents={bodyLat}
                         placeholder="Write something amazing..."
                         onChange={handleBody}
                         
                   />
               </div>


<hr/>
                <div className="form-group"> 
                <label className="">CIRILICA</label>
                    <input type="text" className="form-control" value={titleSp} onChange={handleChange('titleSp')} placeholder='Naslov - Cirilica' />
                </div>        <div className="form-group"> 
              
                    <input type="text" className="form-control" value={linkRefSp} onChange={handleChange('linkRefSp')} placeholder='Link ka postu cirilica' />
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
                         
             minHeight: 100
                     }}
   
                     setContents={bodySp}
                         placeholder="Write something amazing..."
                         onChange={handleBodySp}
                         
                   />
               </div>
<hr/>
            <div className='form-grup'>
                <label className="">ENGLESKI</label>
            <input type="text" className="form-control" value={titleEn} onChange={handleChange('titleEn')} placeholder='Naslov - Engleski' />
            </div>
 
            <div className='form-grup'>
     
            <input type="text" className="form-control mt-3 mb-3" value={linkRefEn} onChange={handleChange('linkRefEn')} placeholder='Link ka postu engleski' />
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
                          
              minHeight: 100
                      }}
    
                      setContents={bodyEn}
                      placeholder="Please type here..."
                          onChange={handleBodyEn}
                          
                    />
                </div>
               
                <div>
                    <button type="submit" className="btn btn-primary pl-3 pr-3">
               DODAJ PIN 
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="">
            <div className="">
                <div className="">
                    {createpocetnaForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>

              
                    
            
           
            </div>
        </div>
    );
};

export default withRouter(Pocetna);