import { join } from "path";
export default class PathJoiner {
  private static projectDir: string = __dirname;
  static get errorLog(): string {
    return join(this.projectDir, "..", "error.log");
  }
}
