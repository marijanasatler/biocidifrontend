import React from 'react'
import { listSearch } from '../../../actions/blog';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { list, removeBlog } from '../../../actions/blog';
import moment from 'moment';

const BlogRead = ({ username }) => {
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadBlogs();
 
    }, []);

    const loadBlogs = () => {
        list(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setBlogs(data);
             
            }
        });
    };

    const deleteBlog = slug => {
        removeBlog(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
                setMessage(data.error)
            } else {
                setMessage(data.message);
                loadBlogs();
     
            }
        });
    };
    

    const deleteConfirm = slug => {
        let answer = window.confirm(`Da li ste sigurni da želite da izbrišete novost ${slug}?`);
        if (answer) {
            deleteBlog(slug);
        }
    };

    const showUpdateButton = blog => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/novosti/${blog.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                //<Link >
                    <a  href={`/admin/crud/novosti/${blog.slug}`} className="ml-2 btn btn-sm btn-warning text-white">izmeni</a>
                //</Link>
            );
        }
    };

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div key={i} className="pb-4">
                    <h5 className='pt-1 text-white'> {blog.title}</h5>
                    <p className="text-white small">
                  stranicu kreirao: {blog.postedBy.name} |  {moment(blog.updatedAt).locale('sr').format('LL')}
                </p>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(blog.slug)}>
                      obriši
                    </button>
                    {showUpdateButton(blog)}
                    <hr/>
                </div>
            );
        });
    };


    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message1: ''
    });

    const { search, results, searched, message1 } = values;

    const searchSubmit = e => {
        e.preventDefault();
        listSearch({ search }).then(data => {
            setValues({ ...values, results: data, searched: true, message1: `${data.length} blogs found` });
        });
    };

    const handleChange = e => {
        // console.log(e.target.value);
        setValues({ ...values, search: e.target.value, searched: false, results: [] ,message1:''});
    };

    const searchedBlogs = (results = []) => {
        return (
            <div className="">

                {results.map((blog, i) => {
                    return (
                        <div key={i} className='pb-2'>
                    {showUpdateButton(blog)}
                            <Link href={`/novosti/${blog.slug}`}>
                                <a className="text-light pl-2">{blog.title}</a>
                            </Link>
                 
                        </div>
                    );
                })}
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
  
<div className="row pt-2">
    <div className="col-md-4">
        <input type="search" className="form-control" placeholder="PRETRAGA NOVOSTI" onChange={handleChange} />
    </div>

    <div className="col-md-2">
        <button className="btn btn-block btn-light text-primary" style={{color:''}} type="submit">
          PRETRAGA
        </button>
    </div>
</div>
</form>
);





    return (
        <React.Fragment>
<div className=''>

<div className=" mb-5">
          
            <div className="pt-3">{searchForm()}</div>
            {message1 && <p  style={{backgroundColor:'transparent',color:'white'}} className="   p-1  font-italic">{message1}</p>}
            {searched && <div style={{ maxHeight:'300px',overflowY:'scroll'}}>{searchedBlogs(results)}</div>}
        </div>

        <div className="row">
                <div className="col-md-12">
                    {message && <div className="alert alert-warning">{message}</div>}
                    <p style={{textTransform:'uppercase',color:'white'}} className='color'>ukupno novosti:<b> {blogs.length}</b></p><br/>
                    {showAllBlogs()}
                </div>
            </div>
            </div>
        </React.Fragment>
    );
};

export default BlogRead;