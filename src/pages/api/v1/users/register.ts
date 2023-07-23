import { NextApiRequest, NextApiResponse } from 'next/types';

import { withSessionRoute } from '@src/services/withSession';

// import { getUsers } from '@src/services/knex/db';
// import validateUser, { ValidationResult } from '@src/services/knex/validateUser';
// import User from '@src/services/knex/models/user';
// const registrationKeys = ['username', 'password', 'email', 'firstName', 'lastName', 'age', 'gender'].sort();

export default withSessionRoute(async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200);
  // if (req.method !== 'POST') {
  //   res.status(405).send(''); // Incorrect request method
  //   return;
  // }

  // const condition: boolean = registrationKeys.every(v => Object.keys(req.body).includes(v));

  // if (!condition) {
  //   res.status(400).send(''); // Bad input
  //   return;
  // }

  // const requestedUser = req.body as User;

  // let validationResult = validateUser(requestedUser);

  // if (validationResult === ValidationResult.None) {
  //   if ((await getUsers().whereRaw('LOWER(username) LIKE ?', `${requestedUser.username.toLowerCase()}`)).length) {
  //     validationResult = ValidationResult.TakenUsername;
  //   } else if ((await getUsers().whereRaw('LOWER(email) LIKE ?', `${requestedUser.email.toLowerCase()}`)).length) {
  //     validationResult = ValidationResult.TakenEmail;
  //   }
  // }

  // if (validationResult !== ValidationResult.None) {
  //   res.status(400).send(validationResult);
  //   return;
  // }

  // await getUsers().insert({
  //   ...requestedUser,
  //   isAdmin: false,
  // });

  // res.status(200).send(validationResult);
});
