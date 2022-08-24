import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { useState, useEffect } from 'react';
import { singleDelatnost, listDelatnosti } from '../../actions/delatnosti';
import { API, DOMAIN, APP_NAME} from '../../config';
import renderHTML from 'react-render-html';
import ScrollToTop from '../../components/ScroolToTop';

const SingleDelatnost = ({ delatnost, query }) => {
    const [delatnosti, setdelatnosti] = useState([]);
    useEffect(() => {
        loaddelatnosti();
    }, []);
  
    const loaddelatnosti = () => {
        listDelatnosti().then(data => {
         // if(data === undefined){
        //    null
         // }
           if (data.error) {
               console.log(data.error); }
             else {
                setdelatnosti(data);
            }
        });
    };

    const head = () => (
        <Head>
            <title>
                {delatnost.title} | {APP_NAME}
            </title>
            <meta name="description" content={delatnost.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/delatnosti/${query.slug}`} />
            <meta property="og:title" content={`${delatnost.title}| ${APP_NAME}`} />
            <meta property="og:description" content={delatnost.mdesc} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/delatnosti/${query.slug}`} />
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
   <div className="container-fluid text-muted ">
   <div className='' style={{margin:'0 2%'}}>
   <div className='mt-2 mb-2 '>
 <Link href={`/delatnosti`}>
  <a className="btn p-0 pl-2 pr-2 mr-1 ml-1 mt-2 mb-2" 
   style={{border:'solid #3aafa9 2px',textTransform:'uppercase'}}>  
<b className='' style={{color:'#3aafa9'}}>све делатности</b></a>
</Link>
    
{delatnosti.map((d,i) => ( 
  <Link href={`/delatnosti/${d.slug}`} key={i}>
  <a className="btn p-0 pl-2 pr-2 mr-1 ml-1  mt-2 mb-2" 
   style={{backgroundColor:'#3aafa9',textTransform:'uppercase',color:'white'}}
>  <b>{d.titleSp}</b></a>
</Link>
    ))}
  </div>
 <div className='mt-4 mb-2' >
 <h2 style={{textTransform:'uppercase' ,color:'#3aafa9'}} >{delatnost.titleSp}</h2>
 </div>
  <div className=""><div className='mt-4 mb-4'>
     {renderHTML(delatnost.bodySp)}</div>
 </div> 
<br/>
 </div>  
 </div> <ScrollToTop/>
     </Layout>
        </React.Fragment>
    );
};

SingleDelatnost.getInitialProps = ({ query }) => {
    return singleDelatnost(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE delatnost', data);
            return { delatnost: data, query };
        }
    });
};

export default    SingleDelatnost;