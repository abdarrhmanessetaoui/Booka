"use client"

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Show, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'

const navItems = [
    { label: "Library", href: "/" },
    { label: "Add New", href: "/books/new" },
]
export default function Navbar() {
    const pathname = usePathname()
    const { user } = useUser();
    return (
        <header className='w-full fixed z-50 bg-(--bg-primary)'>
            <div className="wrapper navbar-height py-4 flex justify-between items-center">
                <Link href='/' className='flex gap-0.5 items-center'>
                    <Image src="/assets/logo.png" alt='Bookfied' width={42} height={26} />
                    <span className="logo-text">Bookified</span>
                </Link>
                <nav className="w-fit flex gap-7.5 items-center">
                    {navItems.map(({ href, label }, index) => {
                        const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))
                        return (
                            <Link
                                key={index}
                                href={href}
                                className={cn('nav-link-base',
                                    isActive ? 'nav-link-active' : 'text-black opacity-70')}>
                                {label}
                            </Link>
                        )
                    })}
                    <div className="flex items-center gap-7.5">
                        <Show when="signed-out">
                            <SignInButton />
                            <SignUpButton>
                                <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                                    Sign Up
                                </button>
                            </SignUpButton>
                        </Show>
                        <Show when="signed-in">
                            <div className="nav-user-link">
                                <UserButton />
                                {user?.firstName &&
                                    <span className="nav-user-name">{user?.firstName && (
                                        <Link
                                            href="/subscriptions"
                                            className="underline"
                                        >
                                            {user.firstName}
                                        </Link>
                                    )}</span>
                                }
                            </div>
                        </Show>
                    </div>
                </nav>
            </div>
        </header>
    )
}
