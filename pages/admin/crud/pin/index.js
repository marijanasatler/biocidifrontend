import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
import styles from '../../../../styles/admin.module.css'
import Link from 'next/link';

import dynamic from 'next/dynamic'
const PinCreate = dynamic(() => import('../../../../components/crud/pin/PinCreate'), { ssr: false })
import 'suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/src/assets/css/suneditor.css'

const Pin = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div className="">
                        <div className={styles.adminContainer}>
                            <h2 className='pt-1 pb-2'>Dodaj Slajd  </h2>
                        </div>
                        <div className={styles.adminContainer}>
                            <PinCreate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};
 
export default Pin;
