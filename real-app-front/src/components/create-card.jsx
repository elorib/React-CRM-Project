import { useFormik } from "formik";
import Joi from "joi";
import { useState } from "react";
import formikValidateJoi from "../utils/formikValidateJoi";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import { toast } from "react-toastify";
import { createCard } from "../services/cardsService";
import { useNavigate } from "react-router-dom";

const CreateCard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
    validate: formikValidateJoi({
      bizName: Joi.string().min(2).max(255).required(),
      bizDescription: Joi.string().min(2).max(1024).required(),
      bizAddress: Joi.string().min(2).max(400).required(),
      bizPhone: Joi.string()
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/),
      bizImage: Joi.string().min(1).allow("").max(1024),
    }),
    async onSubmit(values) {
      const { bizImage, ...body } = values;
      if (bizImage) {
        body.bizImage = bizImage;
      }
      try {
        await createCard(body);
        toast("New card created");
        navigate("/mycards");
      } catch ({ response }) {
        if (response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  return (
    <>
      <PageHeader
        title={"Create card"}
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
          error={form.touched.bizName && form.errors.bizName}
          {...form.getFieldProps("bizName")}
        />
        <Input
          type="text"
          label="Description"
          error={form.touched.bizDescription && form.errors.bizDescription}
          {...form.getFieldProps("bizDescription")}
        />
        <Input
          type="text"
          label="Address"
          error={form.touched.bizAddress && form.errors.bizAddress}
          {...form.getFieldProps("bizAddress")}
        />
        <Input
          type="text"
          label="Phone"
          error={form.touched.bizPhone && form.errors.bizPhone}
          {...form.getFieldProps("bizPhone")}
        />
        <Input
          type="text"
          label="Image"
          error={form.touched.bizImage && form.errors.bizImage}
          {...form.getFieldProps("bizImage")}
        />
        <div className="mt-3">
          <button disabled={!form.isValid} className="btn btn-dark">
            Create card
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateCard;
