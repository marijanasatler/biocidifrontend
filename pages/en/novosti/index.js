import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import Layout from '../../../components/layout/LayoutLat';
import { API, DOMAIN, APP_NAME} from '../../../config';
import ScrollToTop from '../../../components/ScroolToTop';
import { useState,useEffect } from 'react';
import { listBlogsWithCategoriesAndTags,list } from '../../../actions/blog';
import styles from '../../../styles/novosti.module.css'
import CategoryMenu from '../../../components/categorymenu/CategoryMenuEn';
import renderHTML from 'react-render-html';
import Link from 'next/link';
import moment from 'moment';

const Blogs = ({ blogs, categories, totalBlogs, blogsLimit, blogSkip, router,title }) => {
    const head = () => (
        <Head>
        <title> All news | {APP_NAME}</title>
        <meta
            name="description"
            content="News and notices" />
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta property="og:title" content={`All news | ${APP_NAME}`} />
        <meta
            property="og:description"
            content="News and notices" />
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:type" content="image/png" />
    </Head>
    );


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



    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (     
       <div className='text-right small ' style={{background:'',color:'#8860d0',textTransform:'uppercase',cursor:'pointer'}} 
        onClick={loadMore}   >
        show more news
       </div>
            )
        );
    };


    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <article   data-aos="zoom-in"    className='m-3'  key={i}>     
            <figure style={{boxShadow: ''}}   className={styles.snip1361}>
          <img alt="zavodzabiocide"    src={blog.photo === null ? `${DOMAIN}/static/images/piggybanner1.png` :  `${API}/blog/fotografija/${blog.slug}` }
          onError={image => (image.target.src = `${DOMAIN}/static/images/piggybanner1.png`)}/>
           <figcaption>
        <h3>  <a style={{color:'#f9f7f2',textDecoration:'none'}}  href={`/en/novosti/${blog.slug}`}> {blog.titleEn}</a></h3>

         <p >{renderHTML(blog.excerptEn)} </p>

     <Link href={`/en/novosti/${blog.slug}`}> 
      <button className=' text-center m-2 btn' style={{background:'#f9f7f2',color:'#8860d0'}}> 
       read more</button> 
      </Link>
      <p className='pl-2' style={{fontSize:'x-small'}}>
      PUBLISHED{' '} {moment(blog.updatedAt).locale('sr').format('DD.MM.YYYY')}</p>
                              
     </figcaption>
      </figure>
         </article>
            );
        });
    };

 
    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => (
            <article   data-aos="zoom-in"    className='m-3'  key={i}>     
            <figure style={{boxShadow: ''}}   className={styles.snip1361}>
          <img alt="zavodzabiocide"    src={blog.photo === null ? `${DOMAIN}/static/images/piggybanner1.png` :  `${API}/blog/fotografija/${blog.slug}` }
          onError={image => (image.target.src = `${DOMAIN}/static/images/piggybanner1.png`)}/>
           <figcaption>
        <h3>  <a style={{color:'#f9f7f2',textDecoration:'none'}}  href={`/en/novosti/${blog.slug}`}> {blog.titleEn}</a></h3>

         <p >{renderHTML(blog.excerptEn)} </p>

     <Link href={`/en/novosti/${blog.slug}`}> 
      <button className=' text-center m-2 btn' style={{background:'#f9f7f2',color:'#8860d0'}}> 
       read more</button> 
      </Link>
      <p className='pl-2' style={{fontSize:'x-small'}}>
      PUBLISHED{' '} {moment(blog.updatedAt).locale('sr').format('DD.MM.YYYY')}</p>
                              
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
         <div className=''>
          <header className='text-left ml-5 mr-5'> 
         <CategoryMenu/>             
    <h2 className="  mt-3 " style={{color:'#8860d0'}}> ALL NEWS</h2>
         </header>       
         <div className=' ml-5 mr-5'>
     {bloglist.length === 0 ? 
     <p className='' style={{textTransform:'uppercase',fontSize:'',color:'#c1c8e4'}}> Sorry, there is no news at the moment</p>
      :
    <div>
    <hr className=''  style={{textTransform:'uppercase',fontSize:'small',color:'#c1c8e4'}} />
   <p className='pb-0 mb-0' style={{textTransform:'uppercase',fontSize:'small',color:'#c1c8e4'}} >
       Total news <b style={{fontSize:'medium'}}>
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