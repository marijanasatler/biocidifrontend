import Layout from '../../../components/layout/LayoutLat';
import Admin from '../../../components/auth/Admin';
import OstaloRead from '../../../components/crud/ostalo/OstaloRead';
import Link from 'next/link';
import styles from '../../../styles/admin.module.css'
const Ostalo = () => {
    return (
        <Layout>
            <Admin>
            <div className={styles.adminbgd}>
                    <div >
                   
                        <div className={styles.adminContainer}>
                            <h2 className='pb-2'>Ostale Stranice</h2>
                            
                        </div>
                        <div className={styles.adminContainer}> 
                            <a href="/admin/crud/ostalo"   style={{textDecoration:'none',textTransform:'uppercase'}}   >
                        <button className='btn btn-primary'style={{textDecoration:'none',textTransform:'uppercase'}} >
                                 Napravi novu stranicu <b>ostalo</b> 
                         </button>
                                 </a>
                        </div>
                        <div className={styles.adminContainer}>
                            <OstaloRead />
                        </div>
                    
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Ostalo;