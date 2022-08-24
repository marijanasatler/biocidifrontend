import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import Layout from '../../../components/layout/LayoutEn';
import { useState,useEffect } from 'react';
import { listGaleri,list } from '../../../actions/galeri';
import { API, DOMAIN, APP_NAME} from '../../../config';
import ScrollToTop from '../../../components/ScroolToTop';
import { getTags } from '../../../actions/tag';

import Link from 'next/link';
import styles from '../../../styles/galery.module.css'

const galeris = ({ galeris, categories, totalGaleris, galerisLimit, galeriSkip, router,title }) => {
    const head = () => (
        <Head>
        <title>Gallery | {APP_NAME}</title>
        <meta
            name="description"
            content="Photo gallery of the Institute for Biocides and Medical Ecology"/>
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta property="og:title" content={`Galeri | ${APP_NAME}`} />
        <meta property="og:description" content="Photo gallery of the Institute for Biocides and Medical Ecology"/>
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:type" content="image/png" />
    </Head>
    );

    const [limit, setLimit] = useState(galerisLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalGaleris);
    const [loadedgaleris, setLoadedgaleris] = useState([]);
    const [tags,setTags]=useState([])
 
    const [galerilist, setgalerilists] = useState([]);

    useEffect(() => {
        loadgalerilists();
     loadTags();
 
    }, []);

    const loadgalerilists = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setgalerilists(data);
             
            }
        });
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
            }
        });
    };

    
    const showTags = () => {
        return tags.map((t, i) => (
            <Link href={`/en/galerija/${t.slug}`} key={i}>
                <a className="btn mr-1 ml-1 mt-2 mb-2 p-0 pl-2 pr-2" 
                
                //</Link>style={{
                    //border:'none',boxShadow:'none',background:'pink',borderRadius:'0'}}>
                 style={{backgroundColor:'#8860d0',textTransform:'uppercase'}}
          >  <b className='' style={{color:'#f9f7f2'}}>{t.nameEn}</b></a>
            </Link>
        ));
    };


    const loadMore = () => {
        let toSkip = skip + limit;
        listGaleri(toSkip, limit).then(data => {
           // if (data.error) {
             //   console.log(data.error); }
             if (data === undefined){
                 null
             }
            else {
                setLoadedgaleris([...loadedgaleris, ...data.galeris]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };




    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <div className=' small ' style={{background:'transparent',color:'#3aafa9',textTransform:'uppercase',cursor:'pointer'}}  onClick={loadMore}   >
              show more photos
                      </div>
            )
        );
    };

    const showAllgaleris = () => {
        return galeris.map((g, i) => {
            return (
                <div key={i} className={styles.galeryContainer}>

            <figure className={styles.snipgalery} >
            <img alt=""    src={`${API}/galeri/photo/${g.slug}`}   onError={image => (image.target.src = `${DOMAIN}/static/images/zavodlogo.png`)}
                          />
            <figcaption>
        
                <p className='pt-2 col-md-12'> {g.titleSp}</p>
            </figcaption><a href="#"></a>
        </figure>
        </div>
            );
        });
    };

 
    const showLoadedgaleris = () => {
        return loadedgaleris.map((g, i) => (
            <div key={i} className={styles.galeryContainer}>

            <figure className={styles.snipgalery} >
            <img alt=""    src={`${API}/galeri/photo/${g.slug}`}   onError={image => (image.target.src = `${DOMAIN}/static/images/zavodlogo.png`)}
                          />
            <figcaption>
        
                <p className='pt-2 col-md-12'> {g.titleSp}</p>
            </figcaption><a href="#"></a>
        </figure>
        </div>
        ));
    };

    return (
        <React.Fragment>
            {head()}
            <Layout>
        
              
                    <div className="cotainer-fluid pt-3 pb-3 ">
                    <div className={styles.galerymeni}>
 <Link href={`/en/galerija`} >
                <a className="btn mr-1 ml-1 mt-2 mb-2 p-1 pl-2 pr-2" style={{backgroundColor:'#3aafa9',color:'white',textTransform:'uppercase',fontSize:'large'}}>Gallery</a>
            </Link>  <Link href={`/en/videogalerija`} >
                <a className="btn mr-1 ml-1 mt-2 mb-2 p-1 pl-2 pr-2" style={{backgroundColor:'#3aafa9',color:'white',textTransform:'uppercase',fontSize:'large'}}>video Gallery</a>
            </Link><br/> {showTags()}
 </div>
           <div className=' ' style={{margin:' 1% 0%'}} >
            
                    <div  className={styles.galerygrid}> {showAllgaleris()}</div>
                   <div className={styles.galerygrid}   >{showLoadedgaleris()}</div>
                    <div className="text-right pr-5">{loadMoreButton()}</div>
                    </div>
                    </div>    <ScrollToTop/>
            </Layout>
        </React.Fragment>
    );
};

galeris.getInitialProps = () => {
    let skip = 0;
    let limit = 9;
    return listGaleri(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error); }
       //  if (data ===undefined ){
         //    null
         //}
             else {
            return {
                galeris: data.galeris,
             
                tags: data.tags,
     
                totalGaleris: data.size,
                galerisLimit: limit,
                galeriSkip: skip
            };
        }
    });
};

export default withRouter(galeris);