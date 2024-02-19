const mongoose = require("mongoose");
const Event = require("../models/eventsModels");

async function createEvent(req, res) {
  const eventBody = req.body;
  try {
    const newEvent = new Event({
      eventName: eventBody.eventName,
      dateEvent: eventBody.dateEvent,
      location: eventBody.location,
    });
    await newEvent.save();
    res.status(201).send({ message: "Evento criado com sucesso" });
  } catch (error) {
    res.send({ message: "Deu pau no Evento" });
  }
}

async function readALLEvent(req, res) {
  try {
    const listEvents = await Event.find({});
    res.send({ data: listEvents });
  } catch (error) {
    res.send({ message: "Deu pau na lista" });
  }
}

async function readEventByName(req, res) {
  try {
    if (!req.body.eventName) {
      res.status(400).send({ message: "Body obrigatorio!" });
      return;
    }
    const listEvents = await Event.find({ eventName: req.body.eventName });
    res.send({ data: listEvents });
  } catch (error) {
    res.send({ message: "Deu pau na lista" });
  }
}

async function updateEvent(req, res) {
  try {
    console.log(req.params.id);
    const mongoPayload = {
      eventName: req.body.eventName,
      dateEvent: req.body.dateEvent,
      location: req.body.location,
    };
    const eventUpdated = await Event.findByIdAndUpdate(
      req.params.id,
      mongoPayload,
      { new: true }
    );
    console.log(eventUpdated);
    res.send({ message: "Evento atualizado com sucesso!" });
  } catch (error) {
    res.status(401).send({ message: "Evento não autirizado" });
  }
}

async function deleteEvent(req, res) {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.send({ message: "Evento não deletado!" });
  }
}

async function uploadCover(req, res) {
  async function updateEvent(req, res) {
    try {
      console.log(req.params.id);
      const mongoPayload = {
        coverPhoto: "",
      };
      const eventUpdated = await Event.findByIdAndUpdate(
        req.params.id,
        mongoPayload,
        { new: true }
      );
      res.status(200).send({ message: "Upload efetuado!" });
    } catch (error) {}
  }
}

module.exports = {
  createEvent,
  readEventByName,
  readALLEvent,
  updateEvent,
  deleteEvent,
  uploadCover,
};
