import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/pages/Login.js";
import Register from "./components/pages/Register.js";
import Navbar from "./components/things/navbar.js" 
import Simulador from "./components/pages/Simulador";
import ResultadoSimulacion from "./components/pages/ResultadoSimulacion";
import HistorialSimulaciones from "./components/pages/HistorialSimulaciones";
import PreHistorialSimulaciones from "./components/pages/PreHistorialSimulaciones";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";


function App() {
    return (
    
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Simulador />} /> 
                <Route path="/registro" element={<Register />} />
                <Route path="/inicio-sesion" element={<Login />} />
                <Route path="/simulador-credito" element={<Simulador />} />
                <Route path="/resultado-simulacion" element={<ResultadoSimulacion />} />
                <Route path="/historial-simulaciones" element={<HistorialSimulaciones />} />
                <Route path="/prehistorial-simulaciones" element={<PreHistorialSimulaciones />} />
            </Routes>
        </Router>
    );
}
export default App;