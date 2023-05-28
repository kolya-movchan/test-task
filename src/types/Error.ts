export enum Error {
  NONAME = 'Please, enter the name',
  NOEMAIL = 'Please, enter the email',
  NOPHONE = 'Please, enter the phone number',
  SHORTNAME = 'Name must be not less than 2 characters',
  LONGNAME = 'Maximum number of characters is exceeded',
  WRONGEMAIL = 'Please, fill in correct email format',
  WRONGPHONEFORMAT = 'Please, use +38 (XXX) XXX - XX - XX format',
  FILEFORMAT = 'Supported formats are jpg/jpeg only',
  FILESIZE = 'Size must not exceed 5MB',
  FILERESOLUTION = 'Resolution must be at least 70x70px',
}

export type ErrorObject = {
  [key: string]: boolean | string;
};
