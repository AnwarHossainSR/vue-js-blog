// src/validations/authValidation.ts

interface SignUpErrors {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export const validateSignUpForm = (
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string
): SignUpErrors => {
  let errors: SignUpErrors = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  }

  if (!name.trim()) {
    errors.name = 'Name is required'
  }

  if (!email.trim()) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(email)) {
    errors.email = 'Invalid email address'
  }

  if (!password) {
    errors.password = 'Password is required'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters long'
  }

  if (password !== passwordConfirmation) {
    errors.passwordConfirmation = 'Passwords do not match'
  }

  return errors
}

export const isValidEmail = (email: string): boolean => {
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
