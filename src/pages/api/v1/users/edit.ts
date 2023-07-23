// import { getUsers } from '@src/services/knex/db';
import { withSessionRoute } from '@src/services/withSession';

export default withSessionRoute(async (req, res) => {
  return res.status(200);

  // if (req.method !== 'POST') {
  //   res.status(405).send('');
  //   return;
  // }

  // if (!(req.session.id && (await getUsers().where('id', req.session.id).first())?.isAdmin)) {
  //   res.status(401).send('');
  //   return;
  // }

  // const userIdToModify = req.body?.id;

  // if (typeof userIdToModify !== 'number') {
  //   res.status(400).send('');
  //   return;
  // }

  // const userToModify = getUsers().where('id', userIdToModify);

  // const data = {
  //   id: req?.body?.id,
  //   delete: req?.body?.delete,
  // };

  // await userToModify.update(data);

  // res.status(200).send('');
});
