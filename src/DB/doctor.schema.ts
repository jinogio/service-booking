import * as mongoose from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export const DoctorSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    reg_token: { type: String, required: true },
    photo_avatar: { type: String, required: true },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    spec: { type: String, required: true },
    free: { type: Boolean, required: true },
  },
  { timestamps: true },
);
DoctorSchema.plugin(softDeletePlugin);
