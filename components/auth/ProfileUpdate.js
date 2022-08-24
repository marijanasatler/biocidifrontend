import React from 'react';
import { useState, useEffect } from 'react';
import { getCookie, isAuth, updateUser } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';
import { API } from '../../config';

const ProfileUpdate = () => {
    const [values, setValues] = useState({
        username: '',
        username_for_photo: '',
        name: '',
        email: '',
        about: '',
        pozicija:'',
     
        password: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        userData: process.browser && new FormData()
    });

    const token = getCookie('token');
    const { username, username_for_photo,

        name, email, about, password, error, pozicija,
        success, loading, photo, userData } = values;

    const init = () => {
        getProfile(token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    username: data.username,
                    username_for_photo: data.username,
                    name: data.name,
                    email: data.email,
                    about: data.about,
                    pozicija: data.pozicija,
               
                });
            }
        });
    };

    useEffect(() => {
        init();
        setValues({ ...values, userData: new FormData() });
    }, []);

    const handleChange = name => e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        // let userData = new FormData();
        userData.set(name, value);
        console.log(...userData); // SEE THE FORMDATA IN CONSOLE
        setValues({ ...values, [name]: value, userData, error: false, success: false });
    };


    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true });
        update(token, userData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false, loading: false });
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        username: data.username,
                        name: data.name,
                        email: data.email,
                        about: data.about,
                        pozicija: data.pozicija,
                        insta: data.insta,
                        face: data.face,
                        linkedin: data.linkedin,
                        website: data.website,
                        telegram: data.telegram,
                        password: '',
                        success: true,
                        loading: false
                    });
                });
            }
        });
    };

    const profileUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="btn btn-dark">
                   PROFILNA FOTOGRAFIJA
                    <input  style={{backgroundColor:''}} className='pl-2' onChange={handleChange('photo')} type="file" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="">Email</label>
               <p className='text-dark' style={{textTransform:'lowercase'}}>{email}</p>
            </div>

            <div className="form-group">
                <label className="">Username</label>
                <p className='text-dark'  style={{textTransform:'none'}}> {username}  </p>
            </div>
            <div className="form-group mb-2">
                <label className="" >Ime i prezime</label>
                <input onChange={handleChange('name')} type="text" value={name} className="form-control" />
            </div>
          
            <div className="form-group mb-2">
                <label className="">O meni</label>
                <textarea onChange={handleChange('about')} style={{minHeight:'100px'}} type="text" value={about} className="form-control" />
            </div>
            <div className="form-group mb-2">
                <label className="">pozicija</label>
                <input onChange={handleChange('pozicija')} type="text" value={pozicija} className="form-control" />
            </div>
           
            <br/>

            <div className="form-group  mb-4">
                <label className="text-danger">Change password</label>
                <input onChange={handleChange('password')} type="password" value={password} className="form-control" />
            </div>
            <div>
                {showSuccess()}
                {showError()}
                {showLoading()}
            </div>
            <div className=''>
                <button type="submit" className="btn btn-dark " disabled={!username || !name || !email}>
                 SAČUVAJ IZMENE
                </button>
            </div>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            Profile updated
        </div>
    );

    const showLoading = () => (
        <div className="alert alert-info" style={{ display: loading ? '' : 'none' }}>
            Loading...
        </div>
    );

    return (
        <React.Fragment>
            <div className="container mt-3 mb-1">
                <div className="row">
                    <div className="col-lg-4">
                        <img
                            src={`${API}/user/photo/${username_for_photo}`}
                            className="img img-fluid img-thumbnail mb-3"
                            style={{ maxHeight: 'auto',width: '100%' }}
                            alt="user profile"
                        />
                    </div>
                    <div className="col-lg-8 mb-5" style={{textTransform:'uppercase'}}>{profileUpdateForm()}</div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProfileUpdate;