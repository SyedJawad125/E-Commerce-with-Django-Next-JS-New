// // app/admin/layout.tsx
// 'use client'
// import { ThemeProvider } from '@/components/ThemeContext'
// import AdminSideNavbarCom from '@/components/AdminSideNavbarCom'

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <ThemeProvider>
//       <div className="flex">
//         <AdminSideNavbarCom />
//         <main className="flex-1 ml-64 p-6">
//           {children}
//         </main>
//       </div>
//     </ThemeProvider>
//   )
// }



// app/admin/layout.tsx
// 'use client'
// import { ThemeProvider } from '@/components/ThemeContext'
// import AdminSideNavbarCom from '@/components/AdminSideNavbarCom'
// import { useSession } from 'next-auth/react';
// import { redirect } from 'next/navigation';

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const { data: session, status } = useSession();
  
//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (!session) {
//     redirect('/login');
//   }

//   return (
//     <ThemeProvider>
//       <div className="flex">
//         <AdminSideNavbarCom />
//         <main className="flex-1 ml-64 p-6">
//           {children}
//         </main>
//       </div>
//     </ThemeProvider>
//   )
// }


// app/admin/layout.tsx
// 'use client';
// import ClientThemeProvider from '@/components/ClientThemeProvider';
// import AdminSideNavbarCom from '@/components/AdminSideNavbarCom';
// import { useSession } from 'next-auth/react';
// import { redirect } from 'next/navigation';

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const { data: session, status } = useSession();

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (!session) {
//     redirect('/login');
//   }

//   return (
//     <ClientThemeProvider>
//       <div className="flex">
//         <AdminSideNavbarCom />
//         <main className="flex-1 ml-64 p-6">
//           {children}
//         </main>
//       </div>
//     </ClientThemeProvider>
//   );
// }




// // app/admin/layout.tsx
// 'use client';
// import ClientThemeProvider from '@/components/ClientThemeProvider';
// import AdminSideNavbarCom from '@/components/AdminSideNavbarCom';
// import { useSession } from 'next-auth/react';
// import { redirect } from 'next/navigation';

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const { data: session, status } = useSession();

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (!session) {
//     redirect('/login');
//   }

//   return (
//     <ClientThemeProvider>
//       {/* ✅ Now this div and its children are inside the ThemeContext */}
//       <div className="flex">
//         <AdminSideNavbarCom />
//         <main className="flex-1 ml-64 p-6">{children}</main>
//       </div>
//     </ClientThemeProvider>
//   );
// }




// app/admin/layout.tsx
// 'use client';
// import ClientThemeProvider from '@/components/ClientThemeProvider';
// import AdminSideNavbarCom from '@/components/AdminSideNavbarCom';
// import { useSession } from 'next-auth/react';
// import { redirect } from 'next/navigation';
// import { ReactNode } from 'react';
// import LoadingSpinner from '@/components/ui/LoadingSpinner';

// interface AdminLayoutProps {
//   children: ReactNode;
// }

// export default function AdminLayout({ children }: AdminLayoutProps) {
//   const { data: session, status } = useSession();

//   // Auth state handling
//   if (status === 'loading') {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

//   if (!session) {
//     redirect('/login');
//   }

//   // Layout structure
//   return (
//     <ClientThemeProvider>
//       <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
//         {/* Sidebar - Fixed width */}
//         <div className="fixed inset-y-0 left-0 w-64">
//           <AdminSideNavbarCom />
//         </div>
        
//         {/* Main content - Offset by sidebar width */}
//         <main className="flex-1 ml-64 p-6 transition-colors duration-300">
//           {children}
//         </main>
//       </div>
//     </ClientThemeProvider>
//   );
// }




// app/admin/layout.tsx
'use client';
import ClientThemeProvider from '@/components/ClientThemeProvider';
import AdminSideNavbarCom from '@/components/AdminSideNavbarCom';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session, status } = useSession();

  // Auth state handling
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <FaSpinner className="animate-spin text-4xl text-primary-500 dark:text-primary-400" />
      </div>
    );
  }

  if (!session) {
    redirect('/Login');
  }

  // Layout structure
  return (
    <ClientThemeProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar - Fixed width */}
        <div className="fixed inset-y-0 left-0 w-64">
          <AdminSideNavbarCom />
        </div>
        
        {/* Main content - Offset by sidebar width */}
        <main className="flex-1 ml-64 p-6 transition-colors duration-300">
          {children}
        </main>
      </div>
    </ClientThemeProvider>
  );
}