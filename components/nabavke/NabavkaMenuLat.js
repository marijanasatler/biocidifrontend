
import { useState,useEffect } from 'react';
import { listSearch } from '../../actions/nabavke';
import {  getCategoriesnabavke } from '../../actions/categorynabavke'
import { getTagnabavke } from '../../actions/tagnabavke';
import Link from 'next/link';
import styles from '../../styles/nabavke.module.css'

const NabavkeMenu = ({  router}) => {
    const [categoriesnabavke, setCategoriesnabavke] = useState([]);
    const [tagnabavkes,setTagnabavkes]=useState([]);
    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    });

    const { search, results, searched, message } = values;

    const searchSubmit = e => {
        e.preventDefault();
        listSearch({ search }).then(data => {
            setValues({ ...values, results: data, searched: true, message:  ` pronađeno nabavki ${data.length}` });
        });
    };

    const handleChange = e => {
        // console.log(e.target.value);
        setValues({ ...values, search: e.target.value, searched: false, results: [],message:'' });
    };

    const searchedNabavka = (results = []) => {
        return (
            <div className=" ">
          

                {results.map((nabavke, i) => {
                    return (
                        <div key={i} className='pb-1 mr-2'  >
                        
                        <a  style={{color:'#84ceeb'}} href={`${API}/nabavke/dokument/${nabavke.slug}`}
                        
                        className=" p-2 small"
                        target='_blank'
                        >  <i class="far fa-file-alt"></i> {nabavke.titleLat} 
                         </a>
                   
                </div>
                    );
                })}   

            </div>
        );
    };

    const searchForm = () => (
        <form className='p-0 m-0' onSubmit={searchSubmit}>
             
            <div className="row ">
                <div className="col-md-6 ">
                    <input type="search" className="form-control" placeholder="PRETRAGA NABAVKI"  style={{outline:'none'}} onChange={handleChange} />
                </div>

                <div className="col-md-4 ">
                    <button className="btn btn-block text-light " style={{color:'' ,background:'#84ceeb'}} type="submit">
 TRAŽI
                    </button>
                </div>
            </div>
        </form>
    );

    useEffect(() => {
        initCategories();
        initTags();
    }, [router]);


    const initCategories = () => {
        getCategoriesnabavke().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategoriesnabavke(data);
            }
        });
    };


    const initTags = () => {
        getTagnabavke().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setTagnabavkes(data);
            }
        });
    };

   
    const showAllCategories = () => {
        return categoriesnabavke.map((c, i) => (
            <ul style={{listStyle:'none',textAlign:'left'}} className='p-0'  key={i}>
                <li className="" style={{color:'#6a8273'}}><a  className='text-muted'  href={`/lat/nabavke/${c.slug}`} >{c.name}</a></li>
            </ul>
        ));
    };
  
    const showAllTags = () => {
        return tagnabavkes.map((t, i) => (
            <ul style={{listStyle:'none',textAlign:'left'}}  className='p-0' key={i}>
                <li className="" style={{color:'#6a8273'}}><a className='text-muted'  href={`/lat/nabavke/status/${t.slug}`}>{t.name} </a></li>
            </ul>
        ));
    };


   
    return (
        <>
       <div className=" p-0 m-0 ">
       <div className="p-0 m-0">
               
               <div className="m-0 p-0 ">{searchForm()}</div>
               {message && <p  style={{fontSize:'small'}} className="  text-muted  font-italic">{message}</p>}
   
               {searched && <div style={{ maxHeight:'300px',overflowY:'scroll'}}>{searchedNabavka(results)}</div>}
     
           </div>
   
<div className=''>



      <div className={styles.menuComponent}>
          
             <ul className='p-0' style={{listStyle:'none',textAlign:'left'}}  >
                 <li> <h5 style={{color:'#5ab9e4'}} >vrsta nabavke</h5>  </li>
                <li className="" style={{color:'#6a8273'}}><a href='/lat/nabavke'className='text-muted'> sve nabavke</a></li>
               </ul>
              {showAllCategories()}</div>
      
<div className={styles.menuComponent}>
   
    <ul style={{listStyle:'none',textAlign:'left'}} className='p-0'  >
           <li> <h5 style={{color:'#5ab9e4'}}>status nabavke</h5> </li>
         </ul>
            {showAllTags()} </div>

          

  </div>
                           
                        
  
                           
</div>


  </>
    );
};





export default NabavkeMenu;