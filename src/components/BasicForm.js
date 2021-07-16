import useInput2 from "../hooks/use-input2";

const BasicForm = (props) => {
  const {
    value: name,
    valueChangeHandler: nameChangeHandler,
    onValueBlur: nameBlurChangeHandler,
    isValueValid: isNameValid,
    valueHasError: nameHasError,
    reset: nameReset,
  } = useInput2((value) => value.trim() !== "");

  const {
    value: lastName,
    valueChangeHandler: lastNameChangeHandler,
    onValueBlur: lastNameBlurChangeHandler,
    isValueValid: isLastNameValid,
    valueHasError: lastNameHasError,
    reset: lastNameReset,
  } = useInput2((value) => value.trim() !== "");

  const {
    value: email,
    valueChangeHandler: emailChangeHandler,
    onValueBlur: emailBlurChangeHandler,
    isValueValid: isEmailValid,
    valueHasError: emailHasError,
    reset: emailReset,
  } = useInput2((value) => value.includes("@"));

  const isFormValid = isNameValid && isLastNameValid && isEmailValid;

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    console.log(name);
    console.log(lastName);
    console.log(email);

    nameReset();
    lastNameReset();
    emailReset();
  };

  const nameInputClasses = nameHasError
    ? "form-control invalid"
    : "form-control";

  const lastNameInputClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={nameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={nameChangeHandler}
            onBlur={nameBlurChangeHandler}
            value={name}
          />
          {nameHasError && <p className="error-text">Name is not correct!</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurChangeHandler}
            value={lastName}
          />
          {lastNameHasError && (
            <p className="error-text">Last Name is not correct!</p>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          onChange={emailChangeHandler}
          onBlur={emailBlurChangeHandler}
          value={email}
        />
        {emailHasError && (
          <p className="error-text">Last Name is not correct!</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
