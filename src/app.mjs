import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import { fileURLToPath } from 'url';
import path from 'path';
import methodOverride from 'method-override';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import expressLayouts from 'express-ejs-layouts';

const app = express(); // Instancia de express

const PORT = process.env.PORT || 3000; // Puerto

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // __dirname se debe definir en (ES Modules) o con ("type": "module")

app.use((req, res, next)=>{console.log(`Request received: ${req.method} ${req.url}`); next();}); // Middleware global

app.set('view engine', 'ejs'); // Establece el motor de vista
app.set('views', path.join(__dirname, 'views')); // Establece la carpeta donde estan los .ejs

app.use(expressLayouts); // Activar el middleware
app.set('layout', 'layout'); // Archivo base de layout

app.use(express.static(path.join(__dirname, '../public'))); // Archivos estaticos

app.use(express.json()); // Parsear JSON

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method')); // Para los formularios de editar

await connectDB(); // Conexion a DB

app.get('/', (req, res)=>{
    res.render('index', {
        title: 'Pagina principal',
        css: '/css/feedback.css'
    });
});
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'Acerca de nosotros',
        css: '/css/feedback.css'
    });
});
app.get('/contact', (req, res)=>{
    res.render('contact', {
        title: 'Contactenos',
        css: '/css/feedback.css'
    });
});
app.use('/api', superHeroRoutes); // Ruta
app.use((req, res)=>{
    res.status(404).render('error404', {
        title: 'Pagina no encontrada',
        css: '/css/feedback.css'
    });
}); // Ruta no encontrada

app.listen(PORT, ()=>{console.log(`Servidor online: http://localhost:${PORT}/`);}); // Iniciar servidor