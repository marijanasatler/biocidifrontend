import Layout from '../../../components/layout/LayoutLat';
import Private from '../../../components/auth/Private';
import NabavkeRead from '../../../components/crud/nabavke/NabavkeRead';

import styles from '../../../styles/admin.module.css'

const Nabavke = () => {
    return (
        <Layout>
        <Private>
    <div className={styles.adminbgd}>
               <div >

                <div >
                    <div className={styles.adminContainer}>
                        <h2 className='mb-2 mt-2'> Upravljanje Nabavkama</h2>
                    </div>
                    <div className={styles.adminContainer} > 
                        <a href="/user/crud/nabavka"   style={{textDecoration:'none',textTransform:'uppercase'}}   >
                    <button className='btn btn-primary mt-1 mb-1' style={{textDecoration:'none',textTransform:'uppercase'}} >
                             Napravi Novu <b>Nabavku</b>
                     </button>
                        </a>
                    </div>
                    <div className={styles.adminContainer}>
                        <NabavkeRead />
                    </div>
               </div>
                </div>
            </div>
        </Private>
    </Layout>
    );
};

export default Nabavke;