import * as fs from 'fs/promises';
import { UserData } from '../data/UserData';

export class JsonIterator implements AsyncIterable<UserData> {
  private users: UserData[] = [];

  constructor(private filePath: string) {}

  async init() {
    const content = await fs.readFile(this.filePath, 'utf-8');
    this.users = JSON.parse(content) as UserData[];
  }

  async *[Symbol.asyncIterator]() {
    if (this.users.length === 0) {
      await this.init();
    }
    for (const user of this.users) {
      yield user;
    }
  }
}
