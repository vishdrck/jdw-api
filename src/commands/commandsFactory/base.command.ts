export abstract class BaseCommad {
  private commandName = 'basecommand';
  private help = '--basecommand [This is a help message. Inherit this message]';

  constructor(commandName: string, help: string) {
    this.commandName = commandName;
    this.help = help;
  }

  public getCommand(): string {
    return this.commandName;
  }

  public getHelp(): string {
    return this.help;
  }

  public abstract execute(): Promise<boolean>;
}
