import Layout from '../../../components/layout/LayoutLat';
import Admin from '../../../components/auth/Admin';
import Category from '../../../components/crud/kategorijenovosti/Category';
import Tag from '../../../components/crud/kategorijenovosti/Tag';
import Link from 'next/link';
import React from 'react';
import styles from '../../../styles/admin.module.css'

const CategoryTag = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div className=''>                       
            
                     <div className=''  >
                        <div className={styles.adminContainer}>
                            <h2 className='pt-1 pb-2'>DODAJ KATEGORIJU GALERIJE</h2>
                        </div>
                        <div className={styles.adminContainer}>
                            <Tag />
                        </div>
                        </div>
                    </div>    
                         </div>  
                 
                
                <br/>
            </Admin>
        </Layout>
    );
};

export default CategoryTag;
