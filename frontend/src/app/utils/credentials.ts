const validator = require("validator");

export class CredentialError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function checkEmail(email: string): boolean {
  return email && validator.isEmail(email);
}

export function checkOnlyLettersNumbers(username: string): boolean {
  const pattern = /^[a-zA-Z0-9]+$/;
  return username && pattern.test(username);
}

export function checkLength(password: string): boolean {
  return password.length >= 8;
}

export function checkAlphanumeric(password: string): boolean {
  return /[a-zA-Z]/.test(password) && /\d/.test(password);
}

export function checkHasSpecial(password: string): boolean {
  return /[!@#$%^&*(),.?":{}|<>]/.test(password);
}

