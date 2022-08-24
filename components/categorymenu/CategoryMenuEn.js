import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { useState,useEffect } from 'react';
import { getCategories } from './../../actions/category';


const CategoryMenu = ({  router}) => {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        initCategories();
    }, [router]);


    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    const showAllCategories = () => {
        return categories.map((c, i) => (
            <Link href={`/en/novosti/kategorije/${c.slug}`} key={i}>
                <a className="btn mr-1 ml-1 mt-2 mb-2 p-0 pl-2 pr-2 " 
                
                //</Link>style={{
                    //border:'none',boxShadow:'none',background:'pink',borderRadius:'0'}}>
                 style={{backgroundColor:'#8860d0',textTransform:'uppercase'}}
          >  <b className='' style={{color:'#f9f7f2'}}>{c.nameEn}</b></a>
            </Link>
        ));
    };

    return (
 <>
 <div className=''>
 <Link href={`/en/novosti`} >
                <a className="btn mr-1 ml-1 mt-2 mb-2 p-0 pl-2 pr-2 " style={{border:'solid #8860d0 2px',textTransform:'uppercase'}}><b className='' style={{color:'#8860d0'}}>
all news</b></a>
            </Link> {showAllCategories()}
 </div>
 </>
    );
};



export default withRouter(CategoryMenu);