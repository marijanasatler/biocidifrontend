import React,{useEffect,useState} from 'react';
import Head from 'next/head';
import Layout from '../../../../components/layout/LayoutLat';
import { singleCategory } from '../../../../actions/category';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../../config';
import CategoryMenu from '../../../../components/categorymenu/CategoryMenuLat';
import Link from 'next/link';import renderHTML from 'react-render-html';
import moment from 'moment';
import styles from '../../../../styles/novosti.module.css'
import ScrollToTop from '../../../../components/ScroolToTop';

const Category = ({ category, blogs, query }) => {
    const head = () => (
        <Head>
            <title>
                {category.name} | {APP_NAME}
            </title>
            <meta name="description" content={`${category.name}`} />
            <link rel="canonical" href={`${DOMAIN}/lat/novosti/kategorije/${query.slug}`} />
            <meta property="og:title" content={`${category.name}| ${APP_NAME}`} />
            <meta property="og:description" content={`${category.name}`} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
           <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/zavodlogo.png`} />
            <meta property="og:image:type" content="image/png" />
          
        </Head>
    );  

    const [loading,showLoading] = useState(true  );
    const Loading = () => (loading ? <div className={styles.loading}>  <div className={styles.loader}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h5  >Stranica se učitava, molimo sačekajte</h5></div> : null);
    
    useEffect(() => {
      showLoading(false);
        AOS.init({
            duration : 2000
          });
          AOS.refresh();

    }, []);


    return (
<div>
  {head()}
 <Layout>
  <div className="container-fluid pt-2 pb-3  ">
  {Loading()}
   <header className='ml-5 mr-5'>
             <CategoryMenu/>
             <h2 className="  mt-3 " style={{color:'#8860d0',textTransform:'uppercase'}}>{category.name}</h2>
     </header>
                     
   {blogs.length === 0 ? <p className='color' style={{textTransform:'uppercase',fontSize:'',color:'#c1c8e4'}}>Žao nam je trenutno nema novosti u ovoj kategoriji</p> :
<div className='ml-5 mr-5' >
<hr className=''  style={{textTransform:'uppercase',fontSize:'small',color:'#c1c8e4'}} />
                          <p style={{textTransform:'uppercase',fontSize:'small',color:'#c1c8e4'}} >Ukupno {category.name} <b style={{fontSize:'medium'}}>
                         {blogs.length}
                             </b>
                         </p>
                         </div>  }
                            <div className={styles.categorygrid} >
                                {blogs.map((b, i) => (
                              <article className='m-3' data-aos="zoom-in"   key={i}>
                              <figure class={styles.snip1361}>
                   <img alt="sample45"     src={b.photo === null ? `${DOMAIN}/static/images/piggybanner1.png` :  `${API}/blog/fotografija/${b.slug}` }
                     onError={image => (image.target.src = `${DOMAIN}/static/images/piggybanner1.png`)}/>
                   <figcaption>
                          <h3 >
                    <a style={{color:'#f9f7f2',textDecoration:'none'}}  href={`/lat/novosti/${b.slug}`}>
                              {b.title}  </a>  </h3>
                       <p  >{renderHTML(b.excerpt)} </p>
                       <Link href={`/lat/novosti/${b.slug}`}> 
                        <button className=' text-center btn m-2' style={{background:'#f9f7f2',color:'#8860d0'}}
                         > pročitaj vise</button> 
                        </Link><p className='pl-2' style={{fontSize:'x-small'}}>
                                   OBJAVLJENO{' '}
                                   {moment(b.updatedAt).locale('sr').format('DD.MM.YYYY')}
                                   </p>         
                   </figcaption>
                  </figure>
              </article> ))}
          </div>
      </div><ScrollToTop/>
     </Layout>
            </div>
    );
};




Category.getInitialProps = ({ query}) => {
    return singleCategory(query.slug).then(data => {
       if (data.error) {
           console.log(data.error); } 
          //  if (data === undefined){
             //   null
           // }
            else {
            return { category: data.category, blogs: data.blogs, query };
        }    
       
    });
};

export default Category;