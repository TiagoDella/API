const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function loginUser(req, res) {
  const userBody = req.body;
  const HASHED_PASSWORD = await bcrypt.hash(userBody.password, 10);
  try {
    const userExist = await User.find({ email: userBody.email });
    if (userExist === false) {
      res.status(401).send({ message: "Credenciais inválidas 1!" });
      return;
    }
    // console.log(userExist);
    if (!bcrypt.compareSync(userBody.password, userExist[0].password)) {
      res.status(401).send({ message: "Credenciais inválidas 2!" });
      return;
    }
    const TOKEN = jwt.sign(
      {
        userId: userExist[0]._id,
        permission: "admin",
        userEmail: userExist[0].email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .send({ message: "Login efetuado com sucesso!", token: TOKEN });
  } catch (error) {
    console.log(error);
    res.send({ message: "Login recusado" });
  }
}

async function forgotPassword(req, res) {
  const userBody = req.body;
  try {
    {
      res.status(201).send({ message: "Usuario criado com sucesso" });
    }
  } catch (error) {
    res.send({ message: "Usuario não criado" });
  }
}

module.exports = {
  loginUser,
};
