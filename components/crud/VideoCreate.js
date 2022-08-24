import { useState, useEffect } from 'react';
import { API, DOMAIN } from '../../config';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';

import { createVideo,list,removeVideo } from '../../actions/video';
import Link from 'next/link';

import styles from '../../styles/admin.module.css'
const CreateVideo = ({ router }) => {
    const videoFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('video')) {
            return JSON.parse(localStorage.getItem('video'));
        } else {
            return false;
        }
    };

    const [videos, setVideos] = useState([]);
    
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',     
        titleEn:'',
        titleSp:'' ,
        linkRef:'',
        photo:'',
        hidePublishButton: false,
     
    });

    const { error, sizeError, success, formData, title, hidePublishButton ,photo,titleEn,titleSp,linkRef} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        loadvideos();
    }, [router]);


    const loadvideos = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setVideos(data);
        
          
            }
        });
    };



    const deletevideo = slug => {
        removeVideo(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
              //  setMessage(data.message);
                loadvideos();
     
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm( `Da li ste sigurni da želite da obrišete video "${slug}"?`);
        if (answer) {
            deletevideo(slug);
        }
    };



    const showVideos = () => {
        return videos.map((video, i) => {
            return (
                <div key={i} className="bg-light text-dark p-3 m-2 text-left" style={{borderRadius:'12px',boxShadow: 'rgb(38, 57, 77) 0px 20px 15px -10px'}}>
                    <h5>{video.title}</h5>
                    <Link
                        href={`${video.linkRef}`}>
                        <p style={{cursor:'pointer'}}>
                          <b style={{textTransform:'uppercase'}}>
                              video link: 
                              </b> {""}
                               {video.linkRef}
                            </p>
                    </Link>
                    <Link
                        href={`${DOMAIN}/videogalerija/${video.slug}`}>
                        <p style={{cursor:'pointer'}}>   <b style={{textTransform:'uppercase'}}>
                              singl video: 
                              </b> {""}
                        {`${DOMAIN}/videogalerija/${video.slug}`}
                            </p>
                    </Link>
                    <p className="text-DARK small">
                 VIDEO DODAO: {video.postedBy.name} </p>
                    <button className="btn btn-sm btn-danger"  style={{width:'100%'}}  onClick={() => deleteConfirm(video.slug)}>
                     OBRIŠI VIDEO
                    </button>
              
                </div>
            );
        });
    };


    const publishvideo = e => {
        e.preventDefault();
        // console.log('ready to publishvideo');
        createVideo(formData, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, error: null, success: `A new video titled "${data.title}" is created`,name:'',photo:''  });
             
         loadvideos();
          }
          
        });
    };

    const handleChange = name => e => {
        // console.log(e.target.value);
        //let formData = new formData();
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };


  
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );

    const createVideoForm = () => {
        return (
            <form onSubmit={publishvideo}>
                <div className="form-group">
               
                    <input type="text"  placeholder='NAZIV VIDEA LATINICA' className="form-control " value={title} onChange={handleChange('title')} />
                </div>
                <div className="form-group">
               
                <input type="text"  placeholder='NAZIV VIDEA CIRILICA' className="form-control " value={titleSp} onChange={handleChange('titleSp')} />
           </div>
           <div className="form-group">
               
               <input type="text"  placeholder='NAZIV VIDEA ENGLESKI' className="form-control " value={titleEn} onChange={handleChange('titleEn')} />
           </div>
           <div className="form-group">
               
                    <input type="text"  placeholder='VIDEO LINK ' className="form-control " value={linkRef} onChange={handleChange('linkRef')} />
                </div>


               <div>
                    <button type="submit" className="btn btn-primary ">
               NAPRAVI  VIDEO 
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="">
            <div className="row">
        
                <div className="col-md-8">
                    {createVideoForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>
            </div>
            <hr/>
            <p>OBRIŠI VIDEO</p>
            <div className='row' >
              <div className={styles.adminGrid} >
                    {showVideos()}
                  </div>
            </div>
        </div>
    );
};

export default withRouter(CreateVideo);