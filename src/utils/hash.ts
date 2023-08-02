import Web3 from 'web3';

import { bytes16 } from './bytes';

export const createCourseHash =
  (web3: Web3 | null) =>
  (courseId: string, account: string | null): string | undefined => {
    if (!web3) return;
    if (!account) return;

    const hexCourseId = web3.utils.utf8ToHex(courseId);

    const courseHash = web3.utils.soliditySha3(
      { type: 'bytes16', value: bytes16(hexCourseId) },
      { type: 'address', value: account },
    );

    return courseHash;
  };
