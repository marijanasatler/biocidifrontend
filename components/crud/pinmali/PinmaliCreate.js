import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { createpinmali } from '../../../actions/pinmali';

const SunEditor = dynamic(() => import('suneditor-react'), {ssr: false})
import 'suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/src/assets/css/suneditor.css'

const CreatePinmali = ({ router }) => {
    const pinmaliFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('pinmali')) {
            return JSON.parse(localStorage.getItem('pinmali'));
        } else {
            return false;
        }
    };



    const [bodySp, setBodySp] = useState(pinmaliFromLS());
    const [bodyEn, setBodyEn] = useState(pinmaliFromLS());
    const [bodyLat, setBodyLat] = useState(pinmaliFromLS());
    
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',      
        titleEn:'',
        titleSp:'',
        linkRef:'',linkRefSp:'',titleLat :'',
        linkRefEn:'',
        photo:'',
        hidePublishButton: false
    });

    const { error, sizeError, success, formData, title, hidePublishButton ,photo,titleEn,titleSp,linkRef,linkRefEn,linkRefSp,titleLat} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
      

    }, [router]);

    
    
    const publishpinmali = e => {
        e.preventDefault();
        // console.log('ready to publishpinmali');
       
 

        createpinmali(formData, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, error: null, success: `Novi mali pin  "${data.title}" je dodat` });
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
            localStorage.setItem('pinmali', JSON.stringify(e));
        }
    };
    const handleBodyEn = e => {
        // console.log(e);
        setBodyEn(e);
        formData.set('bodyEn', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('pinmali', JSON.stringify(e));
        }
    };

    const handleBodySp = e => {
        // console.log(e);
        setBodySp(e);
        formData.set('bodySp', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('pinmali', JSON.stringify(e));
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

    const createpinmaliForm = () => {
        return (
            <form onSubmit={publishpinmali}>
                <div className="form-group">
                    <label className="">NAZIV MALOG PINA</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} placeholder='Naziv-Malog-Pina' />
                </div>

          
                <hr/>
                <div className="form-group">
                    <label className="">LATINICA</label>
                    <input type="text" className="form-control" value={titleLat} onChange={handleChange('titleLat')} placeholder='Naslov-Latinica' />
                </div>
                <div className="form-group">
              
                    <input type="" className="form-control" value={linkRef} onChange={handleChange('linkRef')} placeholder='Link ka postu latinica'  />
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
<hr/>
                <div className="form-group"> 
                <label className="">CIRILICA</label>
                    <input type="text" className="form-control" value={titleSp} onChange={handleChange('titleSp')} placeholder='Naslov - Cirilica' />
                </div>
                <div className="form-group">
               
                    <input type="text" className="form-control" value={linkRefSp} placeholder='Link ka postu cirilica' onChange={handleChange('linkRefSp')} />
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
            <div className='form-grup'>
                <label className="">ENGLESKI</label>
            <input type="text" className="form-control" value={titleEn} onChange={handleChange('titleEn')} placeholder='Naslov - Engleski' />
            </div>
     
            <div className="form-group pt-3">
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
                      placeholder="Please type here..."
                          onChange={handleBodyEn}
                          
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary ">
                        DODAJ MALI PIN
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="">
            <div className="row">
                <div className="col-md-12">
                    {createpinmaliForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>

           
           
                  
                
            </div>
        </div>
    );
};

export default withRouter(CreatePinmali);