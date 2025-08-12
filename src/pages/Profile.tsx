import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Profile() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) return null;

  const displayName = user.name || user.email.split('@')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative">
        <div className="h-40 bg-gradient-to-r from-primary-600 to-primary-400" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-12">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-600 to-primary-400 text-white flex items-center justify-center text-2xl font-semibold uppercase ring-4 ring-white shadow">
                  {(displayName || '?').charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Member</span>
                  </div>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-secondary" onClick={() => navigate('/orders')}>View orders</button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="rounded-xl border border-gray-200 p-5">
                <h2 className="text-sm font-semibold text-gray-900 mb-4">Account details</h2>
                <dl className="divide-y divide-gray-100 text-sm">
                  <div className="py-3 grid grid-cols-3">
                    <dt className="text-gray-500">Name</dt>
                    <dd className="col-span-2 text-gray-900">{displayName}</dd>
                  </div>
                  <div className="py-3 grid grid-cols-3">
                    <dt className="text-gray-500">Email</dt>
                    <dd className="col-span-2 text-gray-900">{user.email}</dd>
                  </div>
                </dl>
              </section>

              <section className="rounded-xl border border-gray-200 p-5">
                <h2 className="text-sm font-semibold text-gray-900 mb-4">Security</h2>
                <dl className="divide-y divide-gray-100 text-sm">
                  <div className="py-3 grid grid-cols-3">
                    <dt className="text-gray-500">Password</dt>
                    <dd className="col-span-2 text-gray-900">●●●●●●●●</dd>
                  </div>
                  <div className="py-3 grid grid-cols-3">
                    <dt className="text-gray-500">2FA</dt>
                    <dd className="col-span-2">
                      <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">Not enabled</span>
                    </dd>
                  </div>
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


