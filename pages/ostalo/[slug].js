import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { singleostalo,list } from '../../actions/ostalo';
import { API, DOMAIN, APP_NAME } from '../../config';
import renderHTML from 'react-render-html';
import { useState,useEffect } from 'react';
import ScrollToTop from '../../components/ScroolToTop';


const Ostalo = ({ ostalo, query }) => {


    const head = () => (
        <Head>
            <title>
                {ostalo.title} | {APP_NAME}
            </title>
            <meta name="description" content={ostalo.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/ostalo/${query.slug}`} />
            <meta property="og:title" content={`${ostalo.title} | ${APP_NAME}`} />
            <meta property="og:description" content={ostalo.mdesc} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/ostalo/${query.slug}`} />
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
   <div className="container-fluid ">
   <div className='' style={{margin:'2% 5%'}}>
 <div className='mt-4 mb-4' >
 <h2 className='text-muted' style={{textTransform:'uppercase' }} >{ostalo.titleSp}</h2>
 </div>
  <div className=""><div className='mt-4 mb-4'>
     {renderHTML(ostalo.bodySp)}</div>
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