import mongoose from 'mongoose';

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const URI = process.env.DB_LOCAL_URI;
  mongoose.connect(URI, { useUnifiedTopology: true });

  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log('Connected to local database.');
  });

  // mongoose
  //   .connect(process.env.DB_LOCAL_URI, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     useFindAndModify: false,
  //     useCreateIndex: true,
  //   })
  //   .then((con) => console.log('Connected to local database.'));
};

export default dbConnect;
