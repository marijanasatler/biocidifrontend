import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { createLaboratori } from '../../../actions/laboratori';


const SunEditor = dynamic(() => import('suneditor-react'), {ssr: false})
import 'suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/src/assets/css/suneditor.css' 


const Laboratori = ({ router }) => {
    const laboratoriFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('laboratori')) {
            return JSON.parse(localStorage.getItem('laboratori'));
        } else {
            return false;
        }
    };


    const [bodySp, setBodySp] = useState(laboratoriFromLS());
    const [bodyEn, setBodyEn] = useState(laboratoriFromLS());
    const [bodyLat, setBodyLat] = useState(laboratoriFromLS());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',  
       titleEn:'',
        titleSp:'',
        expdate: '', 
        photo:'',
        hidePublishButton: false
    });

    const { error, sizeError, success, formData, title,titleEn,titleSp,expdate,hidePublishButton ,photo} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });

    }, [router]);


    const publishLaboratori = e => {
        e.preventDefault();
        // console.log('ready to publishBlog');
       
 

        createLaboratori(formData, token).then(data => {
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
            localStorage.setItem('laboratori', JSON.stringify(e));
        }
    };

    const handleBodySp = e => {
        // console.log(e);
        setBodySp(e);
        formData.set('bodySp', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('laboratori', JSON.stringify(e));
        }
    };
    const handleBody = e => {
        // console.log(e);
        setBodyLat(e);
        formData.set('bodyLat', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('laboratori', JSON.stringify(e));
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

    const createLaboratoriForm = () => {
        return (
            <form  className='text-white'   style={{fontSize:'large'}} onSubmit={publishLaboratori}>

<div className=" form-grup">
                <label className="btn btn-outline-light">
                             Dodaj fotografiju
                                <input   className='ml-2' onChange={handleChange('photo')} type="file" accept="image/*" />
                            </label>

                    
                    </div>

                <div className="form-group">
                    <label className="" >LATINICA</label>
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
                         
             minHeight: 400
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
 

                <div className=" mt-3 form-group">
                   
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
                     DODAJ LABORATORIJU
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div >
            <div className="">
                <div className="col-md-12 p-4">
                    {createLaboratoriForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>

           
            </div>
        </div>
    );
};

export default withRouter(Laboratori);