"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Searchbar({ placeholder }: { placeholder: string }) {
  // second step: to update the url with search term using useSearchParams, URLSearchParams,useRouter
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Memoize handleSearch to avoid unnecessary re-renders
  const handleSearch = useDebouncedCallback((term: string) => {
    //   console.log(`Searching... ${term}`);
    //https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

    const params = new URLSearchParams(searchParams as any);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  },300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        // First: we capture the user's search input.

        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // we sync the input search with url, even when refreshing the url and search will be in sync.
        defaultValue={searchParams.get("query")?.toString()}
      />

      {/* <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
    </div>
  );
}
