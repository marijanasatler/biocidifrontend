import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
import PinUpdate from '../../../../components/crud/pin/PinUpdate';
import Link from 'next/link';
import styles from '../../../../styles/admin.module.css'
const Pin = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div className="">
                    <div className={styles.adminContainer}>
                            <h2 className='pt-1 pb-2'>Izmeni Slajd</h2>
                        </div>
                        <div className={styles.adminContainer}>
                            <PinUpdate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Pin;