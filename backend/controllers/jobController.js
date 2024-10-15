import Job from '../models/Job.js';
import { sendJobEmails } from '../config/emailService.js';

export const postJob = async (req, res) => {
  const { title, description, experienceLevel, endDate, candidates } = req.body;

  if (!title || !description || !experienceLevel || !endDate || !candidates) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    if (!req.user || !req.user.isVerified) {
      return res.status(401).json({ message: 'Unauthorized or unverified user' });
    }

    const job = new Job({
      title,
      description,
      experienceLevel,
      endDate,
      candidates,
      createdBy: req.user._id,
    });

    await job.save();
    await sendJobEmails(job, req.user.name);

    res.status(201).json({ message: 'Job posted and emails sent successfully' });
  } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
