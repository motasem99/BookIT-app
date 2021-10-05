// Next
import nc from 'next-connect';

// Config
import dbConnect from '../../../../config/dbConnect';

// Controllers
import { allAdminBookings } from '../../../../controllers/bookingControllers';

// MiddleWares
import onError from '../../../../middlewares/errors';
import {
  isAuthenticatedUser,
  authorizeRoles,
} from '../../../../middlewares/auth';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(allAdminBookings);

export default handler;
