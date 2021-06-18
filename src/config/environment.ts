enum Environment {
  DEVELOPMENT = 'development',
  LOCAL = 'local',
  PRODUCTION = 'production',
  TEST = 'test'
}

export const isEnvironment = (environment: Environment): boolean =>
  process.env.NODE_ENV === environment;

export default Environment;
