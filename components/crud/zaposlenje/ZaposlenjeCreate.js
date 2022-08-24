import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';

import { createZaposlenje } from '../../../actions/zaposlenje';


const SunEditor = dynamic(() => import('suneditor-react'), {ssr: false})
import 'suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/src/assets/css/suneditor.css' 


const Zaposlenje = ({ router }) => {
    const zaposlenjeFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('zaposlenje')) {
            return JSON.parse(localStorage.getItem('zaposlenje'));
        } else {
            return false;
        }
    };


    const [bodySp, setBodySp] = useState(zaposlenjeFromLS());
    const [bodyEn, setBodyEn] = useState(zaposlenjeFromLS());
    const [bodyLat, setBodyLat] = useState(zaposlenjeFromLS());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',  
       titleEn:'',
        titleSp:'',
        photo:'',   pocetak:'',
        kraj:'',
        sifra:'',
        hidePublishButton: false
    });

    const { error, sizeError, success, formData, title,titleEn,titleSp,expdate,hidePublishButton ,photo,pocetak,kraj,sifra} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });

    }, [router]);


    const publishzaposlenje = e => {
        e.preventDefault();
        // console.log('ready to publishBlog');
       
 

        createZaposlenje(formData, token).then(data => {
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
            localStorage.setItem('zaposlenje', JSON.stringify(e));
        }
    };

    const handleBodySp = e => {
        // console.log(e);
        setBodySp(e);
        formData.set('bodySp', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('zaposlenje', JSON.stringify(e));
        }
    };
    const handleBody = e => {
        // console.log(e);
        setBodyLat(e);
        formData.set('bodyLat', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('zaposlenje', JSON.stringify(e));
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

    const createzaposlenjeForm = () => {
        return (
            <form onSubmit={publishzaposlenje}>
                <div className="form-group">
                    <label className="">LATINICA</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} placeholder='Naslov - Latinica'  />
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


<hr/>
                <div className="form-group"> 
                <label className="">CIRILICA</label>
                    <input type="text" className="form-control" value={titleSp} onChange={handleChange('titleSp')} placeholder='Naslov - Cirilica' />
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
            <div className='form-grup mb-3'>
                <label className="">ENGLESKI</label>
            <input type="text" className="form-control" value={titleEn} onChange={handleChange('titleEn')} placeholder='Naslov - Engleski' />
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
                      placeholder="Please type here..."
                          onChange={handleBodyEn}
                          
                    />
                </div>
               
                <div>
                    <button type="submit" className="btn btn-primary">
                   OBJAVI OGLAS
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div >
            <div className="row">
                <div className="col-md-8">
                    {createzaposlenjeForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>

                <div className="col-md-4">
                <label className=" mt-4 btn btn-outline-light">
                 DODAJ DOKUMENT
                                <input onChange={handleChange('photo')} className='ml-2' type="file" accept="image/*, .pdf" />
                            </label>

                    
                    <div>
                    <div className="col-md-10 form-group">
                    <label className="">DATUM OBJAVE</label>
                    <input type="date" className="form-control" value={pocetak} onChange={handleChange('pocetak')} />
                </div>
                <div className=" col-md-10 form-group pb-4">
                    <label className="">ROK ZA PRIJAVE</label>
                    <input type="datetime-local" className="form-control" value={kraj} onChange={handleChange('kraj')} />
                </div>
                <div className=" col-md-10 orm-group">
                   
                   <input type="text" className="form-control" value={sifra} onChange={handleChange('sifra')}  placeholder='SIFRA OGLASA'/>
               </div>

                    </div>
                   
                </div>
            </div>
        </div>
    );
};

export default withRouter(Zaposlenje);