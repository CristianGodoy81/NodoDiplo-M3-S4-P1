import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import { fileURLToPath } from 'url';
import path from 'path';
import methodOverride from 'method-override';
import superHeroRoutes from './routes/superHeroRoutes.mjs'

const app = express(); // Instancia de express

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // __dirname se debe definir en (ES Modules) o con ("type": "module")

app.use((req, res, next)=>{console.log(`Request received: ${req.method} ${req.url}`); next();}); // Middleware global

app.set('view engine', 'ejs'); // Establece el motor de vista
app.set('views', path.join(__dirname, 'views')); // Establece la carpeta donde estan los .ejs

app.use(express.json()); // Parsear JSON

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method')); // Para los formularios de editar

await connectDB(); // Conexion a DB

app.use('/api', superHeroRoutes); // Ruta
app.use((req, res)=>{res.status(404).send({mensaje: 'Ruta no encontrada'})}); // Ruta no encontrada

const PORT = process.env.PORT || 3000; // Puerto
app.listen(PORT, ()=>{console.log(`Servidor online: http://localhost:${PORT}/`);}); // Iniciar servidor