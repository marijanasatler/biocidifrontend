import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/layout/LayoutEn';
import { useState, useEffect } from 'react';
import { singleVideo} from '../../../actions/video';
import { API, DOMAIN, APP_NAME } from '../../../config';
import { getTags } from '../../../actions/tag';
import ReactPlayer from 'react-player/lazy'
import styles from '../../../styles/galery.module.css'

const SingleVideo = ({ video, query,router }) => {

    const head = () => (
        <Head>
        <title>Video gallery | {APP_NAME}</title>
        <meta
            name="description"
            content="Video gallery of the Institute for Biocides and Medical Ecology"/>
        <link rel="canonical"  href={`${DOMAIN}/en/videogalerija/${query.slug}`}  />
        <meta property="og:title" content={`Video gallery | ${APP_NAME}`} />
        <meta property="og:description" content="Video gallery of the Institute for Biocides and Medical Ecology"/>
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}/en/videogalerija/${query.slug}`}  />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:type" content="image/png" />
    </Head>
    );



    const [tags,setTags]=useState([])

    useEffect(() => {
     loadTags();
 
    }, []);


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
                 style={{backgroundColor:'#8860d0',textTransform:'uppercase'}}
          >  <b className='' style={{color:'#f9f7f2'}}>{t.nameEn}</b></a>
            </Link>
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
            </Link><br/> {showTags()}</div>
  <div className=' ' style={{margin:' 2% 0%'}} >
  <div>   
<div  className={styles.galerymeni} >
 <div >
  <div >
    <ReactPlayer  width='100%'  stopOnUnmount={false}  height='35vw' controls='true' url={`"${video.linkRef}"`}    
     config={{youtube: {playerVars: { showinfo: 1 }},}}/>
 </div>
<div >
    <p className='pt-2   text-left'  style={{borderBottom:'solid #3aafa9 4px',color:'#3aafa9',textTransform:'uppercase'}} > {video.titleEn}</p>
</div>
</div>
</div> 
</div>
 </div>
  </div>   
            </Layout>
        </React.Fragment>
    );
};

SingleVideo.getInitialProps = ({ query }) => {
    return singleVideo(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE video', data);
            return { video: data, query };
        }
    });
};

export default    SingleVideo;