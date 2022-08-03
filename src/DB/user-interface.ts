import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  id: string;
  email: string;
  reg_token: string;
  photo_avatar: string;
  phone: string;
  name: string;
  type: string;
}
