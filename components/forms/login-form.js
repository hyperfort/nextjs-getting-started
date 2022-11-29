import { Label, TextInput, Button } from "flowbite-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { FaSignInAlt } from "react-icons/fa";
import { MdMail, MdLock } from "react-icons/md";

export function LoginForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function _onSubmit(data) {
    const { ok, url, error } = await signIn("credentials", {
      ...data,
      callbackUrl: `${window.location.origin}/`,
      redirect: false,
    });

    props.onSubmit(ok, url, error);
  }

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <section className="mb-6">
        <div className="mb-2 block">
          <Label className="mb-2" htmlFor="email" value="Email" />
        </div>
        <TextInput
          id="email"
          type="email"
          name="email"
          placeholder="e.g. me@example.com"
          icon={MdMail}
          {...(errors.email && { color: "failure" })}
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
          {...(errors.email && {
            helperText: (
              <span className="italic text-red-500 text-xs">
                {errors.email?.message}
              </span>
            ),
          })}
        />
      </section>

      <section className="mb-6">
        <div className="mb-2 block">
          <Label className="mb-2" htmlFor="password" value="Password" />
        </div>
        <TextInput
          id="password"
          type="password"
          name="password"
          placeholder="* * * * * * * * * * * *"
          icon={MdLock}
          {...(errors.password && { color: "failure" })}
          {...register("password", {
            required: {
              value: true,
              message: "This field is required",
            },
          })}
          {...(errors.password && {
            helperText: (
              <span className="italic text-red-500 text-xs">
                {errors.password?.message}
              </span>
            ),
          })}
        />
      </section>

      <section className="text-center lg:text-left">
        <Button color="success" type="submit">
          <FaSignInAlt className="mr-2 h-5 w-5" />
          Login
        </Button>
      </section>
    </form>
  );
}
