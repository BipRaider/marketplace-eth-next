import useSWR from 'swr';
import Web3 from 'web3';

import { normalizeOwnedCourse } from '@utils/normalize';
import { INormalizeOwnedCourse } from '@src/types';
import { IAccount } from '@src/context/web3/useAccount';

export const useManagedCourses =
  (web3: Web3 | null, contract: any) => (coursesList: INormalizeOwnedCourse[], account: IAccount) => {
    const swrRes = useSWR(
      () => (web3 && contract && account.address && account.isAdmin ? `web3/managedCourses/${account.address}` : null),
      async () => {
        const courses: INormalizeOwnedCourse[] = coursesList?.length > 0 ? coursesList : [];

        const courseCount = await contract.methods.getCourseCount().call();

        for (let i = Number(courseCount) - 1; i >= 0; i--) {
          const courseHash = await contract.methods.getCourseHashAtIndex(i).call();
          const course = await contract.methods.getCourseByHash(courseHash).call();

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
