import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { createDelatnost } from '../../../actions/delatnosti';

const SunEditor = dynamic(() => import('suneditor-react'), {ssr: false})
//import '../../node_modules/suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/src/assets/css/suneditor.css'

const CreateDelatnosti = ({ router }) => {
    const delatnostiFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('delatnosti')) {
            return JSON.parse(localStorage.getItem('delatnosti'));
        } else {
            return false;
        }
    };

    const [bodySp, setBodySp] = useState(delatnostiFromLS());
    const [bodyEn, setBodyEn] = useState(delatnostiFromLS());
    const [bodyLat, setBodyLat] = useState(delatnostiFromLS());
    
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
    }, [router]);



    const publishDelatnosti = e => {
        e.preventDefault();
        // console.log('ready to publishDelatnosti');
       
        createDelatnost(formData, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, error: null, success: `A new delatnosti titled "${data.title}" is created` });
                setBodyLat('');
                setBodyEn('');
                setBodySp('');
           
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

    const handleBody = e => {
        // console.log(e);
        setBodyLat(e);
        formData.set('bodyLat', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('delatnosti', JSON.stringify(e));
        }
    };
    const handleBodyEn = e => {
        // console.log(e);
        setBodyEn(e);
        formData.set('bodyEn', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('delatnosti', JSON.stringify(e));
        }
    };

    const handleBodySp = e => {
        // console.log(e);
        setBodySp(e);
        formData.set('bodySp', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('delatnosti', JSON.stringify(e));
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

    const createDelatnostForm = () => {
        return (
            <form  style={{fontSize:'large'}} onSubmit={publishDelatnosti}>
         <div className='mb-2'>
               <label className="btn btn-outline-light">
                               DODAJ FOTOGRAFIJU
                                <input className='ml-2' onChange={handleChange('photo')} type="file" accept="image/*" />
                            </label>

               </div>


                <div className="form-group">
                    <label className="">LATINICA</label>
                    <input type="text"  placeholder='Naziv-Latinica' className="form-control" value={title} onChange={handleChange('title')} />
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
<hr/>
                <div className="form-group"> 
                <label className="">CIRILICA</label>
                    <input type="text" className="form-control" value={titleSp} onChange={handleChange('titleSp')} placeholder='Naziv - Cirilica' />
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
            <div className='form-grup mb-3'>
                <label className="">ENGLESKI</label>
            <input type="text" className="form-control" value={titleEn} onChange={handleChange('titleEn')} placeholder='Naziv - Engleski' />
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
                      placeholder="Please type here..."
                          onChange={handleBodyEn}
                          
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">
                        DODAJ DELATNOST
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div >
            <div className="row">
                <div className="col-md-12 p-2">
                    {createDelatnostForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>

              
      
                   
               
            </div>
        </div>
    );
};

export default withRouter(CreateDelatnosti);