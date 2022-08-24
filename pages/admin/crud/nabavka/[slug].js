import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
import NabavkeUpdate from '../../../../components/crud/nabavke/NabavkeUpdate';
import Link from 'next/link';
import styles from '../../../../styles/admin.module.css'

const Nabavke = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div >
                    <div className={styles.adminContainer}>
                            <h2 className='mb-2'>Izmeni Nabavku </h2>
                        </div>
                        <div className={styles.adminContainer}>
                            <NabavkeUpdate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Nabavke;