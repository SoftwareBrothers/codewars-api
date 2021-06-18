import { createConnection, getConnection } from 'typeorm';
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';

import typeOrmConfig from '../src/config/typeorm.config';

process.env.NODE_ENV = 'test';

const clearDatabase = async () => {
  let existingConnection;
  try {
    existingConnection = getConnection();
    // eslint-disable-next-line no-empty
  } catch {}

  if (!existingConnection) {
    await createConnection(typeOrmConfig as ConnectionOptions);
  }

  await getConnection().synchronize(true);
};
afterEach(clearDatabase);
beforeEach(clearDatabase);

jest.setTimeout(30000);
