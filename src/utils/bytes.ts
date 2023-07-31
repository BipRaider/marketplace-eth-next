/*** The function is normalizing a data after the `web3.utils.utf8ToHex(str)` at 16 bytes or 32 number.
 ** 0x31343130343734000000000000000000 = 16 bytes or 32 number.
 ```ts
  bytes16(0x31343130343734) // 0x31343130343734000000000000000000;
 ```
 */
export const bytes16 = (str: string) => {
  const bytes = `${str}00000000000000000000000000000000`;
  const bytes16 = bytes.substring(0, 34);
  return bytes16;
};

/*** The function is normalizing a data  at 32 bytes or 64 number.
 ```ts
  bytes32(0x31343130343734) // 0x3134313034373400000000000000000000000000000000000000000000000000;
 ```
 */
export const bytes32 = (str: string) => {
  const bytes = `${str}0000000000000000000000000000000000000000000000000000000000000000`;
  const bytes16 = bytes.substring(0, 66);
  return bytes16;
};
