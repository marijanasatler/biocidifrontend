import React,{useEffect,useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import {singleCategorypreparati,getCategoriesPreparata } from '../../actions/categorypreparata';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import styles from '../../styles/ostalo.module.css'
import ScrollToTop from '../../components/ScroolToTop';

const Categorypreparati = ({ categorypreparati, preparatis, query }) => {

    const head = () => (
        <Head>
        <title>Registrovani preparati | {APP_NAME}</title>
        <meta
            name="description"
            content="Svi registrovani preparati, bezbedonosno tehnički list, interni,eksterni, rešenja"/>
        <link rel="canonical" href={`${DOMAIN}/registrovani-preparati/${query.slug}`} />
        <meta property="og:title" content={`Registrovani preparati |  ${APP_NAME}`} />
        <meta property="og:description" content="Svi registrovani preparati, bezbedonosno tehnički list, interni,eksterni, rešenja"/>
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}/registrovani-preparati/${query.slug}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:type" content="image/png" />
    </Head>
    );


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
            <Link href={`/registrovani-preparati/${c.slug}`} key={i}>
                <a className="btn mr-1 ml-1 mt-2 mb-2 p-0 pl-2 pr-2" style={{color:'#f9f7f2',backgroundColor:'rgb(193, 200, 228)',textTransform:'uppercase'}}><b>{c.nameSp}</b></a>
            </Link>
        ));
    };

    return (
<div>
   <Layout>
       <main className='' style={{minHeight:'',margin:'1% 0'}}>
                    <div className="container-fluid  ">
                        <header  style={{margin:'0 4%'}} >
         <div className='pb-4'>    <Link href={`/registrovani-preparati`} >
                <a className="btn mr-1 ml-1 mt-2 mb-2 p-0 pl-2 pr-2" style={{backgroundColor:'white',color:'rgb(193, 200, 228)',border:'solid #c1c7e4 2px',textTransform:'uppercase'}}><b>сви препарати</b></a>
            </Link> {showAllCategories()}</div>
                            <div>
                      <h2 className='text-muted'  style={{color:'#3aafa9',color:'#3aafa9',textTransform:'uppercase'}}  >регистровани препарати<br/>{categorypreparati.nameSp}</h2>
                        </div>
               <hr className='' style={{color:'#c1c7e4'}}/>
         
             {preparatis.length === 0 ? <p    className=' pt-4 pb-4' style={{textTransform:'uppercase',fontSize:'',color:'rgb(193, 200, 228)'}}>Тренутно нема регистрованих препарата у овој категорији</p> :

   <p className=' pt-2 ' style={{textTransform:'uppercase',fontSize:'small',textAlign:'',color:'rgb(193, 200, 228)'}} >укупно регистрованих препарата:{" "}
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