import Layout from '../../../components/layout/LayoutLat';
import Admin from '../../../components/auth/Admin';
import CenovnikRead from '../../../components/crud/cenovnik/CenovnikRead';
import Link from 'next/link';
import styles from '../../../styles/admin.module.css'

const Cenovniks = () => {
    return (
        <Layout>
            <Admin>
            <div className={styles.adminbgd} >
                    <div className=''>

                    <div className="">
                        <div className={styles.adminContainer}>
                            <h1 className='pb-2 mt-1 '> Cenovnici Usluga</h1>
                            
                        </div>
                        <div className={styles.adminContainer} >  
                        <button className='btn btn-light'>
                            <a href="/admin/crud/cenovnik"   style={{color:'',textTransform:'uppercase'}}   > Napravi novi <b>Cenovnik</b> </a>
                         </button>
                        </div>
                        <div className={styles.adminContainer}>
                            <CenovnikRead />
                        </div>
                    </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Cenovniks;