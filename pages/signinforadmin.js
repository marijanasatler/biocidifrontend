import Layout from '../components/layout/LayoutLat';
import { withRouter } from 'next/router';
import SigninComponent from '../components/auth/SigninComponent';

const Signin = ({ router }) => {
    const showRedirectMessage = () => {
        if (router.query.message) {
            return <div className="alert alert-danger">{router.query.message}</div>;
        } else {
            return;
        }
    };

    return (
        <Layout>
            <div className="container" style={{minHeight:'50vh'}}>
                <div className="row" >

                <h2 className=" pt-4 pb-4 col-md-6 offset-md-3 text-muted ">PRIJAVI SE </h2>
                </div>

                <div className="row">
                    <div className="col-md-8 offset-md-3">{showRedirectMessage()}</div>
                </div>

                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <SigninComponent />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default withRouter(Signin);