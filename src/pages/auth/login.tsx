/*
 * Created on Wed Feb 01 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import Image from "next/image";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import api from "@/api";
import Config from "@/config";
import Text from "@/components/Text";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/Auth";
import errorHandler from "@/lib/errorHandler";
import { validateLoginInput } from "@/lib/validators";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { updateRefreshToken } = useAuth();

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
    onSubmit: (values) => {
      loginMutation.mutate(values, {
        onSuccess: async ({ data }) => {
          updateRefreshToken(data.refreshToken);
          router.push("/dashboard");
        },
        onError: (err) => {
          errorHandler.handle(err, loginForm);
        },
      });
    },
  });

  return (
    <div className="flex min-h-screen w-full justify-center">
      <form className="w-96" onSubmit={loginForm.handleSubmit}>
        <Image src="/logo.svg" alt="Trackwyse Logo" width={181.88} height={48} className="my-20" />
        <Text variant="title">Login to Trackwyse</Text>
        <Input
          containerClassName="mt-4"
          placeholder="Email address"
          disabled={loginMutation.isLoading}
          error={loginForm.errors.email}
          value={loginForm.values.email}
          onChange={loginForm.handleChange("email")}
        />
        <Input
          containerClassName="mt-4"
          placeholder="Password"
          type="password"
          disabled={loginMutation.isLoading}
          error={loginForm.errors.password}
          value={loginForm.values.password}
          onChange={loginForm.handleChange("password")}
        />

        <Button type="submit" className="mt-4 w-full" loading={loginMutation.isLoading}>
          Login to Trackwyse
        </Button>
        <Text variant="subtitle2" className="mt-4">
          By logging in, you agree to our{" "}
          <Text
            span
            clickable
            className="font-medium text-blue-500"
            onClick={() => router.push(Config.TERMS_URL)}
          >
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text
            span
            clickable
            className="font-medium text-blue-500"
            onClick={() => router.push(Config.PRIVACY_URL)}
          >
            Privacy Policy
          </Text>{" "}
          and that you are authorized to use this service.
        </Text>
      </form>
    </div>
  );
};

export default LoginPage;
