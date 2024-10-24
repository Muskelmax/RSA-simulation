import express from 'express'
import { Client } from '../models/keyModel.js';

const router = express.Router();

// router.post("", async (req, res) => {
//   try {
//     if (!req.body.client || !req.body.publicN || !req.body.publicE) {
//       return res.status(400).send({
//         message: 'send all fields'
//       });
//     }
//     const newClient = {
//       client: req.body.client,
//       publicN: req.body.publicN,
//       publicE: req.body.publicE
//     }
//     const client = await Client.create(newClient);
//     return res.status(201).send(client)
//   } catch (error) {
//     console.log(error.message)
//     res.status(500).send({message: error.message});
//   }
// })



router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const Keys = await Client.find({client: id});
    return res.status(200).json({Keys})
  } catch (error) {
    console.log(error.message)
    res.status(500).send({message: error.message});
  }
})

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.client || !req.body.publicN || !req.body.publicE) {
      return res.status(400).send({
      message: 'send all fields'
      });
    }

    const { id } = req.params;

    const result = await Client.findOneAndUpdate({client: id}, req.body)
    if (!result) {
      return res.status(404).json({message: "client not found (either 1 or 2)"})
    }
    else {
      return res.status(200).json({message: "client updated"})
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).send({message: error.message});
  }
})

export default router