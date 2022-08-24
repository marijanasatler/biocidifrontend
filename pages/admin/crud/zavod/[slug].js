import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
import ZavodUpdate from '../../../../components/crud/zavod/ZavodUpdate';
import Link from 'next/link';
import styles from '../../../../styles/admin.module.css'

const Zavod = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div className="">
                    <div className={styles.adminContainer}>
                            <h2 className='mb-3'>Izmeni Stranicu O Zavodu </h2>
                        </div>
                        <div className={styles.adminContainer}>
                            <ZavodUpdate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Zavod;