// Next
import nc from 'next-connect';

// Config
import dbConnect from '../../../config/dbConnect';

// Controllers
import {
  createRoomReview,
  getRoomReviews,
  deleteReview,
} from '../../../controllers/roomControllers';

// MiddleWares
import { isAuthenticatedUser } from '../../../middlewares/auth';
import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(createRoomReview);
handler.use(isAuthenticatedUser).get(getRoomReviews);
handler.use(isAuthenticatedUser).delete(deleteReview);

export default handler;
