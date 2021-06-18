import { registerAs } from '@nestjs/config';

export default registerAs('codewars', () => ({
  users: [
    'przemyslaw-szejna-sb',
  ],
}));
