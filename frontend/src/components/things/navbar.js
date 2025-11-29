import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate } from 'react-router-dom';

function Navbar({isLoggedIn, onLogout}) {
    const navigate = useNavigate();
    const handleLogoutClick = () => {
        onLogout();               // cambia isLoggedIn a false
        navigate("/inicio-sesion");
    };
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
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                <Link to="/pagina-menu" className="nav-link">
                                    Mi menú
                                </Link>
                                </li>
                                <li className="nav-item">
                                <button
                                    className="btn btn-outline-danger ms-2"
                                    onClick={handleLogoutClick}
                                >
                                    Cerrar sesión
                                </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>

    );
}
export default Navbar;