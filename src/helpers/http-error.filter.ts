import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { isFunction, isNil, isObject } from 'lodash';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const statusCode = isFunction(exception.getStatus)
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errors: any = exception;
    const validationErrors = errors.response || {};

    const errorResponse: object = {
      statusCode,
      message:
        this.formatErrors(validationErrors.message) ||
        exception.message ||
        'Not Found',
      developerNote: {
        path: request.url,
        method: request.method,
        timestamp: new Date().toISOString(),
      },
    };

    return response.status(statusCode).json(errorResponse);
  }

  private formatErrors(errors: any[]) {
    if (isObject(errors) && !isNil(errors)) {
      return errors
        .map((err: any) => {
          return err;
        })
        .join(', ');
    }

    return errors;
  }
}
