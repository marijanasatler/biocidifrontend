import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
import LaboratoriUpdate from '../../../../components/crud/laboratorije/LaboratoriUpdate';
import Link from 'next/link';
import styles from '../../../../styles/admin.module.css'
const Laboratori = () => {
    return (
        <Layout>
            <Admin>
                <div className={styles.adminbgd}>
                    <div >
                    <div className={styles.adminContainer}>
                            <h2 className='pt-2'>Izmeni Stranicu Laboratorija </h2>
                        </div>
                        <div className="">
                            <LaboratoriUpdate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Laboratori;