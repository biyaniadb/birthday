import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Birthday from './db.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const testUser = new Birthday({
      name: 'TestUser',
      phone: '8000481361',
      birthday: '2025-06-07'  // <-- make sure this matches today's test date
    });

    await testUser.save();
    console.log('✅ Test user inserted into database.');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Insertion failed:', err.message);
    process.exit(1);
  });
