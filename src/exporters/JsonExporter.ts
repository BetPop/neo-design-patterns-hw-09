import { DataExporter } from './DataExporter';
import * as fs from 'fs/promises';

export class JsonExporter extends DataExporter {
  protected render(): void {
    this.result = JSON.stringify(this.data, null, 2);
  }

  protected async save(): Promise<void> {
    await fs.writeFile('./dist/users.json', this.result, 'utf-8');
  }
}
