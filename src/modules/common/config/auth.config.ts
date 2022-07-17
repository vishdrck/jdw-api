import { CONFIG_KEYS } from 'src/constants/enums';

export default () => ({
  [CONFIG_KEYS.JWT_SECRET]: process.env.JWT_SECRET,
});
