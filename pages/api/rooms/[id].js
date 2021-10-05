// Next
import nc from 'next-connect';

// Config
import dbConnect from '../../../config/dbConnect';

// Controllers
import {
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from '../../../controllers/roomControllers';

// MiddleWares
import onError from '../../../middlewares/errors';
import { isAuthenticatedUser, authorizeRoles } from '../../../middlewares/auth';

const handler = nc({ onError });

dbConnect();

handler.get(getSingleRoom);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateRoom);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteRoom);

export default handler;
