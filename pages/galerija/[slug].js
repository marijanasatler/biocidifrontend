import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { useState, useEffect } from 'react';
import { singleTag, getTags } from '../../actions/tag';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import styles from '../../styles/galery.module.css'
import ScrollToTop from '../../components/ScroolToTop';


const Galery = ({tag,galeris,query}) => {

    const [tags,setTags]=useState([])
 



    useEffect(() => {
 
     loadTags();
 
    }, []);



    const showTags = () => {
        return tags.map((t, i) => (
            <Link href={`/galerija/${t.slug}`} key={i}>
                <a className="btn mr-1 ml-1 mt-2 mb-2 p-0 pl-2 pr-2" 
    
                 style={{backgroundColor:'#8860d0',textTransform:'uppercase'}}
          >  <b className='' style={{color:'#f9f7f2'}}>{t.nameSp}</b></a>
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
        
                <p className='pt-2 col-md-12'> {g.titleSp}</p>
            </figcaption><a href="#"></a>
        </figure>
        </div>
            );
        });
    };


    return (
        <div>
   <Layout>
                  
   <div className="cotainer-fluid pt-3 pb-3 "  style={{minHeight:'50vh'}}>
                    <div  className={styles.galerymeni}  >
 <Link href={`/galerija`} >
 <a className="btn mr-1 ml-1 mt-2 mb-2 p-1 pl-2 pr-2" style={{backgroundColor:'#3aafa9',color:'white',textTransform:'uppercase',fontSize:'large'}}>галерија</a>
            </Link>  <Link href={`/videogalerija`} >
            <a className="btn mr-1 ml-1 mt-2 mb-2 p-1 pl-2 pr-2" style={{backgroundColor:'#3aafa9',color:'white',textTransform:'uppercase',fontSize:'large'}}>видео галерија</a>
            </Link><br/> {showTags()}
 </div>
           <div className=' ' style={{margin:' 1% 0%'}} >
               {galeris.length === 0 ? <p   className='ml-5 mr-5'  style={{margin:'',textTransform:'uppercase',fontSize:'large'}}> тренутно нема фотографија </p> :
                   
               
            
                    <div   className={styles.galerygrid}>
                  {showAllgaleris()}
                        </div>}
                    </div>
                   
                    </div>   
        
                    <ScrollToTop/>
     
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