import Layout from '../../components/layout/Layout';
import { withRouter } from 'next/router';
import { listAllNabavka,list } from '../../actions/nabavke';
import moment from 'moment';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from './../../config';

import NabavkeMenu from './../../components/nabavke/NabavkeMenu';
import { useState,useEffect } from 'react';
import styles from '../../styles/nabavke.module.css'


const Index = ({categoriesnabavke,nabavkes,tagnabavkes,totalnabavkes,nabavkesLimit}) => {
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
прикажи више набавки
       </button> 
            )
        );
    };

    const showAllNabavke = () => {
        return nabavkes.map((n, i) => {
            return (
                <ul  key={i}  className={styles.nabavke}>
         <li style={{fontSize:'large',marginBottom:'2%',textTransform:'none'}}> <a href={`${API}/nabavke/dokument/${n.slug}`}  className='text-white' //style={{color:'#5ab9ea',fontSize:'larger'}}
          >
                                    {n.titleSp} </a> </li>
                                     <li > {n.sifra === 'undefined' ? null : <a className={styles.smallGrid} ><b className='text-muted'>шифра</b><b style={{color:'white',textAlign:'right'}} > {n.sifra}</b></a>}</li>
          <li >{n.pocetak === 'undefined' ? null : <a className={styles.smallGrid} ><b className='text-muted'>датум објаве </b><b style={{color:'white',textAlign:'right'}}>{moment(n.pocetak).locale('sr').format('DD-MM-YYYY')}</b></a>} </li>
          <li >{n.kraj === 'undefined' ? null :  <a className={styles.smallGrid} ><b className='text-muted'>рок за доставу понуда</b> <b style={{color:'white',textAlign:'right'}}>{moment(n.kraj).locale('sr').format('HH:mm  DD-MM-YYYY ')}</b></a>}</li>
          <li><a className={styles.smallGrid} ><b className='text-muted'> контакт / понуде</b> 
          <b style={{color:'white',textAlign:'right'}}>{n.postedBy.email}</b></a></li>
                </ul>
            );
        });
    };


    const showLoadedNabavke = () => {
        return loadedNabavke.map((n, i) => {
            return (
                <ul  key={i}  className={styles.nabavke}>
                <li style={{fontSize:'large',marginBottom:'2%',textTransform:'none'}}> <a href={`${API}/nabavke/dokument/${n.slug}`}  className='text-white' //style={{color:'#5ab9ea',fontSize:'larger'}}
                 >
                                           {n.titleSp} </a> </li>
                                            <li > {n.sifra === 'undefined' ? null : <a className={styles.smallGrid} ><b className='text-muted'>шифра</b><b style={{color:'white',textAlign:'right'}} > {n.sifra}</b></a>}</li>
                 <li >{n.pocetak === 'undefined' ? null : <a className={styles.smallGrid} ><b className='text-muted'>датум објаве </b><b style={{color:'white',textAlign:'right'}}>{moment(n.pocetak).locale('sr').format('DD-MM-YYYY')}</b></a>} </li>
                 <li >{n.kraj === 'undefined' ? null :  <a className={styles.smallGrid} ><b className='text-muted'>рок за доставу понуда</b> <b style={{color:'white',textAlign:'right'}}>{moment(n.kraj).locale('sr').format('HH:mm  DD-MM-YYYY ')}</b></a>}</li>
                 <li><a className={styles.smallGrid} ><b className='text-muted'> контакт / понуде</b> 
          <b style={{color:'white',textAlign:'right'}}>{n.postedBy.email}</b></a></li>
                       </ul>
            );
        });
    };


    return (
        <>
        <Layout>
     <div className="container-fluid  " style={{minHeight:'55vh'}}>
         <div className='pt-4 pb-4'>
     <div className={styles.containerGrid}>

     <div className=' ' >
         <div className='container-fluid' >
             <div className=''>
        <h2 className=" font-weight-bold text-uppercase  text-muted pl-4 pr-4" style={{color:'#5ab9ea'}}>СВЕ набавке</h2>          
          <div>
             {nabavke.length === 0 ? <p className='text-muted pt-4 pl-4' style={{textTransform:'uppercase',fontSize:'',color:'#5ab9ea'}}>
                 ТРЕНУТНО НЕМА НАБАВКИ </p> :
             <p className='text-muted  pl-4' style={{textTransform:'uppercase',fontSize:'small',textAlign:'',color:'#5ab9ea',}} >
                 укупно набавки:{" "} <b style={{fontSize:'medium'}}> {nabavke.length} </b> </p>}
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