import mongoose from 'mongoose';
import Birthday from './db.js';
import fetch from 'node-fetch';
import cron from 'node-cron';
import dotenv from 'dotenv';
dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ DB connection failed", err));

// Cron job: 9 AM IST daily
cron.schedule('01 00 * * *', async () => {
  const today = new Date().toISOString().slice(0, 10);
  console.log(`⏰ Checking for birthdays on ${today}`);

  try {
    const birthdays = await Birthday.find({ birthday: today });
    console.log("🎯 Found birthdays:", birthdays);

    for (const person of birthdays) {
      const message = `A very happy birthday, dear student. Wishing for your good health, happiness, and success! May you achieve all your goals! Biyani Group of Colleges, Jaipur`;

      const url = `https://sms.par-ken.com/api/smsapi?key=${process.env.SMS_KEY}&route=${process.env.SMS_ROUTE}&sender=${process.env.SMS_SENDER}&number=${person.phone}&sms=${encodeURIComponent(message)}&templateid=${process.env.SMS_TEMPLATE}`;

      console.log("📡 Hitting URL:", url);

      const res = await fetch(url);
      const result = await res.text();
      console.log("📨 API Response:", result);
    
    }
  } catch (err) {
    console.error("❌ Error while sending messages:", err);
  }

}, {
  timezone: "Asia/Kolkata"
});

console.log("📅 Birthday Scheduler Worker started...");
