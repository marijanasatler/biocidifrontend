import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
import OstaloUpdate from '../../../../components/crud/ostalo/OstaloUpdate';
import Link from 'next/link';
import styles from '../../../../styles/admin.module.css'
const Ostalo = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div className="">
                    <div className={styles.adminContainer}>
                            <h2 className='pb-2 pt-1'>Izmeni Stranicu Ostalo </h2>
                        </div>
                        <div className={styles.adminContainer}>
                            <OstaloUpdate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Ostalo;