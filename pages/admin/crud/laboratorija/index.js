import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
import Laboratori from '../../../../components/crud/laboratorije/Laboratori';
import styles from '../../../../styles/admin.module.css'
import Link from 'next/link';
import React from 'react';

const LaboratoriPage = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
               <div className=''>

                        <div className={styles.adminContainer}>
                            <h2>napravi Novu Laboratoriju </h2>
                        </div>

                        <div >
                   <Laboratori/>
                        </div>
               </div> 
                         </div>  
                 
                
                <br/>
            </Admin>
        </Layout>
    );
};

export default LaboratoriPage;
