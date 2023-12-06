import OpenAI from 'openai';
import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';


require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.CHAT_GPT
  });

//Inicializar express
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());



//POST
app.post('/', async (req, res) => {

    const { message } = req.body;

    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {"role": "system", "content": "HABLA SOLO SOBRE ESTAS HABITACIONES DE GANGOTENA \nHabitaciones luxury \n\nLas habitaciones Luxury de Casa Gangotena invita a los huéspedes a descansar con estilo, disfrutando de la tranquilidad con una elegante tapicería, alfombras tupidas, lujosas sábanas y una fina decoración que crea un ambiente acogedor. Estas habitaciones se encuentran en el primero, segundo, y tercer piso.\n\nTamaño: 36,46 m² | 387.50 pies²\nMaximo de huéspedes: 2 adultos + 2 niños\nPrecio 2023: $540 Precio 2024: $555\n\nHabitaciones Plaza View\n\nEn la fachada norte de la casa se encuentran estas habitaciones, que conceden una vista privilegiada del Centro Histórico. Disfruta de la Plaza San Francisco, así como la iglesia y el convento del mismo nombre. Las habitaciones se ven adornadas de luz natural y una sofisticada decoración. Las habitaciones Plaza View están disponibles en el primer y segundo piso.\nTamaño: 31,87 m² | 343.05 pies²\nMaximo de huéspedes: 2 adultos + 2 niños\nPrecio 2023: $683 Precio 2024: $703\n\nSuite\n\nAl extremo del ala oeste de la propiedad, en el primer y segundo piso, dos habitaciones Luxury están conectadas, dando más espacio para familias y dignatarios visitantes. Ambas habitaciones pueden ser convertidas en Suites.\n\nTamaño: 73,30 m² | 785.76 pies²\nMaximo de huéspedes: 4 invitados\nPrecio 2023: $1079 Precio 2024: $1111"},
            {"role": "user", "content": `${message}`},
        ],
      });
      
      res.json({
        completion: chatCompletion.choices[0].message
      })

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
