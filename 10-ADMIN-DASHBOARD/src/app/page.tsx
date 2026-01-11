import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Welcome to Cab Connect Admin
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Manage your ride-hailing platform with ease
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/login"
                className="block p-6 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">Admin Login</h3>
                <p className="text-sm">Access the admin dashboard</p>
              </Link>

              <Link
                href="/dashboard"
                className="block p-6 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
                <p className="text-sm text-gray-600">View platform statistics</p>
              </Link>
            </div>

            <div className="mt-12 text-center text-sm text-gray-500">
              <p>Version 1.0.0 | Phase 1 - Foundation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
