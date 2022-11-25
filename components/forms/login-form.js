import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function _onSubmit(data) {
    await signIn("credentials", {
      ...data,
      callbackUrl: `${window.location.origin}/`,
    });
  }

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <section className="mb-6">
        <label
          className={["form-label", errors.email && "text-red-500"].join(" ")}
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="text"
          className={[
            "form-input",
            errors.email
              ? "border-red-500 mb-2"
              : "border-gray-300 focus:border-blue-600",
          ].join(" ")}
          id="email"
          placeholder="e.g. someone@example.com"
          {...register("email", {
            required: {
              value: true,
              message: "This field is required",
            },
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Email not valid",
            },
          })}
        />
        <p className="italic text-red-500 text-xs">{errors.email?.message}</p>
      </section>

      <section className="mb-6">
        <label
          className={["form-label", errors.password && "text-red-500"].join(
            " "
          )}
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          className={[
            "form-input",
            errors.password
              ? "border-red-500 mb-2"
              : "border-gray-300 focus:border-blue-600",
          ].join(" ")}
          id="password"
          placeholder="* * * * * * * * * * * *"
          {...register("password", {
            required: {
              value: true,
              message: "This field is required",
            },
          })}
        />
        <p className="italic text-red-500 text-xs">
          {errors.password?.message}
        </p>
      </section>

      <section className="text-center lg:text-left">
        <button className="form-button">Login</button>
      </section>
    </form>
  );
}
