
import { Bars3Icon, ChevronDownIcon, HomeIcon, PlusIcon } from '@heroicons/react/20/solid'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React from 'react'

import reddit from '../../public/redditLogo.png'
import { BellIcon, ChatBubbleOvalLeftEllipsisIcon, GlobeEuropeAfricaIcon, MegaphoneIcon, SparklesIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'


const Header = () => {
    const { data: session } = useSession();
    return (
        <div className='flex bg-white px-4 py-2 shadow-sm sticky top-0 z-50 items-center'>
            <div className='relative h-10 w-20 flex-shrink-0 cursor-pointer'>
                <Link href='/'>
                    <Image
                        alt='reddit-logo'
                        objectFit='contain'
                        src='https://www.redditinc.com/assets/images/site/logo.svg'
                        layout='fill'
                    /></Link>
            </div>

            <div className='flex items-center mx-7 xl:min-w-[300px]'>
                <HomeIcon className='h-5 w-5' />
                <p className='ml-2 hidden flex-1 lg:inline'>Home</p>
                <ChevronDownIcon className='h-5 w-5' />
            </div>

            {/* search box */}
            <form className='flex flex-1 items-center space-x-2
            rounded-sm border border-gray-200 bg-gray-100 px-3 py-1'>
                <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
                <input className='flex-1 bg-transparent outline-none' type='text' placeholder='Search Reddit' />
                <button type='submit' hidden />
            </form>

            <div className='mx-5 items-center space-x-2 text-gray-500 hidden lg:inline-flex '>
                <SparklesIcon className='icon' />
                <GlobeEuropeAfricaIcon className='icon' />
                <VideoCameraIcon className='icon' />
                <hr className='h-10 border border-gray-100' />
                <ChatBubbleOvalLeftEllipsisIcon className='icon' />
                <BellIcon className='icon' />
                <PlusIcon className='icon' />
                <MegaphoneIcon className='icon' />

            </div>
            <div className='ml-5 flex items-center lg:hidden'>
                <Bars3Icon className='icon' />
            </div>

            {/* auth */}

            {session ? (
                <div
                    onClick={() => signOut()}
                    className='hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer'
                >
                    <div className='relative h-5 w-5 py-1 flex-shrink-0'>
                        <Image
                            alt=''
                            height={15}
                            width={15}
                            src={reddit}
                            objectFit='contain'
                        />
                    </div>
                    <div>
                        <p className='truncate'>{session?.user?.name}</p>
                        <p className='text-gray-400'>SignOut</p>
                    </div>

                    <ChevronDownIcon className='icon' />
                </div>
            ) : (
                <div
                    onClick={() => signIn()}
                    className='hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer'
                >
                    <div className='relative h-5 w-5 py-1 flex-shrink-0'>
                        <Image
                            alt=''
                            height={15}
                            width={15}
                            src={reddit}
                            objectFit='contain'
                        />
                    </div>
                    <p className='text-gray-400'>SignIn</p>
                </div>
            )}
        </div>

    )
}

export default Header