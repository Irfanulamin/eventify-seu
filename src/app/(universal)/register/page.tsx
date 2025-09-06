"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { FieldConfig, LoginForm, RegisterForm } from "@/types/register";
import { CommonNavbar } from "@/components/common/CommonNavbar";
import { useRouter } from "next/navigation";

const loginFields: FieldConfig[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email",
    validation: {
      required: "Email is required",
      minLength: { value: 3, message: "Must be at least 3 characters" },
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    validation: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
    isPassword: true,
  },
];

const registerFields: FieldConfig[] = [
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Choose username",
    validation: {
      required: "Username is required",
      minLength: {
        value: 3,
        message: "Username must be at least 3 characters",
      },
      pattern: {
        value: /^[a-zA-Z0-9_]+$/,
        message: "Username can only contain letters, numbers, and underscores",
      },
    },
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^\S+@\S+$/i,
        message: "Please enter a valid email address",
      },
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Create password",
    validation: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        message: "Password must contain uppercase, lowercase, and number",
      },
    },
    isPassword: true,
  },
];

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("register");
  const [showPasswords, setShowPasswords] = useState<{
    [key: string]: boolean;
  }>({});
  const { isLoading: authLoading, login, register, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (user?.role === "user") router.replace("/feed");
    else if (user?.role === "admin") router.replace("/create-post");
    else if (user) router.replace("/dashboard");
  }, [user, hydrated, router]);

  const registerForm = useForm<RegisterForm>({ mode: "onChange" });
  const loginForm = useForm<LoginForm>({ mode: "onChange" });

  if (!hydrated) return null;

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPasswords((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

  const renderField = (field: FieldConfig, form: any, formType: string) => {
    const fieldId = `${formType}-${field.name}`;
    const showPassword = showPasswords[fieldId] || false;

    return (
      <div key={field.name} className="space-y-2">
        <Label htmlFor={fieldId} className="text-sm text-white/80">
          {field.label}
        </Label>
        <div className="relative">
          <Input
            id={fieldId}
            type={
              field.isPassword
                ? showPassword
                  ? "text"
                  : "password"
                : field.type
            }
            placeholder={field.placeholder}
            className="bg-black/50 border-blue-500/30 focus:border-blue-400 text-white placeholder:text-white/50 rounded-xl h-11 px-4 pr-12"
            {...form.register(field.name, field.validation)}
          />
          {field.isPassword && (
            <button
              type="button"
              onClick={() => togglePasswordVisibility(fieldId)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        {form.formState.errors[field.name] && (
          <p className="text-red-400 text-xs">
            {form.formState.errors[field.name]?.message}
          </p>
        )}
      </div>
    );
  };

  const onRegisterSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    setError(null);

    try {
      await register(data.username, data.email, data.password);
      toast.success("Account created successfully!");
      registerForm.reset();
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onLoginSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError(null);

    try {
      await login(data.email, data.password);
      toast.success("Welcome back! You've been logged in successfully.");
      loginForm.reset();
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!hydrated || authLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex items-center space-x-2 text-white">
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-black pt-24">
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-950/80 to-slate-950/10">
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-blue-700/4 rounded-full blur-3xl" />
      </div>

      <CommonNavbar />

      <div className="w-full max-w-sm relative">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-black/80 border border-blue-500/30 mb-4 w-fit rounded-xl p-0.5">
            <TabsTrigger
              value="register"
              className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-white/70 hover:text-white transition-all duration-200 text-sm rounded-lg px-6 py-2"
            >
              Register
            </TabsTrigger>
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-white/70 hover:text-white transition-all duration-200 text-sm rounded-lg px-6 py-2"
            >
              Login
            </TabsTrigger>
          </TabsList>

          <div className="w-full bg-black/90 border border-blue-500/30 shadow-xl rounded-2xl overflow-hidden p-6">
            <div className="text-center space-y-2 mb-6">
              {activeTab === "login" ? (
                <>
                  <h2 className="text-2xl font-semibold text-white">
                    Welcome Back
                  </h2>
                  <p className="text-white/60 text-sm">
                    Welcome back to Eventify SEU — log in to stay updated!
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-white">
                    Create Account
                  </h2>
                  <p className="text-white/60 text-sm">
                    Join Eventify SEU today — register to never miss an update!
                  </p>
                </>
              )}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <TabsContent value="login" className="space-y-4 mt-0">
              <form
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                className="space-y-4"
              >
                {loginFields.map((field) =>
                  renderField(field, loginForm, "login")
                )}

                <Button
                  type="submit"
                  disabled={isLoading || !loginForm.formState.isValid}
                  className="w-full bg-blue-700 hover:bg-blue-700 text-white font-medium transition-colors duration-200 rounded-xl h-11 mt-6 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Signing In...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-4 mt-0">
              <form
                onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                className="space-y-4"
              >
                {registerFields.map((field) =>
                  renderField(field, registerForm, "register")
                )}

                <Button
                  type="submit"
                  disabled={isLoading || !registerForm.formState.isValid}
                  className="w-full bg-blue-700 hover:bg-blue-700 text-white font-medium transition-colors duration-200 rounded-xl h-11 mt-6 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
