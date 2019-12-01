import Application from "../../Application";

export interface ILocaleProvider {
  getCurrentLanguage(): string;
  changeCurrentLanguage(languageCode: string): void;
  addLocale(locale: string, translations: any): void;
  translations: any;
}

const LocaleProvider = ({
  application
}: {
  application: Application;
}): ILocaleProvider => {
  const _application = application;
  let _localeDictionary: any = {};

  return {
    getCurrentLanguage() {
      return _application.container.resolve<string>("language");
    },
    addLocale(locale: string, translations: any) {
      _localeDictionary[locale] = translations;
    },
    changeCurrentLanguage(languageCode: string) {
      _application.changeSystemLanguage(languageCode);
    },
    get translations() {
      const language = _application.container.resolve<string>("language");
      return _localeDictionary[language];
    }
  };
};

export default LocaleProvider;
