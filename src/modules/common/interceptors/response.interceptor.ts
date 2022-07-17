import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const [res] = context.getArgs();

        const { statusCode, message, ...rest } = data || {};

        return {
          statusCode: statusCode || res.statusCode || 200,
          success: true,
          message: message || 'success',
          ...(rest || {}),
        };
      }),
    );
  }
}
