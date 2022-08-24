import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { useState, useEffect } from 'react';
import { singleZaposlenje,listZaposlenje } from '../../actions/zaposlenje';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import { FacebookIcon,TelegramIcon,TwitterIcon,} from "react-share";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import moment from 'moment';
import styles from '../../styles/ostalo.module.css'
import ScrollToTop from '../../components/ScroolToTop';

const SingleZaposlenje = ({ zaposlenje, query }) => {

    const [zaposlenjes, setzaposlenje] = useState([]);
    useEffect(() => {
        loadzaposlenje();
    }, []);
  
    const loadzaposlenje = () => {
        listZaposlenje().then(data => {
         // if(data === undefined){
        //    null
         // }
           if (data.error) {
               console.log(data.error); }
             else {
                setzaposlenje(data);
            }
        });
    };

    const head = () => (
        <Head>
            <title>
                {zaposlenje.title} | {APP_NAME}
            </title>
            <meta name="description" content={zaposlenje.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/zaposlenjes/${query.slug}`} />
            <meta property="og:title" content={`${zaposlenje.title}| ${APP_NAME}`} />
            <meta property="og:description" content={zaposlenje.mdesc} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/zaposlenjes/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${zaposlenje.imgLink}`} />
            <meta property="og:image:secure_url" content={`${zaposlenje.imgLink}`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );


    return (
        <div>
            {head()}
            <Layout>
   <div className="container mb-5" style={{minHeight:'50vh'}}>
          
   <div className='mt-3 mb-4 '>
  <Link href={`/zaposlenje`}>
  <a className="btn mr-1  mt-2 mb-2 p-0 pl-2 pr-2" style={{border:'solid darkgreen 2px',textTransform:'uppercase',background:'darkgreen'}}>
      <b className='' style={{color:'white'}}>сви конкурси</b>
      </a>
   </Link>
  </div>

 <div >
     <h3 style={{textTransform:'uppercase' ,}} className='text-muted' >{zaposlenje.titleSp}</h3>
     <p>{zaposlenje.sifra === 'undefined' || null || ''  ? null : <a className='' ><b className='text-muted'>шифра конкурса</b><b style={{color:'',textAlign:'right',color:'darkgreen'}} > {zaposlenje.sifra}</b></a>}</p>
   </div>
    <hr className=''/>
                  
   <div className="mt-3 mb-3">
  {zaposlenje.bodySp ?  <div>{renderHTML(zaposlenje.bodySp)} </div>: null }
  </div>
  <ul className='' style={{listStyle:'none',fontSize:'',textTransform:'uppercase',padding:'0'}}>
                            
  <li className='mb-2'><a href={zaposlenje.photo === null ?  `` :  `${API}/zaposlenje/dokument/${zaposlenje.slug}` } style={{color:'white',background:'darkgreen',textAlign:'right',fontSize:'larger',textDecoration:'none'}}  className='btn'  >   <i class="far fa-file-alt"></i>  <b > ПРЕУЗМИ ДОКУМЕНТ</b> </a></li>

          <li >{zaposlenje.pocetak === 'undefined' ? null : <a className='' ><b className='text-muted mr-2'>датум објаве </b><b style={{color:'darkgreen'}}>{moment(zaposlenje.pocetak).locale('sr').format('DD.MM.YYYY')}</b></a>} </li>
          <li >{zaposlenje.kraj === 'undefined' ? null :  <a className='' ><b className='text-muted mr-2'>рок за пријаву </b> <b style={{color:'darkgreen'}}>{moment(zaposlenje.kraj).locale('sr').format('DD.MM.YYYY / HH:mm  ')}</b></a>}</li>
                </ul>
               </div><ScrollToTop/>
            </Layout>
        </div>
    );
};

SingleZaposlenje.getInitialProps = ({ query }) => {
    return singleZaposlenje(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE zaposlenje', data);
            return { zaposlenje: data, query };
        }
    });
};

export default    SingleZaposlenje;