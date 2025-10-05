import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/pages/login.js";
import Register from "./components/pages/register.js";
import Navbar from "./components/things/navbar.js" 
import Simulador from "./components/pages/simulador";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/registro" element={<Register />} />
                <Route path="/inicio-sesion" element={<Login />} />
                <Route path="/simulador-credito" element={<Simulador />} />
            </Routes>
        </Router>
    );
}
export default App;
