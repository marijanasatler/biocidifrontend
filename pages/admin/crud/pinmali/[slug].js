import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
import PinmaliUpdate from '../../../../components/crud/pinmali/PinmaliUpdate';
import Link from 'next/link';
import styles from '../../../../styles/admin.module.css'
const Pinmali = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div className="">
                    <div className={styles.adminContainer}>
                            <h2 className='pt-1 pb-2'>Izmeni Mali Pin</h2>
                        </div>
                        <div className={styles.adminContainer}>
                            <PinmaliUpdate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Pinmali;