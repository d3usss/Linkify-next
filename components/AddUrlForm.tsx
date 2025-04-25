"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUrlForm() {
  const [toastMsg, setToastMsg] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const router = useRouter();

  const addUrl = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setToastMsg("");

    const formData = new FormData(e.currentTarget);
    const url = formData.get("orginalUrl");

    const res = await fetch("/api/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orginalUrl: url,
      }),
    });

    if (res.status === 200) {
      setToastMsg(res.statusText);
      setUrlValue("");
    }

    router.refresh();
  };

  const closeToast = () => {
    setToastMsg("");
  };

  return (
    <>
      {toastMsg && (
        <div
          className="bg-neutral-300 text-sm text-white rounded-xl mb-4 shadow-lg dark:bg-neutral-700 w-full"
          role="alert"
          aria-labelledby="hs-toast-solid-color-gray-label"
        >
          <div
            id="hs-toast-solid-color-gray-label"
            className="flex p-4 items-center"
          >
            {toastMsg}
            <div className="ms-auto">
              <button
                type="button"
                className="inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-hidden focus:opacity-100"
                aria-label="Close"
                onClick={closeToast}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="border border-gray-200 dark:border-neutral-700 rounded-lg">
        <div>
          <h2 className="text-2xl font-bold p-6">Add URL Form</h2>
          <div
            id="hs-destroy-collapse-one"
            className="w-full overflow-hidden transition-[height] duration-300"
            role="region"
            aria-labelledby="hs-destroy-heading-one"
          >
            <div className="pb-4 px-5">
              <form onSubmit={addUrl}>
                <div>
                  <div className="flex rounded-lg border border-gray-200 dark:border-neutral-700">
                    <label
                      id="orginalUrl"
                      className="px-4 inline-flex items-center min-w-fit rounded-s-md bg-gray-50 text-sm text-gray-500 dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-400"
                    >
                      Orginal URL
                    </label>
                    <input
                      type="text"
                      name="orginalUrl"
                      id="orginalUrl"
                      placeholder="https://example.com"
                      className="py-2.5 sm:py-3 px-4 pe-11 block w-full  sm:text-sm focus:z-10  disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      value={urlValue}
                      onChange={(e) => setUrlValue(e.target.value)}
                      required
                      autoComplete="off"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-e-lg border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:border-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
