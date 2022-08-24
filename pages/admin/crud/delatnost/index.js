import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
//import DelatnostiCreate from '../../../components/crud/DelatnostiCreate';
import Link from 'next/link';
import styles from '../../../../styles/admin.module.css'

import dynamic from 'next/dynamic'
const DelatnostiCreate = dynamic(() => import('../../../../components/crud/delatnosti/DelatnostiCreate'), { ssr: false })


const Delatnosti = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div className="p-2">
                        <div className="col-md-12  pb-2  text-white text-shadow">
                            <h2 >Dodaj Novu Delatnost</h2>
                        </div>
                        <div className="col-md-12">
                            <DelatnostiCreate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};
 
export default Delatnosti;
