import Layout from '../../../components/layout/LayoutLat';
import Admin from '../../../components/auth/Admin';
import PinRead from '../../../components/crud/pin/PinRead';
import styles from '../../../styles/admin.module.css'

const Pin = () => {
    return (
        <Layout>
        <Admin>
        <div className={styles.adminbgd}>
            <div className=''>

                <div className="">
                    <div className={styles.adminContainer}>
                        <h2 className='pb-2 pt-1'> Upravljanje Pocetnim Slajderom</h2>
                    </div>
                    <div className={styles.adminContainer}> 
                        <a href="/admin/crud/pin"   style={{textDecoration:'none',textTransform:'uppercase'}}   >
                    <button className='btn btn-primary' style={{textDecoration:'none',textTransform:'uppercase'}}  >
                             Napravi Novi slajd
                     </button>
                             </a>
                    </div>
                    <div className={styles.adminContainer}>
                        <PinRead />
                    </div>
            </div>
                </div>
            </div>
        </Admin>
    </Layout>
    );
};

export default Pin;