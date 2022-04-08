/* eslint-disable @typescript-eslint/naming-convention */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: 'String',
  photoUrl: 'String',
  name: 'String',
  bio: 'String',
  phoneNum: 'Number',
  email: { type: 'String', required: true },
  password: { type: 'String', required: true },
});

export const USER = mongoose.model('user', userSchema);
