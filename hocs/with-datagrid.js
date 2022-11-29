import { Button, Pagination, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { MdAdd, MdSearch } from "react-icons/md";
import { Loading } from "../components/common/loading";

export function withDatagrid(WrapperComponent, collection) {
  return function ComponentWithDatagrid() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      _fetchData(1).then((response) => {
        setData(response);
      });
    }, [collection]);

    async function _fetchData(page, filter = "") {
      setIsLoading(true);
      const searchParams = new URLSearchParams({ page, filter });
      const response = await fetch(
        `/api/${collection}?${searchParams.toString()}`
      );
      const data = await response.json();
      setIsLoading(false);
      return data;
    }

    function _onPageChange(page) {
      _fetchData(page).then((response) => {
        setData(response);
      });
    }

    function _onFilterChange(evt) {
      console.log(evt.key);
    }

    if (isLoading) {
      return <Loading label="Fetching data..." />;
    }

    return (
      <>
        <section className="flex justify-between mb-2">
          <div className="w-4/5">
            <TextInput
              id="filter"
              type="text"
              placeholder="Type and press enter to filter"
              icon={MdSearch}
              onChange={_onFilterChange}
            />
          </div>
          <div className="w-1/5">
            <Button color="success">
              <MdAdd className="mr-2 h-5 w-5" />
              Create
            </Button>
          </div>
        </section>
        <WrapperComponent data={data?.data || []} />
        {(data?.meta?.total || 0) > (data?.meta?.perPage || 0) && (
          <section className="flex justify-end">
            <Pagination
              className=""
              currentPage={data?.meta?.currentPage || 1}
              totalPages={data?.meta?.total || 0}
              onPageChange={_onPageChange}
            />
          </section>
        )}
      </>
    );
  };
}
