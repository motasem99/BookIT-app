import Room from '../models/room';

// Get All rooms => /api/rooms
const allRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
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

// Get room details => /api/rooms/:id
const getSingleRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.query.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found with this ID',
      });
    }

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

// update room details => /api/rooms/:id
const updateRoom = async (req, res) => {
  try {
    let room = await Room.findById(req.query.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found with this ID',
      });
    }

    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

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

export { allRooms, newRoom, getSingleRoom, updateRoom };
