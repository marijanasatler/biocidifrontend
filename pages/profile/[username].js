import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { userPublicProfile } from '../../actions/user';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import moment from 'moment';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';


const UserProfile = ({ user, blogs, query }) => {
    const head = () => (
        <Head>
            <title>
                {user.username} | {APP_NAME}
            </title>
            <meta name="description" content={`Blogs by ${user.username}`} />
            <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
            <meta property="og:title" content={`${user.username}| ${APP_NAME}`} />
            <meta property="og:description" content={`Blogs by ${user.username}`} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/proofofpiggy.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/proofofpiggy.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const showUserBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div className="p-3" key={i}>
             
                    <Link href={`/blogs/${blog.slug}`}>
                        <a className="color">{blog.title}</a>
                    </Link>
                </div>
            );
        });
    };

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h5 className='text-muted'>{user.username}</h5>
                                    
                             
                                            <p className='text-muted'>
                                                {user.about}
                                            </p>
                                          
                                         
                                        </div>
                                        <div className="col-md-4 " style={{display:'block',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
                                            <img
                                                src={`${API}/user/photo/${user.username}`}
                                                className="img img-fluid img-thumbnail mb-3"
                                                style={{ maxHeight: '200px', maxWidth: '100%' }}
                                                alt="user profile"
                                            />
                                           <h4 className='text-white text-shadow'>
                                            Follow me
                                               </h4> 
                    
            <ul className='list-unstyled mb-2' style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>

<li>{user.twitter === undefined ? null :
    <a className='color' href={user.twitter} target='_blank'>
  <MDBIcon fab icon='twitter ' className='m-2' size='2x' />
</a>
}

</li>
<li className=''>{user.face === undefined ? null :

<a href={user.face} target='_blank' className='color'>

  <MDBIcon fab icon='facebook-square' className='m-2' size='2x' />
</a>
}

</li>
<li>{ user.insta === undefined ?  null :
    <a className='color' href={user.insta} target='_blank'>

  <MDBIcon  fab icon='instagram' className='m-2' size='2x' />
</a>
}

</li>
<li>{ user.telegram === undefined ? null :
    <a className='color' href={user.telegram} target='_blank'>

  <MDBIcon fab className='m-2' icon='telegram' size='2x' />
</a>
}

</li><li>{ user.linkedin === undefined ? null :
    <a className='color' href={user.linkedin} target='_blank'>

  <MDBIcon fab className='m-2' icon='linkedin' size='2x' />
</a>

    }

</li>
</ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br />

                <div className="container pb-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title  text-white text-shadow">
                                        Recent blogs by {user.username}
                                    </h3>

                                    {showUserBlogs()}
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    );
};

UserProfile.getInitialProps = ({ query }) => {
    // console.log(query);
    return userPublicProfile(query.username).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            // console.log(data);
            return { user: data.user, blogs: data.blogs, query };
        }
    });
};

export default UserProfile;