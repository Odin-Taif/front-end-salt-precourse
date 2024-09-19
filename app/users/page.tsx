import { Suspense } from "react";
import Users from "./users";
import Loading from "./loading";

// this is a ansync function that returns the page, it allows you to fetch data before rendering the page
// this page is a server component
// We are fetch data directly from the database without using the API layer.
export default async function UsersPage() {
  // console.log(users);
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>Users</h1>
      <h2>
        This is a ansync function that returns the page, it allows you to fetch
        data before rendering the page.
      </h2>
      {/* will convert this component to use streaming. This component is being streamed, meaning this is a dynamic rendered components 
      will not effect the whloe page when fetching data, it will susbpense until a condition is met. The page will be rendered regardsless.*/}
      <Suspense fallback={<Loading />}>
        <Users />
      </Suspense>
    </main>
  );
}
