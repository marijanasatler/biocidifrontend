import Layout from '../../../components/layout/LayoutLat';
import Admin from '../../../components/auth/Admin';
import ZaposlenjeRead from '../../../components/crud/zaposlenje/ZaposlenjeRead';
import styles from '../../../styles/admin.module.css'

const Zaposlenjes = () => {
    return (
        <Layout>
            <Admin>
            <div className={styles.adminbgd} >
                    <div >

                    <div >
                        <div  className={styles.adminContainer}>
                            <h2 className='pb-2 mt-1'> Zaposlenje</h2>
                            
                        </div>
                        <div className={styles.adminContainer} > 
                            <a href="/admin/crud/zaposlenje"   style={{textDecoration:'none',textTransform:'uppercase'}}   >
                        <button className='btn btn-primary mb-1' style={{textDecoration:'none',textTransform:'uppercase'}} >
                                 Napravi novu stranicu <b>Zaposlenje</b> 
                         </button>
                                 </a>
                        </div>
                        <div  className={styles.adminContainer}>
                            <ZaposlenjeRead />
                        </div>
                    </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Zaposlenjes;