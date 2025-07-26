import * as fs from 'fs/promises';
import { UserData } from '../data/UserData';

export class CsvIterator implements AsyncIterable<UserData> {
  private users: UserData[] = [];

  constructor(private filePath: string) {}

  async init() {
    const content = await fs.readFile(this.filePath, 'utf-8');
    const lines = content.trim().split('\n');
    const headers = lines.shift()?.split(',') || [];

    this.users = lines.map(line => {
      const parts = line.split(',');
      const user: any = {};
      headers.forEach((h, i) => {
        user[h] = parts[i];
      });
      return {
        id: Number(user.id),
        name: user.name,
        email: user.email,
        phone: user.phone,
      };
    });
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
