import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import Layout from '../../../components/layout/LayoutEn';
import { useState,useEffect } from 'react';
import { list } from '../../../actions/laboratori';
import { API, DOMAIN } from '../../../config';
import styles from '../../../styles/laboratorije.module.css'
import { APP_NAME } from '../../../config';
import Link from 'next/link';
import ScrollToTop from '../../../components/ScroolToTop';
const Laboratoris = ({router}) => {


    const head = () => (
        <Head>
                   <title> Laboratory services | {APP_NAME}</title>
            <meta
                name="description"
                content="Laboratory services in the most modern equipped laboratories that meet the highest quality standards"
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Laboratory services | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="Laboratory services in the most modern equipped laboratories that meet the highest quality standards" />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
            <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
            <meta property="og:image:type" content="image/png" />
  
        </Head>
    );  



    const [laboratoris, setLaboratoris] = useState([]);
    useEffect(() => {
        loadLaboratoris();
    }, []);

    const loadLaboratoris = () => {
        list().then(data => {
         // if(data === undefined){
        //    null
         // }
           if (data.error) {
               console.log(data.error); }
             else {
                setLaboratoris(data);
            }
        });
    };


    const showLoadedLaboratoris = () => {
        return laboratoris.map((l,i) => (
        <div key={i} className='m-4'>
            <figure className={styles.snip1190} >
          <img alt="laboratorija" src={`${API}/laboratori/photo/${l.slug}`}   onError={image => (image.target.src = `${DOMAIN}/static/images/zavodlogo.png`)}   />
            <figcaption>
              <div> <h3 className='p-4  '>{l.titleEn}</h3>  </div>
                <p className='pt-2 '> <Link href={`/en/laboratorije/${l.slug}`}><button className='btn p-2 col-md-8' style={{backgroundColor:'#8860d0',border:'none',padding:'1%',color:'white'}}>
VIEW MORE</button></Link></p>
            </figcaption>
        </figure>
        </div>

          ))
    };

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <div className='container-fluid'>
             <div  className={styles.laboratory} >
             {showLoadedLaboratoris()}
     </div>
    </div> <ScrollToTop/>
            </Layout>
        </React.Fragment>
    );
};


export default withRouter(Laboratoris);