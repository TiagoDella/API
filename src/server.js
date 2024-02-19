const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// console.log(process.env);

const app = express();
const eventsRoutes = require("./routes/eventsRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
// const verifyToken = require("./middlewares/verify_token");
const PORT = 3000;

async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectamos no Mongo!");
  } catch (error) {
    console.log("Deu pau no Mongo!");
  }
}

connectMongo();

app.use(express.json());
// app.use(verifyToken);
app.use("/api/v1/events", eventsRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.send("informação para listar algo");
// });

// app.post("/", (req, res) => {
//   res.send("informações para gravar algo");
// });

// app.put("/", (req, res) => {
//   res.send("informações paa atualizar algo");
// });

// app.delete("/", (req, res) => {
//   res.send("informações para deletar algo");
// });

app.listen(PORT, () => {
  console.log("MINHA APLICAÇÃO EXPRESS!");
});
