import Layout from '../../components/layout/LayoutLat';
import Private from '../../components/auth/Private';
import Link from 'next/link';
import styles from '../../styles/admin.module.css'
import { isAuth } from '../../actions/auth';

const UserIndex = () => {
    return (
        <Layout>
            <Private>
                <div className={styles.adminbgd}>
                                    
                
                <div className={styles.adminContainer}  >

<div className='row'  >

          <div className="col-md-12   pt-4 pb-5  text-center "  >
            <h1>Administratorski Panel</h1>
             <h4>{isAuth() && (
              <a >{` Administrator : ${isAuth().name}`}</a> )}
             </h4> 
           </div>

           

                        <div className='col-md-6'>
                            <div >
                                
                            <ul class="list-group mb-5 " style={{width:'auto',borderRadius:'12px',background:'white',boxShadow: 'rgb(38, 57, 77) 0px 25px 20px -10px'}}> 
                              
                                <li className="list-group-item ">
                                    <a style={{textTransform:'uppercase',textDecoration:'none',fontSize:'large'}} href="/user/crud/galerija">dodavanje/brisanje galerija</a>
                                </li>

                                <li className="list-group-item  ">
                                    <a style={{textTransform:'uppercase',textDecoration:'none',fontSize:'large'}} href="/user/crud/videogalerija">dodavanje/brisanje video</a>
                                </li>
                                <li className="list-group-item ">
                                    <a style={{textTransform:'uppercase',textDecoration:'none',fontSize:'large'}} href="/user/crud/preparati">dodavanje/brisanje  preparata</a>
                                </li>
                                <li className="list-group-item ">
                                    <a style={{textTransform:'uppercase',textDecoration:'none',fontSize:'large'}} href="/user/crud/dokument">dodavanje/brisanje dokumenta </a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div >
                                
                            <ul class="list-group mb-5 " style={{width:'auto',borderRadius:'12px',background:'white',boxShadow: 'rgb(38, 57, 77) 0px 25px 20px -10px'}}> 
                                <li className="list-group-item ">
                                    <a style={{textTransform:'uppercase',textDecoration:'none',fontSize:'large'}} href="/user/crud/svenovosti">stranice novosti</a>
                                </li>

                                <li className="list-group-item "   >
                                    <a style={{textTransform:'uppercase',textDecoration:'none',fontSize:'large'}} href="/user/crud/svenabavke">stranice nabavke</a>
                                </li>
                             
                                <li className="list-group-item ">
                                    <a style={{textTransform:'uppercase',textDecoration:'none',fontSize:'large',color:'red'}} href="/user/update">MOJ NALOG</a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        
                    </div><p style={{textAlign:'center',textTransform:'uppercase'}}>  materijal koji niste vi dodali ne možete menjati i brisati</p>
                </div></div>
            </Private>
        </Layout>
    );
};

export default UserIndex;