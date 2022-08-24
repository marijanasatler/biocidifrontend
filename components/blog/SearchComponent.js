import Link from 'next/link';
import renderHTML from 'react-render-html';
import { useState, useEffect } from 'react';
import { listSearch } from '../../actions/blog';


const SearchComponent = () => {
    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    });

    const { search, results, searched, message } = values;

    const searchSubmit = e => {
        e.preventDefault();
        listSearch({ search }).then(data => {
            setValues({ ...values, results: data, searched: true, message: `${data.length} blogs found` });
        });
    };

    const handleChange = e => {
        // console.log(e.target.value);
        setValues({ ...values, search: e.target.value, searched: false, results: [],message:'' });
    };

    const searchedBlogs = (results = []) => {
        return (
            <div className="   p-2">
          

                {results.map((blog, i) => {
                    return (
                        <div key={i} className='pb-1'  >
                            <Link href={`/blogs/${blog.slug}`}>
                                <a className="text-primary">{blog.title}</a>
                            </Link>
                        </div>
                    );
                })}
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
                    <label> <b className='text-muted'>search by title </b> </label>
            <div className="row">
                <div className="col-md-8">
                    <input type="search" className="form-control" placeholder="search blog" onChange={handleChange} />
                </div>

                <div className="col-md-4">
                    <button className="btn btn-block " style={{color:'#6a8273'}} type="submit">
                        Search
                    </button>
                </div>
            </div>
        </form>
    );

    return (
        <div className="container-fluid mt-4" //style={{borderBottom:'solid #6a8273 2px'}}
        >
               
            <div className=" ">{searchForm()}</div>
            {message && <p  style={{backgroundColor:'#6a8273',color:'white'}} className="   p-1  font-italic">{message}</p>}

            {searched && <div className='mb-2' style={{ maxHeight:'300px',overflowY:'scroll'}}>{searchedBlogs(results)}</div>}
  
        </div>
    );
};

export default SearchComponent;
