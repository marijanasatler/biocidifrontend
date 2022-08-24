import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import Layout from '../../../components/layout/LayoutLat';
import { useState,useEffect } from 'react';
import { listDelatnosti } from '../../../actions/delatnosti';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config';
import styles from '../../../styles/delatnosti.module.css';
import { Button } from 'reactstrap';
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from '../../../components/ScroolToTop';

const Delatnosti = ({router}) => {
    const head = () => (
        <Head>
            <title> Delatnosti | {APP_NAME}</title>
            <meta
                name="description"
                content="Delatnosti: dezinfekcija, dezinsekcija, deratizacija, fumigacija, laboratoriske usluge, edukacija "
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Sve delatnosti | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="Delatnosti: dezinfekcija, dezinsekcija, deratizacija, fumigacija, laboratoriske usluge, edukacija " />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
            <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
            <meta property="og:image:type" content="image/png" />
         
        </Head>
    )

    const [delatnostis, setdelatnostis] = useState([]);
    const [loading,showLoading] = useState(true  );

    useEffect(() => {
        loadDelatnostis();
        AOS.init({
            duration : 2000
          });
          AOS.refresh();

    }, []);

    const loadDelatnostis = () => {
        listDelatnosti().then(data => {
         // if(data === undefined){
        //    null
         // }
           if (data.error) {
               console.log(data.error); }
             else {
                setdelatnostis(data);
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

    const showLoadedDelatnosti = () => {
        return delatnostis.map((d,i) => (
            
            <div   key={i} className='m-4   ' style={{borderRadius:'',border:'solid black 3px',border:'none',}}>
            <figure className={styles.snipdelatnosti} >
                <img alt=""    src={`${API}/delatnost/photo/${d.slug}`}   onError={image => (image.target.src = `${DOMAIN}/static/images/piggybanner1.png`)} />    
            <figcaption>
                <h3 className='p-3'>{d.title}</h3>
                <p className='pt-2 '>    <a href={`/lat/delatnosti/${d.slug}`}><Button className='btn p-2 col-md-8' style={{backgroundColor:'#8860d0',border:'none',padding:'1%',color:'white'}}>POGLEDAJ VIŠE</Button></a> </p>
            </figcaption>
        </figure>
        </div>
        
          ))
    };


    return (
        <React.Fragment>
       {head()}
            <Layout>
            <div className='container-fluid '>
            {Loading()}
            <div className={styles.delatnosti}>
                
             {showLoadedDelatnosti()}
             </div>
             </div>
             <ScrollToTop/>
            </Layout>
        </React.Fragment>
    );
};


export default withRouter(Delatnosti);