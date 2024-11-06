'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Footer from '@/components/Footer/footer'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const horizontalScrollRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && horizontalScrollRef.current) {
      const horizontalScroll = horizontalScrollRef.current
  
      gsap.to(horizontalScroll, {
        x: () => -(horizontalScroll.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalScroll,
          start: 'top top',
          end: () => '+=' + (horizontalScroll.scrollWidth - window.innerWidth),
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    }
  }, [])

  return (
    <div className="overflow-y-auto">
      <main className="horizontal-scroll flex" ref={horizontalScrollRef}>
        <div className="flex-none w-screen">
          <div className="flex justify-center items-center h-screen p-5">
            <div className="flex flex-col gap-1">
              <div>
                <h1 className="text-9xl font-bold">
                  <span className="block">DEVELOPPEUR</span>
                  <span className="block -ml-20">FRONT-END</span>
                  <span className="block">FREELANCE</span>
                </h1>
              </div>
              <div className="flex justify-end -mr-20">
                <p className="text-4xl">Découvrez mon portfolio.</p>
              </div>
            </div>
            <Footer />
            <div className="fixed bottom-0 right-0 p-5">
              <p className="flex justify-between items-center">
                Scrollez pour entrer dans mon univers{' '}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="ml-3 border border-gray-50 rounded-lg p-1 animate-beat-fade"
                  aria-hidden="true"
                />
              </p>
            </div>
          </div>
        </div>

        <div className="flex-none w-0.5">
          <div className="h-screen bg-gray-50">
          </div>
        </div>

        <div className="flex-none w-screen">
          <div className="flex justify-center items-center h-screen p-5 pr-0 relative">
            <Footer />
            <div className='flex gap-8 h-[100vh] '>
              <div className='w-[60%] h-[100%] flex justify-start items-center'>
                <h2 className='text-7xl'>
                  Je m'appelle Florian, j'ai 35 ans et je suis développeur front-end. Passionné par la création de sites web et d'applications, j'ai réalisé mon rêve grâce à la formation d'intégrateur web chez OpenClassrooms.
                </h2>
              </div>
              <div className='relative w-[40%] h-[100%]'>
                <Image src="/photo.avif" alt="Photo de Florian" fill className='object-cover' />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-none w-2.5">
          <div className="h-screen bg-[--background-secondary]">
          </div>
        </div>

        <div className="flex-none w-screen">
          <div className="grid grid-cols-1 md:grid-cols-1 justify-center items-center h-screen p-5">
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <div className='flex justify-end items-center'>
                <p className='text-4xl'>
                  Mes compétences en front-end incluent HTML, CSS, JavaScript, React, Next.js et Tailwind CSS. Pour le back-end, j'utilise Directus comme headless CMS et n8n pour les automatisations. Ces outils me permettent de réaliser des projets variés et de proposer des solutions complètes et efficaces.
                </p>
              </div>
              <div className='flex -mt-20 mr-40 justify-end items-start'>
                <Link href="/"><Image src="/logo.svg" alt="Logo de Florian" width={100} height={100} /></Link>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 h-[10%] gap-4">
              <div className="flex flex-col gap-2">
                <div className='flex justify-start items-center gap-2'>
                  <p className="text-xs text-[--foreground-secondary]">01.</p>
                  <h2 className="text-3xl font-bold">EXPÉRIENCE UTILISATEUR</h2>
                </div>
                <p className='text-2xl'>
                  Je m'engage à créer des interfaces intuitives et agréables, en mettant l'accent sur l'accessibilité et le design responsive pour offrir une expérience optimale sur tous les appareils.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className='flex justify-start items-center gap-2'>
                  <p className="text-xs text-[--foreground-secondary]">02.</p>
                  <h2 className="text-3xl font-bold">SOLUTIONS SUR MESURE</h2>
                </div>
                <p className='text-2xl'>
                  En associant Directus et n8n à mes compétences en front-end, je développe des solutions personnalisées qui automatisent les processus complexes et répondent précisément aux besoins spécifiques de chaque projet.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className='flex justify-start items-center gap-2'>
                  <p className="text-xs text-[--foreground-secondary]">03.</p>
                  <h2 className="text-3xl font-bold">COLLABORATION</h2>
                </div>
                <p className='text-2xl'>
                  Toujours enthousiaste à l'idée de travailler sur de nouveaux projets, j'aime collaborer avec d'autres professionnels pour concrétiser des idées innovantes et fournir des solutions de qualité.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-none w-0.5">
          <div className="h-screen bg-gray-50">
          </div>
        </div>

        <div className="flex-none w-screen">
          <div className="flex justify-center items-center h-screen p-5 pr-0 relative">
                <h2 className='text-7xl'>
                  MES PROJETS PHARES
                </h2>
              </div>
        </div>

      </main>

      <div className='flex gap-8 h-[100vh] '>
        <h2 className='text-7xl'>
          CARROUSEL COMING SOON
        </h2>
      </div>
    </div>
  )
}