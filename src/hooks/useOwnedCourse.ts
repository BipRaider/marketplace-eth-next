import useSWR from 'swr';
import Web3 from 'web3';

import { createCourseHash } from '@utils/hash';
import { normalizeOwnedCourse } from '@utils/normalize';

import { ICourses, IOwnerCurse } from '@src/types';
import { ILoadContract } from '@src/context';

export const useOwnedCourse =
  (web3: Web3 | null, contract: ILoadContract['contract']) => (course: ICourses, account: string | null) => {
    const swrRes = useSWR(
      () => (web3 && contract && account ? `web3/ownedCourse/${account}` : null),
      async () => {
        if (!contract) throw new Error('Contract not found.');

        const courseHash = createCourseHash(web3)(course.id, account);
        if (!courseHash) throw new Error('CourseHash is wrong.');

        const ownedCourse: IOwnerCurse = await contract.methods.getCourseByHash(courseHash).call();

        if (ownedCourse.owner === '0x0000000000000000000000000000000000000000') return null;

        return normalizeOwnedCourse(web3)(course, ownedCourse);
      },
    );

    return swrRes;
  };
