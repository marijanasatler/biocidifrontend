import React,{useEffect} from 'react';
import Head from 'next/head';
import Layout from '../../../components/layout/LayoutEn';
import { singleCategorynabavke } from '../../../actions/categorynabavke';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config';
import ScrollToTop from '../../../components/ScroolToTop';
import moment from 'moment';
import NabavkeMenu from '../../../components/nabavke/NabavkaMenuEn'
import styles from '../../../styles/nabavke.module.css'


const Categorynabavke = ({ categorynabavke, nabavkes, query,router }) => {
    const head = () => (
        <Head>
        <title>Procurement | {categorynabavke.nameEn}| {APP_NAME}</title>
        <meta
            name="description"
            content={`Procurement | ${query.slug}`}/>
        <link rel="canonical" href={`${DOMAIN}/en/nabavke/${query.slug}`} />
        <meta property="og:title" content={`All procurement | ${APP_NAME}`} />
        <meta property="og:description" content={`Procurement | ${query.slug}`}/>
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}/en/nabavke/${query.slug}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:type" content="image/png" />
    </Head>
    );
    return (
<>  
{head()}
<Layout>
<div className="container-fluid  " style={{minHeight:'55vh'}}  >
         <div className='pt-4 pb-4'>
     <div className={styles.containerGrid}>

     <div className=' '>
         <div className='container-fluid' >
             <div className=''>
        <h2 className=" font-weight-bold pl-4 text-muted pr-4 text-uppercase  " style={{color:'#5ab9ea'}}>{categorynabavke.nameEn}</h2>          
          <div>
             {nabavkes.length === 0 ? <p className='text-muted pt-4 pl-4' style={{textTransform:'uppercase',fontSize:''}}>
             THERE ARE CURRENTLY NO PROCUREMENTS </p> :
             <p className='text-muted pl-4 ' style={{textTransform:'uppercase',fontSize:'small',textAlign:''}} >
                 TOTAL PROCUREMENTS:{" "} <b style={{fontSize:'medium'}}> {nabavkes.length} </b> </p>}
                 </div>  
                 <div className='pl-4'>
                     {categorynabavke.name === 'javne nabavke' ? <p style={{color:'#5ab9ea',textTransform:'uppercase'}}>You can find all public procurements of the Institute for Biocides and Medical Ecology on  <a href='https://jnportal.ujn.gov.rs/' style={{cursor:'pointer',color:'#5ab9ea'}}
                     target='_blank'
                     ><b> the public procurement portal.</b></a> </p> : null}
                 </div>
           <div className={styles.gridSistem}  >
           {nabavkes.map((n, i) => (
                                           <ul  key={i}  className={styles.nabavke}>
                                           <li style={{fontSize:'large',marginBottom:'2%',textTransform:'none'}}> <a href={`${API}/nabavke/dokument/${n.slug}`} target='_blank'
                                             className='text-white' //style={{color:'#5ab9ea',fontSize:'larger'}}
                                            >
                                                                      {n.titleEn} </a> </li>
                                                                      <li > {n.sifra === 'undefined' ? null : <a className={styles.smallGrid} ><b className='text-muted'>code</b><b style={{color:'white',textAlign:'right'}} > {n.sifra}</b></a>}</li>
          <li >{n.pocetak === 'undefined' ? null : <a className={styles.smallGrid} ><b className='text-muted'>publication date</b><b style={{color:'white',textAlign:'right'}}>{moment(n.pocetak).locale('sr').format('DD-MM-YYYY')}</b></a>} </li>
          <li >{n.kraj === 'undefined' ? null :  <a className={styles.smallGrid} ><b className='text-muted'>deadline for offers</b> <b style={{color:'white',textAlign:'right'}}>{moment(n.kraj).locale('sr').format('HH:mm  DD-MM-YYYY ')}</b></a>}</li>
          <li><a className={styles.smallGrid} ><b className='text-muted'> contact/offers</b> 
          <b style={{color:'white',textAlign:'right',textTransform:' lowercase'}}>{n.postedBy.email}</b></a></li>
                </ul>
                                ))}
           </div>      
         </div>
     </div>
    </div> <div className={styles.menuBorder} >
   <NabavkeMenu/>
</div> 
</div>      
 </div>
  </div> <ScrollToTop/>
    </Layout>
            </>
    );
};




Categorynabavke.getInitialProps = ({ query }) => {
    return singleCategorynabavke(query.slug).then(data => {
       if (data.error) {
           console.log(data.error); } 
          //  if (data === undefined){
             //   null
           // }
            else {
            return { categorynabavke: data.categorynabavke, nabavkes: data.nabavkes, query };
        }
    });
};

export default Categorynabavke;