import Layout from '../../components/layout/LayoutLat';
import Head from 'next/head';
import { API, DOMAIN, APP_NAME} from './../../config';
import { useEffect,useState } from 'react';
import renderHTML from 'react-render-html';
import { list } from '../../actions/ostalo';
import styles from '../../styles/ostalo.module.css'


const Contact=()=>{
    const head = () => (
        <Head>
            <title>
             Kontakt | {APP_NAME}
            </title>
            <meta name="description" content='Zavod za biocide i medicinsku ekologiju | radno vreme i kontakt informacije ' />
            <link rel="canonical" href={`${DOMAIN}`} />
            <meta property="og:title" content={`Kontakt| ${APP_NAME}`}/>
            <meta property="og:description" content='Zavod za biocide i medicinsku ekologiju | radno vreme i kontakt informacije ' />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
            <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
            <meta property="og:image:type" content="image/png" />
  
        </Head>
    );


    const [ostalo, setostalos] = useState([]);

    useEffect(() => {
        loadostalos();
    }, []);

    const loadostalos = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setostalos(data);
            }
        });
    };

   


    const showKontakt = () => {
      return ostalo.map((o, i) => {
          return (
              <div key={i}  className=' text-muted' style={{color:''}}>
{o.title=== 'kontakt' ? 
                <div className={styles.kontaktContainer}>   <div className={styles.kontaktcolumn}><iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.7067575047186!2d20.415000115534244!3d44.76639487909889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a6e2bf7b713c1%3A0x2c9f5a628fdbbd04!2sZavod%20za%20biocide%20i%20medicinsku%20ekologiju!5e0!3m2!1ssr!2srs!4v1657492484339!5m2!1ssr!2srs" 
              className='' style={{width:'100%', height:'100%',minHeight:'30vh'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                  <div  className={styles.kontaktcolumn} > 
                  <div style={{display:'inline-flex' ,}}>
                  <img  style={{height:'',maxWidth:'100%',maxHeight:'60px',boxShadow:'rgb(38, 57, 77,.5) 0px 1px 10px 1px'}} className='' src={`${DOMAIN}/static/images/icon.png`}/>
                  <h4 style={{ margin: 'auto',padding:'0 10px'}}>ZAVOD ZA BIOCIDE I <br/> MEDICINSKU EKOLOGIJU</h4>
                  </div>
                   <div className='mt-3 pl-2'>
                       {renderHTML(o.bodyLat)}</div>
                   </div>
                
           </div> : null
          }
              </div>
          );
      });
  };

    return (
      <div>
     {head()}
        <Layout>
<div className='m-3' style={{minHeight:'50vh'}}>
{showKontakt()}
</div>
      
  
  </Layout>
  </div>
    );
};
export default Contact;