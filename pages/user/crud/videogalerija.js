import Layout from '../../../components/layout/LayoutLat';
import Private from '../../../components/auth/Private';
//import VideoCreate from '../../../components/crud/VideoCreate';
import Link from 'next/link';
import styles from '../../../styles/admin.module.css'
import dynamic from 'next/dynamic'
const VideoCreate = dynamic(() => import('../../../components/crud/VideoCreate'), { ssr: false })


const Video = () => {
    return (
        <Layout>
            <Private>
                <div className={styles.adminbgd}>
                    <div className=''>

                    <div>
                        <div className={styles.adminContainer}>
                            <h2 className='pl-2 pb-4 '>Dodaj novi Video</h2>
                        </div>
                        <div className={styles.adminContainer}>
                            <VideoCreate />
                        </div>
                    </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};
 
export default Video;
