// * Expresiones regulares que se usan en el proyecto
// User RegEx
export const regexUsername = /^[a-zA-Z0-9_-]{3,20}$/;

export const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

export const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{6,20}$/;

// Task RegEx
export const regexText = /^[a-zA-Z0-9\s\-_:]+$/;
