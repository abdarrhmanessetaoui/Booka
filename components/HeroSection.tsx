import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HeroSection = () => {
    return (
        <section className="wrapper mb-10 md:mb-16">
            <div className="library-hero-card">
                <div className="library-hero-content">
                    {/* Left Part */}
                    <div className="library-hero-text">
                        <h1 className="library-hero-title text-4xl font-serif font-bold">Votre Bibliothèque</h1>
                        <p className="library-hero-description">
                            Convertissez vos livres en conversations interactives avec l'IA. <br className="hidden md:block" />
                            Écoutez, apprenez et discutez de vos lectures préférées.
                        </p>
                        <Link href="/books/new" className="library-cta-primary mt-4 flex items-center justify-center">
                            <span className="text-3xl font-light mb-1 mr-2">+</span>
                            <span className="text-[#212a3b]">Ajouter un livre</span>
                        </Link>
                    </div>

                    {/* Center Part - Desktop */}
                    <div className="library-hero-illustration-desktop">
                        <Image
                            src="/assets/hero-illustration.png"
                            alt="Vintage books and a globe"
                            width={400}
                            height={400}
                            className="object-contain"
                        />
                    </div>

                    {/* Center Part - Mobile (Hidden on Desktop) */}
                    <div className="library-hero-illustration">
                        <Image
                            src="/assets/hero-illustration.png"
                            alt="Vintage books and a globe"
                            width={300}
                            height={300}
                            className="object-contain"
                        />
                    </div>

                    {/* Right Part */}
                    <div className="library-steps-card min-w-[260px] max-w-[280px] z-10 shadow-soft-md">
                        <ul className="space-y-6">
                            <li className="library-step-item">
                                <div className="w-10 h-10 min-w-10 min-h-10 rounded-full border border-gray-300 flex items-center justify-center font-medium text-lg">1</div>
                                <div className="flex flex-col">
                                    <h3 className="library-step-title text-lg font-bold">Uploader le PDF</h3>
                                    <p className="library-step-description text-gray-500">Ajoutez votre fichier</p>
                                </div>
                            </li>
                            <li className="library-step-item">
                                <div className="w-10 h-10 min-w-10 min-h-10 rounded-full border border-gray-300 flex items-center justify-center font-medium text-lg">2</div>
                                <div className="flex flex-col">
                                    <h3 className="library-step-title text-lg font-bold">Traitement IA</h3>
                                    <p className="library-step-description text-gray-500">Nous analysons le contenu</p>
                                </div>
                            </li>
                            <li className="library-step-item">
                                <div className="w-10 h-10 min-w-10 min-h-10 rounded-full border border-gray-300 flex items-center justify-center font-medium text-lg">3</div>
                                <div className="flex flex-col">
                                    <h3 className="library-step-title text-lg font-bold">Chat Vocal</h3>
                                    <p className="library-step-description text-gray-500">Discutez avec l'IA</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
