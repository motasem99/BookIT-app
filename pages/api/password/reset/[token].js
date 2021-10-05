// Next
import nc from 'next-connect';

// Config
import dbConnect from '../../../../config/dbConnect';

// Controllers
import { resetPassword } from '../../../../controllers/authControllers';

// MiddleRares
import onError from '../../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.put(resetPassword);

export default handler;
