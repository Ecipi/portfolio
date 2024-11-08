'use client'

import * as React from "react"
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Footer from '@/components/Footer/footer'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const horizontalScrollRef = useRef(null);
  const plugin = React.useRef(
    Autoplay({ delay: 4000 })
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const response = await fetch('https://directus.ecipi.online/items/portfolio_carousel', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CAROUSEL}`,
          },
        });
        const data = await response.json();
        console.log(data);
        if (data && data.data) {
          setCarouselItems(data.data);
        } else {
          console.error('Aucune donnée trouvée dans la réponse de l\'API');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des éléments du carousel:', error);
      }
    };

    fetchCarouselItems();
  }, []);

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

  const scrollToSection = (e, target) => {
    e.preventDefault();
    const section = document.querySelector(target);
    if (section) {
      const verticalScrollPosition = section.offsetLeft;
      window.scrollTo({ top: verticalScrollPosition, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(event.target)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    }

    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE,
        process.env.NEXT_PUBLIC_TEMPLATE,
        data,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }
      )
      setSubmitStatus('success')
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetFormSuccess = () => {
    setSubmitStatus(null)
    setIsModalOpen(false)
  }

  const resetFormError = () => {
    setSubmitStatus(null)
    setIsModalOpen(true)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRetry = () => {
    setSubmitStatus(null);
    setIsModalOpen(true);
    setFormData({ ...formData });
  };

  return (
    <div className="overflow-y-auto">
      <main className="horizontal-scroll flex" ref={horizontalScrollRef}>
        <div className="flex-none w-screen" id="home">
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
            <div className="absolute bottom-0 right-0 p-5">
              <p className="flex justify-between items-center">
                Scrollez pour entrer dans mon univers
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

        <div className="flex-none w-screen" id="about">
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
              <div className='flex justify-start items-end gap-2'>
              <p className="text-xs text-[--foreground-secondary] pb-1">01.</p>
                  <h2 className="text-3xl font-bold">EXPÉRIENCE UTILISATEUR</h2>
                </div>
                <p className='text-2xl'>
                  Je m'engage à créer des interfaces intuitives et agréables, en mettant l'accent sur l'accessibilité et le design responsive pour offrir une expérience optimale sur tous les appareils.
                </p>
              </div>
              <div className="flex flex-col gap-2">
              <div className='flex justify-start items-end gap-2'>
              <p className="text-xs text-[--foreground-secondary] pb-1">02.</p>
                  <h2 className="text-3xl font-bold">SOLUTIONS SUR MESURE</h2>
                </div>
                <p className='text-2xl'>
                  En associant Directus et n8n à mes compétences en front-end, je développe des solutions personnalisées qui automatisent les processus complexes et répondent précisément aux besoins spécifiques de chaque projet.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className='flex justify-start items-end gap-2'>
                  <p className="text-xs text-[--foreground-secondary] pb-1">03.</p>
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

        <div className="flex-none w-[60vh]">
          <div className="flex flex-col justify-center items-center h-screen p-5">
                <h2 className='text-7xl'>
                PROJETS
                </h2>
                <h2 className='text-7xl'>
                SÉLECTIONNÉS
                </h2>
          </div>
        </div>

        <div className="flex-none w-2.5">
          <div className="h-screen bg-[--background-secondary]">
          </div>
        </div>

    <div className="flex-none w-screen" id="projects">
      <div className="relative w-full h-screen">
        <Carousel
          className="w-full h-full"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent>
            {carouselItems.length > 0 ? (
              carouselItems.map((item) => (
                <CarouselItem key={item.id} className="basis-full">
                  <div className="relative w-full h-screen">
                    <Image
                      src={`https://directus.ecipi.online/assets/${item.image}`}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <h3 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                        {item.titre}
                      </h3>
                      <p className="text-xl md:text-2xl text-gray-200 font-medium max-w-3xl">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem>
                <div className="flex items-center justify-center h-screen">
                  <p className="text-center text-gray-500">Aucun élément à afficher.</p>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious className="absolute left-8 top-1/2 -translate-y-1/2 h-12 w-12" />
          <CarouselNext className="absolute right-8 top-1/2 -translate-y-1/2 h-12 w-12" />
        </Carousel>
      </div>
</div>

        <div className="flex-none w-0.5">
          <div className="h-screen bg-gray-50">
          </div>
        </div>

        <div className="flex-none w-screen" id="contact">
        <div className="flex h-screen p-5 relative flex-col">
            <div className="flex justify-start items-start">
              <h2 className="text-[12.5rem]">FlorianFrancese</h2>
              </div>
              <div className="grid grid-cols- md:grid-cols-2">
              <p className="text-6xl -mt-10">
                VOUS VOULEZ PARLEZ D'UN PROJET ?
              </p>
            </div>
            <div className="grid grid-cols- md:grid-cols-3">
              <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="text-xl mt-8 px-8 py-6 border border-[--foreground-secondary] bg-transparent text-[--foreground-secondary] hover:bg-[--foreground-secondary] hover:text-black transition-colors rounded-full"
                >
                  ENVOYEZ-MOI UN MESSAGE
                </Button>
              </div>
              <div className="absolute flex bottom-20 left-0 p-5">
                <div className="flex flex-col w-[50%] gap-6">
                <p className="text-4xl font-bold">
                MERCI POUR VOTRE VISITE !
                </p>
                <p className="text-2xl">
                POUR EN DÉCOUVRIR DAVANTAGE SUR MES PROJETS ET MON PARCOURS, SUIVEZ-MOI SUR MES RÉSEAUX SOCIAUX !
                </p>
              </div>
                </div>
                <div className="absolute bottom-0 right-0 p-5 z-20">
                <Link href="#home" onClick={(e) => scrollToSection(e, '#home')}><p className="flex justify-between items-center ">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="mr-3 border border-gray-50 rounded-lg p-1 animate-beat-fade"
                  aria-hidden="true"
                />
                Retournez au début
              </p>
              </Link>
            </div>
              <Footer />
          </div>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        {submitStatus === null && (
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4 flex justify-center items-center">
              Contactez-moi
            </DialogTitle>
          </DialogHeader>
        )}
        {submitStatus === null ? (
          <form
            key="form"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Nom</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="Votre nom complet" 
                required 
                className="mt-1" 
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                required
                className="mt-1"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Votre message ici"
                required
                className="mt-1"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center items-center">
              <Button type="submit" disabled={isSubmitting} className="w-[50%] mt-8">
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
              </Button>
            </div>
          </form>
        ) : submitStatus === 'success' ? (
          <div className="text-center py-12">
            <DialogTitle className="sr-only">Succès</DialogTitle>
            <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="text-xl font-bold mb-4">Merci pour votre message !</h3>
            <p className="text-gray-300 mb-4">Votre demande a bien été reçue. Je reviendrai vers vous rapidement.</p>
            <Button onClick={resetFormSuccess}>Fermer</Button>
          </div>
        ) : (
          <div className="text-center py-12">
            <DialogTitle className="sr-only">Erreur</DialogTitle>
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <h3 className="text-xl font-bold mb-4">Oups ! Quelque chose s'est mal passé.</h3>
            <p className="text-gray-300 mb-4">Nous rencontrons actuellement un problème technique. Veuillez réessayer dans quelques minutes.</p>
            <Button onClick={handleRetry}>Réessayer</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
      
      </main>
    </div>
  )
}