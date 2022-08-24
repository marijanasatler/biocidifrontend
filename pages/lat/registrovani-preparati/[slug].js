import React,{useEffect,useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/layout/LayoutLat';
import {singleCategorypreparati,getCategoriesPreparata } from '../../../actions/categorypreparata';
import { API, DOMAIN, APP_NAME } from '../../../config';
import styles from '../../../styles/ostalo.module.css';
import ScrollToTop from '../../../components/ScroolToTop';

const Categorypreparati = ({ categorypreparati, preparatis, query }) => {

    const [categoriespreparati, setcategoriesPreparati] = useState([]);
    useEffect(() => {
        loadcategoriespreparati();
    }, []);

    const loadcategoriespreparati = () => {
        getCategoriesPreparata().then(data => {
         // if(data === undefined){
        //    null
         // }
           if (data.error) {
               console.log(data.error); }
             else {
                setcategoriesPreparati(data);
            }
        });
    };

    const showAllPreparati = () => {
        return preparatis.map((p, i) => {
            return (
                <a href={`${API}/preparati/dokument/${p.slug}`}  style={{textDecoration:'none'}}  className='text-center text-muted' > 
                <div key={i} className={styles.preparati} style={{background:'rgb(193, 200, 228,.3)'}}>
                      <b style={{marginRight:'1.5%',fontSize:'larger',color:''}}>  <i class="far fa-file-alt"></i></b>{p.title} 
                </div>
                       </a>
            );
        });
    };
   
    const showAllCategories = () => {
        return categoriespreparati.map((c, i) => (
            <Link href={`/lat/registrovani-preparati/${c.slug}`} key={i} >
                <a className="btn mr-1 ml-1 mt-2 mb-2 p-0 pl-2 pr-2  " style={{color:'#f9f7f2',backgroundColor:'rgb(193, 200, 228)',textTransform:'uppercase',outline:'none'}}><b>{c.name}</b></a>
            </Link>
        ));
    };

    return (
<div>
   <Layout>
       <main className='' style={{minHeight:'',margin:'1% 0'}}>
                    <div className="container-fluid  ">
                        <header  style={{margin:'0 4%'}} >
         <div className='pb-4'>    <Link href={`/lat/registrovani-preparati`} >
                <a className="btn mr-1 ml-1 mt-2 mb-2 p-0 pl-2 pr-2" style={{backgroundColor:'white',color:'rgb(193, 200, 228)',border:'solid #c1c7e4 2px',textTransform:'uppercase'}}><b>svi preparati</b></a>
            </Link> {showAllCategories()}</div>
                            <div>
                      <h2 className='text-muted'  style={{color:'#3aafa9',color:'#3aafa9',textTransform:'uppercase'}}  >registrovani preparati<br/>{categorypreparati.name}</h2>
                        </div>
               <hr className='' style={{color:'#c1c7e4'}}/>
         
             {preparatis.length === 0 ? <p    className=' pt-4 pb-4' style={{textTransform:'uppercase',fontSize:'',color:'rgb(193, 200, 228)'}}>Trenutno nema registrovanih preparata u ovoj kategoriji</p> :

   <p className=' pt-2 ' style={{textTransform:'uppercase',fontSize:'small',textAlign:'',color:'rgb(193, 200, 228)'}} >ukupno registrovanih preparata:{" "}
    <b style={{fontSize:'medium'}}>
      {preparatis.length} </b> </p>}
   </header>
  </div>
        <div className="container-fluid " style={{minHeight:'35vh'}}>
         <div  className={styles.preparatiGrid}>
               {showAllPreparati()}
         </div>
         </div>
           </main><ScrollToTop/>
            </Layout>
            </div>
    );
};




Categorypreparati.getInitialProps = ({ query }) => {
    return singleCategorypreparati(query.slug).then(data => {
       if (data.error) {
           console.log(data.error); } 
          //  if (data === undefined){
             //   null
           // }
            else {
            return { categorypreparati: data.categorypreparati, preparatis: data.preparatis, query };
        }
    });
};

export default Categorypreparati;