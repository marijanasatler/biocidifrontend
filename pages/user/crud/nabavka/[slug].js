import Layout from '../../../../components/layout/LayoutLat';
import Private from '../../../../components/auth/Private';
import NabavkeUpdate from '../../../../components/crud/nabavke/NabavkeUpdate';
import Link from 'next/link';
import styles from '../../../../styles/admin.module.css'

const Nabavke = () => {
    return (
        <Layout>
            <Private>
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
            </Private>
        </Layout>
    );
};

export default Nabavke;