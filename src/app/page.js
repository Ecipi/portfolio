'use client'

import { useEffect, useRef } from 'react'
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
    <div className="font-[family-name:var(--font-geist-sans)] ">
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

        <div className="flex-none w-2.5">
          <div className="h-screen bg-[--background-secondary]">
          </div>
        </div>

        <div className="flex-none w-screen">
          <div className="flex justify-center items-center h-screen p-5 relative">
            <Footer />
            <div className='flex gap-8 h-[100vh] '>
              <div className='w-[60%] h-[100%] flex justify-start items-center'>
                <h2 className='text-7xl'>
                  Je m'appelle Florian, j'ai 35 ans et je suis développeur front-end. Passionné par la création de sites web et d'applications, j'ai réalisé mon rêve grâce à la formation d'intégrateur web chez OpenClassrooms.
                </h2>
              </div>
              <div className='relative w-[40%] h-[100%]'>
                <Image src="/photo.avif" alt="Photo de Florian" layout="fill" className='object-cover' />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-none w-2.5">
          <div className="h-screen bg-[--background-secondary]">
          </div>
        </div>

        <div className="flex-none w-screen">
          <div className="flex flex-col justify-center items-center h-screen p-5">
            <div>
              <p>
                Mes compétences en front-end incluent HTML, CSS, JavaScript, React, Next.js et Tailwind CSS. Pour le back-end, j'utilise Directus comme headless CMS et n8n pour les automatisations. Ces outils me permettent de réaliser des projets variés et de proposer des solutions complètes et efficaces.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
              <div className="flex flex-col gap-4">
                <p className="text-base text-[--foreground-secondary]">01.</p>
                <h2 className="text-2xl font-bold">EXPÉRIENCE UTILISATEUR</h2>
                <p>
                  Je m'engage à créer des interfaces intuitives et agréables, en mettant l'accent sur l'accessibilité et le design responsive pour offrir une expérience optimale sur tous les appareils.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-base text-[--foreground-secondary]">02.</p>
                <h2 className="text-2xl font-bold">SOLUTIONS SUR MESURE</h2>
                <p>
                  En associant Directus et n8n à mes compétences en front-end, je développe des solutions personnalisées qui automatisent les processus complexes et répondent précisément aux besoins spécifiques de chaque projet.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-base text-[--foreground-secondary]">03.</p>
                <h2 className="text-2xl font-bold">COLLABORATION ET PASSION</h2>
                <p>
                  Toujours enthousiaste à l'idée de travailler sur de nouveaux projets, j'aime collaborer avec d'autres professionnels pour concrétiser des idées innovantes et fournir des solutions de qualité.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-none w-2.5">
          <div className="h-screen bg-[--background-secondary]">
          </div>
        </div>

        <div className="flex-none w-screen">
          <div className="flex flex-col justify-center items-center h-screen p-5">
            <h2 className="text-4xl font-bold">MES PROJETS PHARES</h2>
          </div>
        </div>
      </main>
    </div>
  )
}