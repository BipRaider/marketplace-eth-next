import useSWR from 'swr';
import Web3 from 'web3';

import { createCourseHash } from '@utils/hash';
import { normalizeOwnedCourse } from '@utils/normalize';

import { ICourses, IOwnerCurse } from '@src/types';
import { ILoadContract } from '@src/context';

export const useOwnedCourses =
  (web3: Web3 | null, contract: ILoadContract['contract']) => (courses: ICourses[], account: string | null) => {
    const swrRes = useSWR(
      () => (web3 && contract && account ? `web3/ownedCourses/${account}` : null),
      async () => {
        const ownedCourses: (ICourses & IOwnerCurse)[] = [];
        if (!contract) return;
        for (let i = 0; i < courses.length; i++) {
          const course = courses[i];
          if (!course.id) continue;
          const courseHash = createCourseHash(web3)(course.id, account);
          const ownedCourse: any = await contract.methods.getCourseByHash(courseHash).call();
          if (ownedCourse?.owner !== '0x0000000000000000000000000000000000000000') {
            const normalized = normalizeOwnedCourse(web3)(course, ownedCourse);
            if (normalized) ownedCourses.push(normalized);
          }
        }

        return ownedCourses;
      },
    );

    return {
      ...swrRes,
      lookup:
        swrRes.data?.reduce((a, c) => {
          a[c.id] = c;
          return a;
        }, {}) ?? {},
    };
  };
