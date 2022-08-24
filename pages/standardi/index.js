import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { useState,useEffect } from 'react';
import { list } from '../../actions/standardi';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import ScrollToTop from '../../components/ScroolToTop';
import styles from '../../styles/ostalo.module.css';

const Standardi = ({router}) => {

    const head = () => (
        <Head>
            <title> Standardi i Sertifikati | {APP_NAME}</title>
            <meta
                name="description"
                content="iso cepa azus iso/iec"
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Standardi i Sertifikati | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="iso cepa azus iso/iec" />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
            <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
            <meta property="og:image:type" content="image/png" />
         
        </Head>
    )




    const [loading,showLoading] = useState(true  );

    const [standardis, setstandardis] = useState([]);
    useEffect(() => {
        loadStandardi();
    }, []);

    const loadStandardi = () => {
        list().then(data => {
         // if(data === undefined){
        //    null
         // }
           if (data.error) {
               console.log(data.error); }
             else {
                setstandardis(data);
                showLoading(false);
            }
        });
    };
    const Loading = () => (loading ? <div className={styles.loading}>  <div className={styles.loader}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h5  >Stranica se učitava, molimo sačekajte</h5></div> : null);

    const showLoadedStandardi = () => {
        return standardis.map((s,i) => (
          <a href={`${API}/standard/dokument/${s.slug}`}   style={{textDecoration:'none'}}   target='_blanck' >
            <div key={i} className={styles.standardi}  >
           <div>
            <h2 className=' mb-0 text-muted' style={{textTransform:'uppercase',textDecoration:'none'}}    >   <i class="far fa-file-alt"></i> {s.title}</h2>
         <p  style={{fontSize:'',textAlign:''}} className='text-muted'><b>сертификован</b><b className='text-success ' style={{fontSize:'large'}}>&#10003;</b></p>
           </div>
        </div>
       </a>                         
                            
          ))
    };



    return (
        <React.Fragment>
             {head()}
            <Layout>
                <div className='container-fluid ' style={{minHeight:'51vh',background:''}}>
                {Loading()}
                    <div className={styles.standardimargin}>
                 <div style={{padding:'0 1%'}} >
                 <h2  style={{color:'#3aafa9',color:'#3aafa9',textTransform:'uppercase'}} className='text-muted'
             >СТАНДАРДИ И СЕРТИФИКАТИ</h2>
<hr/>
</div>
<div className=' pb-4'>
<div  className={styles.standardiGrid}> {showLoadedStandardi()}</div>
</div>
   
     </div>
   </div>
   <ScrollToTop/>
    </Layout>
        </React.Fragment>
    );
};


export default withRouter(Standardi);