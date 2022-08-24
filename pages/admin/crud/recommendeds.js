import Layout from '../../../components/layout/LayoutLat';
import Admin from '../../../components/auth/Admin';
import RecommendedRead from '../../../components/crud/RecommendedRead';
import Link from 'next/link';
 import { MDBBtn,MDBCardImage } from 'mdb-react-ui-kit';

const Recommendeds = () => {
    return (
        <Layout>
            <Admin>
            <div className="container pt-4 pb-4">
                    <div className="row">
                        <div className="col-md-12  pb-2 text-white text-shadow">
                            <h2>Manage adds</h2>
                        </div>
                        <div className="col-md-12">
                            <RecommendedRead />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Recommendeds;