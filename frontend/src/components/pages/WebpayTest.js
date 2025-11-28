import React from "react";

function WebpayTest() {

    const iniciarPago = async () => {
        try {
            const respuesta = await fetch("http://localhost:8080/pagar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ monto: 1000 }),
            });

            const data = await respuesta.json();

            if (!data.url || !data.token) {
                alert("Error al generar la transacción");
                console.error("Respuesta del backend:", data);
                return;
            }

            // Crear formulario dinámico
            const form = document.createElement("form");
            form.method = "POST";
            form.action = data.url;

            const input = document.createElement("input");
            input.type = "hidden";
            input.name = "token_ws";
            input.value = data.token;

            form.appendChild(input);
            document.body.appendChild(form);

            // Enviar automáticamente
            form.submit();

        } catch (error) {
            console.error("Error en iniciarPago:", error);
            alert("Hubo un error en el proceso");
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Prueba de Pago Webpay Plus</h1>
            <p>Haz clic para iniciar un pago de prueba por $1.000.</p>

            <button 
                onClick={iniciarPago} 
                style={{
                    padding: "10px 20px",
                    fontSize: "18px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
            >
                Pagar $1.000
            </button>
        </div>
    );
}

export default WebpayTest;
