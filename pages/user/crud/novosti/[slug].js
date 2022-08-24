import Layout from '../../../../components/layout/LayoutLat';
import Private from '../../../../components/auth/Private';
import BlogUpdate from '../../../../components/crud/novosti/BlogUpdate';
import Link from 'next/link';
import styles from '../../../../styles/admin.module.css'
const Blog = () => {
    return (
        <Layout>
            <Private>
                <div className={styles.adminbgd}>
                    <div className="">
                    <div className={styles.adminContainer}>
                            <h2>Izmeni Novost</h2>
                        </div>
                        <div className="col-md-12">
                            <BlogUpdate />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default Blog;