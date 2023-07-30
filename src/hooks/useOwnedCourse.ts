import useSWR from 'swr';
import Web3 from 'web3';

import { createCourseHash } from '@utils/hash';
import { normalizeOwnedCourse } from '@utils/normalize';

import { ICourses } from '@src/types';

export const useOwnedCourse = (web3: Web3 | null, contract: any) => (course: ICourses, account: string | null) => {
  const swrRes = useSWR(
    () => (web3 && contract && account ? `web3/ownedCourse/${account}` : null),
    async () => {
      const courseHash = createCourseHash(web3)(course.id, account);
      const ownedCourse = await contract.methods.getCourseByHash(courseHash).call();

      if (ownedCourse.owner === '0x0000000000000000000000000000000000000000') {
        return null;
      }

      return normalizeOwnedCourse(web3)(course, ownedCourse);
    },
  );

  return swrRes;
};
