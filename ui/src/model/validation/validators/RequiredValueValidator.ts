import Validator, { IValidator } from "./Validator";

export interface IRequiredValueValidator extends IValidator {}

const RequiredValueValidator = (
  field: string,
  message?: string | undefined
): IRequiredValueValidator => {
  const _message = message || "value_required_message";

  return Object.assign(Validator(field, _message), {
    isValid: async (obj: Object, value: any) => {
      if (typeof value === "undefined" || value === null) {
        return Promise.resolve(false);
      }

      if (typeof value === "string" && value.length === 0) {
        return Promise.resolve(false);
      }

      return Promise.resolve(true);
    }
  }) as IRequiredValueValidator;
};

export default RequiredValueValidator;
