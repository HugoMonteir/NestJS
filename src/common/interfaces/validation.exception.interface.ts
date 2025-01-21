export interface ValidationErrorProperty {
  field: string;
  message: string;
}

export interface ValidationExceptionResponse {
  message: ValidationErrorProperty[];
  error: string;
  statusCode: number;
}
