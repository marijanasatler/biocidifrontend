import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
import CenovnikUpdate from '../../../../components/crud/cenovnik/CenovnikUpdate';
import styles from '../../../../styles/admin.module.css'

const Cenovnik = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div >
                    <div className={styles.adminContainer}>
                            <h2 className='mt-2'>Izmeni CENOVNIK </h2>
                        </div>
                        <div className={styles.adminContainer}>
                            <CenovnikUpdate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Cenovnik;