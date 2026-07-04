import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'

export default function HeroSection() {
    const steps = [
        {
            number: '1',
            title: 'Add books',
            description: 'Upload or save any book to your personal library.',
        },
        {
            number: '2',
            title: 'Create your collection',
            description: 'Organise your books and keep everything easy to find.',
        },
        {
            number: '3',
            title: 'Start reading',
            description: 'Track your progress and continue your reading journey.',
        },
    ]

    return (
        <section className="wrapper pt-4 mb-10 md:mb-16">
            <div className="library-hero-card shadow-soft-md min-h-[420px]">
                <div className="library-hero-content">

                    {/* Left Content */}
                    <div className="library-hero-text">
                        <h1 className="library-hero-title">
                            Your Library
                        </h1>

                        <p className="library-hero-description">
                            Build your own reading space, save your favourite books, and keep
                            your personal collection beautifully organised in one place.
                        </p>

                        <Link href="/books/new" className="library-cta-primary group">
                            <Plus className="size-5" />
                            Add New Book
                            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {/* Center Illustration - Desktop */}
                    <div className="library-hero-illustration-desktop">
                        <div className="relative h-[300px] w-full max-w-[360px]">

                            {/* Soft background circle */}
                            <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff6e5]" />

                            {/* Globe */}
                            <div className="absolute left-1/2 top-[44px] z-10 flex h-[170px] w-[170px] -translate-x-1/2 items-center justify-center rounded-full bg-[#d7a85f] shadow-soft">
                                <div className="absolute inset-4 rounded-full border border-[#212a3b]/25" />
                                <div className="absolute h-full w-px bg-[#212a3b]/20" />
                                <div className="absolute h-px w-full bg-[#212a3b]/20" />
                                <div className="absolute h-[118px] w-[64px] rounded-full border border-[#212a3b]/25" />
                                <div className="absolute h-[72px] w-[134px] rounded-full border border-[#212a3b]/25" />
                            </div>

                            {/* Vintage books */}
                            <div className="absolute bottom-[42px] left-[44px] z-20 flex items-end gap-2">
                                <div className="h-[118px] w-[34px] rounded-t-md bg-[#663820] shadow-soft" />
                                <div className="h-[150px] w-[38px] rounded-t-md bg-[#212a3b] shadow-soft" />
                                <div className="h-[104px] w-[32px] rounded-t-md bg-[#d4a853] shadow-soft" />
                                <div className="h-[136px] w-[36px] rounded-t-md bg-[#7c9a82] shadow-soft" />
                            </div>

                            {/* Lying book */}
                            <div className="absolute bottom-[26px] right-[34px] z-30 rotate-[-8deg] rounded-[10px] bg-[#663820] px-12 py-5 shadow-soft-lg">
                                <span className="block h-1.5 w-20 rounded-full bg-white/40" />
                                <span className="mt-3 block h-1.5 w-14 rounded-full bg-white/25" />
                            </div>

                            {/* Floor shadow */}
                            <div className="absolute bottom-[18px] left-1/2 h-6 w-[260px] -translate-x-1/2 rounded-full bg-black/10 blur-md" />
                        </div>
                    </div>

                    {/* Center Illustration - Mobile */}
                    <div className="library-hero-illustration">
                        <div className="relative h-[220px] w-[280px]">

                            <div className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff6e5]" />

                            <div className="absolute left-1/2 top-[28px] z-10 flex h-[130px] w-[130px] -translate-x-1/2 items-center justify-center rounded-full bg-[#d7a85f] shadow-soft">
                                <div className="absolute inset-3 rounded-full border border-[#212a3b]/25" />
                                <div className="absolute h-full w-px bg-[#212a3b]/20" />
                                <div className="absolute h-px w-full bg-[#212a3b]/20" />
                                <div className="absolute h-[90px] w-[48px] rounded-full border border-[#212a3b]/25" />
                            </div>

                            <div className="absolute bottom-[34px] left-[40px] z-20 flex items-end gap-1.5">
                                <div className="h-[88px] w-[26px] rounded-t-md bg-[#663820]" />
                                <div className="h-[110px] w-[28px] rounded-t-md bg-[#212a3b]" />
                                <div className="h-[78px] w-[25px] rounded-t-md bg-[#d4a853]" />
                                <div className="h-[98px] w-[27px] rounded-t-md bg-[#7c9a82]" />
                            </div>

                            <div className="absolute bottom-[24px] right-[34px] z-30 rotate-[-8deg] rounded-[8px] bg-[#663820] px-9 py-4 shadow-soft">
                                <span className="block h-1.5 w-14 rounded-full bg-white/40" />
                                <span className="mt-2 block h-1.5 w-10 rounded-full bg-white/25" />
                            </div>
                        </div>
                    </div>

                    {/* Right Steps Card */}
                    <div className="library-steps-card shadow-soft w-full lg:max-w-[320px]">
                        <div className="mb-5">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand)]">
                                How it works
                            </p>

                            <h2 className="mt-2 text-2xl font-semibold text-[#212a3b] font-serif">
                                Simple steps
                            </h2>
                        </div>

                        <div className="space-y-5">
                            {steps.map((step) => (
                                <div key={step.number} className="library-step-item">
                                    <span className="library-step-number">
                                        {step.number}
                                    </span>

                                    <div>
                                        <h3 className="library-step-title">
                                            {step.title}
                                        </h3>

                                        <p className="library-step-description">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}