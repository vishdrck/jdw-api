import 'dotenv/config';
import { BaseCommad } from './commandsFactory/base.command';
import { RefreshDBCommand } from './commandsFactory/refresh.command';

const ClassLoader: BaseCommad[] = [new RefreshDBCommand()];

function parseArg(arg: string) {
  return arg.toLowerCase().slice(2);
}

function bootstrap() {
  if (process.argv.length > 0) {
    const args = process.argv.slice(2);

    args.forEach((arg) => {
      const argument = parseArg(arg);

      ClassLoader.forEach(async (cmd) => {
        if (argument == 'help') {
          console.log(cmd.getHelp());
        } else if (cmd.getCommand().toLowerCase() == argument) {
          try {
            await cmd.execute();
            console.log(
              `[Command] ${cmd.getCommand()} - ${new Date().toLocaleString()} LOG Command executed`,
            );
          } catch (err) {
            console.log(err);
          }
        }
      });
    });
  }
}

bootstrap();
