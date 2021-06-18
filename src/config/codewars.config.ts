import { registerAs } from '@nestjs/config';

export default registerAs('codewars', () => ({
  baseApiUrl: 'https://www.codewars.com/api/v1',
}));
