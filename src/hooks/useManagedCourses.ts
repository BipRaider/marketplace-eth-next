import useSWR from 'swr';
import Web3 from 'web3';

import { normalizeOwnedCourse } from '@utils/normalize';
import { ICourses } from '@src/types';
import { IAccount } from '@src/context/web3/useAccount';

export const useManagedCourses = (web3: Web3 | null, contract: any) => (coursesList: ICourses[], account: IAccount) => {
  const swrRes = useSWR(
    () => (web3 && contract && account.address && account.isAdmin ? `web3/managedCourses/${account.address}` : null),
    async () => {
      const courses = coursesList?.length > 0 ? coursesList : [];

      const courseCount = await contract.methods.getCourseCount().call();

      for (let i = Number(courseCount) - 1; i >= 0; i--) {
        const courseHash = await contract.methods.getCourseHashAtIndex(i).call();
        const course = await contract.methods.getCourseByHash(courseHash).call();

        if (course) {
          const normalized = normalizeOwnedCourse(web3)({ hash: courseHash }, course);
          courses.push(normalized);
        }
      }

      return courses;
    },
  );

  return swrRes;
};
