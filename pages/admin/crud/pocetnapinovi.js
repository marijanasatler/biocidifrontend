import Layout from '../../../components/layout/LayoutLat';
import Admin from '../../../components/auth/Admin';
import PocetnaRead from '../../../components/crud/pocetna/PocetnaRead';
import Link from 'next/link';
import styles from '../../../styles/admin.module.css'
const Pocetna = () => {
    return (
        <Layout>
            <Admin>
            <div className={styles.adminbgd} >
                    <div className=''>

                    <div >
                        <div className={styles.adminContainer}>
                            <h2 className='pb-2 pt-1'> početna stranica pinovi</h2>
                            
                        </div>
                        <div className={styles.adminContainer}> 
                            <a href="/admin/crud/pocetna"   style={{textDecoration:'none',textTransform:'uppercase'}}   > 
                        <button className='btn btn-primary' style={{textDecoration:'none',textTransform:'uppercase'}}>
                            Napravi pin 
                         </button>
                            </a>
                        </div>
                        <div className={styles.adminContainer}>
                            <PocetnaRead />
                        </div>
                    </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Pocetna;