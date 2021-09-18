import Room from '../models/room';

const allRooms = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'All Rooms',
  });
};

// Create new room => /api/rooms
const newRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);

    res.status(200).json({
      success: true,
      room,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

export { allRooms, newRoom };
