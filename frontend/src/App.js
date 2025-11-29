import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/pages/Login.js";
import Register from "./components/pages/Register.js";
import Navbar from "./components/things/navbar.js" 
import Simulador from "./components/pages/Simulador";
import ResultadoSimulacion from "./components/pages/ResultadoSimulacion";
import HistorialSimulaciones from "./components/pages/HistorialSimulaciones";
import PreHistorialSimulaciones from "./components/pages/PreHistorialSimulaciones";
import PaginaMenu from "./components/pages/PaginaMenu.js";
import SimuladorInt from "./components/pages/Simulador interno.js";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLoginSuccess = () => {
    setIsLoggedIn(true);;
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
    };
    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
            <Routes>
                <Route path="/" element={<Simulador />} /> 
                <Route path="/registro" element={<Register />} />
                <Route path="/inicio-sesion" element={<Login onLoginSuccess={handleLoginSuccess}/>} />
                <Route path="/simulador-credito" element={<Simulador />} />
                <Route path="/resultado-simulacion" element={<ResultadoSimulacion />} />
                <Route path="/historial-simulaciones" element={<HistorialSimulaciones isLoggedIn={isLoggedIn}/>} />
                <Route path="/prehistorial-simulaciones" element={<PreHistorialSimulaciones />} />
                <Route path="/pagina-menu" element={<PaginaMenu />} />
                <Route path="/simulador-interno" element={<SimuladorInt />} />
            </Routes>
        </Router>
    );
}
export default App;