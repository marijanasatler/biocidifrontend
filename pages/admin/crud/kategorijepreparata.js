import Layout from '../../../components/layout/LayoutLat';
import Admin from '../../../components/auth/Admin';
import CategoryPreparata from '../../../components/crud/CategoryPreparata';
import styles from '../../../styles/admin.module.css'
import Link from 'next/link';
import React from 'react';


const CategoryPreparataPage = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div>

               <div >

                        <div className={styles.adminContainer}>
                            <h2 className='pt-1 pb-2'>DODAJ KATEGORIJU PREPARATA </h2>
                        </div>

                        <div className={styles.adminContainer}>
                            <CategoryPreparata />
                        </div>
               </div>
                 
                </div>
                    </div>
                <br/>
            </Admin>
        </Layout>
    );
};

export default CategoryPreparataPage;
