const validator = require("validator");

export function isValidEmail(email: string): boolean {
  return validator.isEmail(email);
}

export function isValidPassword(password: string): {
  meetsLength: boolean;
  isAlphanumeric: boolean;
  hasSpecial: boolean;
} {
  const meetsLength = password.length >= 8;
  const isAlphanumeric = /[a-zA-Z]/.test(password) && /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return { meetsLength, isAlphanumeric, hasSpecial };
}
