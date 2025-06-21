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




// app/admin/layout.tsx
'use client';
import ClientThemeProvider from '@/components/ClientThemeProvider';
import AdminSideNavbarCom from '@/components/AdminSideNavbarCom';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect('/login');
  }

  return (
    <ClientThemeProvider>
      {/* ✅ Now this div and its children are inside the ThemeContext */}
      <div className="flex">
        <AdminSideNavbarCom />
        <main className="flex-1 ml-64 p-6">{children}</main>
      </div>
    </ClientThemeProvider>
  );
}