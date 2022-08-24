import Layout from '../components/layout/Layout';
import SignupComponent from '../components/auth/SignupComponent';
import Link from 'next/link';

const Signup = () => {
    return (
        <Layout>
            <div  className="container" style={{minHeight:'50vh'}}>
                <div className='row'>

                <h2 className="text-center pt-4 pb-4 offset-md-3 text-muted ">REGISTRUJ SE</h2>
                </div>
                <div className="row">
                    <div className="col-md-6 p-0 offset-md-3">
                        <SignupComponent />
                    </div>
                </div>
                    <div className='row'>

<p className="text-center pt-4 pb-4 offset-md-3 text-muted  small">ZA POMOC OKO REGISTRACIJE OBRATITI SE ADMINISTRATORU SAJTA</p>
</div>
            </div>
        </Layout>
    );
};

export default Signup;
