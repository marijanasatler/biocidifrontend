import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { useState,useEffect } from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import ScrollMenu from 'react-horizontal-scroll-menu';
import { getTags } from './../actions/tag';


const TagMenu = ({  router}) => {
    const [tags, setTags] = useState([]);
    
    useEffect(() => {
        inittags();
    }, [router]);


    const inittags = () => {
        getTags().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setTags(data);
            }
        });
    };

    const showAlltags = () => {
        return tags.map((t, i) => (
            <Link href={`/tags/${t.slug}`} key={i}>
                <a className="btn  mr-1 ml-1 mt-2 mb-2"  style={{color:'pink',border:'none',boxShadow:'none'}}><b className='fonts'>#{t.name}</b></a>
            </Link>
        ));
    };

    const Arrow = ({ text, className }) => {
        return (
          <div style={{backgroundColor:'',padding:'0',margin:'0'}}
            className={className}
          ><MDBIcon fas icon={text} style={{color:'pink'}} /></div>
        );
      };
       
      const ArrowLeft = Arrow({ text: 'chevron-circle-left', className: 'arrow-prev' });
      const ArrowRight = Arrow({ text: 'chevron-circle-right', className: 'arrow-next' });

    return (
        <React.Fragment>
            <div className='text-center shadow p-1 '> 

            <ScrollMenu
           data={showAlltags()}
           arrowLeft={ArrowLeft}
           arrowRight={ArrowRight}
           scrollBy={1}
           arrowDisabledClass="scroll-menu-arrow--disabled"
           innerWrapperClass='menu-wrapper--inner'
           itemClassActive={false}
           alignCenter={false}
           />

         </div>
        </React.Fragment>
    );
};



export default withRouter(TagMenu);