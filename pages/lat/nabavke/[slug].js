import React,{useEffect} from 'react';
import Head from 'next/head';
import Layout from '../../../components/layout/LayoutLat';
import { singleCategorynabavke } from '../../../actions/categorynabavke';
import { API, DOMAIN, APP_NAME } from '../../../config';
import ScrollToTop from '../../../components/ScroolToTop';
import moment from 'moment';
import NabavkeMenu from '../../../components/nabavke/NabavkaMenuLat'
import styles from '../../../styles/nabavke.module.css'


const Categorynabavke = ({ categorynabavke, nabavkes, query }) => {
    
    return (
<>  
<Layout>
<div className="container-fluid  " style={{minHeight:'55vh'}}  >
         <div className='pt-4 pb-4'>
     <div className={styles.containerGrid}>

     <div className=' '>
         <div className='container-fluid' >
             <div className=''>
        <h2 className=" font-weight-bold pl-4 text-muted pr-4 text-uppercase  " style={{color:'#5ab9ea'}}>{categorynabavke.name}</h2>          
          <div>
             {nabavkes.length === 0 ? <p className='text-muted pt-4 pl-4' style={{textTransform:'uppercase',fontSize:''}}>
                  Trenutno nema nabavki </p> :
             <p className='text-muted pl-4 ' style={{textTransform:'uppercase',fontSize:'small',textAlign:''}} >
                 ukupno nabavki:{" "} <b style={{fontSize:'medium'}}> {nabavkes.length} </b> </p>}
                 </div>  
                 <div className='pl-4'>
                     {categorynabavke.name === 'javne nabavke' ? <p style={{color:'#5ab9ea',textTransform:'uppercase'}}>sve javne nabavke zavoda za biocide i medicinsku ekologiju  mozete pronaći na  <a href='' style={{cursor:'pointer',color:'#5ab9ea'}}><b> portalu javnih nabavki</b></a> </p> : null}
                 </div>
           <div className={styles.gridSistem}  >
           {nabavkes.map((n, i) => (
                                           <ul  key={i}  className={styles.nabavke}>
                                           <li style={{fontSize:'large',marginBottom:'2%',textTransform:'none'}}> <a href={`${API}/nabavke/dokument/${n.slug}`}  className='text-white' //style={{color:'#5ab9ea',fontSize:'larger'}}
                                            >
                                                                      {n.title} </a> </li>
                                                                      <li > {n.sifra === 'undefined' ? null : <a className={styles.smallGrid} ><b className='text-muted'>šifra</b><b style={{color:'white',textAlign:'right'}} > {n.sifra}</b></a>}</li>
          <li >{n.pocetak === 'undefined' ? null : <a className={styles.smallGrid} ><b className='text-muted'>datum objave </b><b style={{color:'white',textAlign:'right'}}>{moment(n.pocetak).locale('sr').format('DD-MM-YYYY')}</b></a>} </li>
          <li >{n.kraj === 'undefined' ? null :  <a className={styles.smallGrid} ><b className='text-muted'>rok za dostavu ponuda</b> <b style={{color:'white',textAlign:'right'}}>{moment(n.kraj).locale('sr').format('HH:mm  DD-MM-YYYY ')}</b></a>}</li>
          <li><a className={styles.smallGrid} ><b className='text-muted'> kontakt/ponude</b> 
          <b style={{color:'white',textAlign:'right'}}>{n.postedBy.email}</b></a></li>
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
  </div><ScrollToTop/>
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