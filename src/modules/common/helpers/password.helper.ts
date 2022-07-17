import { hash as bcrytHash, compare as bcryptCompare } from 'bcrypt';

const hash = (password: string): Promise<string> => {
  if (!password) {
    return undefined;
  }
  const saltRounds = 10;
  return bcrytHash(password, saltRounds);
};

const compare = (password: string, cypherText: string): Promise<boolean> => {
  return bcryptCompare(password, cypherText);
};

const validatePassword = (password: string): boolean => {
  if (!password) {
    return false;
  }
  const lowerCaseTest = /[a-z]/.test(password);
  const uppperCaseTest = /[A-Z]/.test(password);
  const numberTest = /[0-9]/.test(password);
  const specialCharacterTest = /[^a-zA-Z0-9]/.test(password);
  const lengthTest = password.length > 7;

  return lowerCaseTest && uppperCaseTest && numberTest && specialCharacterTest && lengthTest;
};

export default { hash, compare, validatePassword };
