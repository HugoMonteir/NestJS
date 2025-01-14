export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationExceptionResponse {
  message: ValidationError[];
  error: string;
  statusCode: number;
}
