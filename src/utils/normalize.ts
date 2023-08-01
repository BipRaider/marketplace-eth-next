import Web3 from 'web3';
import { ICourses, INormalizeOwnedCourse, IOwnerCurse } from '@src/types';

export const COURSE_STATES = {
  0: 'purchased',
  1: 'activated',
  2: 'deactivated',
};

export const normalizeOwnedCourse =
  (web3: Web3 | null) =>
  (course: Partial<ICourses>, ownedCourse: IOwnerCurse): INormalizeOwnedCourse | undefined => {
    if (!web3) return;

    return {
      id: '',
      ...course,
      ownedCourseId: ownedCourse.id.toString(),
      proof: ownedCourse.proof,
      owner: ownedCourse.owner,
      price: web3.utils.fromWei(ownedCourse.price, 'ether'),
      state: COURSE_STATES[ownedCourse.state],
    };
  };
