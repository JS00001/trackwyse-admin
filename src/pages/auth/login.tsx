/*
 * Created on Wed Feb 01 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import api from "@/api";
import Input from "@/components/Input";
import { validateLoginInput } from "@/lib/validators";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";

const LoginPage: React.FC = () => {
  const loginMutation = useMutation({
    mutationFn: (input: LoginInput) => {
      return api.login(input);
    },
  });

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: validateLoginInput,
    onSubmit: (values) => {},
  });

  return (
    <div className="flex min-h-screen w-full justify-center">
      <div className="mt-10 w-96">
        <Input
          placeholder="Email address"
          disabled={loginMutation.isLoading}
          error={loginForm.errors.email}
          value={loginForm.values.email}
          onChange={loginForm.handleChange("email")}
        />
        <Input
          placeholder="Password"
          type="password"
          disabled={loginMutation.isLoading}
          error={loginForm.errors.password}
          value={loginForm.values.password}
          onChange={loginForm.handleChange("password")}
        />
      </div>
    </div>
  );
};

export default LoginPage;
