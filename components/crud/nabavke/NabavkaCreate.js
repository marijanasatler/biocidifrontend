import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { getCategoriesnabavke } from '../../../actions/categorynabavke';
import { getTagnabavke } from '../../../actions/tagnabavke';
import { createNabavka } from '../../../actions/nabavke';


const CreateNabavka = ({ router }) => {
    const nabavkeFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('nabavke')) {
            return JSON.parse(localStorage.getItem('nabavke'));
        } else {
            return false;
        }
    };

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags


    
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',      
        titleEn:'',
        titleSp:'',
        photo:'',
        pocetak:'',
        kraj:'',
        sifra:'',
        hidePublishButton: false,
      
    });

    const { error, sizeError, success, formData, title, hidePublishButton ,photo,titleEn,titleSp,pocetak,kraj,sifra} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initCategories();
        initTags();
    }, [router]);

    const initCategories = () => {
        getCategoriesnabavke().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    const initTags = () => {
        getTagnabavke().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setTags(data);
            }
        });
    };



    const publishnabavke = e => {
        e.preventDefault();
        // console.log('ready to publishnabavke');
       
 

        createNabavka(formData, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, error: null, success: `Nabavka "${data.title}" je uspešno dodata`,name:''});
                setCategories([]);
                setTags([]);
                setOstalo([]);
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
        formData.set('categoriesnabavke', all);
    };

    const handleTagsToggle = t => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedTag = checked.indexOf(t);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            all.push(t);
        } else {
            all.splice(clickedTag, 1);
        }
        console.log(all);
        setCheckedTag(all);
        formData.set('tagnabavkes', all);
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

    const showTags = () => {
        return (
            tags &&
            tags.map((t, i) => (
                <li key={i} className="list-unstyled" style={{textTransform:'uppercase'}} >
                    <input onChange={handleTagsToggle(t._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
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

    const createNabavkaForm = () => {
        return (
            <form style={{fontSize:''}} onSubmit={publishnabavke}>
                    <label className="">NASLOV NABAVKE</label>
                <div className="form-group">
                    <input type="text" placeholder='latinica' className="form-control" value={title} onChange={handleChange('title')} />
                </div>

             

                <div className="form-group"> 
           
                    <input type="text" className="form-control" value={titleSp} onChange={handleChange('titleSp')} placeholder='cirilica' />
                </div>
      

            <div className='form-grup'>
     
            <input type="text" className="form-control" value={titleEn} onChange={handleChange('titleEn')} placeholder='engleski' />
            </div>
 <hr/>
 <div className="form-group">
                   
                    <input type="text" className="form-control" value={sifra} onChange={handleChange('sifra')}  placeholder='šifra nabavke'/>
                </div>
                <div>
               <label className="btn btn-outline-light">
                              DODAJ DOKUMENT
                                <input onChange={handleChange('photo')} type="file" className='pl-2' accept="image/*, .pdf" />
                            </label>
               </div>


               
                <div className='pt-4'>
                    <button type="submit" className="btn btn-primary ">
                     OBJAVI NABAVKU
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div>
            <div className="row ">
                <div className="col-md-8">
         

                    {createNabavkaForm()}
                    
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>

                <div className="col-md-4">

                <div className="form-group">
                    <label className="">POCETAK NABAVKE</label>
                    <input type="date" className="form-control col-md-8" value={pocetak} onChange={handleChange('pocetak')} />
                </div>
                <div className="form-group pb-4">
                    <label className="">KRAJ NABAVKE</label>
                    <input type="datetime-local" className="form-control col-md-8" value={kraj} onChange={handleChange('kraj')} />
                </div>
<hr/>
        
        
                    <div>
                      
                       
                        
                     <label style={{textDecoration:''}}>KATEGORIJA NABAVKE</label>
              

                        <ul style={{ maxHeight: '220px', overflowY: 'scroll',listStyle:'none',margin:'0',padding:'0' }}>{showCategories()}</ul>
                    </div>
                    <hr/>
                    <div>
                
                    <label style={{textDecoration:''}}>STATUS NABAVKE</label>
                    
                        <ul style={{ maxHeight: '220px', overflowY: 'scroll',margin:'0',padding:'0'  }}>{showTags()}</ul>
                    </div>
                
                   
                </div>
            </div>
        </div>
    );
};

export default withRouter(CreateNabavka);