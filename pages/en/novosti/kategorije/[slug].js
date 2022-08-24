import React,{useEffect} from 'react';
import Head from 'next/head';
import Layout from '../../../../components/layout/LayoutEn';
import { singleCategory } from '../../../../actions/category';
import { API, DOMAIN, APP_NAME, } from '../../../../config';
import CategoryMenu from '../../../../components/categorymenu/CategoryMenuEn';
import Link from 'next/link';import renderHTML from 'react-render-html';
import moment from 'moment';
import styles from '../../../../styles/novosti.module.css'
import ScrollToTop from '../../../../components/ScroolToTop';

const Category = ({ category, blogs, query }) => {
    const head = () => (
        <Head>
            <title>
                {category.nameEn} | {APP_NAME}
            </title>
            <meta name="description" content={`${category.nameEn} | ${APP_NAME}`} />
            <link rel="canonical" href={`${DOMAIN}/en/novosti/kategorije/${query.slug}`} />
            <meta property="og:title" content={`${category.name}| ${APP_NAME}`} />
            <meta property="og:description" content={`${category.name}`} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/en/novosti/kategorije/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

        <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:type" content="image/png" />
        </Head>
    );  


    return (
<div>
  {head()}
 <Layout>
  <div className="container-fluid pt-2 pb-3  ">
   <header className='ml-5 mr-5'>
             <CategoryMenu/>
             <h2 className="  mt-3 " style={{color:'#8860d0',textTransform:'uppercase'}}>{category.nameEn}</h2>
     </header>
                     
   {blogs.length === 0 ? <p className='color' style={{textTransform:'uppercase',fontSize:'',color:'#c1c8e4'}}>Sorry, there are currently no news in this category</p> :
<div className='ml-5 mr-5' >
<hr className=''  style={{textTransform:'uppercase',fontSize:'small',color:'#c1c8e4'}} />
           <p style={{textTransform:'uppercase',fontSize:'small',color:'#c1c8e4'}} >Total {category.nameEn}
            <b style={{fontSize:'medium'}}>
                  {blogs.length}</b>
          </p>
       </div>  }
           <div className={styles.categorygrid} >
              {blogs.map((b, i) => (
             <article className='m-3'  data-aos="zoom-in"  style={{}}   key={i}>
               <figure class={styles.snip1361}>
                   <img alt="sample45"     src={b.photo === null ? `${DOMAIN}/static/images/piggybanner1.png` :  `${API}/blog/fotografija/${b.slug}` }
                     onError={image => (image.target.src = `${DOMAIN}/static/images/piggybanner1.png`)}/>
                   <figcaption> 
                        <h3 > <a style={{color:'#f9f7f2',textDecoration:'none'}}  href={`/en/novosti/${b.slug}`}>
                              {b.titleEn}  </a>  </h3>
                       <p  >{renderHTML(b.excerptEn)} </p>
                       <Link href={`/en/novosti/${b.slug}`}> 
                        <button className=' text-center btn m-2' style={{background:'#f9f7f2',color:'#8860d0'}} > 
                         read more</button> 
                        </Link>
                        <p className='pl-2' style={{fontSize:'x-small'}}>
                        PUBLISHED{' '}  {moment(b.updatedAt).locale('sr').format('DD.MM.YYYY')}
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




Category.getInitialProps = ({ query }) => {
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