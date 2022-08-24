import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { useState,useEffect } from 'react';
import { listBlogsWithCategoriesAndTags,list } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import CategoryMenu from '../../components/CategoryMenu';
import renderHTML from 'react-render-html';
import Link from 'next/link';
import moment from 'moment';
import styles from '../../styles/novosti.module.css'

const Blogs = ({ blogs, categories, totalBlogs, blogsLimit, blogSkip, router,title }) => {
    const head = () => (
        <Head>
            <title>Sve novosti | {APP_NAME}</title>
            <meta
                name="description"
                content="Sve novosti zavoda za biocide i medicinsku ekologiju" />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Sve novosti | ${APP_NAME}`} />
            <meta property="og:description" content="Sve novosti zavoda za biocide i medicinsku ekologiju" />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
            <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
            <meta property="og:image:type" content="image/png" />
        </Head>
    );


    const [loading,showLoading] = useState(true  );
    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);
    const [bloglist, setbloglists] = useState([]);

    useEffect(() => {
        loadbloglists();
   }, []);

   
   const loadbloglists = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setbloglists(data);
                showLoading(false);
            }
        });
    };

    const loadMore = () => {
    let toSkip = skip + limit;
     listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
   // if (data.error) {
   //   console.log(data.error); }
       if (data === undefined){
           null
         }
      else {
           setLoadedBlogs([...loadedBlogs, ...data.blogs]);
           setSize(data.size);
           setSkip(toSkip);
            }
        });
    };


    const Loading = () => (loading ? <div className={styles.loading}>  <div className={styles.loader}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h5  >Страница се учитава, молимо сачекајте</h5></div> : null);


    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (    
       <div className='text-right small ' 
       style={{background:'',color:'#8860d0',textTransform:'uppercase',cursor:'pointer'}}  
       onClick={loadMore}  >
           прикажи више новости 
         </div>
         )
        );
    };

      const showAllBlogs = () => {
        return blogs && blogs.map((blog, i) => {
            return (
                <article  data-aos="zoom-in"  className='m-3'  key={i}>
                <figure style={{boxShadow: ''}}   className={styles.snip1361}>
       <img alt="zavodzabiocide"    src={blog.photo === null ? `${DOMAIN}/static/images/piggybanner1.png` :  `${API}/blog/fotografija/${blog.slug}` }
       onError={image => (image.target.src = `${DOMAIN}/static/images/piggybanner1.png`)}/>
              <figcaption>
       <h3> <a style={{color:'#f9f7f2',textDecoration:'none'}}  href={`/novosti/${blog.slug}`}> {blog.titleSp}</a></h3>
      
       <p >{renderHTML(blog.excerptSp)}</p>

     <Link href={`/novosti/${blog.slug}`}> 
      <button className=' text-center m-2 btn' 
      style={{background:'#f9f7f2',color:'#8860d0'}}>
            прочитај више</button> 
      </Link>
      <p className='pl-2' 
       style={{fontSize:'x-small'}}>
           објављено{' '}
           {moment(blog.updatedAt).locale('sr').format('DD.MM.YYYY')}
       </p>                            
     </figcaption>
       </figure>
         </article>
            );
        });
    };

 
    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => (
            <article   data-aos="zoom-in" className='m-3'  key={i}>
            <figure style={{boxShadow: ''}}   className={styles.snip1361}>
   <img alt="zavodzabiocide"    src={blog.photo === null ? `${DOMAIN}/static/images/piggybanner1.png` :  `${API}/blog/fotografija/${blog.slug}` }
   onError={image => (image.target.src = `${DOMAIN}/static/images/piggybanner1.png`)}/>
          <figcaption>
   <h3> <a style={{color:'#f9f7f2',textDecoration:'none'}}  href={`/novosti/${blog.slug}`}> {blog.titleSp}</a></h3>
  
   <p >{renderHTML(blog.excerptSp)}</p>

 <Link href={`/novosti/${blog.slug}`}> 
  <button className=' text-center m-2 btn' 
  style={{background:'#f9f7f2',color:'#8860d0'}}>
        прочитај више</button> 
  </Link>
  <p className='pl-2' 
   style={{fontSize:'x-small'}}>
       објављено{' '}
       {moment(blog.updatedAt).locale('sr').format('DD.MM.YYYY')}
   </p>                            
 </figcaption>
   </figure>
     </article>
        ));
    };

    return (
     <React.Fragment>
       {head()}
        <Layout>
     <div className="cotainer-fluid pt-2 pb-3 ">
       {Loading()}
          <div className=''>
        <header className='text-left ml-5 mr-5'> 
         <CategoryMenu/>             
        <h2 className="  mt-3 " style={{color:'#8860d0'}}> СВЕ НОВОСТИ</h2>
           </header>       
        
          <div className=' ml-5 mr-5'>
         {bloglist.length === 0 ? <p className='' style={{textTransform:'uppercase',fontSize:'',color:'#c1c8e4'}}> жао нам је тренутно нема новост</p> :
        <div>
      <hr className=''  style={{textTransform:'uppercase',fontSize:'small',color:'#c1c8e4'}} />

     <p className='pb-0 mb-0' style={{textTransform:'uppercase',fontSize:'small',color:'#c1c8e4'}} >
         укупно новости 
    <b style={{fontSize:'medium'}}>
       {bloglist.length}
    </b>
     </p>
   </div>
}
</div>
   
   <div className='' >
         <div  className={styles.categorygrid}> {showAllBlogs()}</div>
        <div className={styles.categorygrid}  >{showLoadedBlogs()}</div>
       <div className="text-center  mr-3 pr-5">{loadMoreButton()}</div>
       </div>
       </div>       
      </div>

        </Layout>
   </React.Fragment>

);
};

Blogs.getInitialProps = () => {
    let skip = 0;
    let limit = 9;
    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error); }
       //  if (data ===undefined ){
         //    null
         //}
             else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                recommendeds:data.recommendeds ,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip
            };
        }
    });
};

export default withRouter(Blogs);