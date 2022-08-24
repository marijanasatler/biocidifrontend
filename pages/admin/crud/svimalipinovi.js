import Layout from '../../../components/layout/LayoutLat';
import Admin from '../../../components/auth/Admin';
import PinmaliRead from '../../../components/crud/pinmali/PinmaliRead';
 import Link from 'next/link';
 import styles from '../../../styles/admin.module.css'

const Pinmali = () => {
    return (
        <Layout>
        <Admin>
        <div className={styles.adminbgd}>
            <div >

                <div >
                    <div className={styles.adminContainer}>
                        <h2 className='pb-2 pt-1'> Upravljanje Malim Pinovima</h2>
                    </div>
                    <div className={styles.adminContainer}> 
                        <a href="/admin/crud/pinmali"   style={{outline:'none',textTransform:'uppercase'}}   >
                    <button className='btn btn-primary'>
                           NAPRAVI NOVI MALI PIN
                     </button>
                            </a>
                    </div>
                    <div className={styles.adminContainer}>
                        <PinmaliRead />
                    </div>
            </div>
                </div>
            </div>
        </Admin>
    </Layout>
    );
};

export default Pinmali;