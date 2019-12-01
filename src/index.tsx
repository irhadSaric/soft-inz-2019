import "antd/dist/antd.css";

import "moment/locale/bs";
import Application from "./Application";
import "./ui/assets/scss/main.scss";

import enLocale from "./locale/en.json";
import { BaseConstants } from "./common/Constants";

const rootElement = document.getElementById("app");

export function run(context = "/") {
  if (rootElement) {
    const app = new Application(context, rootElement);
    app.addLocale("en", enLocale);

    return app.start();
  }
}

export function parseBooleanValue(value: boolean) {
  return value ? BaseConstants.TRUE : BaseConstants.FALSE;
}

export function formatBooleanValue(value: string) {
  return value === BaseConstants.TRUE ? true : false;
}

run();
