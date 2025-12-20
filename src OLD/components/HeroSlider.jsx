// HeroSlider.jsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: 'Vision & Mission',
      tag: 'WHY WE EXIST',
      tagColor: 'bg-secondary',
      vision: 'To create a better-informed, educated, and aware world.',
      mission: 'To catalyse the power of research and communication for social equity and progressive change.',
      buttonText: 'Work with us',
      buttonLink: '/location',
      backgroundImage: 'https://cmsrconsultants.com/img/slider1.jpg',
      overlay: 'bg-gradient-to-r from-primary/80 to-primary/60',
    },
    {
      id: 2,
      title: 'Evidence, storytelling, and capacity Building',
      tag: 'WHAT WE DO',
      tagColor: 'bg-primary',
      description: 'End-to-end solutions from research to communication and training.',
      buttonText: 'Explore Services',
      buttonLink: '/what-we-do',
      backgroundImage: 'https://cmsrconsultants.com/img/slider5.png',
      overlay: 'bg-gradient-to-r from-primary/85 to-primary/65',
    },
    {
      id: 3,
      title: 'Research, Communication, Training, and Management',
      tag: 'OUR SERVICES',
      tagColor: 'bg-secondary',
      description: 'End-to-end solutions from research to communication, field training and project management.',
      buttonText: 'Explore Services',
      buttonLink: '/what-we-do',
      backgroundImage: 'https://picafsp.org/wp-content/uploads/2017/10/Communication-Research.jpg',
      overlay: 'bg-gradient-to-r from-primary/80 to-primary/60',
    },
    {
      id: 4,
      title: 'The principles and approaches that guide our work. ',
      tag: 'OUR PHILOSOPHY',
      tagColor: 'bg-secondary',
      description: 'At CMSR, we believe that research and communication are not just tools - they are catalysts for social transformation. Every study we conduct and every insight we generate is driven by our commitment to creating a more informed, equitable,and progressive society.',
      buttonText: 'Know more about us',
      buttonLink: '/Who-we-are',
      backgroundImage: 'https://www.york.ac.uk/media/study/courses/undergraduate/philosophy/Philosophy-combined-course-page-new-image.jpg',
      overlay: 'bg-gradient-to-r from-primary/80 to-primary/60',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index) => setCurrentSlide(index)
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-hidden z-0" aria-hidden={false}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            aria-hidden="true"
          >
            <div className={`absolute inset-0 ${slide.overlay}`} />
          </div>

          <div className="relative h-full flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl text-center">
                <div
                  className={`inline-block ${slide.tagColor} text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6`}
                >
                  {slide.tag}
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  {slide.title}
                </h1>

                {slide.vision && slide.mission ? (
                  <div className="space-y-4 mb-8">
                    <p className="text-xl sm:text-2xl text-white/95 font-medium">
                      <span className="font-semibold">Vision:</span> {slide.vision}
                    </p>
                    <p className="text-xl sm:text-2xl text-white/95 font-medium">
                      <span className="font-semibold">Mission:</span> {slide.mission}
                    </p>
                  </div>
                ) : (
                  <p className="text-xl sm:text-2xl md:text-3xl text-white/95 mb-8 font-light">
                    {slide.description}
                  </p>
                )}

                {/* CTA: modest stacking and pointer events enabled */}
                <Link
                  to={slide.buttonLink}
                  // relative z-10 so home overlay can still be higher when needed
                  className="inline-flex items-center space-x-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl relative pointer-events-auto z-10"
                >
                  <span>{slide.buttonText}</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* arrows and dots keep moderate z so overlay can place interactive elements above */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 pointer-events-auto z-10"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 pointer-events-auto z-10"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 pointer-events-auto z-10" role="tablist" aria-label="Slide dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-300 rounded-full focus:outline-none ${
              idx === currentSlide ? 'bg-white w-12 h-2' : 'bg-white/50 w-2 h-2 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 right-8 hidden lg:block animate-bounce z-10" aria-hidden="true">
        <div className="flex flex-col items-center text-white/70">
          <span className="text-xs mb-2">Scroll</span>
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default HeroSlider