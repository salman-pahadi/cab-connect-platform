import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="text-xl font-bold text-primary">
            Cab Connect Admin
          </Link>

          <nav className="flex space-x-4">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/drivers"
              className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Drivers
            </Link>
            <Link
              href="/dashboard/users"
              className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Users
            </Link>
            <Link
              href="/dashboard/rides"
              className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Rides
            </Link>
          </nav>

          <button className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
