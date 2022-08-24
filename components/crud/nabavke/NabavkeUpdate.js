import { useState, useEffect } from 'react';
import Router from 'next/router';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { getCategoriesnabavke } from '../../../actions/categorynabavke';
import { getTagnabavke } from '../../../actions/tagnabavke';
import { singleNabavka, updateNabavka } from '../../../actions/nabavke';
import { API } from '../../../config'; 

const BlogUpdate = ({ router }) => {


    const [categoriesnabavke, setCategoriesnabavke] = useState([]);
    const [tagnabavkes, setTagnabavkes] = useState([]);


    const [checked, setChecked] = useState([]); // categoriesnabavke
    const [checkedTagnabavke, setCheckedTagnabavke] = useState([]); // tagnabavkes

    const [values, setValues] = useState({
        title: '',titleEn:'',titleSp:'',pocetak: '',
        kraj:'',
        sifra:'',
        error: '',
        success: '',
        formData: '',
      //  title: '',
       photo:'',
      body:'',
    });

    const { error, success, formData, title ,pocetak,kraj,sifra,titleEn,titleSp,body} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initNabavke();
        initCategoriesnabavke();
        initTagnabavkes();
   
   
    }, [router]);

    const initNabavke = () => {
        if (router.query.slug) {
            singleNabavka(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, title: data.title,pocetak:data.pocetak,kraj:data.kraj,sifra:data.sifra,titleEn:data.titleEn,titleSp:data.titleSp });
                  
                    setCategoriesnabavkeArray(data.categoriesnabavke);
                    setTagnabavkesArray(data.tagnabavkes);
               
                }
            });
        }
    };

    const setCategoriesnabavkeArray = nabavkeCategoriesnabavke => {
        let ca = [];
        nabavkeCategoriesnabavke.map((c, i) => {
            ca.push(c._id);
        });
        setChecked(ca);
    };

    const setTagnabavkesArray = nabavkeTagnabavkes => {
        let ta = [];
        nabavkeTagnabavkes.map((t, i) => {
            ta.push(t._id);
        });
        setCheckedTagnabavke(ta);
    };


  

    const initCategoriesnabavke = () => {
        getCategoriesnabavke().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategoriesnabavke(data);
            }
        });
    };

    const initTagnabavkes = () => {
        getTagnabavke().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setTagnabavkes(data);
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
        formData.set('categoriesnabavke', all);
    };

    const handleTagnabavkesToggle = t => () => {
        
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedTagnabavke = checkedTagnabavke.indexOf(t);
        const all = [...checkedTagnabavke];

        if (clickedTagnabavke === -1) {
            all.push(t);
        } else {
            all.splice(clickedTagnabavke, 1);
        }
        console.log(all);
        setCheckedTagnabavke(all);
        formData.set('tagnabavkes', all);
    };



    const findOutCategory = c => {
        const result = checked.indexOf(c);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const findOutTagnabavke = t => {
        const result = checkedTagnabavke.indexOf(t);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };





    const showCategoriesnabavke = () => {
        return (
            categoriesnabavke &&
            categoriesnabavke.map((c, i) => (
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

    const showTagnabavkes = () => {
        return (
            tagnabavkes &&
            tagnabavkes.map((t, i) => (
                <li key={i} className="list-unstyled" style={{textTransform:'uppercase'}} >
                    <input
                        onChange={handleTagnabavkesToggle(t._id)}
                        checked={findOutTagnabavke(t._id)}
                        type="checkbox"
                        className="mr-2"
                    />
                    <label className="form-check-label">{t.name}</label>
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

   
      const editNabavka = (e) => {
        e.preventDefault();
       // let formData = new FormData();
        formData.append("title", values.title);        
        formData.append("titleEn", values.titleEn);
        formData.append("titleSp", values.titleSp);
        formData.append("pocetak", values.pocetak);
        formData.append("kraj", values.kraj);
        formData.append("sifra", values.sifra);
       // formData.append("categoriesnabavke", values.categoriesnabavke);
        updateNabavka(formData, token, router.query.slug).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              ...values,
              title: "",pocetak:"",
              success: `Blog title ${data.title} is successfully updates`,
            });
            if (isAuth() && isAuth().role === 1) {
              Router.replace(`/admin/crud/nabavka/${router.query.slug}`);
            } else if (isAuth() && isAuth().role === 0) {
              Router.replace(`/user/crud/nabavka/${router.query.slug}`);
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

    const updateNabavkaForm = () => {
        return (
            <form onSubmit={editNabavka}>
                <div className="form-group">
                    <label className="">NASLOV NABAVKE</label>
                    <input placeholder='latinica' type="text" className="form-control" value={title} onChange={handleChange('title')} />
                </div>

                <div className="form-group">
                 
                    <input placeholder='cirilica' type="text" className="form-control" value={titleSp} onChange={handleChange('titleSp')} />
                </div>

                <div className="form-group">
                 
                    <input type="text" placeholder='Engleski' className="form-control" value={titleEn} onChange={handleChange('titleEn')} />
                </div><hr/>  
                     <label className="">ŠIFRA NABAVKE</label>
                 <input type="text" className="form-control mb-3" value={sifra} onChange={handleChange('sifra')} />

                 { title ? (
                        <a href={`${API}/nabavke/dokument/${router.query.slug}`}  className='' style={{color:'white',fontSize:'larger'}} >
                    POGLEDAJ DOKUMENT  <i class="far fa-file-alt"></i></a>
                    ) :  <p>NEMA DOKUMENTA</p>}
                
                <div>   
                        <label className="btn mb-3 mt-3 btn-outline-light">
                               DODAJ NOVI DOKUMENT
                                <input className='ml-2'  onChange={handleChange('photo')} type="file" accept="image/*, application/pdf," />
                            </label>
                        </div>
                       
                <div>
                    <button type="submit" className="btn btn-primary">
                     IZMENI NABAVKU 
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="mt-2">
            <div className="row">
                <div className="col-md-8">
                    {updateNabavkaForm()}

                    <div className="pt-3">
                        {showSuccess()}
                        {showError()}
                    </div>

                </div>

                <div className="col-md-4">
                    <div>
                        <div className="form-group pb-2">
                     
                        <label className="">POCETAK NABAVKE</label>
                            <input type="date" className="form-control col-md-8" value={pocetak} onChange={handleChange('pocetak')} />
                        </div>

                 
                    </div>
                    <div className="form-group   pb-2">
                    <label className="">KRAJ NABAVKE</label>
                            <input type="datetime-local" className="form-control col-md-8 " value={kraj} onChange={handleChange('kraj')} />
                          
                          
                          
                        </div>
                    <div>
                        <hr />
                        <h5>KATEGORIJA NABAVKE</h5>

                        <ul style={{ maxHeight: '200px', overflowY: 'scroll' ,margin:'0',padding:'0' }}>{showCategoriesnabavke()}</ul>
                    </div>
                    <div className=''>
                        <hr />
                        <h5  className=''>STATUS NABAVKE</h5>
                        <ul style={{ maxHeight: '200px', overflowY: 'scroll' ,margin:'0',padding:'0' }}>{showTagnabavkes()}</ul>
                    </div>

            
                </div>
            </div>
        </div>
    );
};

export default withRouter(BlogUpdate);