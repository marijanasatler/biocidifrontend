import Layout from '../../../components/layout/LayoutLat';
import Private from '../../../components/auth/Private';
import styles from '../../../styles/admin.module.css'
import dynamic from 'next/dynamic'
const GaleriCreate = dynamic(() => import('../../../components/crud/GaleriCreate'), { ssr: false })


const Galeri = () => {
    return (
        <Layout>
            <Private>
                <div className={styles.adminbgd}>
                    <div >

                    <div >
                        <div className={styles.adminContainer}>
                            <h2 className='pt-1 pb-2 '>DODAJ FOTOGRAFIJU</h2>
                        </div>
                        <div className={styles.adminContainer}>
                            <GaleriCreate />
                        </div>
                    </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};
 
export default Galeri;
