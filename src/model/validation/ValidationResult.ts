type TError = {
  field: string;
  message: string | undefined;
};

type TValidationErrors = {
  field: string;
  messages: string[] | [];
};

export interface TValidationResult {
  isValid: boolean;
  validationErrors: TValidationErrors;
  numberOfValidationErrors: number;
}

export interface IValidationResult extends TValidationResult {
  addValidationErrors(errors: TError): void;
}

const ValidationResult = (): IValidationResult => {
  let _errors = {} as TValidationErrors;
  let _numberOfValidationErrors = 0;

  return {
    get isValid() {
      return _numberOfValidationErrors === 0;
    },

    get validationErrors() {
      return _errors;
    },

    get numberOfValidationErrors() {
      return _numberOfValidationErrors;
    },

    addValidationErrors: (...errors) => {
      if (errors) {
        errors.forEach(error => {
          if (!_errors[error.field]) {
            _errors[error.field] = [error.message];
          } else {
            _errors[error.field].push(error.message);
          }
          _numberOfValidationErrors++;
        });
      }
    }
  };
};

export default ValidationResult;
