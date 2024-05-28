"use client"
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { navLinks } from '@/constants'
import { usePathname } from 'next/navigation'
const MobileNav = () => {
    const path = usePathname()
    return (
        <header className='p-3 flex justify-between items-center lg:hidden'>
            <Link href="/">
                <Image src="/assets/images/logo-text.svg" width={180} height={28} alt='logo' />
            </Link>
            <SignedIn>
                <div className='flex flex-center gap-2 max-sm:gap-1'>
                    <UserButton />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Image src="/assets/icons/menu.svg" alt='menu' width={32} height={32} className='border w-8 rounded-lg cursor-pointer' />
                        </SheetTrigger>
                        <SheetContent>

                            <Image src="/assets/images/logo-text.svg" alt='logo' width={128} height={28} />
                            <nav className='flex flex-col  h-full items-baseline mt-3 items-start justify-between pb-5'>
                                <SignedIn>
                                    <ul className='w-full md:flex flex-col'>
                                        {navLinks.slice(0, 6).map((link) => {
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

                                    </ul>
                                    <ul className='w-full md:flex flex-col gap-4'>
                                        {navLinks.slice(6).map((link) => {
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
                                        <li className='p-3 items-start justify-start'>
                                            <UserButton showName />
                                        </li>
                                    </ul>
                                </SignedIn>
                                <SignedOut>
                                    <Button asChild className='bg-purple-gradient bg-cover rounded-full hover:opacity-90 transition-all'>
                                        <Link href="/sign-in">Login</Link>
                                    </Button>
                                </SignedOut>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

            </SignedIn>
        </header>
    )
}

export default MobileNav