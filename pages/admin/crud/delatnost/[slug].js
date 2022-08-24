import Layout from '../../../../components/layout/LayoutLat';
import Admin from '../../../../components/auth/Admin';
import DelatnostiUpdate from '../../../../components/crud/delatnosti/DelatnostiUpdate';
import Link from 'next/link';

const Delatnosti = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid adminbgd pt-2 pb-2">
                    <div className="p-2">
                    <div className="col-md-12 pl-4 pb-2 text-white text-shadow">
                            <h2>Update Delatnosti</h2>
                        </div>
                        <div className="col-md-12">
                            <DelatnostiUpdate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Delatnosti;