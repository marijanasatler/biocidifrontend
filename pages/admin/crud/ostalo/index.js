import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
import OstaloCreate from '../../../../components/crud/ostalo/OstaloCreate';
import styles from '../../../../styles/admin.module.css'

import React from 'react';

const OstaloPage = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
               <div className=''>

                        <div className={styles.adminContainer}>
                            <h2 className='pb-2 pt-1'>Dodaj Novu Stranicu Ostalo </h2>
                        </div>

                        <div className={styles.adminContainer}>
                   <OstaloCreate/>
                        </div>
               </div> 
                         </div>  
                 
                
                <br/>
            </Admin>
        </Layout>
    );
};

export default OstaloPage;
