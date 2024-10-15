import Company from '../models/Company.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendVerificationEmail } from '../config/emailService.js';

export const register = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: 'Company already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const company = new Company({
      name,
      email,
      password: hashedPassword,
      mobile,
      isVerified: false,
      verificationToken,
    });

    await company.save();

    sendVerificationEmail(company.email, verificationToken);

    res.status(201).json({ message: 'Registered successfully. Please verify your email.' });
  } catch (error) {
    console.error('Error registering company:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const company = await Company.findOne({ verificationToken: token });
    if (!company) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    company.isVerified = true;
    company.verificationToken = '';
    await company.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    if (!company.isVerified) {
      return res.status(403).json({ message: 'Please verify your email before logging in' });
    }
    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
        { id: company._id, email: company.email, name: company.name },
        process.env.JWT_SECRET,
        { expiresIn: '0' }
    );
    res.json({
      token,
      user: {
        id: company._id,
        email: company.email,
        name: company.name,
      },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
