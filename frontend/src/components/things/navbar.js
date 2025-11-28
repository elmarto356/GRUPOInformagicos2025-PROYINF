<<<<<<< HEAD
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to ="/" className= "navbar-brand" >Logo</Link> 
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/inicio-sesion" className="nav-link">Acceso clientes</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/registro" className="nav-link"> Regístrate</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/simulador-credito" className="nav-link">Simula tu crédito</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Nosotros" className="nav-link">Nosotros</Link>
                        </li>
                    </ul>
                    <span className="navbar-text">
                    nombre proyecto
                    </span>
                </div>
            </div>
        </nav>

    );
}
=======
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to ="/" className= "navbar-brand" >Logo</Link> 
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/inicio-sesion" className="nav-link">Acceso clientes</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/registro" className="nav-link"> Regístrate</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/simulador-credito" className="nav-link">Simula tu crédito</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Nosotros" className="nav-link">Nosotros</Link>
                        </li>
                    </ul>
                    <span className="navbar-text">
                    nombre proyecto
                    </span>
                </div>
            </div>
        </nav>

    );
}
>>>>>>> 1503bf0 (webpay)
export default Navbar;