import { useState } from "react";
import "./App.css";

function App() {
    const [blob, setBlob] = useState(null);
    const [resultado, setResultado] = useState("");

    function crearBlob() {
        const texto = "Hola mundo, este es un ejemplo de Blob";

        const nuevoBlob = new Blob([texto], {
            type: "text/plain"
        });

        setBlob(nuevoBlob);
        setResultado(
            "Blob creado correctamente. Tamaño: " +
            nuevoBlob.size +
            " bytes. Tipo: " +
            nuevoBlob.type
        );
    }

    function descargarBlob() {
        if (blob === null) {
            alert("Primero debe crear el Blob");
            return;
        }

        const url = URL.createObjectURL(blob);
        const enlace = document.createElement("a");

        enlace.href = url;
        enlace.download = "archivo.txt";
        enlace.click();

        URL.revokeObjectURL(url);

        setResultado("Archivo descargado correctamente");
    }

    async function usarSlice() {
        if (blob === null) {
            alert("Primero debe crear el Blob");
            return;
        }

        const parteBlob = blob.slice(0, 20);
        const texto = await parteBlob.text();

        setResultado("Resultado de slice(): " + texto);
    }

    return (
        <div className="contenedor">
            <h1>Ejemplo de uso de Blobs</h1>

            <div className="botones">
                <button onClick={crearBlob}>Crear Blob de texto</button>
                <button onClick={descargarBlob}>Descargar Blob</button>
                <button onClick={usarSlice}>Usar slice()</button>
            </div>

            <h2>Resultado</h2>
            <p className="resultado">{resultado}</p>
        </div>
    );
}

export default App;