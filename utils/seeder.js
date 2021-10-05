const Room = require('../models/room');
const mongoose = require('mongoose');
const rooms = require('../data/rooms.json');

const URI =
  'mongodb+srv://mutasem:mutasem274@cluster0.ssqnm.mongodb.net/bookit?retryWrites=true&w=majority';
mongoose.connect(URI, { useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to local database.');
});

const seedRooms = async () => {
  try {
    await Room.deleteMany();
    console.log('Rooms are deleted');

    await Room.insertMany(rooms);
    console.log('All Rooms are added');

    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};

seedRooms();
