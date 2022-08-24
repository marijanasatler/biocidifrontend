import Layout from '../../components/layout/LayoutLat';
import Admin from '../../components/auth/Admin';
import Link from 'next/link';
import { isAuth } from '../../actions/auth';
import styles from '../../styles/admin.module.css'

const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
                 <div style={{}} className={styles.adminbgd}>

 
                           
                
                <div className={styles.adminContainer}  >

<div className='row'  >

          <div className="col-md-12   pt-5 pb-4  text-center "  >
            <h1>Administratorski Panel</h1>
             <h4>{isAuth() && (
              <a >{` Administrator : ${isAuth().name}`}</a> )}
             </h4> 
           </div>

           <div className="col-md-6 pt-2 pb-4"  >
               <div >

                            <h3 className=' ' style={{textTransform:'uppercase'}}>upravljanje stranicama</h3>
                            <ul className="list-group " style={{fontSize:'large' ,background:''}}  >

                            <li className="list-group-item">
                                    <a style={{color:'',textTransform:'uppercase'}} href="/admin/crud/svenovosti">stranice novosti</a>
                                </li>
                                <li className="list-group-item">
                                    <a style={{color:'',textTransform:'uppercase'}} href="/admin/crud/laboratorije">stranice laboratorije</a>
                                </li>
                               
                                <li className="list-group-item">
                                    <a style={{color:'',textTransform:'uppercase'}} href="/admin/crud/delatnosti">stranice delatnosti</a>
                                </li>
                               

                                <li className="list-group-item">
                                    <a style={{color:'',textTransform:'uppercase'}} href="/admin/crud/ozavodu">stranice o zavodu</a>
                                </li>
                            
                               
                               
                                <li className="list-group-item">
                                    <a style={{color:'',textTransform:'uppercase'}} href="/admin/crud/svenabavke">stranice nabavke</a>
                                </li>
                               

                                <li className="list-group-item">
                                    <a style={{color:'',textTransform:'uppercase'}} href="/admin/crud/zaposlenja">stranice zaposlenje</a>
                                </li>
        
                                <li className="list-group-item">
                                    <a style={{color:'',textTransform:'uppercase'}} href="/admin/crud/cenovnici">stranice CENOVNIK</a>
                                </li>
                                <li className="list-group-item">
                                    <a style={{color:'',textTransform:'uppercase'}} href="/admin/crud/pocetnapinovi">pocetna veliki pinovi</a>
                                </li>
                                <li className="list-group-item">
                                    <a style={{color:'',textTransform:'uppercase'}} href="/admin/crud/ostalestranice">stranice OSTALO</a>
                                </li>
                               </ul> 
                             </div>
                            
                             <div className="pt-2 pb-4">
                
                <ul className="list-group " style={{fontSize:'large'}}>
                <li className="list-group-item">
                        <Link href="/admin/crud/svipinovi">
                            <a style={{color:'',textTransform:'uppercase'}}>dodavanje/brisanje POCETNIH SLAJDOVA</a>
                        </Link>
                    </li> 
                    <li className="list-group-item">
                        <Link href="/admin/crud/svimalipinovi">
                            <a style={{color:'',textTransform:'uppercase'}}>dodavanje/brisanje MALIH PINOVA</a>
                        </Link>
                    </li> 
                <li className="list-group-item">
                        <Link href="/admin/crud/galerija">
                            <a style={{color:'',textTransform:'uppercase'}}>dodavanje/brisanje galerija</a>
                        </Link>
                    </li> 
                    <li className="list-group-item">
                        <Link href="/admin/crud/videogalerija">
                            <a style={{color:'',textTransform:'uppercase'}}>dodavanje/brisanje video</a>
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link href="/admin/crud/logo">
                            <a style={{color:'',textTransform:'uppercase'}}>dodavanje/brisanje logo </a>
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link href="/admin/crud/dokument">
                            <a style={{color:'',textTransform:'uppercase'}}>dodavanje/brisanje dokumenta </a>
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link href="/admin/crud/standardi">
                            <a style={{color:'',textTransform:'uppercase'}}>dodavanje/brisanje standarda</a>
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link href="/admin/crud/preparati">
                            <a style={{color:'',textTransform:'uppercase'}}>dodavanje/brisanje registrovanih preparata</a>
                        </Link>
                    </li>  
                   
                </ul>       </div>
                             </div>

                            <div className="col-md-6 pt-2 pb-4">
                                <div>

                                <h3 className=' ' style={{textTransform:'uppercase'}}>kreiranje kategorija</h3>
                               <ul className="list-group " style={{fontSize:'large'}}>

                                <li className="list-group-item">
                                    <Link href="/admin/crud/kategorijenovosti">
                                        <a style={{color:'',textTransform:'uppercase'}}>Kreiranje kategorija novosti</a>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link href="/admin/crud/kategorijegalerije">
                                        <a style={{color:'',textTransform:'uppercase'}}>Kreiranje kategorija galerije</a>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link href="/admin/crud/kategorijenabavki">
                                        <a style={{color:'',textTransform:'uppercase'}}>Kreiranje kategorija nabavki</a>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link href="/admin/crud/kategorijepreparata">
                                        <a style={{color:'',textTransform:'uppercase'}}>Kreiranje kategorije registrovanih preparata</a>
                                    </Link>
                                </li>
                               
                            </ul>   
                            </div>
                            <div className="pt-2 pb-4">
                            <h3 className=' ' style={{textTransform:'uppercase'}}>Moj nalog</h3>
                            <ul style={{fontSize:'large'}}  class="list-group">
                            <li className="list-group-item">
                                    <Link href="/user/update">
                                        <a style={{color:'',textTransform:'uppercase'}}>Ažuriraj podatke</a>
                                    </Link>
                              </li>        
                            </ul>
                        </div>
                       </div>
                    
                  </div>
                </div>
              </div>


            </Admin>
        </Layout>
    );
};

export default AdminIndex;