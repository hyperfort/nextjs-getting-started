import { Avatar, Dropdown, Navbar, Footer, Spinner } from "flowbite-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

import { Loading } from "./loading";
import { routes } from "../../routes";

export function Layout({ children }) {
  const { status, data } = useSession();

  const links = useMemo(() => {
    return status === "authenticated"
      ? routes.filter((item) => item.requiredRoles.includes(data.user.role))
      : [];
  }, [status]);

  return (
    <>
      {status === "authenticated" && (
        <Navbar fluid={true} rounded={false}>
          <section className="container mx-auto flex flex-wrap items-center justify-between">
            <Navbar.Brand href="https://flowbite.com/">
              <Image
                src="/Redial-Logo.png"
                width={200}
                height={48}
                priority={true}
                className="w-40"
                alt="Logo"
              />
            </Navbar.Brand>
            <div className="flex md:order-2">
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                  <Avatar
                    alt="User settings"
                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    rounded={true}
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{data.user.name}</span>
                  <span className="block truncate text-sm font-medium">
                    {data.user.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Sign out</Dropdown.Item>
              </Dropdown>
              <Navbar.Toggle className="ml-2" />
            </div>
            <Navbar.Collapse>
              {links.map((link) => (
                <Navbar.Link href={link.path} key={link.name}>
                  {link.name}
                </Navbar.Link>
              ))}
            </Navbar.Collapse>
          </section>
        </Navbar>
      )}
      {status === "loading" ? (
        <main className="bg-gray-300 flex items-center justify-center min-h-screen">
          <Loading label="Validating credentials..." />
        </main>
      ) : (
        <main
          {...(status === "authenticated" && {
            className: "bg-gray-300 min-h-screen pt-5",
          })}
        >
          <article className="container mx-auto">{children}</article>
        </main>
      )}
    </>
  );
}
