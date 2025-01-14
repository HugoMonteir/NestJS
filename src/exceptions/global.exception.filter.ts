import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { DefaultRequestMessageInterface } from '../common/interfaces';
import { Request, Response } from 'express';
import { FormatDateUtil } from '../common/utils';
import { ValidationException } from './validation.exception';
import { EXCEPTION_MESSAGES } from '../common/constants';
import { ValidationExceptionResponse } from '../common/interfaces';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const timestamp = FormatDateUtil.formatTimestamp(new Date());
    const exceptionMessage = this.getExceptionMessage(exception);

    const message: DefaultRequestMessageInterface = {
      timestamp,
      status,
      message: exceptionMessage,
      path: request.url
    };

    response.status(status).json(message);
  }

  private getExceptionMessage(exception: HttpException): string | object {
    if (exception instanceof ValidationException) {
      const response = exception.getResponse() as ValidationExceptionResponse;
      return response.message;
    }

    return EXCEPTION_MESSAGES.get(exception.constructor) || exception.message;
  }
}
