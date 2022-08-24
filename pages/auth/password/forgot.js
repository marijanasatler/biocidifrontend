import React,{ useState } from 'react';
import Layout from '../../../components/layout/LayoutLat';
import { forgotPassword } from '../../../actions/auth';

const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: '',
        message: '',
        error: '',
        showForm: true
    });

    const { email, message, error, showForm } = values;

    const handleChange = name => e => {
        setValues({ ...values, message: '', error: '', [name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, message: '', error: '' });
        forgotPassword({ email }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, message: `Imejl je poslat na ${email}. Pratite uputstva da biste resetovali lozinku. Link ističe za 10 min.`, email: '', showForm: false });
            }
        });
    };

    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : null);
    const showMessage = () => (message ? <div className="alert alert-success">{message}</div> : null);

    const passwordForgotForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group pt-3">
                <input
                    type="email"
                    onChange={handleChange('email')}
                    className="form-control"
                    value={email}
                    placeholder="Type your email"
                    required
                />
            </div>
            <div>
                <button className="btn btn-dark">POŠALJI LINK ZA RESETOVANJE</button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="container pt-4 pb-2" style={{minHeight:'40vh'}}>
                <h2>RESTARTOVANJE LOZINKE</h2>
                {showError()}
                {showMessage()}
                {showForm && passwordForgotForm()}
            </div>
        </Layout>
    );
};

export default ForgotPassword;
