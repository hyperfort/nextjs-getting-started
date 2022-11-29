import { Breadcrumb } from "flowbite-react";
import Head from "next/head";
import { MdDashboard } from "react-icons/md";

export default function Home() {
  return (
    <>
      <Head>
        <title>Redial Reports - Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Breadcrumb className="mb-10">
        <Breadcrumb.Item icon={MdDashboard}>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}
