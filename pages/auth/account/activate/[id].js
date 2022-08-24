import { useState, useEffect } from 'react';
import jwtT from 'jsonwebtoken';
import Layout from '../../../../components/layout/LayoutLat';
import { withRouter } from 'next/router';
import { signup } from '../../../../actions/auth';
import Link from 'next/link';

const ActivateAccount = ({ router }) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        error: '',
        loading: false,
        success: false,
        showButton: true
    });

    const { name, token, error, loading, success, showButton } = values;

    useEffect(() => {
        let token = router.query.id;
        if (token) {
            const { name } = jwtT.decode(token);
            setValues({ ...values, name, token });
        }
    }, [router]);

    const clickSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false });
        signup({ token }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false, showButton: false });
            } else {
                setValues({ ...values, loading: false, success: true, showButton: false });
            }
        });
    };

    const showLoading = () => (loading ? <h2>Loading...</h2> : '');

    return (
        <Layout>
            <div className="container" style={{minHeight:'40vh'}}>
                <h3 className="pb-4 pt-5">Dobrodošli {name}, spremni da aktivirate vaš nalog?</h3>
                {showLoading()}
                {error && error}
                {success && 
                (<div style={{display:'block'}}><p>Uspešno ste se registrovali! Molimo vas prijavite se.</p>
              <Link  href='/signinforadmin' ><button className="btn btn-dark">    PRIJAVI SE
              </button>
                    </Link>
                </div>)}
                {showButton && (
                    <button className="btn btn-dark" onClick={clickSubmit}>
                        AKTIVIRAJ NALOG
                    </button>
                )}
            </div>
        </Layout>
    );
};

export default withRouter(ActivateAccount);