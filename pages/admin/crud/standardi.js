import Layout from '../../../components/layout/LayoutLat';
import Admin from '../../../components/auth/Admin';
//import StandardiCreate from '../../../components/crud/StandardiCreate';
import Link from 'next/link';
import styles from '../../../styles/admin.module.css';
import dynamic from 'next/dynamic'
const StandardiCreate = dynamic(() => import('../../../components/crud/StandardiCreate'), { ssr: false })


const Standardi = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div className=''>

                    <div >
                        <div className={styles.adminContainer}>
                            <h2 className='pb-2 pt-1'>Dodaj novi Standard</h2>
                        </div>
                        <div className={styles.adminContainer}>
                            <StandardiCreate />
                        </div>
                    </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};
 
export default Standardi;
