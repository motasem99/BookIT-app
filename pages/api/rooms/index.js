// Next
import nc from 'next-connect';

// Config
import dbConnect from '../../../config/dbConnect';

// Controllers
import { allRooms, newRoom } from '../../../controllers/roomControllers';

// MiddleWares
import onError from '../../../middlewares/errors';
import { isAuthenticatedUser, authorizeRoles } from '../../../middlewares/auth';

const handler = nc({ onError });

dbConnect();

handler.get(allRooms);

handler.use(isAuthenticatedUser, authorizeRoles('admin')).post(newRoom);

export default handler;
