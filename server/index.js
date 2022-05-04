const express = require("express");
const cors = require("cors");

const app = express();

const {getFortune, addCar, editCar, deleteCar} = require('./controller.js');

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", (req, res) => {
  const compliments = [
    "Gee, you're a smart car!",
		"Cool car!",
		"Your car driving skills are stellar.",
    "Your car is an absolute unit!"
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get('/api/fortune', getFortune);
app.post('/api/cars', addCar);
app.put('/api/cars/:id', editCar);
app.delete('/api/cars/:id', deleteCar);

app.listen(4000, () => console.log("Server running on 4000"));
