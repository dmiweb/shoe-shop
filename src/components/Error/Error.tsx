type ErrorProps = {
  message: string; 
  handler: () => void;
}

const Error = ({message, handler}: ErrorProps) => {
  const nameButton = message === "Не удалось найти товар!" ? "Перейти в каталог" : "Попробовать еще раз";
  return (
    <div className="text-center">
      <div className="text-danger">{message}</div>
      <button className="btn btn-outline-primary" onClick={handler}>{nameButton}</button>
    </div>
  );
}

export default Error;