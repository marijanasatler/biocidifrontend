import Layout from '../../../components/layout/LayoutEn';
import { withRouter } from 'next/router';
import { listAllNabavka,list } from '../../../actions/nabavke';
import moment from 'moment';
import { API, DOMAIN, APP_NAME} from '../../../config';
import Head from 'next/head';
import NabavkeMenu from './../../../components/nabavke/NabavkaMenuEn'
import { useState,useEffect } from 'react';
import styles from '../../../styles/nabavke.module.css'


const Index = ({categoriesnabavke,nabavkes,tagnabavkes,totalnabavkes,nabavkesLimit,router}) => {


    const head = () => (
        <Head>
        <title>All procurement | {APP_NAME}</title>
        <meta
            name="description"
            content="All procurement"/>
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta property="og:title" content={`All procurement | ${APP_NAME}`} />
        <meta property="og:description" content="All procurement"/>
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:type" content="image/png" />
    </Head>
    );





    const [limit, setLimit] = useState(nabavkesLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalnabavkes);
    const [loadedNabavke, setLoadedNabavke] = useState([]);


    const [nabavke, setNabavkes] = useState([]);

    useEffect(() => {
        loadNabavkes();
 
    }, []);

    const loadNabavkes = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setNabavkes(data);
             
            }
        });
    };


    const loadMore = () => {
        let toSkip = skip + limit;
        listAllNabavka(toSkip, limit).then(data => {
           // if (data.error) {
             //   console.log(data.error); }
             if (data === undefined){
                 null
             }
            else {
                setLoadedNabavke([...loadedNabavke, ...data.nabavkes]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
              
       <button className=' btn p-1' style={{textTransform:'uppercase',background:'#84ceeb',color:'white'}}   onClick={loadMore}   >
prikaži više nabavki
       </button> 
            )
        );
    };

    const showAllNabavke = () => {
        return nabavkes.map((n, i) => {
            return (
                <ul  key={i}  className={styles.nabavke}>
         <li style={{fontSize:'large',marginBottom:'2%',textTransform:'none'}}> <a href={`${API}/nabavke/dokument/${n.slug}`}  className='text-white'
          > {n.titleEn} </a> </li>
                                     <li > {n.sifra === 'undefined' ? null : <a className={styles.smallGrid} ><b className='text-muted'>code</b><b style={{color:'white',textAlign:'right'}} > {n.sifra}</b></a>}</li>
          <li >{n.pocetak === 'undefined' ? null : <a className={styles.smallGrid} ><b className='text-muted'>publication date</b><b style={{color:'white',textAlign:'right'}}>{moment(n.pocetak).locale('sr').format('DD-MM-YYYY')}</b></a>} </li>
          <li >{n.kraj === 'undefined' ? null :  <a className={styles.smallGrid} ><b className='text-muted'>deadline for offers</b> <b style={{color:'white',textAlign:'right'}}>{moment(n.kraj).locale('sr').format('HH:mm  DD-MM-YYYY ')}</b></a>}</li>
          <li><a className={styles.smallGrid} ><b className='text-muted'> contact/offers</b> 
          <b style={{color:'white',textAlign:'right',textTransform:' lowercase'}}>{n.postedBy.email}</b></a></li>
                </ul>
            );
        });
    };


    const showLoadedNabavke = () => {
        return loadedNabavke.map((n, i) => {
            return (
                <ul  key={i}  className={styles.nabavke}>
                <li style={{fontSize:'large',marginBottom:'2%',textTransform:'none'}}> <a href={`${API}/nabavke/dokument/${n.slug}`}  className='text-white' 
                 > {n.titleEn} </a> </li>
                                           <li > {n.sifra === 'undefined' ? null : <a className={styles.smallGrid} ><b className='text-muted'>code</b><b style={{color:'white',textAlign:'right'}} > {n.sifra}</b></a>}</li>
          <li >{n.pocetak === 'undefined' ? null : <a className={styles.smallGrid} ><b className='text-muted'>publication date</b><b style={{color:'white',textAlign:'right'}}>{moment(n.pocetak).locale('sr').format('DD-MM-YYYY')}</b></a>} </li>
          <li >{n.kraj === 'undefined' ? null :  <a className={styles.smallGrid} ><b className='text-muted'>deadline for offers</b> <b style={{color:'white',textAlign:'right'}}>{moment(n.kraj).locale('sr').format('HH:mm  DD-MM-YYYY ')}</b></a>}</li>
          <li><a className={styles.smallGrid} ><b className='text-muted'> contact/offers</b> 
          <b style={{color:'white',textAlign:'right',textTransform:' lowercase'}}>{n.postedBy.email}</b></a></li>
                </ul>
            );
        });
    };


    return (
        <>
        {head()}
        <Layout>
     <div className="container-fluid  " style={{minHeight:'55vh'}}>
         <div className='pt-4 pb-4'>
     <div className={styles.containerGrid}>

     <div className=' ' >
         <div className='container-fluid' >
             <div className=''>
        <h2 className=" font-weight-bold text-uppercase  text-muted pl-4 pr-4" style={{color:'#5ab9ea'}}>ALL PROCUREMENT</h2>          
          <div>
             {nabavke.length === 0 ? <p className='text-muted pt-4 pl-4' style={{textTransform:'uppercase',fontSize:'',color:'#5ab9ea'}}>
             THERE ARE CURRENTLY NO PROCUREMENTS </p> :
             <p className='text-muted  pl-4' style={{textTransform:'uppercase',fontSize:'small',textAlign:'',color:'#5ab9ea',}} >
               TOTAL PROCUREMENTS:{" "} <b style={{fontSize:'medium'}}> {nabavke.length} </b> </p>}
                 </div>  
           <div className='' >
          <div className={styles.gridSistem} >  {showAllNabavke()}  </div>
         
          <div className={styles.gridSistem} >{showLoadedNabavke()}</div>
                    <div className="text-left m-4">{loadMoreButton()}</div>         
           </div>      
         </div>
     </div>
    </div> <div className={styles.menuBorder}>
<div className='' style={{position:'sticky',top :'0'}}>
   <NabavkeMenu/></div>
</div> 
</div>      
 </div>
  </div>
  </Layout>
  </>
    );
};


Index.getInitialProps = () => {
    let skip = 0;
    let limit = 6;
    return listAllNabavka(skip, limit).then(data => {
       if (data.error) {
           console.log(data.error);} 
       //  if (data === undefined){
          //   null
        // }
        else {
            return {
                nabavkes: data.nabavkes,
                categoriesnabavke: data.categoriesnabavke,
                tagnabavkes:data.tagnabavkes,
                totalnabavkes: data.size,
                nabavkesLimit: limit,
                nabavkeskip: skip
            };
        }
    });
};



export default withRouter(Index);