package ba.unsa.pmf.pragma.util;

import java.util.regex.Pattern;

import ba.unsa.pmf.pragma.common.AppException;

public class ValidationUtils {

	private static final Pattern EMAIL_PATTERN = Pattern.compile("^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[‌​a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$");
	private static final Pattern PHONE_PATTERN = Pattern.compile("^\\+?[0-9. ()-]{5,25}$");

	public static final String VALIDATION_ERROR = "validation-error";
	public static final String MISSING_REQUIRED_VALUE_MSG = "Missing required value";
	public static final String INVALID_EMAIL_MSG = "Invalid email address";
	public static final String INVALID_PHONE_MSG = "Invalid phone number";

	private ValidationUtils() {
		throw new IllegalStateException("Utility class");
	}

	public static void requireNotNull(Object... values) {
		
		if (values == null) {
			throw new AppException(VALIDATION_ERROR, MISSING_REQUIRED_VALUE_MSG);
		}
		for (Object value : values) {
			if (value == null) {
				throw new AppException(VALIDATION_ERROR, MISSING_REQUIRED_VALUE_MSG);
			}
		}
	}

	public static boolean isNullOrEmpty(Object... values) {
		
		if (values == null) {
			return true;
		}
		for (Object value : values) {
			if (value == null || "".equals(value.toString().trim())) {
				return true;
			}
		}

		return false;
	}

	public static boolean hasValue(Object value) {
		
		return !isNullOrEmpty(value);
	}

	public static void requireNonEmpty(Object... values) {
		
		if (values == null) {
			throw new AppException(VALIDATION_ERROR, MISSING_REQUIRED_VALUE_MSG);
		}
		for (Object value : values) {
			if (isNullOrEmpty(value)) {
				throw new AppException(VALIDATION_ERROR, MISSING_REQUIRED_VALUE_MSG);
			}
		}
	}

	public static boolean isCorrectEmail(String email) {
		
		return RegexUtils.match(email, EMAIL_PATTERN, 1000);
	}

	public static boolean isPhoneNumber(String phone) {
		
		return PHONE_PATTERN.matcher(phone).matches();
	}

	public static void validateEmail(String email) {
		
		if (!isCorrectEmail(email)) {
			throw new AppException(VALIDATION_ERROR, INVALID_EMAIL_MSG);
		}
	}

	public static void validatePhoneNumber(String phone) {
		
		if (!isNullOrEmpty(phone) && !isPhoneNumber(phone)) {
			throw new AppException(VALIDATION_ERROR, INVALID_PHONE_MSG);
		}
	}

}
