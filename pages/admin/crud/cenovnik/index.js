import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
import Cenovnik from '../../../../components/crud/cenovnik/CenovnikCreate';
import styles from '../../../../styles/admin.module.css'
import Link from 'next/link';
import React from 'react';

const CenovnikPage = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div >

               <div >

                        <div className={styles.adminContainer}>
                            <h2 className='mt-1 mb-2' >Dodaj Novi CENOVNIK</h2>
                        </div>

                        <div className={styles.adminContainer}>
                   <Cenovnik/>
                        </div>
               </div> 
                         </div>  
                 
                    </div>
                
                <br/>
            </Admin>
        </Layout>
    );
};

export default CenovnikPage;
