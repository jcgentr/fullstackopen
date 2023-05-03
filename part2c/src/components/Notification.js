export const Notification = ({ toastMessage }) => {
  if (toastMessage === null) {
    return null;
  }
  const { type, message } = toastMessage;

  return <div className={type}>{message}</div>;
};
