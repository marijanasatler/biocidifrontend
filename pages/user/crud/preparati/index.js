import Layout from '../../../../components/layout/LayoutLat';
import Private from '../../../../components/auth/Private';
//import PreparatiCreate from '../../../components/crud/PreparatiCreate';
import Link from 'next/link';
import PreparatiRead from '../../../../components/crud/preparati/PreparatiRead';
import dynamic from 'next/dynamic'
const PreparatiCreate = dynamic(() => import('../../../../components/crud/preparati/PreparatiCreate'), { ssr: false })
import 'suneditor/dist/css/suneditor.min.css'; 
import 'suneditor/src/assets/css/suneditor.css'
import styles from '../../../../styles/admin.module.css'

const Preparati = () => {
    return (
        <Layout>
            <Private>
            <div className={styles.adminbgd} >
                    <div className=''>
                    <div className="">
                        <div className={styles.adminContainer}>
                            <h2 className='pt-2 pb-2' style={{textTransform:'uppercase' }}>Dodaj Novi Preparat</h2>
                        </div>
                        <div className={styles.adminContainer}>
                         <PreparatiCreate/>
                       </div>
                       <hr/>
                       <div className={styles.adminContainer}>
                            <h2 style={{textTransform:'uppercase' }}>upravljaj preparatima</h2>
                        </div>
                       <div className={styles.adminContainer}> </div>
                  <PreparatiRead/>
                    </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};
 
export default Preparati;
