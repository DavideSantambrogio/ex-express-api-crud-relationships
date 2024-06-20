const express = require('express');
const app = express();
const postRoutes = require('./routes/postRoutes');
const tagRoutes = require('./routes/tagRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); // Aggiunta per la gestione delle categorie
const { handle404Error, handle500Error } = require('./middlewares/errorMiddleware');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Rotte per gestire richieste alla homepage e alla favicon
app.get('/', (req, res) => {
    res.send('<h1>Benvenuto nel mio blog!</h1>');
});

// Utilizzo delle rotte per i post, i tags e le categorie
app.use('/api/posts', postRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/categories', categoryRoutes); // Rotte per le categorie

app.get('/favicon.ico', (req, res) => {
    res.status(404).send('Favicon non trovato');
});

// Middleware per gestire gli errori
app.use(handle404Error); // Gestione errori 404
app.use(handle500Error); // Gestione errori 500

// Avvio del server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Il server è in esecuzione sulla porta ${PORT}`);
});
