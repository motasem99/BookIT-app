// Next
import nc from 'next-connect';

// Config
import dbConnect from '../../config/dbConnect';

// Controllers
import { webhookCheckout } from '../../controllers/paymentControllers';

// MiddleWares
import onError from '../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(webhookCheckout);

export default handler;
