import { useForm } from 'react-hook-form';

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log(watch("username")); // Watch input value by passing the name of it

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      {/* Username Field */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("username", {
            required: "Username is required.",
            minLength: {
              value: 4,
              message: "Username must be at least 4 characters long.",
            },
            maxLength: {
              value: 30,
              message: "Username cannot exceed 30 characters.",
            },
          })}
        />
        {errors.username && (
          <p className="text-red-500 text-xs italic">{errors.username.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          {...register("password", {
            required: "Password is required.",
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}

export default Login;
