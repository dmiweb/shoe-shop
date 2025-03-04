import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/", { replace: true });
  }

  return (
    <section className="top-sales">
      <h2 className="text-center text-secondary">Страница не найдена</h2>
      <div className="d-flex justify-content-center">
        <button className="btn btn-outline-secondary btn-light" onClick={handleGoBack}>
          Вернуться на главную
        </button>
      </div>
    </section>
  );
}

export default NotFoundPage;