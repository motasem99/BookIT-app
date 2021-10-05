// Next
import nc from 'next-connect';

// Config
import dbConnect from '../../../config/dbConnect';

// Controllers
import { checkBookedDatesOfRoom } from '../../../controllers/bookingControllers';

// MiddleWares
import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.get(checkBookedDatesOfRoom);

export default handler;
