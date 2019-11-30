import moment, { Moment } from "moment";
import { DateFormats } from "../common/Constants";

export interface IDateService {
  formatDate(date: Date): string;
  formatTime(date: Date): string;
  parseDate(date: Date): Moment;
  parseStringToDate(value: string): Date;
}

const DateService = (): IDateService => {
  return {
    formatDate(date: Date) {
      return moment(date).format(DateFormats.DATE);
    },

    formatTime(date: Date) {
      return moment(date).format(DateFormats.TIME);
    },

    parseDate(date: Date) {
      return moment(date, DateFormats.DATETIME_LOCAL);
    },
    
    parseStringToDate(value: string) {
        return moment(value, DateFormats.DATETIME_LOCAL).toDate();
      }
  };
};

export { DateService };
