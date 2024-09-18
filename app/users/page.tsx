import { fetchUsers } from "../lib/fetchUsers";

// this is a ansync function that returns the page, it allows you to fetch data before rendering the page
export default async function UsersPage() {
  const users = await fetchUsers();
  // console.log(users);
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>Users</h1>
      <h2>
        This is a ansync function that returns the page, it allows you to fetch
        data before rendering the page.
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {users &&
          users.map((user) => (
            <div key={user.id} className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          ))}
      </div>
    </main>
  );
}
