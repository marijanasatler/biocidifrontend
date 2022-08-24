import Layout from '../../../../components/layout/LayoutLat';
import Private from '../../../../components/auth/Private';
//import BlogCreate from '../../../components/crud/BlogCreate';
import styles from '../../../../styles/admin.module.css'

import dynamic from 'next/dynamic'
const BlogCreate = dynamic(() => import('../../../../components/crud/novosti/BlogCreate'), { ssr: false })
import 'suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/src/assets/css/suneditor.css'

const Blog = () => {
    return (
        <Layout>
            <Private>
                <div className={styles.adminbgd}>
                    <div className="">
                        <div  className={styles.adminContainer}>
                            <h2>Dodaj Novost</h2>
                        </div>
                        <div className="">
                            <BlogCreate />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};
 
export default Blog;
