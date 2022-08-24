import Layout from '../../components/layout/LayoutLat';
import Link from 'next/link';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import { withRouter } from 'next/router';
import Head from 'next/head';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import { useEffect,useState } from 'react';
import 'react-slideshow-image/dist/styles.css';
import renderHTML from 'react-render-html';
import moment from 'moment';
import styles from '../../styles/styles.module.css'
import { Zoom,Fade,Slide } from 'react-slideshow-image';
import { Button } from 'reactstrap';
import { listPin } from '../../actions/pin';
import { listPinmali } from '../../actions/pinmali';
import { list,listPocetnaPin } from '../../actions/pocetna';
import AOS from "aos";
import "aos/dist/aos.css";

const Index = ({categories,blogs,pocetnas}) => {

    const head = () => (
        <Head>
            <title>
             {APP_NAME}
            </title>
            <meta name="description" content='Trebevićka 16. Laboratoriske usluge, usluge dezinfekcije, dezinsekcije i deratizacije, suzbijanje ambrozije, usluge sterilizacije u komori za sterilizaciju. COVID-19 testiranje i vakcinacija. Kursevi za dobijanje licenci i relicenci iz oblasti DDD i FUMIGACIJE.' />
            <link rel="canonical" href={`${DOMAIN}`} />
            <meta property="og:title" content={`${APP_NAME}`} />
            <meta property="og:description" content='Trebevićka 16. Laboratoriske usluge, usluge dezinfekcije, dezinsekcije i deratizacije, suzbijanje ambrozije, usluge sterilizacije u komori za sterilizaciju. COVID-19 testiranje i vakcinacija. Kursevi za dobijanje licenci i relicenci iz oblasti DDD i FUMIGACIJE.' />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
            <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
            <meta property="og:image:type" content="image/png" />
     
        </Head>
    );


    const zoomInProperties = {
        indicators: false,
        arrows:true,infinite:true,
    prevArrow: <div style={{width: "", marginleft:'',background:'',textAlign:'center',fontSize:'50px',paddingLeft:'1.5%',fontWeight:''}} className={styles.caret} > <i class='fa fa-angle-left'></i></div>,
    nextArrow: <div style={{width: "", marginLeft: "",background:'',textAlign:'right',fontSize:'50px',paddingRight:'1.5%'}} className={styles.caret} > <i class='fa fa-angle-right'></i> </div>,
      
      }
     
   
    const [pocetna, setpocetnas] = useState([]);
    const [pins, setpins] = useState([]);
    const [pinmali, setPinmali] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            console.log('You are on the browser')
            // ✅ Can use window here
          } else {
            console.log('You are on the server')
            // ⛔️ Don't use window here
          }
          AOS.init({
            duration : 2000 , offset:150,
          });
          AOS.refresh();

         loadpocetnas();
        loadpins();
        loadPinmali();
    }, []);


   

    const loadpocetnas = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
                Router.replace(`/404`);
            } else {
                setpocetnas(data);
            }
        });
    };

    const loadpins = () => {
        listPin().then(data => {
            if (data.error) {
                console.log(data.error);    
                Router.replace(`/404`);
            } else {
                setpins(data);
            }
        });
    };

    const loadPinmali = () => {
        listPinmali().then(data => {
            if (data.error) {
                console.log(data.error);
                Router.replace(`/404`);
            } else {
                setPinmali(data);
            }
        });
    };

    const slidePin = () => {
        return pins.map((p, i) => {
            return (
                <div key={i}   >
                      <figure className={styles.pinslajdslajd} >
                      {p.titleLat ? 
              <img alt=""  style={{}}  src={`${API}/pin/photo/${p.slug}`}   onError={image => (image.target.src = `${DOMAIN}/static/images/logo.png`)}  />
              :  
              <a href={ p.linkRef  ?  p.linkRef  : null}>    <img alt=""    src={`${API}/pin/photo/${p.slug}`}   onError={image => (image.target.src = `${DOMAIN}/static/images/logo.png`)}  /></a>
                        
                        }
              <figcaption >
             {
                  p.titleLat ? 
              <a href={p.linkRef  ?  p.linkRef  : null }>
          <div    style={{borderTopRightRadius:'9%',borderBottomLeftRadius:'9%'}}   >

                  <h3 style={{cursor:'pointer'}}><span className='p-0 m-0'>{p.titleLat}</span></h3>
                  {p.bodyLat ? 
                 <p style={{cursor:'pointer'}}  className="">{ renderHTML(p.bodyLat)}</p> : null }
                
       
          </div>    
              </a>
       : null }
              </figcaption>
          </figure>
         </div>
            );
        });
    };
  







    const showPin1 = () => {
      return pocetna.map((p, i) => {
          return (
              <div   key={i}  style={{background:'transparents'}}>
           {p.title=== 'pin-1' ? 
                <div className='' > 
                 <figure className={styles.pinslajd} >         <a href={p.linkRef === 'undefined' ? ' ' : p.linkRef }>
            <img alt=""  // style={{borderTopLeftRadius:'9%',borderBottomRightRadius:'9%'}} 
              src={`${API}/pocetna/photo/${p.slug}`}   onError={image => (image.target.src = `${DOMAIN}/static/images/lpgo.png`)} /></a>
            <figcaption>  {
                  p.titleLat  ?  
            <a href={p.linkRef === 'undefined' ? ' ' : p.linkRef }>
        <div     className=' ' style={{borderRadius:'',right:'0',cursor:'pointer',
       // borderTopLeftRadius:'9%',borderBottomRightRadius:'9%'
       borderTopRightRadius:'9%',borderBottomLeftRadius:'9%' }}>
               <h2 className=''>{p.titleLat}</h2>
                <p className="">{p.bodyLat=== 'undefined' ||  null ? null : renderHTML(p.bodyLat)}</p>
            </div>         
               </a>
    : null    }
            </figcaption>
        </figure>
           </div> : null
          }
              </div>
          );
      });
  };



  const showPin2 = () => {
    return pocetna.map((p, i) => {
        return (
            <div   key={i}  style={{borderRadius:''}}>
         {p.title=== 'pin-2' ? 
              <div className=''  > 
               <figure className={styles.pinslajd} >
               <a href={p.linkRef === 'undefined' ? ' ' : p.linkRef }>
          <img alt="" // style={{borderTopRightRadius:'9%',borderBottomLeftRadius:'9%'}} 
            src={`${API}/pocetna/photo/${p.slug}`}   onError={image => (image.target.src = `${DOMAIN}/static/images/lpgo.png`)} /></a>
          <figcaption>  {
                p.titleLat ?
          <a href={p.linkRef === 'undefined' ? ' ' : p.linkRef }>
      <div   className=' ' style={{background:' rgb(26, 28, 26,.3)',borderRadius:'',left:'0',cursor:'pointer',borderTopRightRadius:'9%',borderBottomLeftRadius:'9%'}}>
             <h2 className=''>{p.titleLat}</h2>
              <p className="">{p.bodyLat=== 'undefined' ||  null ? null : renderHTML(p.bodyLat)}</p>
          </div>         
             </a>
    : null  }
          </figcaption>
      </figure>
         </div> : null
        }
            </div>
        );
    });
};


const showSmallPin = () => {
    return pinmali.map((pmali, i) => {
        return (
       
          <div  data-aos="zoom-in"  key={i}  className={styles.margin13612}>
              <a href={`${pmali.linkRef}`}  style={{outline:'none',textDecoration:'none',}}>
          <figure className={styles.snippin} >
     
          <figcaption>
              <div className=' ' style={{display:''}} >    
              <h3 className='  '> <a>{pmali.titleLat}</a></h3>
              <br/>
                               {pmali.bodyLat === 'undefined' || null || '' ? 
                                <p  className='text-dark' style={{textTransform:'uppercase',fontSize:'small' }}>zavod za biocide i <br/>medicinsku ekologiju</p> :
               <p className='text-dark  ' style={{textTransform:'uppercase',fontSize:'small' }} >{renderHTML(pmali.bodyLat) }</p>       }
          </div>
          </figcaption>
      </figure>
                </a> 
      </div>
        );
    });
};

    const showRecentBlogs = () => {
      return blogs && blogs.map((blog, i) => {
          return (
              <article data-aos="zoom-in"  className={styles.margin13612}   key={i}>
                 <figure class={styles.snip13612}>
  <img alt="novosti"    src={blog.photo === null ? `${DOMAIN}/static/images/3d.png` :  `${API}/blog/fotografija/${blog.slug}` }
        onError={image => (image.target.src = `${DOMAIN}/static/images/3d.png`)}/>
  <figcaption className='mb-2'>
          <Link  href={`/lat/novosti/${blog.slug}`}> 
    <h3>{blog.title}</h3>
    </Link>
   <div>
   <p>{renderHTML(blog.excerpt)}</p> 
   <Link  href={`/lat/novosti/${blog.slug}`}> 
           <Button  className=' text-center  btn ml-1' style={{background:'#f9f7f2',color:'#8860d0',border:'none',textTransform:'uppercase',fontSize:'x-small'}}
            > <b>pročitaj više</b></Button> 
     </Link>
     <p style={{fontSize:'x-small'}} className='ml-1'>
         {moment(blog.updatedAt).locale('sr').format('DD.MM.YYYY')} </p>
            </div>                    
  </figcaption>
</figure>
              </article>
          );
      });
  };


    return (
      <div>
        {head()}
<Layout>

      <div className=''>
      
      <div  style={{display:'block',justifyContent:'center',textAlign:'center',alignContent:'center',alignItems:'center',padding:'0 ',borderRadius:''}} className='mt-4'  >
      <Zoom  scale={1.2}  easing="ease" {...zoomInProperties}>{slidePin()}</Zoom>
      </div>
      <div  style={{margin:'3% 0'}} className='bg-light pb-3'>
      <div data-aos="" style={{padding:'0 5%',background:''}} >

<h3  className='pt-2'
style={{   width: '100%', 
textAlign: 'left',textTransform:'uppercase',color:'rgb(58, 175, 169)',fontSize:'',fontWeight:'400'

}}
> izdvajamo</h3>
   </div>
      <div  className={styles.malipin} style={{margin:'0 4%'}}> {showSmallPin()}</div>
    
</div>

      <div style={{margin:'5% 0',padding:'0%'}}>{showPin1()}</div>
      
      <div    className='' style={{margin:'5% 0',color:'#8860d8'}}>
             <div className=''>
          <div data-aos="" style={{padding:'0 5%',background:''}} >

             <h3  className=''
             style={{   width: '100%', 
             textAlign: 'left',textTransform:'uppercase'
    
            }}
            > poslednje novosti</h3>
          </div>
           <div  className={styles.novenovosti}  style={{margin :'0 3%'}}> {showRecentBlogs()}</div>
       
       <div  data-aos="" style={{padding:'0 7%'}}   >
             <h5  style={{width: '100%', 
                textAlign: 'right',
         }}
            >  <a style={{color:'#8860d8', textDecoration:'none',fontSize:'small',textTransform:'uppercase'}} href='/novosti'>
                 sve novosti 
                 </a>
              </h5>
           </div>  
         </div>
        </div>   
         
     <div className='' style={{margin:'5% 0'}}>{showPin2()} </div>

 </div>
</Layout>
  </div>
    );
};

Index.getInitialProps = () => {
    let skip = 0;
    let limit = 4;
    return listBlogsWithCategoriesAndTags (skip, limit).then(data => {
       if ( data.error) {
        return {
            redirect: {
              destination: "/404",
            },
        }
        } 
       //  if (data === undefined){
          //   null
        // }
        else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip,
                pocetnas:data.pocetnas
            };
        }
    });
    
};


export default withRouter(Index);