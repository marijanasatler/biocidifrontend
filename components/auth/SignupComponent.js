import React,{ useState, useEffect } from 'react';
import { signup, isAuth, preSignup } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';

const SignupComponent = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true,
        endmessage:''
    });

    const { name, email, password, error, loading, message, showForm,endmessage } = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { name, email, password };

        preSignup(user).then(data => {
            if (typeof(data) == 'undefined') {
                setValues({ ...values, error: error, loading: false,endmessage:false });} 
            else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    loading: false,
                    message: data.message,
                    showForm: false,
                    endmessage:'PROVER SA ADMINISTRATOROM OKO TVOJE REGISTRACIJE'
                });
            }
        });
    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">MOLIMO SAČEKAJTE...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');
    const showEndMessage = () => (endmessage ? <div className="alert alert-info">{endmessage}</div> : '');

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit} className='p-0'>
                <div className="form-group">
                    <input
                        value={name}
                        onChange={handleChange('name')}
                        type="text"
                        className="form-control"
                        placeholder="IME I PREZIME"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={email}
                        onChange={handleChange('email')}
                        type="email"
                        className="form-control"
                        placeholder="EMAIL ADRESA"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={password}
                        onChange={handleChange('password')}
                        type="password"
                        className="form-control"
                        placeholder="LOZINKA"
                    />
                </div>

                <div>
                    <button className="btn btn-dark">REGISTRUJ SE</button>
                </div>
            </form>
        );
    };

    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showEndMessage()}
            {showForm && signupForm()}
           
        </React.Fragment>
    );
};

export default SignupComponent;