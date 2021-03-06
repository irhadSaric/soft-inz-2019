package ba.unsa.pmf.pragma.web;

import java.util.Date;

import org.springframework.core.convert.converter.Converter;

import ba.unsa.pmf.pragma.util.ValidationUtils;


public final class DateConverter implements Converter<String, Date> {

	@Override
	public Date convert(String source) {
		if (ValidationUtils.isNullOrEmpty(source)) {
			return null;
		}

		return new Date(Long.parseLong(source));
	}
}
