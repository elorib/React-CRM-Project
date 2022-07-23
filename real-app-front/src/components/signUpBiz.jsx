import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import { FormikProvider, useFormik } from "formik";
import joi from "joi";
import formikValidateJoi from "../utils/formikValidateJoi";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";

const SignUpBiz = ({ redirect }) => {
  const { createUser, user, loginUser } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: formikValidateJoi({
      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Email"),
      name: joi.string().min(2).required().label("Name"),
      password: joi.string().min(6).required().label("Password"),
    }),
    // (values) {
    //   const { error } = joi
    //     .object({
    //       email: joi
    //         .string()
    //         .email({ tlds: { allow: false } })
    //         .required()
    //         .label("Email"),
    //       name: joi.string().min(2).required().label("Name"),
    //       password: joi.string().min(6).required().label("Password"),
    //     })
    //     .validate(values, { abortEarly: false });

    //   if (!error) {
    //     return null;
    //   }

    //   const errors = {};
    //   for (const detail of error.details) {
    //     errors[detail.path[0]] = detail.message;
    //   }

    //   return errors;
    // },
    async onSubmit(values) {
      try {
        // await createUser({ ...values, biz: false });
        await createUser({ ...values, biz: true });
        await loginUser({ email: values.email, password: values.password });
        await toast("Your account has been created", {
          autoClose: 2000,
        });
        if (redirect) {
          navigate(redirect);
        }
      } catch ({ response }) {
        setError(response.data);
      }
    },
  });
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <PageHeader
        title={"Sign up Business"}
        description={"lorem ipsum dolor sit amet, consectetur adip"}
      />
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <form
        className="mt-5 form-group"
        noValidate
        autoComplete="off"
        onSubmit={form.handleSubmit}
      >
        <Input
          type="text"
          label="Name"
          error={form.touched.name && form.errors.name}
          {...form.getFieldProps("name")}
        />
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
          <button disabled={!form.isValid} className="btn btn-dark">
            Sign Up Biz
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUpBiz;
