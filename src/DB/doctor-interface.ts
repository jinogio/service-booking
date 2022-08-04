import * as mongoose from 'mongoose';

export interface Doctor extends mongoose.Document {
  id: string;
  email: string;
  password: string;
  reg_token: string;
  photo_avatar: string;
  phone: string;
  name: string;
  type: string;
  spec: string;
  free: string;
}
