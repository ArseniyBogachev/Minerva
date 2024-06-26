const constructorAnswerValidate = (
  state,
  messageReject = "Ошибка",
  messageResolve = undefined
) => {
  return state
    ? {
        status: true,
        message: messageResolve,
      }
    : {
        status: false,
        message: messageReject,
      };
};

const totalRegisterValidate = (data) => {
    const listValidation = [
        constructorAnswerValidate(data.login.length, "Введите логин."),
        constructorAnswerValidate(data.password.length, "Введите пароль."),
        constructorAnswerValidate(data.repiedPassword.length, "Введите повторно пароль."),
        // constructorAnswerValidate(data.surname.length, "Обязательное поле."),
        // constructorAnswerValidate(data.email.length, "Обязательное поле."),
        // constructorAnswerValidate(data.phone.length, "Обязательное поле."),
        constructorAnswerValidate(data.password === data.repiedPassword, "Введенные пароли не совпадают."),
        // constructorAnswerValidate(data.password >= 8, "Пароль должен иметь более 8 символов.")
    ]

  for (let value of listValidation) {
    if (!value.status) {
      return value;
    }
  }
  return { status: true };
};

export { totalRegisterValidate, constructorAnswerValidate };
