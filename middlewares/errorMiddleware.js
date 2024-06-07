// Middleware per gestire gli errori 404 (Not Found)
const handle404Error = (req, res, next) => {
    res.status(404).send('404 - Non trovato');
};

// Middleware per gestire gli errori 500 (Internal Server Error)
const handle500Error = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500 - Errore interno del server');
};

module.exports = { handle404Error, handle500Error };
