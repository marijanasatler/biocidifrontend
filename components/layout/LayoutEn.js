import Header from '../header/HeaderEn';
import React from 'react';
import Footer from '../footer/FooterEn';
import Link from 'next/link';
import CookieConsent from "react-cookie-consent";
import Language from '../Language';
import { DOMAIN } from '../../config';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Language/>
            <Header />
            {children}
            <CookieConsent   style={{cursor:'pointer',textAlign:'center',textTransform:'uppercase',fontSize:'small',padding:' 0',opacity:'.7'}}
        buttonText="I understand and accept" 
        buttonStyle={{backgroundColor:'',opacity:'100%',cborderRasius:'12px',textTransform:'uppercase'}}
        expires={30} >
       We use cookies to improve your experience on our site. For more information read our
     <a   style={{color:'white',fontWeight:'bold',marginLeft:'0.2%',textDecoration:'none'}} href={`${DOMAIN}/en/ostalo/uslovi-koriscena-i-politika-privatnosti`}>Terms of Use and Privacy Policy .</a>
      </CookieConsent>
       <Footer/>
        </React.Fragment>
    );
};

export default Layout;
 