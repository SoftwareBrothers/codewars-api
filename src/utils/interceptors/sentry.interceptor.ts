/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as Sentry from '@sentry/node';
@Injectable()
export class SentryInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public intercept( context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(async exception => {
          const { user } = context.switchToHttp().getRequest();
          const isHttpException = exception instanceof HttpException;
          if (!isHttpException || exception.getStatus() >= 500) {
            Sentry.captureException(exception, { user });
            await Sentry.flush();
          }

          throw exception;
        }),
      );
  }
}
