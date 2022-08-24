import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { APP_NAME,DOMAIN } from '../../config';
import { signout, isAuth } from '../../actions/auth';
import { list } from '../../actions/laboratori';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import '../.././node_modules/nprogress/nprogress.css';
import  styles from '../../styles/navigation.module.css'
import { listZaposlenje } from '../../actions/zaposlenje';
import { listDelatnosti } from '../../actions/delatnosti';

NProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [delatnosti, setdelatnosti] = useState([]);
useEffect(() => {
    loadDelatnosti();
}, []);

const loadDelatnosti = () => {
    listDelatnosti().then(data => {
      if(data === undefined){
        null
      }
       if (data.error) {
           console.log(data.error); }
         else {
            setdelatnosti(data);
        }
    });
};

const showLoadedDelatnosti = () => {
  return delatnosti.map((d,i) => (
  
    <NavItem className={styles.navlink} key={i} >
        {d.title === 'Edukacija' ? 
    <Link href="/delatnosti/edukacija">
      <NavLink  className={styles.navlink}   >
     ПОРТАЛ ЕДУКАЦИЈЕ
        </NavLink>
    </Link>
      : null }
  </NavItem>

    ))
};


const [zaposlenjes, setzaposlenjes] = useState([]);
useEffect(() => {
    loadzaposlenjes();
}, []);

const loadzaposlenjes = () => {
    listZaposlenje().then(data => {
     // if(data === undefined){
    //    null
     // }
       if (data.error) {
           console.log(data.error); }
         else {
            setzaposlenjes(data);
        }
    });
};




  return (
    <React.Fragment>
<div className={styles.navigationstyle }>
      <Navbar color=""  style={{}} className='p-1 pt-2 pb-2 m-0   ' expand="lg" >
        <Link href="/">
          <NavLink className="  p-1 ml-2" style={{display:'inline-flex'}}><img  style={{height:'60px'}} className='' src={`${DOMAIN}/static/images/3d.png`}/></NavLink>
        </Link>
        <NavbarToggler onClick={toggle} className='pr-3 text-white'  > 
        <i className="fas fa-bars" style={{fontSize:'larger'}} ></i>
          </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className={styles.navigationbar}  >
          <Nav className="" navbar    >
            <React.Fragment>
            <NavItem className={styles.navlink} >
                <Link href="/">
                  <NavLink className={styles.navlink} >ПОЧЕТНА</NavLink>
                </Link>
              </NavItem>
            <NavItem className={styles.navlink} >
                <Link href="/delatnosti">
                  <NavLink className={styles.navlink} >ДЕЛАТНОСТИ</NavLink>
                </Link>
              </NavItem>
              <NavItem className={styles.navlink}  >
                <Link href="/laboratorije">
                  <NavLink className={styles.navlink}>ЛАБОРАТОРИЈСКЕ УСЛУГЕ</NavLink>
                </Link>
                
              </NavItem>
              <NavItem className={styles.navlink} >
                <Link href='/novosti'>
               <NavLink className={styles.navlink} >  НОВОСТИ  </NavLink>
                </Link>
              </NavItem>
            </React.Fragment>

     <React.Fragment>
    {showLoadedDelatnosti()}
   </React.Fragment>
         
       <NavItem  className={styles.navlink} >
        <Link href="/kontakt">
         <NavLink className={styles.navlink}>КОНТАКТ </NavLink>                   
         </Link>
       </NavItem>
       
            {isAuth() && isAuth().role === 0 && (
              <NavItem className={styles.navlink} >
                <Link href="/user">
                  <NavLink style={{color:'black'}} className={styles.navlink} >{`${isAuth().name} profil`}</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 1 && (
              <NavItem className={styles.navlink} >
                <Link href="/admin">
                  <NavLink className={styles.navlink} style={{color:'black'}} >АДМИН ПАНЕЛ</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && (
              <NavItem className={styles.navlink} >
                <NavLink className={styles.navlink}   style={{ cursor: 'pointer' }} onClick={() => signout(() => Router.replace(`/signinforadmin`))}>
              ОДЈАВИ СЕ
                </NavLink>
              </NavItem>
            )}

            </Nav>
        </Collapse>
      </Navbar>
      </div>
    </React.Fragment>
  );
};

export default Header;