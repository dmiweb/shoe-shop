const LoadMoreButton = ({handler}: {handler: () => void}) => {
  return (
    <div className="text-center">
      <button className="btn btn-outline-primary" onClick={handler}>Загрузить ещё</button>
    </div>
  );
}

export default LoadMoreButton;