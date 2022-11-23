import React from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css'
import logo from './pikachulogo.png'




const NavBar = ()=>{
    return(
        <div className="barra-superior">
          
          <div class="logotipo">
                <img src={logo} alt="noIMG"/>
          </div>
          <div className="menu-grande">
            <ul>
            
            <Link to="/create">Create </Link>

            <Link to="/home">Home</Link>
            </ul>
          <div>
          
          </div>
        </div>
          
          
        
     
      </div>
    )
}

export default NavBar;
