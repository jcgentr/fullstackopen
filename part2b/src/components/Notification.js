export const Notification = ({ message }) => {
  if (message.status === null) {
    return null;
  }

  return <div className={message.status}>{message.text}</div>;
};
