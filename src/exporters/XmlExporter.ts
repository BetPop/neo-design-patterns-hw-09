import { DataExporter } from './DataExporter';
import * as fs from 'fs/promises';

export class XmlExporter extends DataExporter {
  protected render(): void {
    const usersXml = this.data
      .map(
        user => `
  <user>
    <id>${user.id}</id>
    <name>${user.name}</name>
    <email>${user.email}</email>
    <phone>${user.phone}</phone>
  </user>`
      )
      .join('\n');

    this.result = `<?xml version="1.0" encoding="UTF-8"?>
<users>${usersXml}
</users>`;
  }

  protected afterRender(): void {
    this.result += `\n<!-- Експорт згенеровано: ${new Date().toISOString()} -->`;
  }

  protected async save(): Promise<void> {
    await fs.writeFile('./dist/users.xml', this.result, 'utf-8');
  }
}
