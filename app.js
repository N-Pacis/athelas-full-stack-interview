import express,{urlencoded,json} from 'express';
import {config} from "dotenv"
import productRoutes from "./routes/product.routes.js"
config({path: "./.env"})
import ejs from "ejs"
import { fileURLToPath } from 'url';
import path,{dirname} from "path"

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname,"styles")));
app.set('views',path.join(__dirname,'views'))
app.set("view engine","ejs")
app.use(json());
app.use(urlencoded({extended: true}))

app.use(productRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server connected on port ${process.env.PORT}`)
})