import Layout from '../../../components/layout/LayoutLat';
import Admin from '../../../components/auth/Admin';
import LaboratoriRead from '../../../components/crud/laboratorije/LaboratoriRead';
import Link from 'next/link';
import styles from '../../../styles/admin.module.css'


const Laboratoris = () => {
    return (
        <Layout>
            <Admin>
            <div className={styles.adminbgd}>
                    <div className=''>

                    <div >
                        <div  className={styles.adminContainer} >
                            <h1 className='pb-2'> Laboratorije</h1>
                            
                        </div>
                        <div  className={styles.adminContainer} > 
                            <a href="/admin/crud/laboratorija"   style={{textDecoration:'none',textTransform:'uppercase'}}   >
                        <button className='btn btn-primary text-white mb-3'  style={{textDecoration:'none',textTransform:'uppercase'}}>
                                 Napravi novu stranicu <b>laboratorija</b> 
                         </button>
                                 </a>
                        </div>
                        <div className=" ">
                            <LaboratoriRead />
                        </div>
                    </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Laboratoris;