import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { getCategories } from '../../../actions/category';;
import { createBlog } from '../../../actions/blog';
import styles from '../../../styles/admin.module.css'

const SunEditor = dynamic(() => import('suneditor-react'), {ssr: false})
import 'suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/src/assets/css/suneditor.css'

const CreateBlog = ({ router }) => {
    const blogFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'));
        } else {
            return false;
        }
    };

    const [categories, setCategories] = useState([]);


    const [checked, setChecked] = useState([]); // categories
// tags

    const [bodySp, setBodySp] = useState(blogFromLS());
    const [bodyEn, setBodyEn] = useState(blogFromLS());
    const [bodyLat, setBodyLat] = useState(blogFromLS());
    
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
        initCategories();
     
    }, [router]);

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };


    const publishBlog = e => {
        e.preventDefault();
        // console.log('ready to publishBlog');
       
        createBlog(formData, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, error: null, success: `A new blog titled "${data.title}" is created` });
                setBodyLat('');
                setBodyEn('');
                setBodySp('');
                setCategories([]);
           
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
            localStorage.setItem('blog', JSON.stringify(e));
        }
    };
    const handleBodyEn = e => {
        // console.log(e);
        setBodyEn(e);
        formData.set('bodyEn', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e));
        }
    };

    const handleBodySp = e => {
        // console.log(e);
        setBodySp(e);
        formData.set('bodySp', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e));
        }
    };

    const handleToggle = c => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }
        console.log(all);
        setChecked(all);
        formData.set('categories', all);
    };

    

    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (
                <li key={i} className="list-unstyled" style={{textTransform:'uppercase'}} >
                    <input onChange={handleToggle(c._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label" >{c.name}</label>
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

    const createBlogForm = () => {
        return (
            <form className='text-whites' style={{fontSize:'large',textTransform:'uppercase'}} onSubmit={publishBlog}>
                <div className="form-group">
                    <label className="">Latinica</label>
                    <input type="text" className="form-control" placeholder='Naslov-Latinica' value={title} onChange={handleChange('title')} />
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
                    <button type="submit" className="btn btn-primary col-md-4">
                      DODAJ NOVOST
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className={styles.adminContainer}>
            <div className='row'>
                <div className="col-md-8">
                    {createBlogForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>

                <div className="col-md-4 pt-4">
               <div>
               <label className="btn btn-outline-light">
                                DODAJ FOTOGRAFIJU
                                <input className='ml-2' onChange={handleChange('photo')} type="file" accept="image/*" />
                            </label>

               </div>
                    <div>
                      
                       
                        
                        <h5 className='mt-4'>KATEGORIJE NOVOSTI</h5>
                        <hr />

                        <ul style={{ maxHeight: '220px', overflowY: 'scroll' }}>{showCategories()}</ul>
                    </div>
             
                </div>
            </div>
        </div>
    );
};

export default withRouter(CreateBlog);