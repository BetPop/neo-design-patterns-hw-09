import { CsvIterator } from './iterators/CsvIterator';
import { JsonIterator } from './iterators/JsonIterator';
import { XmlIterator } from './iterators/XmlIterator';

(async () => {
  console.log('--- CSV ---');
  for await (const user of new CsvIterator('./dist/users.csv')) {
    console.log(user);
  }

  console.log('--- JSON ---');
  for await (const user of new JsonIterator('./dist/users.json')) {
    console.log(user);
  }

  console.log('--- XML ---');
  for await (const user of new XmlIterator('./dist/users.xml')) {
    console.log(user);
  }
})();
