import Layout from '../../../components/layout/LayoutLat';
import Admin from '../../../components/auth/Admin';
import Icon from '../../../components/crud/Icon';
import Tag from '../../../components/crud/Tag';
import Link from 'next/link';
import React from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import copy from "copy-to-clipboard";  

const IconTag = () => {


    const data=[
        {
            text:'twitter'
          },
    
        {
          text:'twitter-square'
        },
        {
            text:'facebook'
          },
        {
          text:'facebook-square'
        },  
        {
          text:'facebook-f'
        },  
        
        {
    
            text:'instagram'
          },  
          {
    
            text:'telegram'
          },  
        
          {
    
            text:'telegram-plane'
          },  
          {
    
            text:'linkedin'
          },  
          {
    
            text:'linkedin-in'
          },  

          {
    
            text:'google-plus-g'
          },  
          {
    
            text:'apple'
          },  
        
          {
    
            text:'btc'
          },  
        
          
          
          {
    
            text:'amazon'
          },  
          {
    
            text:'github'
          },  
        ];




    return (
        <Layout>
            <Admin>
                <div className="container-fluid  pt-3">
               <div className='p-2'>

                        <div className="col-md-12  text-white text-shadow ">
                            <h2>Manage social icons </h2>
                        </div>
<div className='row'>

                        <div className="col-md-8 pt-3">
                            <Icon />
                        </div>
                        <div className='col-md-4 pt-3'>
                          
     <div style={ {display:'block',textAlign:'right',padding:'0 2%'}}> 
     <h5 className='text-white text-shadow pb-1 pr-3'>
                                Icon Legend
                            </h5>
     <div className='' >
          {    data.map((i) => 
          <div  key={i.text} >     
       <span style={{padding:'0 1%'}} >{i.text}</span>    
        <a target='_blank' style={{textDecoration:'none',opacity:'70%'}} className='icon-shadow text-dark'  >
          <MDBIcon fab icon={i.text} className='p-2 zoom-box'  />
          </a>     <button onClick={ (() => {
      copy(`${i.text}`);
      toast.success(`You copy "${i.text}" `, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });})} style={{backgroundColor:'transparent',border:'none'}}   
      >

          <MDBIcon far icon="clone" />
      </button>
    
          </div>
          )}</div>
     </div>
                        </div>
</div>
               </div> <hr/>
                     
                         </div>  
                 
                         <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
style={{width:'auto'}}
/>
                <br/>
            </Admin>
        </Layout>
    );
};

export default IconTag;
