// Next
import nc from 'next-connect';

// Config
import dbConnect from '../../../config/dbConnect';

// Controllers
import { stripeCheckOutSession } from '../../../controllers/paymentControllers';

// MiddleWares
import { isAuthenticatedUser } from '../../../middlewares/auth';
import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(stripeCheckOutSession);

export default handler;
