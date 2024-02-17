import { UserButton, auth, useUser } from '@clerk/nextjs';
import Link from 'next/link';


export default function Header() {
    const { userId } = auth();
    return (
        <>
            <nav className='bg-blue-700 py-4 px-6 flex items-center justify-between mb-5'>

                <div className='flex items-center'>
                    <Link href='/'>
                        <div className='text-lg font-bold text-white'>
                            App
                        </div>
                    </Link>
                </div>

                <div className='text-lg font-bold text-white'>
                    {
                        !userId ?
                            <div>
                                <Link href='/sign-in' className='pr-5'>LogIn</Link>
                                <Link href='/sign-up'>SignUp</Link>
                            </div>
                            :
                            <div className='flex'>
                                <Link href='/availability' className='mr-3'>Availability</Link>
                                <Link href='/events' className='mr-3'>Events</Link>
                                <UserButton afterSignOutUrl='/' />
                            </div>
                    }
                </div>

            </nav>
        </>
    )
}