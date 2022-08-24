import Layout from '../../../components/layout/LayoutLat';
import Admin from '../../../components/auth/Admin';
import CategoryNabavke from '../../../components/crud/kategorijenabavki/CategoryNabavke';

import Link from 'next/link';
import React from 'react';
import TagNabavke from '../../../components/crud/kategorijenabavki/TagNabavke';
import styles from '../../../styles/admin.module.css'

const CategoryNabavkePage = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div className={styles.adminColumn}>

               <div  className='m-2'>

                        <div className={styles.adminContainer}>
                            <h2>DODAJ KATEGORIJU NABAVKI </h2>
                        </div>

                        <div className={styles.adminContainer} >
                            <CategoryNabavke />
                        </div>
               </div> 
                     <div  className={styles.nabavkepadding} >
                        <div className={styles.adminContainer}>
                        <h2>DODAJ STATUS NABAVKE </h2>
                        </div>
                        <div className={styles.adminContainer} >
                       <TagNabavke/>
                        </div>
                        </div>

                       
                         </div>  
                 
                
                    </div>
                <br/>
            </Admin>
        </Layout>
    );
};

export default CategoryNabavkePage;
