package ba.unsa.pmf.pragma.util;

import java.util.regex.Pattern;

public class RegexUtils {

	private RegexUtils() {
		throw new IllegalStateException("Utility class");
	}

	/**
	 * Adds ReDoS protection to standard matcher object.
	 *
	 * @param input   The character sequence to be matched
	 * @param pattern Compiled regex pattern.
	 * @param timeout Maximum time for regex evaluation(in milliseconds).
	 * @return true if, and only if, the entire region sequence matches this matcher's pattern.
	 */
	public static boolean match(CharSequence input, Pattern pattern, int timeout) {
		long timeoutTime = System.currentTimeMillis() + timeout;
		CharSequence charSequence = new InterruptibleCharSequence(input, timeoutTime);

		return pattern.matcher(charSequence).matches();
	}

	private static class InterruptibleCharSequence implements CharSequence {

		private final CharSequence inner;
		private final long timeoutTime;

		public InterruptibleCharSequence(CharSequence inner, long timeoutTime) {
			super();
			this.inner = inner;
			this.timeoutTime = timeoutTime;
		}

		@Override
		public char charAt(int index) {
			if (System.currentTimeMillis() > timeoutTime) {
				throw new RuntimeException("Timeout while evaluating regex, value: " + inner);
			}
			return inner.charAt(index);
		}

		@Override
		public int length() {
			return inner.length();
		}

		@Override
		public CharSequence subSequence(int start, int end) {
			return new InterruptibleCharSequence(inner.subSequence(start, end), timeoutTime);
		}

		@Override
		public String toString() {
			return inner.toString();
		}
	}
}
