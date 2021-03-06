// Mongoose
import mongoose from 'mongoose';

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const URI = process.env.DB_URI;
  mongoose.connect(URI, { useUnifiedTopology: true });

  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log('Connected to local database.');
  });
};

export default dbConnect;
