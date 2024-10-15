import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  mobile: { type: String, required: true },
  mobileVerified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Company', companySchema);
