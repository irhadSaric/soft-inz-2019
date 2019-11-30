import Validator, { IValidator } from "./Validator";

export interface INumberValidator extends IValidator {}

const NumberValidator = (
  field: string,
  message?: string | undefined
): INumberValidator => {
  const _message = message || "invalid_number_message";

  function strictParseFloat(value: string) {
    if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value))
      return Number(value);
    return NaN;
  }

  return Object.assign(Validator(field, _message), {
    isValid: async (obj: Object, value: any) => {
      if (value === "" || value === null || value === undefined) {
        return Promise.resolve(true);
      }
      return Promise.resolve(!isNaN(strictParseFloat(value)));
    }
  }) as INumberValidator;
};

export default NumberValidator;
