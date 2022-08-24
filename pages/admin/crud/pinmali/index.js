import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
//import PinmaliCreate from '../../../components/crud/PinmaliCreate';
import Link from 'next/link';
import styles from '../../../../styles/admin.module.css'
import dynamic from 'next/dynamic'
const PinmaliCreate = dynamic(() => import('../../../../components/crud/pinmali/PinmaliCreate'), { ssr: false })
import 'suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/src/assets/css/suneditor.css'

const Pinmali = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div >
                        <div className={styles.adminContainer}>
                            <h2 className='pb-2 bt-1'>NAPRAVI Mali Pin </h2>
                        </div>
                        <div className={styles.adminContainer}>
                            <PinmaliCreate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};
 
export default Pinmali;
