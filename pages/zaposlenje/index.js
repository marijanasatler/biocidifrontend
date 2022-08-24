import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import Layout from '../../components/layout/LayoutEn';
import { useState,useEffect } from 'react';
import { listZaposlenje } from '../../actions/zaposlenje';
import { API, DOMAIN, APP_NAME, } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import ScrollToTop from '../../components/ScroolToTop';
import styles from '../../styles/ostalo.module.css'

const Zaposlenje = ({router}) => {

    const head = () => (
        <Head>
        <title>Konkursi za zaposlenje | {APP_NAME}</title>
        <meta
            name="description"
            content={`Lista poslova| ${APP_NAME} `}/>
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta property="og:title" content={`Konkursi za zaposlenje |  ${APP_NAME}`} />
        <meta property="og:description" content={`Lista poslova| ${APP_NAME} `}/>
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:type" content="image/png" />
    </Head>
    );





    const [zaposlenjes, setzaposlenjes] = useState([]);
    useEffect(() => {
        loadzaposlenjes();
    }, []);

    const loadzaposlenjes = () => {
        listZaposlenje().then(data => {
         // if(data === undefined){
        //    null
         // }
           if (data.error) {
               console.log(data.error); }
             else {
                setzaposlenjes(data);
            }
        });
    };


    const showLoadedzaposlenje = () => {
        return zaposlenjes.map((z,i) => (
        
            <div key={i} className={styles.zaposlenje} >
            <a href={`/zaposlenje/${z.slug}`} style={{textDecoration:'none'}}  >
            <figure className='  text-muted'  ><div className='p-1 pb-0' style={{width:'100%'}}>
            <img alt="zavod za biocide"  style={{objectFit:'cover',maxWidth:'50%'}}   src={`${DOMAIN}/static/images/logo1.png`}
           />
            </div>
           
        <hr className=''/>
           <ul className='' style={{listStyle:'none',fontSize:'small',textTransform:'uppercase',padding:'0'}}>
          <li className='mb-2'>   <b className='' style={{fontSize:'larger'}}>{z.titleSp}</b ></li>
           <li > {z.sifra === 'undefined' || null || '' ? null : <a className={styles.smallGrid} ><b className='text-muted'>шифра конкурса</b><b style={{color:'darkgreen',textAlign:'right'}} > {z.sifra}</b></a>}</li>
          <li >{z.pocetak === 'undefined' ? null : <a className={styles.smallGrid} ><b className='text-muted'>датум објаве </b><b style={{color:'darkgreen',textAlign:'right'}}>{moment(z.pocetak).locale('sr').format('DD.MM.YYYY')}</b></a>} </li>
          <li >{z.kraj === 'undefined' ? null :  <a className={styles.smallGrid} ><b className='text-muted'>рок за пријаву </b> <b style={{color:'darkgreen',textAlign:'right'}}>{moment(z.kraj).locale('sr').format('   DD.MM.YYYY / HH:mm')}</b></a>}</li>
                </ul>
        </figure>
      </a>
        </div>
    
        
          ))
    };




    return (
        <React.Fragment>
       {head()}
            <Layout>
            <div className='container-fluid  ' style={{minHeight:'40vh',padding:'.5% 3%'}}>
            {zaposlenjes.length === null ?
                 <div>
                <div>
                    <h4  className='mt-5  mb-4 text-center' style={{textTransform:'uppercase',color:'rgb(26, 28, 26,.4)'}}>завод за биоцид и медицинску екологију тренутно нема отворених конкурса за запошљавање</h4>
                 </div>
                </div>
            : 
             <div className='' style={{minHeight:'50vh',padding:''}} >
                <div>
                 <h3  className='m-3 ' style={{textTransform:'uppercase',color:'rgb(26, 28, 26,.4)'}}>конкурси завода за биоциде и медицинску екологију</h3>
                    </div>
             <div className={styles.gridSistem}>
    
             {showLoadedzaposlenje()}
          </div>
         </div>}
          </div>
          <ScrollToTop/>
            </Layout>
        </React.Fragment>
    );
};


export default withRouter(Zaposlenje);