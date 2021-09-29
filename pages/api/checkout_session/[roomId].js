import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { stripeCheckOutSession } from '../../../controllers/paymentControllers';
import { isAuthenticatedUser } from '../../../middlewares/auth';

import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(stripeCheckOutSession);

export default handler;
