import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
//import NabavkaCreate from '../../../components/crud/NabavkaCreate';
import Link from 'next/link';
import styles from '../../../../styles/admin.module.css'
import dynamic from 'next/dynamic'
const NabavkaCreate = dynamic(() => import('../../../../components/crud/nabavke/NabavkaCreate'), { ssr: false })


const Nabavka = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div className=''>
                    <div className="">
                        <div className={styles.adminContainer}>
                            <h2 className='mt-1' style={{textTransform:'uppercase' }}>Dodaj Novu Nabavku</h2>
                        </div>
                        <div className={styles.adminContainer}>
                            <NabavkaCreate />
                        </div>
                    </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};
 
export default Nabavka;
