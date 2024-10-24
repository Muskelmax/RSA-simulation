import express from 'express';
import { Message } from '../models/messagesModel.js';

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.client || !req.body.message) {
      return res.status(400).send({
        message: 'send all fields'
      });
    }
    const newMessage = {
      client: req.body.client,
      message: req.body.message
    }
    const message = await Message.create(newMessage);
    return res.status(201).send(message)
  } catch (error) {
    console.log(error.message)
    res.status(500).send({message: error.message});
  }

})

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find({});
    return res.status(200).json({
      count: messages.length,
      data: messages
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({message: error.message});
  }
})

export default router