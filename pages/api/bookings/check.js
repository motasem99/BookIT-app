// Next
import nc from 'next-connect';

// Config
import dbConnect from '../../../config/dbConnect';

// Controllers
import { checkRoomBookingsAvailability } from '../../../controllers/bookingControllers';

// MiddleWares
import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.get(checkRoomBookingsAvailability);

export default handler;
