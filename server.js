import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import csv from 'csv-parser';
import Birthday from './db.js';

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);


app.post('/upload-csv', (req, res) => {
  const results = [];

  fs.createReadStream('birthdays.csv')
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', async () => {
      await Birthday.deleteMany({});
      await Birthday.insertMany(results);
      res.send('CSV uploaded and data saved.');
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
