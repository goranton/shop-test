export default () => {
  const errorLogger = console.error;
  const warningLogger = console.warn;
  const normalLogger = console.log;

  return (message, exception = undefined, withException = false) => {
    if (exception) {
      errorLogger(message);
    } else if (withException) {
      warningLogger(message);
    } else {
      normalLogger(message);
    }

    if (withException) {
      throw new exception(message);
    }
  };
};
