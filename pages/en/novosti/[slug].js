import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { singleBlog, listRelated } from '../../../actions/blog';
import renderHTML from 'react-render-html';
import moment from 'moment';
import CategoryMenu from '../../../components/categorymenu/CategoryMenuEn';
import Layout from '../../../components/layout/LayoutEn';
import { API, DOMAIN, APP_NAME} from '../../../config';
import styles from '../../../styles/novosti.module.css'
import ScrollToTop from '../../../components/ScroolToTop';

const SingleBlog = ({ blog, query }) => {
    const [related, setRelated] = useState([]);

    const loadRelated = () => {
        listRelated({ blog}).then(data => {
            if (data.err) {
                console.log(data.err);
            } else {
                setRelated(data);
            }
        });
    };
    useEffect(() => {  if (typeof window !== 'undefined') {
        console.log('You are on the browser')
        // ✅ Can use window here
      } else {
        console.log('You are on the server')
        // ⛔️ Don't use window here
      }
        loadRelated();
    }, []);

    const head = () => (
        <Head>
            <title>
                {blog.titleEn} | {APP_NAME}
            </title>
            <meta name="description" content={blog.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/en/novosti/${query.slug}`} />
            <meta property="og:title" content={`${blog.titleEn}| ${APP_NAME}`} />
            <meta property="og:description" content={blog.mdesc} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/en/novosti/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${blog.photo}`} />
            <meta property="og:image:secure_url" content={`${blog.photo}`} />
            <meta property="og:image:type" content="image/jpg" />
        </Head>
    );



    const showRelatedBlog = () => {
        return related.map((blog, i) => (
            <div className="" style={{margin:'2%'}}  key={i}>
        <article  className='' style={{}}   key={i}>
             <figure className={styles.snip13612}>
<img alt="novosti"    src={blog.photo === null ? `${DOMAIN}/static/images/logo.png` :  `${API}/blog/fotografija/${blog.slug}` }
    onError={image => (image.target.src = `${DOMAIN}/static/images/logo.png`)}/>
<figcaption className='mb-2'>
      <Link  href={`/en/novosti/${blog.slug}`}> 
<h3>{blog.titleEn}</h3>
</Link>
<div>
<p>{renderHTML(blog.excerptEn)}</p>    
<Link href={`/lat/novosti/${blog.slug}`}> 
       <button  className=' text-center btn ml-2 small p-0 pl-1 pr-1' style={{background:'#f9f7f2',color:'#8860d0'}}>
       read more
        </button>
         </Link>
           <p style={{fontSize:'x-small'}} className='pl-1'>
          {moment(blog.updatedAt).locale('sr').format('DD.MM.YYYY')}
           </p>
        </div>    
</figcaption>
</figure>
</article>
            </div>
        ));
    };



    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <article>
                        <div className="container-fluid f">   
                          <div className=" container  pt-2">  <CategoryMenu/> </div>
                                <div className="container ">
                        <hr className=''/>
                                    <h2 className=" pt-4 pb-4 text-left">{blog.titleEn}</h2>
                                </div>
                          
                        </div>
                        <div className="container">
                            <section>
                                <div className="pt-3">{renderHTML(blog.bodyEn)}</div>
                                <div className='pt-1'>
                                <p className=" mt-3 p-2 " style={{color:'#8860d8'}}>
                                PUBLISHED{' '}
                               {moment(blog.updatedAt).locale('sr').format('DD.MM.YYYY')}
                                    </p>
                                </div>
                           
                      
                            </section>
       
           </div>
                        <div className="container mb-4">
<hr className=''/>
                            <h4 className="text-left pt-3 pl-2 pb-3  "  style={{color:'#c1c8e4'}}>SIMILAR NEWS</h4>
                            <div className={styles.gridsistem}>{showRelatedBlog()}</div>
                        </div>

                     
                    </article>
                </main><ScrollToTop/>
            </Layout>
        </React.Fragment>
    );
};

SingleBlog.getInitialProps = ({ query }) => {
    return singleBlog(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
            return { blog: data, query };
        }
    });
};

export default    SingleBlog;