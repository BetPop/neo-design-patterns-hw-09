import fetch from 'node-fetch';
import { UserData } from '../data/UserData';

export abstract class DataExporter {
  protected data: UserData[] = [];
  protected result: string = '';

  public async export(): Promise<void> {
    await this.load();
    this.transform();
    this.beforeRender();
    this.render();
    this.afterRender();
    await this.save();
  }

  protected async load(): Promise<void> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    // Записуємо у this.data
    this.data = users.map((u: any) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
    }));
  }

  protected transform(): void {
    // Відбір полів і сортування за name
    this.data = this.data
      .map(({ id, name, email, phone }) => ({ id, name, email, phone }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  protected beforeRender(): void {
    // hook - порожня за замовчуванням
  }

  protected abstract render(): void;

  protected afterRender(): void {
    // hook - порожня за замовчуванням
  }

  protected abstract save(): Promise<void>;
}
