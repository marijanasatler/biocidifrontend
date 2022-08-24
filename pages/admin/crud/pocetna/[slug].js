import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
import PocetnaUpdate from '../../../../components/crud/pocetna/PocetnaUpdate';
import Link from 'next/link';
import styles from '../../../../styles/admin.module.css'

const Pocetna = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div className="">
                    <div className={styles.adminContainer}>
                            <h2 className='pt-1 pb-2'>Izmeni Pin </h2>
                        </div>
                        <div className={styles.adminContainer}>
                            <PocetnaUpdate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Pocetna;