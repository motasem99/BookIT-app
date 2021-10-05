// Next
import nc from 'next-connect';

// Config
import dbConnect from '../../../config/dbConnect';

// Controllers
import { registerUser } from '../../../controllers/authControllers';

// MiddleWares
import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.post(registerUser);

export default handler;
