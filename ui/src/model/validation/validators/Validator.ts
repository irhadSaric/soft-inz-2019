export interface TValidator {
  field: string;
  message: string | undefined;
}

export interface IValidator extends TValidator {
  isValid(obj: Object, value: any): Promise<boolean>;
}

const Validator = (field: string, message: string | undefined): IValidator => {
  const _field = field;
  const _message = message || "validation_error_message";

  return {
    get field() {
      return _field;
    },

    get message() {
      return _message;
    },

    async isValid(obj, value) {
      return Promise.resolve(false);
    }
  };
};

export default Validator;
