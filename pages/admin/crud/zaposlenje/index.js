import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
import Zaposlenje from '../../../../components/crud/zaposlenje/ZaposlenjeCreate';
import styles from '../../../../styles/admin.module.css'
import Link from 'next/link';
import React from 'react';

const ZaposlenjePage = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div >

               <div >

                        <div className={styles.adminContainer}>
                            <h2 className='mt-1 mb-2' >Dodaj Novi oglas za Zaposlenje </h2>
                        </div>

                        <div className={styles.adminContainer}>
                   <Zaposlenje/>
                        </div>
               </div> 
                         </div>  
                 
                    </div>
                
                <br/>
            </Admin>
        </Layout>
    );
};

export default ZaposlenjePage;