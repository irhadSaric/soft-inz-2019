import Validator, { IValidator } from "./Validator";

export interface IPasswordMatchValidator extends IValidator {}

const PasswordMatchValidator = (
  field: string,
  compareField: string,
  message?: string | undefined
): IPasswordMatchValidator => {
  const _message = message || "password_values_do_not_match";

  return Object.assign(Validator(field, _message), {
    isValid: async (obj: Object, value: any) => {
      if (obj[compareField] !== "" && value !== "" && value !== obj[compareField]) {
        return Promise.resolve(false);
      }
    
      return Promise.resolve(true);
    }
  }) as IPasswordMatchValidator;
};

export default PasswordMatchValidator;
