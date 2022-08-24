import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { useState,useEffect } from 'react';

import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';

import { getTags } from '../../actions/tag';
import ReactPlayer from 'react-player/lazy'
import ScrollToTop from '../../components/ScroolToTop';
import renderHTML from 'react-render-html';
import Link from 'next/link';

import styles from '../../styles/galery.module.css'


import { listVideo,list } from './../../actions/video';

const Videos = ({ videos, categories, totalvideos, videosLimit, videoskip, router,title }) => {
    const head = () => (
        <Head>
            <title>All videos | {APP_NAME}</title>
            <meta
                name="description"
                content="video of Piggy who searches for the latest crypto and blockchain news every day and wants to share only the best with other crypto enthusiasts out there"
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`The latest crypto and blockchain news | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="video of Piggy who searches for the latest crypto and blockchain news every day and wants to share only the best with other crypto enthusiasts out there"
            />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/proofofpiggy.png`} />
            <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/proofofpiggy.png`} />
            <meta property="og:image:type" content="image/png" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const [limit, setLimit] = useState(videosLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalvideos);
    const [loadedvideos, setLoadedvideos] = useState([]);
    const [tags,setTags]=useState([])
 
    const [videolist, setvideolists] = useState([]);

    useEffect(() => {
        loadvideolists();
     loadTags();
 
    }, []);

    const loadvideolists = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setvideolists(data);
             
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
            <Link href={`/galerija/${t.slug}`} key={i}>
                <a className="btn mr-1 ml-1 mt-2 mb-2 p-0 pl-2 pr-2" 
                
                //</Link>style={{
                    //border:'none',boxShadow:'none',background:'pink',borderRadius:'0'}}>
                 style={{backgroundColor:'#8860d0',textTransform:'uppercase'}}
          >  <b className='' style={{color:'#f9f7f2'}}>{t.nameSp}</b></a>
            </Link>
        ));
    };


    const loadMore = () => {
        let toSkip = skip + limit;
        listVideo(toSkip, limit).then(data => {
           // if (data.error) {
             //   console.log(data.error); }
             if (data === undefined){
                 null
             }
            else {
                setLoadedvideos([...loadedvideos, ...data.videos]);
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
 prikaži vise videa
       </div>
            )
        );
    };

    const showAllvideos = () => {
        return videos.map((g, i) => {
            return (
                <div key={i} className={styles.galeryContainer}>
            <div className=" " >
                <div  className=''>
            <ReactPlayer  style={{width:'100%',objectFit:'cover'}} width='100%'  stopOnUnmount={false}  controls='true' url={`"${g.linkRef}"`}    
             config={{youtube: { playerVars: { showinfo: 1 }},}}/>
     </div>
    <div  >
                <p className='pt-2   text-left'  style={{borderBottom:'solid #3aafa9 4px',color:'#3aafa9',textTransform:'uppercase'}} > {g.titleSp}</p>
    </div>
 
        </div>
        </div>
            );
        });
    };

 
    const showLoadedvideos = () => {
        return loadedvideos.map((g, i) => (
            <div key={i} className={styles.galeryContainer}>
            <div className="" >
                <div  className=''>

            <ReactPlayer  style={{width:'100%',objectFit:'cover'}} width='100%'  stopOnUnmount={false}  controls='true' url={`"${g.linkRef}"`}    
             config={{youtube: {playerVars: { showinfo: 1 } },}}/>
  </div>
    <div  >
<p className='pt-2   text-left'  style={{borderBottom:'solid #3aafa9 4px',color:'#3aafa9',textTransform:'uppercase'}} > {g.title}</p>
    </div>
 
        </div>
        </div>
        ));
    };

    return (
        <React.Fragment>
            {head()}
            <Layout>
        
              
                    <div className="cotainer-fluid pt-3 pb-3 ">
                    <div className={styles.galerymeni} >
 <Link href={`/galerija`} >
 <a className="btn mr-1 ml-1 mt-2 mb-2 p-1 pl-2 pr-2" style={{backgroundColor:'#3aafa9',color:'white',textTransform:'uppercase',fontSize:'large'}}>галерија</a>
            </Link>  <Link href={`/videogalerija`} >
            <a className="btn mr-1 ml-1 mt-2 mb-2 p-1 pl-2 pr-2" style={{backgroundColor:'#3aafa9',color:'white',textTransform:'uppercase',fontSize:'large'}}>видео галерија</a>
            </Link><br/> {showTags()}
 </div>
           <div className=' ' style={{margin:' 1% 1%'}} >
            
                    <div  className={styles.videogrid}> {showAllvideos()}</div>
                   <div  className={styles.videogrid}   >{showLoadedvideos()}</div>
                    <div className="text-right pr-5">{loadMoreButton()}</div>
                    </div>
                   
                  
 
               
        
                    </div>   
                 
   <ScrollToTop/>
            </Layout>
        </React.Fragment>
    );
};

Videos.getInitialProps = () => {
    let skip = 0;
    let limit = 4;
    return listVideo(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error); }
       //  if (data ===undefined ){
         //    null
         //}
             else {
            return {
                videos: data.videos,
             
                tags: data.tags,
     
                totalvideos: data.size,
                videosLimit: limit,
                videoskip: skip
            };
        }
    });
};

export default withRouter(Videos);