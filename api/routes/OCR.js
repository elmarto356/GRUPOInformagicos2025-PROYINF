const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const Tesseract = require('tesseract.js');

//POST: Procesar imagen OCR
router.post('/ocr',upload.single('carnet'), async (req, res) => {
    try {
        const archivo = req.file;

        // 1. Validar que el archivo existe
        if (!archivo && !archivo.mimetype.startsWith('image/')) {
            return res.status(400).json({ 
                ok: false, 
                error: 'Error en input de la peticion' 
            });
        }
        const worker = await Tesseract.createWorker('spa');
        const resultado = await worker.recognize(archivo.buffer);
        await worker.terminate();
        const textoExtraido = resultado.data.text;
        res.json({
            ok: true,
            texto: textoExtraido,
            confianza: resultado.data.confidence,
            archivo: {
                nombre: archivo.originalname,
                tamaño: archivo.size,
                tipo: archivo.mimetype
            }
        });

    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }   
});

module.exports = router;