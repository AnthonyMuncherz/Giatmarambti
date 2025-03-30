'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface User {
  id: string;
  email: string;
  role: string;
  profile?: {
    firstName: string;
    lastName: string;
    mbtiType?: string;
    mbtiCompleted?: boolean;
  };
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (!response.ok) {
          throw new Error('Not authenticated');
        }
        const data = await response.json();
        setUser(data.user);
        
        // Redirect to MBTI assessment if not completed and not already on that page
        if (data.user?.profile && !data.user.profile.mbtiCompleted && pathname !== '/mbti-assessment') {
          router.push('/mbti-assessment');
        }
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Profile', href: '/profile' },
    ...(user?.role === 'ADMIN' ? [{ name: 'Admin', href: '/dashboard/admin' }] : []),
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // If mbti assessment needs to be completed and we're not on the mbti page, don't render
  if (user.profile && !user.profile.mbtiCompleted && pathname !== '/mbti-assessment') {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/dashboard">
                      <Image 
                        src="/Giatmara.png" 
                        alt="Giatmara Logo" 
                        width={280} 
                        height={75} 
                        className="h-20 w-auto" 
                        priority
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                          item.name === 'Admin' 
                            ? 'text-indigo-600 hover:text-indigo-500' 
                            : 'text-gray-900 hover:text-gray-700'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <div className="text-sm text-gray-500 mr-4">
                    {user.profile?.firstName} {user.profile?.lastName}
                    {user.profile?.mbtiType && (
                      <Link 
                        href={`/mbti-results?type=${user.profile.mbtiType}`}
                        className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 rounded-md text-xs inline-block hover:bg-indigo-200 transition-colors cursor-pointer"
                        aria-label={`View your MBTI type details: ${user.profile.mbtiType}`}
                      >
                        {user.profile.mbtiType}
                      </Link>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>

                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                <div className="flex items-center justify-center border-b border-gray-200 pb-3">
                  <Link href="/dashboard">
                    <Image 
                      src="/Giatmara.png" 
                      alt="Giatmara Logo" 
                      width={240} 
                      height={65} 
                      className="h-16 w-auto my-2" 
                      priority
                    />
                  </Link>
                </div>
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={`block py-2 pl-3 pr-4 text-base font-medium ${
                      item.name === 'Admin'
                        ? 'text-indigo-600 hover:bg-gray-50 hover:text-indigo-800'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="flex items-center px-4">
                    <div className="text-base font-medium text-gray-800">
                      {user.profile?.firstName} {user.profile?.lastName}
                      {user.profile?.mbtiType && (
                        <Link
                          href={`/mbti-results?type=${user.profile.mbtiType}`}
                          className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 rounded-md text-xs inline-block hover:bg-indigo-200 transition-colors cursor-pointer" 
                          aria-label={`View your MBTI type details: ${user.profile.mbtiType}`}
                        >
                          {user.profile.mbtiType}
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Disclosure.Button
                      as="button"
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Logout
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main className="py-10">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
} 