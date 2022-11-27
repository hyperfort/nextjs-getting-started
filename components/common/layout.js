import { Avatar, Dropdown, Navbar, Spinner } from "flowbite-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

import { LINKS } from "../../utils/links";

export function Layout({ children }) {
  const { status, data } = useSession();

  const links = useMemo(() => {
    if (status === "authenticated") {
      return LINKS.filter((item) => item.roles.includes(data.user.role));
    }

    return [];
  }, [status]);

  return (
    <>
      {status === "authenticated" && (
        <Navbar fluid={true} rounded={false}>
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
        </Navbar>
      )}
      <main {...(status === "authenticated" && { className: "bg-gray-300" })}>
        {children}
      </main>
    </>
  );
}
