import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { getCategoriesPreparata } from '../../../actions/categorypreparata';
import { singlePreparati,updatePreparati} from '../../../actions/preparati';
import { API } from '../../../config'; 



const SunEditor = dynamic(() => import('suneditor-react'), {ssr: false})
import 'suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/src/assets/css/suneditor.css'


const PreparatiUpdate = ({ router }) => {

    const [categories, setCategories] = useState([]);


    const [checked, setChecked] = useState([]); // categories


    const [values, setValues] = useState({
        title: '',   titleEn:'',
        titleSp :'',
        error: '',
        success: '',
        formData: '',
      //  title: '',
        body: ''
    });

    const { error, success, formData, title ,   
        titleEn,photo,
        titleSp ,} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initPreparati();
        initCategories();
   
    }, [router]);

    const initPreparati = () => {
        if (router.query.slug) {
           singlePreparati(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, title: data.title,
                        titleEn:data.titleEn,
                        photo:data.photo,
                        titleSp :data.titleSp, });
                 
                    setCategoriesArray(data.categoriespreparati);
              
                }
            });
        }
    };

    const setCategoriesArray = preparatiCategories => {
        let ca = [];
        preparatiCategories.map((c, i) => {
            ca.push(c._id);
        });
        setChecked(ca);
    };


    const initCategories = () => {
        getCategoriesPreparata().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
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
        formData.set('categoriespreparati', all);
    };

  

    const findOutCategory = c => {
        const result = checked.indexOf(c);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };



    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (
                <li key={i} className="list-unstyled" style={{textTransform:'uppercase'}}  >
                    <input
                        onChange={handleToggle(c._id)}
                        checked={findOutCategory(c._id)}
                        type="checkbox"
                        className="mr-2"
                    />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        );
    };

   
    const handleChange =( name )=> (e) => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
       formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };


     
      const editPreparati = (e) => {
        e.preventDefault();
       // let formData = new FormData();
        formData.append("title", values.title);

       // formData.append("categories", values.categories);
        updatePreparati(formData, token, router.query.slug).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              ...values,
              title: "",photo:"",
              success: `Blog title ${data.title} is successfully updates`,
            });
            if (isAuth() && isAuth().role === 1) {
              Router.replace(`/admin/crud/preparati`);
            } else if (isAuth() && isAuth().role === 0) {
              Router.replace(`/user/crud/preparati`);
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

    const updatePreparatiForm = () => {
        return (
            <form onSubmit={editPreparati}>
                <div className="form-group">
                    <label className="">NAZIV PREPARATA</label>
                    <input type="text" className="form-control col-md-8" value={title} onChange={handleChange('title')} />
                </div>
                <div>
                    <label className="btn btn-outline-light">
                               DODAJ NOVI DOKUMENT
                                <input className='ml-2'  onChange={handleChange('photo')} type="file" accept="image/*, .pdf" />
                            </label>

                    </div>
      <div className='mb-2 mt-2'>{  title && <a className='pt-2 pb-2  text-white' style={{textTransform:'uppercase',fontSize:'large',outline:'none',textDecoration:'none'}}  href={`${API}/preparati/dokument/${router.query.slug}`} target='_blank'> pogledaj trenutni  dokument  <i class="far fa-file-alt"></i></a>}</div>

                <div>
                    <button type="submit" className="btn btn-primary mt-2">
                    IZMENI PREPARAT
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="">
            <div className="row">
                <div className="col-md-8">
                    {updatePreparatiForm()}

                    <div className="pt-3">
                        {showSuccess()}
                        {showError()}
                    </div>

                </div>

                <div className="col-md-4">
                
             
                    <div>
                        <h5>KATEGORIJA PREPARATA</h5>
                        

                        <ul style={{ maxHeight: '200px', overflowY: 'scroll',padding:'0' }}>{showCategories()}</ul>
                    </div>
                
                </div>
            </div>
        </div>
    );
};

export default withRouter(PreparatiUpdate);