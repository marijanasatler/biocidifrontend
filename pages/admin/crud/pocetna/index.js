import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
import Pocetna from '../../../../components/crud/pocetna/Pocetna';
import styles from '../../../../styles/admin.module.css'
import Link from 'next/link';
import React from 'react';

const PocetnaPage = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
               <div className=''>

                        <div className={styles.adminContainer}>
                            <h2 className='pb-2 pt-1'>Dodaj Novi pin </h2>
                        </div>

                        <div className={styles.adminContainer}>
                   <Pocetna/>
                        </div>
               </div> 
                         </div>  
                 
                
                <br/>
            </Admin>
        </Layout>
    );
};

export default PocetnaPage;
