        // Simular creación de solicitud de crédito
        // crear tabla credit_requests en la base de datos
        // proceso de OCR con workers?

        res.status(201).json({
            ok: true,
            message: 'Solicitud creada exitosamente'
        });
    } catch (error) {
        return res.status(500).json({ ok: false, error: error.message });
    }
});
