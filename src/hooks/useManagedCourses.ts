import useSWR from 'swr';
import Web3 from 'web3';

import { normalizeOwnedCourse } from '@utils/normalize';
import { INormalizeOwnedCourse, IOwnerCurse, ICourses } from '@src/types';
import { IAccount } from '@src/context/web3/useAccount';
import { ILoadContract } from '@src/context';

export const useManagedCourses = (web3: Web3 | null, contract: ILoadContract['contract']) => (account: IAccount) => {
  const swrRes = useSWR(
    () => (web3 && contract && account.address && account.isAdmin ? `web3/managedCourses/${account.address}` : null),
    async () => {
      const courses: INormalizeOwnedCourse[] = [];
      if (!contract) throw new Error('Contract not found.');

      const courseCount: number = await contract.methods.getCourseCount().call();

      for (let i = Number(courseCount) - 1; i >= 0; i--) {
        const courseHash: string = await contract.methods.getCourseHashAtIndex(i).call();
        const course: IOwnerCurse = await contract.methods.getCourseByHash(courseHash).call();

        if (course) {
          const normalized = normalizeOwnedCourse(web3)({ hash: courseHash }, course);
          if (normalized) courses.push(normalized);
        }
      }

      return courses;
    },
  );

  return swrRes;
};
