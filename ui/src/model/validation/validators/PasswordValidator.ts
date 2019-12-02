import Validator, { IValidator } from "./Validator";

export interface IPasswordValidator extends IValidator {}

const PasswordValidator = (
  field: string,
  message?: string | undefined
): IPasswordValidator => {
  const _message = message || "invalid_password_min_length";

  return Object.assign(Validator(field, _message), {
    isValid: async (obj: Object, value: any) => {
      if (value.length >= 5) {
        return Promise.resolve(true);
      }

      return Promise.resolve(false);
    }
  }) as IPasswordValidator;
};

export default PasswordValidator;
