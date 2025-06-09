import mongoose from 'mongoose';

const birthdaySchema = new mongoose.Schema({
  name: String,
  phone: String,
  birthday: String // Format: YYYY-MM-DD
});

const Birthday = mongoose.model("Birthday", birthdaySchema);
export default Birthday;
