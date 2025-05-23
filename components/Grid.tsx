"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { RedirectLink } from "./RedirectLink";

interface URL {
  id: number;
  orginalUrl: string;
  code: string;
  createdAt: Date;
}

interface GridProps {
  data: URL[];
}

const columnHelper = createColumnHelper<URL>();

export default function Grid({ data }: GridProps) {
  const columns = [
    columnHelper.accessor("id", {
      header: () => "Id",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("orginalUrl", {
      header: () => "Orginal URL",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("code", {
      header: () => "Short URL",
      cell: ({ row }) => <RedirectLink code={row.original.code} />,
    }),
    columnHelper.accessor("createdAt", {
      header: () => "Created at",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data.length) {
    return (
      <div className="text-center py-10 px-4 sm:px-6 lg:px-8 border border-neutral-200 mt-4 rounded-lg">
        <h2 className="block font-bold text-gray-800 text-2xl mb-4">
          Ready to make your link work smarter?
        </h2>
        <p className="mt-3 text-sm text-gray-800">
          {`Paste or type your URL (like https://example.com) into the form
          above and let Linkify do the rest. You'll get a short link you can
          share anywhere – and track every click along the way!`}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col my-4">
      <h2 className="text-2xl font-bold py-6">{`URL's table:`}</h2>
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Update
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Delete
                    </th>
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <button
                        type="button"
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                      >
                        Update
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <button
                        type="button"
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
