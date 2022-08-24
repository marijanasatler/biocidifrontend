import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/layout/LayoutLat';
import { useState, useEffect } from 'react';
import { singleLaboratori, list } from '../../../actions/laboratori';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config';
import renderHTML from 'react-render-html';
import ScrollToTop from '../../../components/ScroolToTop';

const SingleLaboratori = ({ laboratorija, query }) => {

    const [laboratori, setlaboratori] = useState([]);
    useEffect(() => {
        loadlaboratori();
    }, []);
  
    const loadlaboratori = () => {
        list().then(data => {
         // if(data === undefined){
        //    null
         // }
           if (data.error) {
               console.log(data.error); }
             else {
                setlaboratori(data);
            }
        });
    };

    const head = () => (
        <Head>
            <title>
                {laboratorija.title} | {APP_NAME}
            </title>
            <meta name="description" content={laboratorija.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/laboratorijas/${query.slug}`} />
            <meta property="og:title" content={`${laboratorija.title}| ${APP_NAME}`} />
            <meta property="og:description" content={laboratorija.mdesc} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/laboratorijas/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:type" content="image/png" />
     
        </Head>
    );


    return (
        <React.Fragment>
            {head()}
            <Layout>
   <div className="container-fluid text-muted  ">
          <div className='' style={{margin:'0 2%'}}>

   <div className='mt-2 mb-2'>
                    <Link href={`/lat/laboratorije`}>
  <a className="btn p-0 pl-2 pr-2 mr-1 ml-1 mt-2 mb-2" 
      style={{backgroundColor:'',border:'solid 2px #5ab9ea ',textTransform:'uppercase'}}
>  <b className='' style={{color:' #5ab9ea'}}>sve laboratorije</b></a>
</Link>
{laboratori.map((l,i) => ( 
    <Link href={`/lat/laboratorije/${l.slug}`} key={i}>
  <a className="btn p-0 pl-2 pr-2 mr-1 ml-1  mt-2 mb-2" 
      style={{backgroundColor:' #5ab9ea',textTransform:'uppercase',border:'solid 2px #5ab9ea ',color:'white'}}
><b>{l.title}</b></a>
</Link>
    
    ))}
  </div>
       <div className=' ' >
       <h2   className='mt-4 mb-2' style={{textTransform:'uppercase' ,color:' #5ab9ea'}} >{laboratorija.title}</h2>
  </div>
<div className=""><div className='mt-4 mb-4'>
   {renderHTML(laboratorija.bodyLat)}</div>
   </div>        
<br/>
 </div> 
  </div><ScrollToTop/>
            </Layout>
        </React.Fragment>
    );
};

SingleLaboratori.getInitialProps = ({ query }) => {
    return singleLaboratori(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE laboratorija', data);
            return { laboratorija: data, query };
        }
    });
};

export default    SingleLaboratori;