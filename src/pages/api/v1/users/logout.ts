import { withSessionRoute } from '@src/services/withSession';

export default withSessionRoute(async (req, res) => {
  return res.status(200);
  // req.session.id = undefined;
  // await req.session.save();
  // res.status(200).send('');
});
