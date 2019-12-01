import Validator, { IValidator } from "./Validator";

export interface IMaxLengthValidator extends IValidator {
  maxLength: number;
}

const MaxLengthValidator = (
  field: string,
  allowedLength: number,
  message?: string | undefined
): IMaxLengthValidator => {
  const _message = message || "max_length_exceeded_error_message";
  const _maxLength = allowedLength > 0 ? allowedLength : 0;

  return Object.assign(Validator(field, _message), {
    get maxLength() {
      return _maxLength;
    },

    isValid: async (obj: Object, value: any) => {
      if (
        typeof value === "undefined" ||
        typeof value === "boolean" ||
        value === null ||
        value === undefined
      ) {
        return Promise.resolve(true);
      }
      if (value.toString().length > _maxLength) return Promise.resolve(false);
      return Promise.resolve(true);
    }
  }) as IMaxLengthValidator;
};

export default MaxLengthValidator;
