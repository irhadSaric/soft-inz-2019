import Validator, { IValidator } from "./Validator";

export interface IDateValidator extends IValidator {}

const DateValidator = (
  field: string,
  message?: string | undefined
): IDateValidator => {
  const _message: string = message || "invalid_date_message";

  return Object.assign(Validator(field, _message), {
    isValid: async (obj: Object, value: any) => {
      if (value === "" || value === null || value === undefined) {
        return Promise.resolve(true);
      }
      if (value instanceof Date) return Promise.resolve(true);

      if (typeof value !== "string") return Promise.resolve(false);

      if (!/^\d{1,2}\.\d{1,2}\.\d{4}$/.test(value))
        return Promise.resolve(false);

      const parts: string[] = value.split(".");
      const day: number = parseInt(parts[0], 10);
      const month: number = parseInt(parts[1], 10);
      const year: number = parseInt(parts[2], 10);

      if (year < 1000 || year > 3000 || month === 0 || month > 12)
        return Promise.resolve(false);

      const monthLength: number[] = [
        31,
        28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
      ];

      if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
        monthLength[1] = 29;

      return Promise.resolve(day > 0 && day <= monthLength[month - 1]);
    }
  }) as IDateValidator;
};

export default DateValidator;
