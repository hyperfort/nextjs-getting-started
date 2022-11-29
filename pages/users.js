import { Breadcrumb } from "flowbite-react";
import Head from "next/head";
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi";

import { UserListWithDatagrid } from "../components/lists/user-list";

export default function Users() {
  return (
    <>
      <Head>
        <title>Redial Reports - Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Breadcrumb className="mb-10">
        <Breadcrumb.Item href="/" icon={MdDashboard}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item icon={HiUsers}>Users</Breadcrumb.Item>
      </Breadcrumb>
      <UserListWithDatagrid />
    </>
  );
}
