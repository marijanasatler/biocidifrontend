import Layout from '../../../../components/layout/LayoutLat';
import Private from '../../../../components/auth/Private';
//import NabavkaCreate from '../../../components/crud/NabavkaCreate';
import Link from 'next/link';
import styles from '../../../../styles/admin.module.css'
import dynamic from 'next/dynamic'
const NabavkaCreate = dynamic(() => import('../../../../components/crud/nabavke/NabavkaCreate'), { ssr: false })


const Nabavka = () => {
    return (
        <Layout>
            <Private>
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
            </Private>
        </Layout>
    );
};
 
export default Nabavka;
