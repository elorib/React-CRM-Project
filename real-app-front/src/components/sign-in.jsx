import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import { useFormik } from "formik";
import formikValidateJoi from "../utils/formikValidateJoi";
import joi from "joi";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/authContext";

const SignIn = ({ redirect }) => {
  const { loginUser, user } = useAuth();

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },

    validate: formikValidateJoi({
      email: joi.string().email({ tlds: false }).min(6).max(255).required(),
      password: joi.string().min(6).max(1024).required(),
    }),

    async onSubmit(values) {
      try {
        // await logUser({ ...values });
        await loginUser(values);
        if (redirect) {
          navigate(redirect);
        }
      } catch ({ response }) {
        if (response) {
          setError(response.data);
        }
      }
    },
  });
  if (user) {
    return <Navigate to="/" />;
  }
  //     validate: formikValidateJoi({
  //       email: joi.string().email().min(6).max(255).required(),
  //       password: joi.string().min(6).max(1024).required(),
  //     }),
  //   });
  return (
    <>
      <PageHeader
        title={"Sign in"}
        description={"lorem ipsum dolor sit amet, consectetur adip"}
      />
      {error && <div className="alert alert-danger">{error}</div>}
      <form
        className="mt-5 form-group"
        noValidate
        autoComplete="off"
        onSubmit={form.handleSubmit}
      >
        <Input
          type="email"
          label="Email"
          error={form.touched.email && form.errors.email}
          {...form.getFieldProps("email")}
        />
        <Input
          type="password"
          label="Password"
          error={form.touched.password && form.errors.password}
          {...form.getFieldProps("password")}
        />
        <div className="mt-3">
          <button className="btn btn-dark">Sign in</button>
        </div>
      </form>
    </>
  );
};

export default SignIn;
