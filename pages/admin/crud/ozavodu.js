import Layout from '../../../components/layout/LayoutLat';
import Admin from '../../../components/auth/Admin';
import ZavodRead from '../../../components/crud/zavod/ZavodRead';
import styles from '../../../styles/admin.module.css'


const Zavod = () => {
    return (

   <Layout>
   <Admin>
   <div className={styles.adminbgd} >
           <div>

           <div >
               <div className={styles.adminContainer}>
               <h2 className='pb-2'> Upravljanje Stranicama O Zavodu</h2>
                   
               </div>
               <div className={styles.adminContainer}> 
               <a href="/admin/crud/zavod"   style={{textDecoration:'none',textTransform:'uppercase'}}   >
               <button className='btn btn-primary'style={{textDecoration:'none',textTransform:'uppercase'}} >
                    Napravi novu stranicu <b>o zavodu</b>
                </button>
                </a>
               </div>
               <div className={styles.adminContainer}>
                   <ZavodRead/>
               </div>
           </div>
           </div>
       </div>
   </Admin>
</Layout>

    );
};

export default Zavod;