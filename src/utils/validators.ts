export const BYTES_IN_MEGAMYTES = 1000000;

export const stringAndNumber = (value: string): 'This field should be string and number' | undefined => {
  return value && !/^[a-zA-Z0-9]+$/.test(value) ? 'This field should be string and number' : undefined;
};

export const fileSizeLimitFormat =
  (limit: number) =>
  (file: any): string | undefined => {
    return file && file.size > limit ? `File size should be less than ${limit / BYTES_IN_MEGAMYTES} mb` : undefined;
  };

export const fileImageFormat = (file: any): `File should be image` | undefined => {
  return file && !/\/(jpg|svg|jpeg|png)$/.test(file.type) ? `File should be image` : undefined;
};

export const urlFormatImage = (value: string): `Url should be image` | undefined => {
  return value && !/\.(jpg|svg|jpeg|png)$/.test(value) ? `Url should be image` : undefined;
};

export const emailFormat = (value: string): `Invalid email address` | undefined => {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? `Invalid email address` : undefined;
};

export const isOver18 = (dateOfBirth: Date): boolean => {
  const date18YrsAgo = new Date();
  date18YrsAgo.setFullYear(date18YrsAgo.getFullYear() - 18);
  // check if the date of birth is before that date
  return dateOfBirth <= date18YrsAgo;
};

export const numberFormat = (value: number): 'Must be a number' | undefined =>
  isNaN(value) ? 'Must be a number' : undefined;

export const minValue =
  (min: number) =>
  (value: number): string | undefined =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

export const passwordFormat = (value: string): `Invalid email address` | undefined => {
  return value && !/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i.test(value)
    ? `Invalid email address`
    : undefined;
};

/*** Check empty.
 ** if is empty return `true`
 */
export const isEmpty = (data: unknown): boolean => {
  return (
    data == null ||
    data == undefined ||
    data === '' ||
    (Array.isArray(data) && data.length === 0) ||
    (data.constructor === Object && Object.keys(data).length === 0)
  );
};
