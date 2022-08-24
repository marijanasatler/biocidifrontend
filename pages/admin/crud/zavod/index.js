import Layout from '../../../../components/layout/LayoutLat';
import Admin from './../../../../components/auth/Admin';
//import ZavodCreate from '../../../components/crud/ZavodCreate';
import styles from '../../../../styles/admin.module.css'


import dynamic from 'next/dynamic'
const ZavodCreate = dynamic(() => import('./../../../../components/crud/zavod/ZavodCreate'), { ssr: false });


const Zavod = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div >
                        <div className={styles.adminContainer}>
                            <h2 className='mb-2'>Dodaj Novu Stranicu O Zavodu</h2>
                        </div>
                        <div className={styles.adminContainer}>
                            <ZavodCreate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};
 
export default Zavod;
