import Layout from '../../../components/layout/LayoutLat';
import Admin from '../../../components/auth/Admin';
import styles from '../../../styles/admin.module.css'
import dynamic from 'next/dynamic'
const CreateDokument = dynamic(() => import('../../../components/crud/DokumentCreate'), { ssr: false })


const Dokument = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div className=''>
                    <div>
                        <div className={styles.adminContainer}>
                            <h2 className='pb-2 '>Dodaj Dokument</h2>
                        </div>
                        <div className="">
                            <CreateDokument />
                        </div>
                    </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};
 
export default Dokument;
