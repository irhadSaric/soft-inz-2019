package ba.ping.vstv.hrms.mik.util;

import java.util.Calendar;
import java.util.Date;

public class DateUtils {

	private DateUtils() {
		throw new IllegalStateException("Utility class");
	}

	public static Date addHours(Date date, int hours) {
		var calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.HOUR_OF_DAY, hours);

		return calendar.getTime();
	}

	public static Date addMinutes(Date date, int minutes) {
		var calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MINUTE, minutes);

		return calendar.getTime();
	}
}
