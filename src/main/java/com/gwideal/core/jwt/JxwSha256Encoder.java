package com.gwideal.core.jwt;

import org.apache.commons.codec.binary.Hex;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

/**
 * @author 18800
 * @date 2018/12/16 11:44
 */
public class JxwSha256Encoder implements PasswordEncoder {

	private static final Logger LOGGER = LoggerFactory.getLogger(JxwSha256Encoder.class);

	@Override
	public String encode(CharSequence rawPassword) {
		if (StringUtils.isNotBlank(rawPassword)) {
			try {
				MessageDigest digest = MessageDigest.getInstance("SHA-256");
				byte[] hash = digest.digest(rawPassword.toString().getBytes(StandardCharsets.UTF_8));
				return Hex.encodeHexString(hash).toUpperCase();
			} catch (Exception e) {
				LOGGER.error(e.getMessage(), e);
				return null;
			}
		}
		return null;

	}

	@Override
	public boolean matches(CharSequence rawPassword, String encodedPassword) {
		if (StringUtils.isBlank(rawPassword) || StringUtils.isBlank(encodedPassword)) {
			return false;
		} else {
			return encodedPassword.equals(this.encode(rawPassword));
		}
	}
}
