/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import { useAuth } from "../core/Auth";
import { login } from "../../../http/_requests";

const loginSchema = Yup.object().shape({
  user: Yup.string().required("Email is required"),
  secret: Yup.string().required("Password is required"),
});

const initialValues = {
  user: "",
  secret: "",
};

export function Login() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const { data: auth } = await login(values.user, values.secret);
        saveAuth(auth);
        setCurrentUser(auth);
      } catch (error) {
        console.error(error);
        saveAuth(undefined);
        setStatus("The login details are incorrect");
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <form className="form w-100" onSubmit={formik.handleSubmit} noValidate>
      <div className="text-center mb-11">
        <h1 className="text-dark fw-bolder mb-3">Sign In</h1>
      </div>

      {formik.status && (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      )}

      <div className="fv-row mb-8">
        <label className="form-label fs-6 fw-bolder text-dark">Login</label>
        <input
          placeholder="Login"
          {...formik.getFieldProps("user")}
          className={clsx(
            "form-control bg-transparent",
            { "is-invalid": formik.touched.user && formik.errors.user },
            {
              "is-valid": formik.touched.user && !formik.errors.user,
            },
          )}
          name="user"
          autoComplete="off"
        />
        {formik.touched.user && formik.errors.user && (
          <div className="fv-plugins-message-container">
            <span role="alert">{formik.errors.user}</span>
          </div>
        )}
      </div>

      <div className="fv-row mb-8">
        <label className="form-label fw-bolder text-dark fs-6 mb-0">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          {...formik.getFieldProps("secret")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid": formik.touched.secret && formik.errors.secret,
            },
            {
              "is-valid": formik.touched.secret && !formik.errors.secret,
            },
          )}
          name="secret"
        />
        {formik.touched.secret && formik.errors.secret && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.secret}</span>
            </div>
          </div>
        )}
      </div>

      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className="indicator-label">Continue</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
