import Layout from '../../../components/layout/LayoutLat';
import { withRouter } from 'next/router';
import { listPreparati } from '../../../actions/preparati';
import Link from 'next/link';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config';
import styles from '../../../styles/ostalo.module.css'
import ScrollToTop from '../../../components/ScroolToTop';
import Head from 'next/head';
const Index = ({categoriespreparati,preparatis,router}) => {
    const head = () => (
        <Head>
        <title>Registrovani preparati | {APP_NAME}</title>
        <meta
            name="description"
            content="Svi registrovani preparati, bezbedonosno tehnički list, interni,eksterni, rešenja"/>
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta property="og:title" content={`Registrovani preparati |  ${APP_NAME}`} />
        <meta property="og:description" content="Svi registrovani preparati, bezbedonosno tehnički list, interni,eksterni, rešenja"/>
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:type" content="image/png" />
    </Head>
    );
    const showAllPreparati = () => {
        return preparatis.map((p, i) => {
            return (
                <a href={`${API}/preparati/dokument/${p.slug}`}  style={{textDecoration:'none'}}  className='text-center text-muted' > 
                <div key={i} className={styles.preparati} style={{background:'rgb(193, 200, 228,.3)'}}>
                      <b style={{marginRight:'1.5%',fontSize:'larger',color:''}}>  <i class="far fa-file-alt"></i></b>{p.title} 
                </div>
                       </a>
            );
        });
    };
 
   
    const showAllCategories = () => {
        return categoriespreparati.map((c, i) => (
            <Link href={`/lat/registrovani-preparati/${c.slug}`} key={i}>
                <a className="btn mr-1 ml-1 mt-2 mb-2 p-0 pl-2 pr-2 " style={{color:'#f9f7f2',backgroundColor:'rgb(193, 200, 228)',textTransform:'uppercase'}}><b>{c.name}</b></a>
            </Link>
        ));
    };

   
    return (
        <>{head()}
        <Layout>
        <main style={{backgroundColor:'#f9f7f2',backgroundColor:'',margin:' 0'}} >
    <div className="container-fluid ">
     <header style={{margin:'0 4%'}} >                                    
     <div className='pb-4'  >
         <Link href={`/lat/registrovani-preparati`} >
                <a className="btn mr-1 ml-1 mt-2 mb-2 p-0 pl-2 pr-2  " style={{border:'solid #c1c7e4 2px',color:'rgb(193, 200, 228)',textTransform:'uppercase'}}
                ><b>svi preparati</b></a>
            </Link> {showAllCategories()}
            </div>
            <div>
             <h2  style={{color:'#3aafa9',color:'#3aafa9',textTransform:'uppercase'}} className='text-muted'
             >registrovani preparati</h2>
           </div>      <hr className='' style={{color:'#c1c7e4'}}/>
             {preparatis.length === 0 ? <p className='pt-4' style={{textTransform:'uppercase',fontSize:'',color:'rgb(193, 200, 228)'}}>Trenutno nema registrovanih preparata u ovoj kategoriji</p> :
              <p className=' pt-2 ' style={{textTransform:'uppercase',fontSize:'small',textAlign:'',color:'rgb(193, 200, 228)'}} >
                  ukupno registrovanih preparata:{" "} <b style={{fontSize:'medium'}}>
                         {preparatis.length} </b> </p>}
                 </header>
                 </div>
             
         <div className="container-fluid  mb-5" >
         <div className={styles.preparatiGrid}>
               {showAllPreparati()}
         </div>
         </div>
   </main><ScrollToTop/>
  </Layout>
  </>
    );
};


Index.getInitialProps = () => {
    let skip = 0;
    let limit = 200;
    return listPreparati(skip, limit).then(data => {
       if (data.error) {
           console.log(data.error);} 
       //  if (data === undefined){
          //   null
        // }
        else {
            return {
                preparatis: data.preparatis,
                categoriespreparati: data.categoriespreparati,
                totalpreparatis: data.size,
                preparatisLimit: limit,
                preparatiskip: skip
            };
        }
    });
};



export default withRouter(Index);