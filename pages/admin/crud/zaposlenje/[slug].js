import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
import ZaposlenjeUpdate from '../../../../components/crud/zaposlenje/ZaposlenjeUpdate';
import Link from 'next/link';
import styles from '../../../../styles/admin.module.css'
const Zaposlenje = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div >
                    <div className={styles.adminContainer}>
                            <h2>Izmeni Stranicu Zaposlenje </h2>
                        </div>
                        <div className={styles.adminContainer}>
                            <ZaposlenjeUpdate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Zaposlenje;