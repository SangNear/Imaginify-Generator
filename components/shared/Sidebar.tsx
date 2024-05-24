import { navLinks } from '@/contants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <aside className='w-72 p-5 shadow-md lg:flex hidden h-screen'>
            <div>
                <Link href="/">
                    <Image
                        src="/assets/images/logo-text.svg"
                        alt='logo'
                        width={180}
                        height={28}
                    />
                </Link>
                <nav>
                    <ul>
                        {navLinks.map((link) => {
                            return (
                                <li key={link.route}>
                                    {link.label}
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar