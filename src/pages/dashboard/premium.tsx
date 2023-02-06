/*
 * Created on Fri Feb 03 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import withAuth from "@/hoc/withAuth";
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import { useFormik } from "formik";
import Button from "@/components/Button";
import { toast as Toast } from "react-toastify";

const DashboardPremiumPage: React.FC = () => {
  const setPremiumMutation = useMutation({
    mutationFn: (input: SetPremiumInput) => {
      return api.setPremium(input);
    },
  });

  const setPremiumForm = useFormik({
    initialValues: {
      id: "",
    },
    onSubmit: (values) => {
      setPremiumMutation.mutate(values, {
        onSuccess: () => {
          Toast.success("Premium request successful.");
          setPremiumForm.resetForm();
        },
        onError: () => {
          setPremiumForm.setErrors({
            id: "Something went wrong",
          });
        },
      });
    },
  });

  return (
    <Layout>
      <Layout.Header>Manage Premium</Layout.Header>
      <Layout.Content>
        <div className="w-96">
          <Input
            placeholder="User ID"
            disabled={setPremiumMutation.isLoading}
            error={setPremiumForm.errors.id}
            value={setPremiumForm.values.id}
            onChange={setPremiumForm.handleChange("id")}
          />
          <Button
            onClick={setPremiumForm.handleSubmit}
            loading={setPremiumMutation.isLoading}
            disabled={!setPremiumForm.dirty}
            className="w-full"
          >
            Submit Premium Request
          </Button>
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default withAuth(DashboardPremiumPage);
