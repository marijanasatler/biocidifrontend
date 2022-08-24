import React,{useState,useEffect} from 'react';
import { listZaposlenje } from '../../actions/zaposlenje';
import { list } from '../../actions/zavod';
import { DOMAIN } from '../../config';
import styles from '../../styles/navigation.module.css'
import NewLogo from '../NewLogo';
import Link from 'next/link';
export default function Footer() {

  const [zavod, setZavod] = useState([]);
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

  const [zaposlenjes, setzaposlenjes] = useState([]);
  useEffect(() => {
      loadzaposlenjes();
  }, []);
  
  const loadzaposlenjes = () => {
      listZaposlenje().then(data => {
       // if(data === undefined){
      //    null
       // }
         if (data.error) {
             console.log(data.error); }
           else {
              setzaposlenjes(data);
          }
      });
  };
  

  return (
    <div  className={styles.footerstyles}   >
 
     <div className={styles.footergrid} >
 
 <div className='p-3 ' style={{width:'auto'}}>

 <div className=' p-1 pt-2 pb-2'>
 <div>
<h5 className='ml-2' >O ЗАВОДУ</h5>
{zavod.map((z,i) => (
  <ul key={i}  
   style={{display:'inline-flex',alignItems:'flex-start',justifyContent:'flex-start',listStyle:'none',textAlign:'left',margin:'0',padding:'0',textTransform:'uppercase'}}>
   <li className='mr-2 ml-2 mt-1 mb-1'  >
            <a href={`/zavod/${z.slug}`} className={styles.zavodfooter} > 
            {z.titleSp}
             </a>
            </li>                        
       </ul>
       
       ))}
       </div>
   </div>
   
    <div className=' p-1 pt-2 pb-2'>
    <h5 className='ml-2' >ОСТАЛО</h5>

    <ul className={styles.footer}>
    <li className='mr-2 ml-2 mt-1 mb-1' >
      <a href='/registrovani-preparati'>ПРЕПАРАТИ</a>
    </li>    <li className='mr-2 ml-2 mt-1 mb-1' >
      <a href='/standardi' >СТАНДАРДИ</a>
    </li>
    <li className='mr-2 ml-2 mt-1 mb-1' >
      <a href={ `${DOMAIN}/nabavke`}>НАБАВКЕ</a>
    </li>
    <li className='mr-2 ml-2 mt-1 mb-1' >
      <a href={ `${DOMAIN}/zaposlenje`}>ЗАПОСЛЕЊЕ </a>
    </li>
    <li className='mr-2 ml-2 mt-1 mb-1' >
      <a href='/galerija'>ГАЛЕРИЈА</a>
    </li>
    </ul>
   </div>
   
 </div>
<div className='pr-1'>
  <Link href={`${DOMAIN}/standardi`}> 
    <div className={styles.zavodLogoContainer} >  <div className={styles.zavodLogo}>
   <NewLogo/>
  </div>
    </div>
  </Link>
  </div>
    </div>
    <div className={styles.footercolor}>

    <hr className='' style={{color:'white',background:'white',opacity:'.5',margin:'1.5% 5%',marginBottom:'0'}}/>
      <div className=' small p-2' style={{textAlign:'center',justifyContent:'center' }}>
        &copy; 2022 {"  "}ЗАВОД ЗА БИОЦИДЕ И МЕДИЦИНСКУ ЕКОЛОГИЈУ.{"  "}СВА ПРАВА ЗАДРЖАНА.{" "}ИЗРАДА И ДИЗАЈН. {" "} 
        <a href='https://marijana-portfolio-website.web.app/'>
      <img src={`${DOMAIN}/static/images/devlogo.png`} style={{paddingBottom:'0.2%',opacity:'60%'}} />
        </a>
      </div>
     </div>
   </div>
      
  );
}