// import { getUsers } from '@src/services/knex/db';
import { withSessionRoute } from '@src/services/withSession';

export default withSessionRoute(async (req, res) => {
  return res.status(200);
  // const users = await getUsers();
  // if (users.find(user => user.id === req.session.id)?.isAdmin) {
  //   res.status(200).json(users);
  //   return;
  // }
  // res.status(401).send('');
});
