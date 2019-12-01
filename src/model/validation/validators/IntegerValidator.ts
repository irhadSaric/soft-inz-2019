import { IValidator } from "./Validator";
import NumberValidator from "./NumberValidator";

export interface IIntegerValidator extends IValidator {}

const IntegerValidator = (
  field: string,
  message?: string | undefined
): IIntegerValidator => {
  const _message: string = message || "invalid_integer_message";
  const _numberValidator: IValidator = Object.create(
    NumberValidator(field, _message)
  );

  return Object.assign(_numberValidator, {
    isValid: async (obj: Object, value: any) => {
      if (value === "" || value === null || value === undefined) {
        return Promise.resolve(true);
      }

      const validNumber: boolean = await Object.getPrototypeOf(
        _numberValidator
      ).isValid(obj, value);

      if (!validNumber) return Promise.resolve(false);

      const x: number = parseFloat(value);

      return Promise.resolve((x | 0) === x);
    }
  }) as IIntegerValidator;
};

export default IntegerValidator;
