import Image from "next/image";
import { getSession } from "next-auth/react";

import { LoginForm } from "../components/forms/login-form";

export default function Login() {
  return (
    <main className="flex flex-wrap g-6 h-screen items-center justify-center px-6 text-gray-800 lg:justify-between xl:justify-center">
      <section className="basis-auto grow-0 flex justify-center mb-12 shrink-1 md:mb-0 md:shrink-0 md:w-9/12 lg:w-6/12 xl:w-6/12">
        <Image
          src="/reports.png"
          width={700}
          height={673}
          priority={true}
          className="w-4/5"
          alt="Sample image"
        />
      </section>
      <section className="mb-12 md:mb-0 xl:ml-20 md:w-8/12 lg:w-5/12 xl:w-5/12">
        <div className="flex items-center my-4 after:flex-1 after:border-gray-300 after:border-t after:mt-0.5 before:flex-1 before:border-gray-300 before:border-t before:mt-0.5">
          <p className="font-semibold mb-0 mx-4 text-center text-2xl">
            Redial Reports
          </p>
        </div>
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
