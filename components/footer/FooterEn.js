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
 <div  className={styles.footerstyles}>
 <div className='p-0 ' 
style={{display:'flex',justifyContent:'space-between'}}>
<div className='p-3'>
<div className=' p-1 pt-2 pb-2'>
<div>
<h5 className='ml-2' style={{textTransform:'uppercase'}} >about the institute</h5>
{zavod.map((z,i) => (
      <ul key={i}   style={{display:'inline-flex',alignItems:'flex-start',justifyContent:'flex-start',listStyle:'none',textAlign:'left',margin:'0',padding:'0',textTransform:'uppercase'}}>
            <li className='mr-2 ml-2 mt-1 mb-1'    >
            <a href={`${DOMAIN}/en/zavod/${z.slug}`}  className={styles.zavodfooter} > 
            {z.titleEn}
              </a>
            </li>
         </ul>   
       ))}

    </div>
   </div>
   
    <div className=' p-1 pt-2 pb-2'>
    <h5 className='ml-2' >OTHER</h5>
    
    <ul className={styles.footer}>
    <li className='mr-2 ml-2 mt-1 mb-1' >
      <a href='/en/registrovani-preparati'>preparation</a>
    </li>    <li className='mr-2 ml-2 mt-1 mb-1' >
      <a href='/en/standardi' >STANDARDS</a>
    </li>
    <li className='mr-2 ml-2 mt-1 mb-1' >
      <a href={ `${DOMAIN}/en/nabavke`}>PROCUREMENTS</a>
    </li>
    <li className='mr-2 ml-2 mt-1 mb-1' >
      <a href={ `${DOMAIN}/en/zaposlenje`}>job </a>
    </li>
    <li className='mr-2 ml-2 mt-1 mb-1' >
      <a href='/en/galerija'>GALERI</a>
    </li>
    </ul>
    </div>
   </div>
   
   <div>
   <Link href={`${DOMAIN}/en/standardi`}> 
<div className={styles.zavodLogoContainer}>  <div className={styles.zavodLogo}>
  <NewLogo/>
   </div>
  
    </div></Link>
  </div>
</div>

<div className={styles.footercolor}>
 <hr className='' style={{color:'white',background:'white',opacity:'.5',margin:'1.5% 5%',marginBottom:'0'}}/>
     <div className=' small p-2' style={{textAlign:'center',justifyContent:'center' }}>
        &copy; 2022 {"  "}INSTITUTE FOR BIOCIDE AND MEDICAL ECOLOGY.{" "}ALL RIGHTS RESERVED.{" "}DESIGN {" "} 
        <a href='https://marijana-portfolio-website.web.app/'>
     <img src={`${DOMAIN}/static/images/devlogo.png`} style={{paddingBottom:'0.8%',opacity:'60%'}} />
        </a>
      </div>
      </div>
      </div>
  );
}