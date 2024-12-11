import { Navigate, useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
 function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10" id="error-page">
      <h1 className="text-6xl font-bold text-red-500 m-10">Oops!</h1>
      <p className="text-2xl">Sorry, an unexpected error has occurred.</p>
      <p className="text-xl">
        <i>{error.statusText || error.message}</i>
      </p>
      <p className="mt-10 text-center">
        <button onClick={() => navigate("/")}
        className="hover:underline bg-blue-200 text-blue-600 border-4 border-red-600 px-4 py-2 rounded-lg text-2xl font-mono text-pretty">Back to Home</button>
      </p>
    </div>
  );
}

export default ErrorPage;