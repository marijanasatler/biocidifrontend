import React from 'react';


import { FacebookIcon,ViberIcon,TwitterIcon,ViberShareButton,WhatsappIcon,WhatsappShareButton} from "react-share";
import { FacebookShareButton, TwitterShareButton,EmailIcon,EmailShareButton } from "react-share";
import { APP_NAME,DOMAIN } from './../config';



const Language = ({ children }) => {
    return (
       <div>

        <div className=' container-fluid ' 
         >  
<div className='row p-1' style={{}}>

        <div style={{fontSize:'medium',color:'rgb(58, 175, 169) ',fontWeight:'bold',backgroundColor:''}} className='col-md-6 pt-1 text-center pb-0 mb-0 text-white'>
            <ul className='' style={{textTransform:'uppercase',fontSize:'small',listStyle:'none',display:'inline-flex',cursor:'pointer',color:'',color:'purple',paddingBottom:'0',margin:'.5%',color:'rgb(58, 175, 169) '}} >
                <li className='mr-2 ml-2'> < a style={{color:'rgb(58, 175, 169)',fontWeight:'bold',textDecoration:'none' }}   href='/'>Ћирилица</a></li>|
                 <li className='mr-2 ml-2'><a  style={{color:'rgb(58, 175, 169)',fontWeight:'bold',textDecoration:'none' }}  href='/lat/'>
                     Lainica</a></li>|
                 <li className='mr-2 ml-2'> <a  style={{color:'rgb(58, 175, 169)',fontWeight:'bold',textDecoration:'none' }} href='/en/' >English</a></li>
                 </ul>
        </div>
        <div className='col-md-6 text-center'>
        <div className=''>
 <ul style={{listStyle:'none',margin:'0',padding:'0',display:'inline-flex',filter:'sepia(100%) hue-rotate(190deg) saturate(100%)',paddingBottom:'0',margin:'.5%',outline:'none'}}>

<li className='mr-1 ml-1' >
 <TwitterShareButton   style={{outline:'none'}}  title={`${APP_NAME}`} url={`${DOMAIN}`} hashtags={["zavodzabiocideimedicinskuekologiju", "medicinskaustanova"]} >
  <TwitterIcon round  size={24}  />
  </TwitterShareButton>
  </li>
 <li className='mr-1 ml-1'>
  <FacebookShareButton  style={{outline:'none'}} url={`${DOMAIN}`} quote={''} hashtag={"#zavodzabiocideimedicinskuekologiju"} description={`${APP_NAME}`} >
   <FacebookIcon round size={24}  /> 
  </FacebookShareButton>
  </li>
  <li className='mr-1 ml-1' >
 <ViberShareButton style={{outline:'none'}}  title={`${APP_NAME}`}  url={`${DOMAIN}`} >
  <ViberIcon round  size={24}  />
  </ViberShareButton>
  </li>
  <li className='mr-1 ml-1' >
 <WhatsappShareButton style={{outline:'none'}}  title={`${APP_NAME}`}  url={`${DOMAIN}`} >
  <WhatsappIcon round  size={24}  />
  </WhatsappShareButton>
  </li>
  <li className='mr-1 ml-1' >
 <EmailShareButton  style={{outline:'none'}} title={`${APP_NAME}`}  url={`${DOMAIN}`} >
  <EmailIcon round  size={24}  />
  </EmailShareButton>
  </li>
     </ul>     

  </div>
        </div>

            </div>
         </div>
</div>
    );
};

export default Language;
