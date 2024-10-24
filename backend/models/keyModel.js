import mongoose from "mongoose"; 

const clientSchema = mongoose.Schema(
  {
    client: {type: Number, required: true},
    publicN : {type: Number, required: true},
    publicE : {type: Number, required: true}
  }
);

export const Client = mongoose.model('RSA-client', clientSchema)