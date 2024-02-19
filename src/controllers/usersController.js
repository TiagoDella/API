const mongoose = require("mongoose");
const User = require("../models/userModels");
const bcrypt = require("bcrypt");

async function createUser(req, res) {
  const userBody = req.body;
  const API_KEY = req.headers["api_key"];
  console.log(userBody.API_KEY);
  if (API_KEY !== "minha_chave_secreta") {
    res.status(401).send({ message: "Não autorizado!" });
    return;
  }
  // const SALT_ROUNDS = 10;
  const hashPassword = await bcrypt.hash(userBody.password, 10);
  try {
    const newUsers = new User({
      userName: userBody.userName,
      email: userBody.email,
      password: hashPassword,
      birthday: userBody.birthday,
    });
    await newUsers.save();
    res.status(201).send({ message: "Usuario criado com sucesso" });
  } catch (error) {
    res.send({ message: "Usuario não criado" });
  }
}

async function readALLUser(req, res) {
  try {
    const listUser = await User.find({});
    res.send({ data: listUser });
  } catch (error) {
    res.send({ message: "Deu pau no usuario" });
  }
}

async function readUserByName(req, res) {
  try {
    if (!req.body.userName) {
      res.status(400).send({ message: "Body obrigatorio!" });
      return;
    }
    const listUser = await User.find({ userName: req.body.userName });
    res.send({ data: listUser });
  } catch (error) {
    console.log(error);
    res.send({ message: "Usuario não encontrado" });
  }
}

async function updateUser(req, res) {
  try {
    console.log(req.params.id);
    const mongoPayload = {
      userName: req.body.UserName,
      email: req.body.email,
      password: req.body.password,
      birthday: req.body.birthday,
    };
    const UserUpdated = await User.findByIdAndUpdate(
      req.params.id,
      mongoPayload,
      { new: true }
    );
    console.log(UserUpdated);
    res.send({ message: "Usuario atualizado com sucesso!" });
  } catch (error) {
    res.status(401).send({ message: "Usuario não atualizado!" });
  }
}

async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.send({ message: "Usuario não deletado!" });
  }
}

module.exports = {
  createUser,
  readUserByName,
  readALLUser,
  updateUser,
  deleteUser,
};
