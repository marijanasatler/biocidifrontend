import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/layout/LayoutLat';
import { useState, useEffect } from 'react';
import { singleTag, getTags } from '../../../actions/tag';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config';
import styles from '../../../styles/galery.module.css'
import ScrollToTop from '../../../components/ScroolToTop';


const Galery = ({tag,galeris,query,router}) => {
    const head = () => (
        <Head>
            <title> Galerija | {tag.name} | {APP_NAME}</title>
            <meta
                name="description"
                content="Galerijazavoda za biocide i medicinsku ekologiju"
            />
            <link rel="canonical" href={`${DOMAIN}/lat/galerija/${tag.slug}`} />
            <meta property="og:title" content={`Galerija| ${APP_NAME}`} />
            <meta
                property="og:description"
                content="Galerija zavoda za biocide i medicinsku ekologiju" />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/lat/galerija/${tag.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
            <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
            <meta property="og:image:type" content="image/png" />
         
        </Head>
    )

    const [tags,setTags]=useState([])
    useEffect(() => {
     loadTags();
    }, []);

    const [loading,showLoading] = useState( true  );

    const Loading = () => (loading ? <div className={styles.loading}>  <div className={styles.loader}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h5  >Stranica se učitava, molimo sačekajte</h5></div> : null);



    const showTags = () => {
        return tags.map((t, i) => (
            <Link href={`/lat/galerija/${t.slug}`} key={i}>
                <a className="btn mr-1 ml-1 mt-2 mb-2 p-0 pl-2 pr-2" 
                
                //</Link>style={{
                    //border:'none',boxShadow:'none',background:'pink',borderRadius:'0'}}>
                 style={{backgroundColor:'#8860d0',textTransform:'uppercase'}}
          >  <b className='' style={{color:'#f9f7f2'}}>{t.name}</b></a>
            </Link>
        ));
    };

    const loadTags = () => {
        getTags().then(data => {
         // if(data === undefined){
        //    null
         // }
           if (data.error) {
               console.log(data.error); }
             else {
                setTags(data);
                showLoading(false)
            }
        });
    };


    const showAllgaleris = () => {
        return galeris.map((g, i) => {
            return (
                <div key={i} className={styles.galeryContainer}>

            <figure className={styles.snipgalery} >
            <img alt=""    src={`${API}/galeri/photo/${g.slug}`}   onError={image => (image.target.src = `${DOMAIN}/static/images/piggybanner1.png`)}
                          />
            <figcaption>
        
                <p className='pt-2 col-md-12'> {g.title}</p>
            </figcaption><a href="#"></a>
        </figure>
        </div>
            );
        });
    };


    return (
        <div>
            {head()}
   <Layout>
                  
   <div className="cotainer-fluid pt-3 pb-3 "  style={{minHeight:'50vh'}}>
       {Loading()}
                    <div className={styles.galerymeni} >
 <Link href={`/lat/galerija`} >
 <a className="btn mr-1 ml-1 mt-2 mb-2 p-1 pl-2 pr-2" style={{backgroundColor:'#3aafa9',color:'white',textTransform:'uppercase',fontSize:'large'}}>galerija</a>
            </Link>  <Link href={`/lat/videogalerija`} >
            <a className="btn mr-1 ml-1 mt-2 mb-2 p-1 pl-2 pr-2" style={{backgroundColor:'#3aafa9',color:'white',textTransform:'uppercase',fontSize:'large'}}>video galerija</a>
            </Link><br/> {showTags()}
 </div>
           <div className=' ' style={{margin:' 1% 0%'}} >
               {galeris.length === 0 ? <p   className='ml-5 mr-5'  style={{margin:'',textTransform:'uppercase',fontSize:'large'}}> trenutno nema fotografija </p> :
                   
               
            
                    <div  className={styles.galerygrid}>
                  {showAllgaleris()}
                        </div>}
                    </div>
                    </div>   <ScrollToTop/>
                    </Layout>
                    </div>
            );
        };
        
        
        
        
       Galery.getInitialProps = ({ query }) => {
            return singleTag(query.slug).then(data => {
               if (data.error) {
                   console.log(data.error); } 
                  //  if (data === undefined){
                     //   null
                   // }
                    else {
                    return { tag: data.tag, galeris: data.galeris, query };
                }
            });
        };
        
  
export default    Galery;