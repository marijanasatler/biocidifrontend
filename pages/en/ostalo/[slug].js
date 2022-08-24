import React from 'react';
import Head from 'next/head';
import Layout from '../../../components/layout/LayoutEn';
import { singleostalo,list } from '../../../actions/ostalo';
import { API, DOMAIN, APP_NAME } from '../../../config';
import renderHTML from 'react-render-html';
import { useState,useEffect } from 'react';
import ScrollToTop from '../../../components/ScroolToTop';
const Ostalo = ({ ostalo, query }) => {


    const head = () => (
        <Head>
            <title>
                {ostalo.title} | {APP_NAME}
            </title>
            <meta name="description" content={ostalo.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/en/ostalo/${query.slug}`} />
            <meta property="og:title" content={`${ostalo.title}| ${APP_NAME}`} />
            <meta property="og:description" content={ostalo.mdesc} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/en/ostalo/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:type" content="image/png" />
        </Head>
    );
    const [ostalos, setostalos] = useState([]);
    useEffect(() => {
        loadostalos();
    }, []);
  
    const loadostalos = () => {
        list().then(data => {
         // if(data === undefined){
        //    null
         // }
           if (data.error) {
               console.log(data.error); }
             else {
                setostalos(data);
            }
        });
    };

    return (
        <React.Fragment>
            {head()}
            <Layout>
   <div className=" ">
   <div className='' style={{margin:'2% 4%'}}>
 <div className='mt-4 mb-3' >
 <h2 className='text-muted pb-3 pt-1' style={{textTransform:'uppercase' }} >{ostalo.titleEn}</h2>
 </div>
  <div className=""><div className='mt-4 mb-4'>
     {renderHTML(ostalo.bodyEn)}</div>
 </div> 
<br/>
 </div>  

 </div> <ScrollToTop/>
     </Layout>
        </React.Fragment>
    );
};

Ostalo.getInitialProps = ({ query }) => {
    return singleostalo(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE ostalo', data);
            return { ostalo: data, query };
        }
    });
};

export default    Ostalo;