"use client";
import Image from "next/image";
import Topbar from "./(components)/Topbar";
import ProblemsTable from "./(components)/ProblemsTable";
import useHasMounted from "./(components)/Hooks/useHashMounted";
import Footer from "./(components)/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {

  const hasMounted = useHasMounted();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  // UseEffect to Auto redirect to the authentication page if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth"); 
    }
  }, [user, loading, router]);

  if (!hasMounted) return null;
  
  if(!user) return null;

  return (
    <main className="min-h-screen bg-dark-layer-2">
      <Topbar />
      <h1
        className='text-2xl text-center text-gray-700 dark:text-gray-400 font-medium
					uppercase mt-10 mb-5'
      >
        &ldquo; QUALITY OVER QUANTITY &rdquo; 👇
      </h1>
      <div className='relative overflow-x-auto mx-auto px-6 pb-20'>
        <table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto'>
          <thead className='text-xs text-gray-700 uppercase dark:text-gray-400 border-b '>
            <tr>
              <th scope='col' className='px-1 py-3 w-0 font-medium'>
                Status
              </th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>
                Title
              </th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>
                Difficulty
              </th>

              <th scope='col' className='px-6 py-3 w-0 font-medium'>
                Category
              </th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>
                Solution
              </th>
            </tr>
          </thead>
          <ProblemsTable />

        </table>

      </div>
      <Footer />
    </main>
  );
}
