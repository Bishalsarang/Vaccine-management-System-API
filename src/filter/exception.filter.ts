import {
  Catch,
  Logger,
  HttpStatus,
  ArgumentsHost,
  ExceptionFilter,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  PG_UNIQUE_VIOLATION,
  PG_NOT_NULL_VIOLATION,
  PG_FOREIGN_KEY_VIOLATION,
  PG_INVALID_TEXT_REPRESENTATION,
} from '@drdgvhbh/postgres-error-codes';

interface ResponseError {
  statusCode: number;
  message: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}

/**
 * Exception filter that catches any exception and returns a standardized response
 */
@Catch()
export class CentralExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CentralExceptionFilter.name);

  /**
   * Catches an exception and returns a standardized response
   *
   * @param exception The exception that was thrown
   * @param host The ArgumentsHost object that provides access to the current request and response
   */
  catch(exception: any, host: ArgumentsHost): void {
    this.logger.log('Here', exception?.constructor);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message =
      exception?.detail ||
      exception?.response?.message ||
      exception?.message ||
      exception?.name;

    const error = this.createErrorResponse(request, exception, message);

    response.status(error.statusCode).json(error);
  }

  /**
   * Returns the appropriate HTTP status code based on the Postgres error code
   *
   * @param errorCode The error code from the exception
   * @returns The HTTP status code
   */
  private getStatusCode(errorCode: string): HttpStatus {
    switch (errorCode) {
      case PG_NOT_NULL_VIOLATION:
      case PG_FOREIGN_KEY_VIOLATION:
        return HttpStatus.BAD_REQUEST;
      case PG_UNIQUE_VIOLATION:
        return HttpStatus.CONFLICT;
      case PG_INVALID_TEXT_REPRESENTATION:
        return HttpStatus.BAD_REQUEST;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  /**
   * Creates a standardized error response object
   *
   * @param request The request object
   * @param exception The exception that was thrown
   * @param message The message to include in the response
   * @returns The error response object
   */
  private createErrorResponse(
    request: Request,
    exception: any,
    message: string,
  ): ResponseError {
    const error: ResponseError = {
      message,
      path: request.url,
      code: exception.code,
      method: request.method,
      timestamp: new Date().toISOString(),
      statusCode: this.getStatusCode(exception.code),
    };

    if (exception instanceof UnauthorizedException) {
      error.statusCode = exception.getStatus();
      error.message = exception.message;
      return error;
    }

    if (exception instanceof BadRequestException) {
      error.statusCode = exception.getStatus();
      return error;
    }

    return error;
  }
}
