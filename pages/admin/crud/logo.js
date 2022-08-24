import Layout from '../../../components/layout/LayoutLat';
import Admin from '../../../components/auth/Admin';
//import LogoCreate from '../../../components/crud/LogoCreate';
import Link from 'next/link';
import styles from '../../../styles/admin.module.css'
import dynamic from 'next/dynamic'
const LogoCreate = dynamic(() => import('../../../components/crud/LogoCreate'), { ssr: false })


const Logo = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div className=''>

                    <div className="">
                        <div className={styles.adminContainer}>
                            <h2 className='pt-1 pb-2 '>NAPRAVI Logo</h2>
                        </div>
                        <div className={styles.adminContainer}>
                            <LogoCreate />
                        </div>
                    </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};
 
export default Logo;
