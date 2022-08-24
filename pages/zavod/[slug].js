import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { useState, useEffect } from 'react';
import { singleZavod,list } from '../../actions/zavod';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import ScrollToTop from '../../components/ScroolToTop';

const SingleZavod = ({ zavod, query }) => {

    const [zavods, setZavod] = useState([]);
    useEffect(() => {
        loadZavod();
    }, []);
  
    const loadZavod = () => {
        list().then(data => {
         // if(data === undefined){
        //    null
         // }
           if (data.error) {
               console.log(data.error); }
             else {
                setZavod(data);
            }
        });
    };
  
    const head = () => (
        <Head>
            <title>
                {zavod.title} | {APP_NAME}
            </title>
            <meta name="description" content={zavod.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/zavods/${query.slug}`} />
            <meta property="og:title" content={`${zavod.title}| ${APP_NAME}`} />
            <meta property="og:description" content={zavod.mdesc} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/zavods/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${zavod.imgLink}`} />
            <meta property="og:image:secure_url" content={`${zavod.imgLink}`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );


    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main style={{margin: '2% 5%'}}>
                  
                        <div className="" >
                            <section >
                              <div className=" mb-3" > 
                              {zavods.map((z,i) => (
  
  <Link href={`/zavod/${z.slug}`} key={i}>
  <a className="btn mr-1 ml-1 mt-2 mb-2 p-0 pl-2 pr-2 " 
  
   style={{color:'#3aafa9',border:'solid #3aafa9 2px',textTransform:'uppercase'}}
>  <b className='' style={{color:'#3aafa9'}}>{z.titleSp}</b></a>
</Link>
    
    ))}
  </div>
 </section>
 </div>
 <div className="mb-5">
   <section>
   <div className="pt-4">{renderHTML(zavod.bodySp)}</div>
   </section>
  </div>
   </main><ScrollToTop/>
            </Layout>
        </React.Fragment>
    );
};

SingleZavod.getInitialProps = ({ query }) => {
    return singleZavod(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE zavod', data);
            return { zavod: data, query };
        }
    });
};

export default    SingleZavod;