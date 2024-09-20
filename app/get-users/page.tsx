import { Suspense } from "react";
import Users from "./users";
import Loading from "./loading";
import Searchbar from "../components/searchbar/searchbar";

// this is a ansync function that returns the page, it allows you to fetch data before rendering the page
// this page is a server component
// We are fetch data directly from the database without using the API layer.
export default async function UsersPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  //
  // The searchParams in your UsersPage component are part of Next.js' routing system.
  // Specifically, in Next.js, when using the new App Router (introduced in Next.js 13), route parameters (including searchParams) are automatically provided to your server components.
  // console.log(users);
  // These are the default values for the searchParams object.
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>Users</h1>
      <h2>
        This is a ansync function that returns the page, it allows you to fetch
        data before rendering the page.
      </h2>
      <Searchbar placeholder="search" />

      {/* will convert this component to use streaming. This component is being streamed, meaning this is a dynamic rendered components 
      will not effect the whloe page when fetching data, it will susbpense until a condition is met. The page will be rendered regardsless.*/}
      <Suspense key={query + currentPage} fallback={<Loading />}>
        <Users query={query} currentPage={currentPage} />
      </Suspense>
    </main>
  );
}
