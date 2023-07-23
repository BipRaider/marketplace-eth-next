// import { getLoginHistory, getUsers } from '@src/services/knex/db';
// import { validatePassword, validateUsername } from '@src/services/knex/validateUser';
import { withSessionRoute } from '@src/services/withSession';

export default withSessionRoute(async (req, res) => {
  return res.status(200);
  // if (req.method !== 'POST') {
  //   res.status(405).send('');
  //   return;
  // }

  // const currentDate = Math.floor(Date.now() / 1000);

  // // Need password and username for logging in, so validate if they are syntactically correct.
  // if (!validatePassword(req.body.password) || !validateUsername(req.body.username)) {
  //   await getLoginHistory().insert({
  //     successful: false,
  //     username: req.body?.username ?? 'No username',
  //     date: currentDate,
  //   });
  //   res.status(400).send('Invalid username or password');
  //   return;
  // }

  // const user = await getUsers().where('username', req.body.username).first();

  // if (user?.password !== req.body.password) {
  //   await getLoginHistory().insert({
  //     successful: false,
  //     username: req.body.username,
  //     date: currentDate,
  //   });
  //   res.status(403).send('Wrong username or password');
  //   return;
  // }

  // await getLoginHistory().insert({
  //   successful: true,
  //   username: req.body.username,
  //   date: currentDate,
  // });

  // req.session.id = user!.id;
  // await req.session.save();
  // res.status(200).send('');
});
