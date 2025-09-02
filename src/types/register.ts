interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

interface LoginForm {
  email: string;
  password: string;
}

interface FieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  validation: any;
  isPassword?: boolean;
}

export type { RegisterForm, LoginForm, FieldConfig };
