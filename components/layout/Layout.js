import Header from '../header/Header';
import React from 'react';
import Footer from '../footer/Footer';
import Link from 'next/link';
import CookieConsent from "react-cookie-consent";
import Language from '../Language';

import { API,DOMAIN } from '../../config';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <div className='' >
            <Language/>
            <Header />
            </div>
            {children}
            <CookieConsent   style={{cursor:'pointer',textAlign:'center',textTransform:'uppercase',fontSize:'small',padding:' 0',opacity:'.7'}}
        buttonText="Разумем и прихватам" 
        buttonStyle={{backgroundColor:'',opacity:'100%',cborderRasius:'12px',textTransform:'uppercase'}}
        expires={30} >
     Наша веб страница користи колачиће, и коришћењем исте сагласан/на си са тиме. За више информација погледајте 
      <a style={{color:'white',fontWeight:'bold',marginLeft:'0.2%',textDecoration:'none'}} href={`${DOMAIN}/ostalo/uslovi-koriscena-i-politika-privatnosti`}>
          Услове коришћења и Политику Приватности</a>
      </CookieConsent>
        <Footer/>
        </React.Fragment>
    );
};

export default Layout;
