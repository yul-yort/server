import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

/**
 * Validation exception class.
 */
export class ValidateException extends HttpException {
  /**
   * Constructor
   * @param errorBody class-validator validation errors
   */
  constructor(errorBody: ValidationError[]) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
        error: 'Validation failed',
        errorBody,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
