import * as mongoose from 'mongoose';

export interface Appointment extends mongoose.Document {
  id: string;
  date: Date;
  user: string;
  doctor: string;
  active: boolean;
}
