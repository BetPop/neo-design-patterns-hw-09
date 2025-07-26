import * as fs from 'fs/promises';
import { UserData } from '../data/UserData';

export class XmlIterator implements AsyncIterable<UserData> {
  private users: UserData[] = [];

  constructor(private filePath: string) {}

  async init() {
    const content = await fs.readFile(this.filePath, 'utf-8');

    // Простий парсер xml через RegExp (для навчальної мети, не для продакшена)
    const userMatches = content.match(/<user>([\s\S]*?)<\/user>/g) || [];
    this.users = userMatches.map((userXml) => {
      const getTagValue = (tag: string) => {
        const match = userXml.match(new RegExp(`<${tag}>(.*?)</${tag}>`));
        return match ? match[1] : '';
      };

      return {
        id: Number(getTagValue('id')),
        name: getTagValue('name'),
        email: getTagValue('email'),
        phone: getTagValue('phone'),
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
