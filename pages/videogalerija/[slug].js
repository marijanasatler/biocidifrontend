import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { useState, useEffect } from 'react';
import { singleVideo} from '../../actions/video';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { getTags } from '../../actions/tag';
import ReactPlayer from 'react-player/lazy';
import styles from '../../styles/galery.module.css'

const SingleVideo = ({ video, query }) => {
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
            <Link href={`/galerija/${t.slug}`} key={i}>
                <a className="btn mr-1 ml-1 mt-2 mb-2 p-0 pl-2 pr-2" 
                
                //</Link>style={{
                    //border:'none',boxShadow:'none',background:'pink',borderRadius:'0'}}>
                 style={{backgroundColor:'#8860d0',textTransform:'uppercase'}}
          >  <b className='' style={{color:'#f9f7f2'}}>{t.nameSp}</b></a>
            </Link>
        ));
    };


    return (
        <React.Fragment>
      
            <Layout>
            <div className="cotainer-fluid pt-3 pb-3 ">
                    <div className={styles.galerymeni} >
 <Link href={`/galerija`} >
                <a className="btn mr-1 ml-1 mt-2 mb-2 p-1 pl-2 pr-2" style={{backgroundColor:'#3aafa9',color:'white',textTransform:'uppercase'}}><b className='fonts' style={{color:''}}>галерија</b></a>
            </Link>  <Link href={`/videogalerija`} >
                <a className="btn mr-1 ml-1 mt-2 mb-2 p-1 pl-2 pr-2" style={{backgroundColor:'#3aafa9',color:'white',textTransform:'uppercase'}}><b className='fonts' style={{color:''}}>видео галерија</b></a>
            </Link><br/> {showTags()}
 </div>
           <div className=' ' style={{margin:' 2% 0%'}} >
            
                    <div >   <div className={styles.galerymeni} >

<div  >
    <div >

<ReactPlayer  width='100%'  stopOnUnmount={false}  height='35vw' controls='true' url={`"${video.linkRef}"`}     config={{
youtube: {
playerVars: { showinfo: 1 }
},

}}/>
    </div>
<div >
    <p className='pt-2   text-left'  style={{borderBottom:'solid #3aafa9 4px',color:'#3aafa9',textTransform:'uppercase'}} > {video.titleSp}</p>
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