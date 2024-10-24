import mongoose from "mongoose"; 

const messageSchema = mongoose.Schema(
  {
    client: {type: Number, required: true},
    message: {type: Number, required: true}
  },
  {
    timestamps: true
  }
);

export const Message = mongoose.model('RSA-Messages', messageSchema)