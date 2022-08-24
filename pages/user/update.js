import Layout from '../../components/layout/LayoutLat';
import Private from '../../components/auth/Private';
import ProfileUpdate from '../../components/auth/ProfileUpdate';
import Link from 'next/link';
import styles from '../../styles/admin.module.css'

const UserProfileUpdate = () => {
    return (
        <Layout>
            <Private>
                <div className={styles.adminbgd}>
                    <div className="">
                        <ProfileUpdate />
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default UserProfileUpdate;