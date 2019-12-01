import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";

export interface TCountry {
  id: number;
  name: string;
}

export interface ICountry extends TCountry {}

const Country = Model(
  (model: TCountry): ICountry => {
    const _country: TCountry = Object.assign({}, model);

    let create = (country: ICountry): ICountry => {
      let obj = ValidatableObject(country);
      return obj;
    };

    let country = {
      get id() {
        return _country.id;
      },
      set id(value: any) {
        _country.id = value;
      },
      get name() {
        return _country.name;
      }
    };

    return create(country);
  }
);

export default Country;
