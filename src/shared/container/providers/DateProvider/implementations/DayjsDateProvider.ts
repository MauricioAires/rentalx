import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date?: Date, end_date?: Date): number {
    // Consider date now when end date doesn't forwarded
    const end_date_utc = this.convertToUTC(end_date || dayjs().toDate());
    const start_date_utc = this.convertToUTC(start_date || dayjs().toDate());

    return dayjs(start_date_utc).diff(end_date_utc, "hours");
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  compareInDays(start_date?: Date, end_date?: Date): number {
    // Consider date now when end date doesn't forwarded
    const end_date_utc = this.convertToUTC(end_date || dayjs().toDate());
    const start_date_utc = this.convertToUTC(start_date || dayjs().toDate());

    return dayjs(start_date_utc).diff(end_date_utc, "days");
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }
}
