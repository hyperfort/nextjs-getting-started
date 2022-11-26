import Image from "next/image";
import { getSession } from "next-auth/react";

import { LoginForm } from "../components/forms/login-form";

export default function Login() {
  return (
    <main className="flex flex-wrap g-6 h-screen items-center justify-center px-6 text-gray-800 lg:justify-between xl:justify-center">
      <section className="basis-auto grow-0 flex justify-center mb-12 shrink-1 md:mb-0 md:shrink-0 md:w-9/12 lg:w-6/12 xl:w-6/12">
        <Image
          src="/logo.webp"
          width={800}
          height={534}
          priority={true}
          className="w-4/5"
          alt="Sample image"
        />
      </section>
      <section className="mb-12 md:mb-0 xl:ml-20 md:w-8/12 lg:w-5/12 xl:w-5/12">
        <LoginForm />
      </section>
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
