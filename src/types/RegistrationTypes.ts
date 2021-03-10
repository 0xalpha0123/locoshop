export class PasswordValidation {
  passwordHasUpperCase: boolean;
  passwordHasLowerCase: boolean;
  passwordHasNumber: boolean;
  passwordHasValidLenght: boolean;
  passwordsAreIdentical: boolean;

  constructor() {
    this.passwordHasUpperCase = false;
    this.passwordHasLowerCase = false;
    this.passwordHasNumber = false;
    this.passwordHasValidLenght = false;
    this.passwordsAreIdentical = false;
  }
}

export class FormValidation {
  passwordValidation: PasswordValidation;
  emailValidity: boolean;
  emailExisting: string;
  submitFormValidity: string;
  termsAndConditionsAgreed: boolean;
  constructor() {
    this.passwordValidation = new PasswordValidation();
    this.emailValidity = false;
    this.emailExisting = "";
    this.submitFormValidity = "";
    this.termsAndConditionsAgreed = false;
  }
}
