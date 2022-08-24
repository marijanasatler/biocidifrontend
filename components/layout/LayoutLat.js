import Header from '../header/HeaderLat';
import React from 'react';
import Footer from '../footer/FooterLat';
import Link from 'next/link';
import CookieConsent from "react-cookie-consent";
import Language from '../Language';

import { DOMAIN } from '../../config';
import styles from '../../styles/styles.module.css'

const Layout = ({ children }) => {
    return (
        <div className={styles.fontLat}>
            <Language/>
            <Header />
            {children}
            <CookieConsent   style={{cursor:'pointer',textAlign:'center',textTransform:'uppercase',fontSize:'small',padding:' 0',opacity:'.7'}}
         buttonText="Razumem i prihvatam" 
         buttonStyle={{backgroundColor:'',opacity:'100%',cborderRasius:'12px',textTransform:'uppercase'}}
         expires={30} >
       Naša veb stranica koristi kolačiće, i korišćenjem iste saglasan/na si sa time. Za više informacija pogledajte 
       <a  style={{color:'white',fontWeight:'bold',marginLeft:'0.2%',textDecoration:'none'}} href={`${DOMAIN}/lat/ostalo/uslovi-koriscena-i-politika-privatnosti`}>
        Uslove korišćenja i Politika Privatnosti</a>
      </CookieConsent>
     <Footer/>
        </div>
    );
};

export default Layout;
