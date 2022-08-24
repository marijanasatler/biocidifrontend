import Layout from '../../../components/layout/LayoutLat';
import Admin from '../../../components/auth/Admin';
import DelatnostiRead from '../../../components/crud/delatnosti/DelatnostiRead';
import Link from 'next/link';
import styles from '../../../styles/admin.module.css'

const Delatnosti = () => {
    return (
        <Layout>
            <Admin>
            <div className={styles.adminbgd}>
                <div >

                    <div >
                        <div className={styles.adminContainer}>
                            <h1 className='pb-2 pt-2'>Upravljanje Stranicama Delatnosti</h1>
                        </div> 
                         <div className={styles.adminContainer}> 
                            <a href="/admin/crud/delatnost"   style={{textDecoration:'none',textTransform:'uppercase'}}   > 
                        <button className='btn btn-primary' style={{textDecoration:'none',textTransform:'uppercase'}} >
                            Napravi novu stranicu <b>delatnost</b> 
                         </button>
                            </a>
                        </div>
                        <div className={styles.adminContainer}>
                            <DelatnostiRead />
                        </div>
                    </div>
                </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Delatnosti;