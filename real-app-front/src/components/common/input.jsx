import classNames from "classnames";

const Input = ({ label, error, name, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        {...rest}
        className={classNames("form-control", {
          "is-invalid": error,
        })}
        id={name}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Input;
