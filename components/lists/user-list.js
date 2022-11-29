import { Table } from "flowbite-react";

import { withDatagrid } from "../../hocs/with-datagrid";

function UserList({ data }) {
  return (
    <Table hoverable={true}>
      <Table.Head>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Email</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {data.map((item) => (
          <Table.Row className="bg-white" key={item.email}>
            <Table.Cell className="font-medium text-gray-900 whitespace-nowrap">
              {item.name}
            </Table.Cell>
            <Table.Cell className="font-medium text-gray-900 whitespace-nowrap">
              {item.email}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
export const UserListWithDatagrid = withDatagrid(UserList, "users");
