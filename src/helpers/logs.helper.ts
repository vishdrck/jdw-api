import { yellow, green, blue, red } from 'chalk';
import * as moment from 'moment';
import { DB_COLLECTIONS } from 'src/constants/enums';

const info = (message: string, module = ''): void => {
  const moduleName = module ? yellow(`[${module}] `) : '';
  if (message?.trim()?.length > 0) {
    console.log(`${green('[Nest] 00000  -')} ${moment().format('DD/MM/YYYY, LTS')}     ${green('LOG')} ${moduleName}${blue(message)}`);
  }
};

const error = (message: string, module = ''): void => {
  const moduleName = module ? yellow(`[${module}] `) : '';
  if (message?.trim()?.length > 0) {
    console.log(`${red('[Nest] 00000  -')} ${moment().format('DD/MM/YY, LTS')}     ${red('ERROR')} ${moduleName}${red(message)}`);
  }
};

const initLog = (module: DB_COLLECTIONS, from: string, success = true): void => {
  const title = `Initializing ${module} Database Collection`;
  const status = success ? 'success' : 'failed';

  const handler = success ? info : error;
  const color = success ? green : red;

  handler(`${title} ${color(status)}`, from);
};

export default { info, error, initLog };
