import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
import PreparatiUpdate from '../../../../components/crud/preparati/PreparatiUpdate';
import Link from 'next/link';
import styles from '../../../../styles/admin.module.css'

const Preparati = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div >
                    <div className={styles.adminContainer}>
                            <h2 className='pt-1 pb-2'>Izmeni Preparat</h2>
                        </div>
                        <div className={styles.adminContainer}>
                            <PreparatiUpdate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Preparati;