"use client"
import { navLinks } from '@/contants'
import { SignIn, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'

const Sidebar = () => {
    const path = usePathname()
    return (
        <aside className='w-72 p-5 shadow-md lg:flex hidden h-screen sticky left-0 top-0'>
            <div>
                <Link href="/">
                    <Image
                        src="/assets/images/logo-text.svg"
                        alt='logo'
                        width={180}
                        height={28}
                    />
                </Link>
                <nav className='flex  justify-center h-full mt-3'>
                    <SignedIn>
                        <ul className='w-full md:flex flex-col gap-2'>
                            {navLinks.map((link) => {
                                const isActive = link.route === path
                                return (
                                    <li key={link.route} className={`hover:bg-purple-400 hover:shadow-inner bg-cover p-3 rounded-3xl flex justify-center transition-all cursor-pointer ${isActive ? "bg-purple-gradient text-white" : "text-gray-700"}`}>
                                        <Link href={link.route} className='flex size-full gap-4'>
                                            <Image src={link.icon} width={28} height={28} alt='icon-menu' />
                                            {link.label}
                                        </Link>
                                    </li>
                                )
                            })}
                            <li className='flex-center p-3'>
                                <UserButton showName/>
                            </li>
                        </ul>
                    </SignedIn>
                    <SignedOut>
                        <Button asChild className='bg-purple-gradient bg-cover rounded-full hover:opacity-90 transition-all'>
                            <Link href="/sign-in">Login</Link>
                        </Button>
                    </SignedOut>
                </nav>
            </div>
        </aside>
    )
}
export default Sidebar