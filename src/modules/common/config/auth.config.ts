import { CONFIG_KEYS } from 'src/modules/common/constants/enums';

export default () => ({
  [CONFIG_KEYS.JWT_SECRET]: process.env.JWT_SECRET,
  [CONFIG_KEYS.ACCESS_TOKEN_EXPIRY_DURATION]: process.env.ACCESS_TOKEN_DURATION,
});
