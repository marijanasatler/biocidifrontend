import Layout from '../../../components/layout/LayoutLat';
import Private from '../../../components/auth/Private';
import BlogRead from '../../../components/crud/novosti/BlogRead';
import Link from 'next/link';
import styles from '../../../styles/admin.module.css'

const Blog = () => {
    return (
        <Layout>
        <Private>
        <div className={styles.adminbgd}>
            <div className={styles.adminContainer}>

                <div className="">
                    <div className="">
                        <h1 className=' pt-2 pb-3'> Upravljanje Novostima</h1>
                    </div>
                    <div> 
                        <a href="/user/crud/novosti"   style={{textTransform:'uppercase'}}   > 
                    <button className='btn btn-primary pl-4 pr-4 text-light'style={{textTransform:'uppercase'}}  >
                        Dodaj Novu <b>Novost</b> 
                     </button>
                        </a>
                    </div>
                    <div className="">
                        <BlogRead />
                    </div>
            </div>
                </div>
            </div>
        </Private>
    </Layout>
    );
};

export default Blog;