import Validator, { IValidator } from "./Validator";

export interface IEmailValidator extends IValidator {}

const validateEmail = (email: string) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const EmailValidator = (
  field: string,
  message?: string | undefined
): IEmailValidator => {
  const _message = message || "email_is_invalid";

  return Object.assign(Validator(field, _message), {
    isValid: async (obj: Object, value: any) => {
      if (validateEmail(value)) {
        return Promise.resolve(true);
      }

      return Promise.resolve(false);
    }
  }) as IEmailValidator;
};

export default EmailValidator;
