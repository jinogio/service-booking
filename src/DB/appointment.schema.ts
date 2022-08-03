import * as mongoose from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export const AppointmentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    user: { type: String, required: true },
    doctor: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);
AppointmentSchema.plugin(softDeletePlugin);

AppointmentSchema.virtual('active').get(function () {
  return this.date > new Date();
});
