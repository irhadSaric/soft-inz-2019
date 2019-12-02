import { ILocaleProvider } from "./LocaleProvider";

export type TTranslate = (
  key: string,
  interpolation?: {},
  pluralize?: undefined
) => string;
export interface ITranslationService {
  get: TTranslate;
}

const TranslationService = ({
  localeProvider
}: {
  language: string;
  localeProvider: ILocaleProvider;
}): ITranslationService => {
  const _provider = localeProvider;

  function translate(key = "", interpolation?: {}, pluralValue?: undefined) {
    let value: any = _provider.translations;
    let tokens: string[] = key.split(".");
    for (let i = 0; i < tokens.length && value !== undefined; i++) {
      value = value[tokens[i]] || value[tokens[i].toLowerCase()];
    }

    value = value || "";
    value = pluralize(value, pluralValue);
    value = interpolate(value, interpolation);

    return value;
  }

  function interpolate(value: any, params: string | any) {
    if (params) {
      value = value.replace(/{{(\w*)}}/gi, function(m: any, param: any) {
        let match: string = "";
        if (params.hasOwnProperty(param)) {
          match = params[param] || "";
        } else {
          if (typeof params === "string") {
            match = params;
          }
        }
        return match;
      });
    }
    return value;
  }

  function pluralize(value: string | any, pluralValue?: number) {
    if (typeof value === "object") {
      if (typeof pluralValue === "number") {
        let pluralization = value;
        if (pluralization.hasOwnProperty(pluralValue)) {
          value = pluralization[pluralValue];
        } else {
          if (pluralValue === 0) {
            value = pluralization.zero;
          } else {
            value = pluralization.many;
          }
        }
      } else {
        value = "";
      }
    }
    return value;
  }

  return {
    get(key: string, interpolation?: {}, pluralize?: undefined) {
      return translate(key, interpolation, pluralize);
    }
  };
};

export default TranslationService;
