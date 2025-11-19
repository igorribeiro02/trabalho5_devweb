import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  let errorMessage = "Ocorreu um erro inesperado.";

  if (isRouteErrorResponse(error)) {
    errorMessage = `Erro ${error.status}: ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="container my-4 text-center">
      <h1 className="display-1 text-danger">Oops!</h1>
      <h2>Algo deu errado.</h2>
      <p className="lead text-muted">{errorMessage}</p>
      <Link to="/" className="btn btn-primary">
        Voltar para a Página Inicial
      </Link>
    </div>
  );
};

export default ErrorPage;
