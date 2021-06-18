import * as Sentry from '@sentry/node';

export const reportToSentry = async (exception: Error): Promise<void> => {
  try {
    Sentry.withScope((scope) => {
      scope.setExtras({
        description: `${exception.name} ${exception.message}`,
        details: {
          repository: 'codewars-api',
        },
      });
      Sentry.captureException(exception);
    });
    await Sentry.flush(10000);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
