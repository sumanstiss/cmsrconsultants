import { useState, useEffect, useRef } from 'react'

const PartnersCarousel = ({ partners }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(partners.length / 4))
    }, 3000)
    return () => clearInterval(interval)
  }, [partners.length])

  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      const scrollAmount = index * (100 / Math.ceil(partners.length / 4))
      scrollContainerRef.current.scrollTo({
        left: (scrollContainerRef.current.scrollWidth / Math.ceil(partners.length / 4)) * index,
        behavior: 'smooth',
      })
    }
    setCurrentIndex(index)
  }

  return (
    <div className="relative w-full">
      {/* Partners Grid */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="flex space-x-6 min-w-max">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 h-36 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center p-4 border border-gray-100"
            >
              {partner.logo ? (
                <>
                  <div className="flex-1 flex items-center justify-center mb-2">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-20 object-contain"
                    />
                  </div>
                  {partner.name && (
                    <div className="text-xs sm:text-sm font-semibold text-gray-700 text-center mt-auto">
                      {partner.name}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center w-full">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {partner.name.charAt(0)}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-700">
                    {partner.name}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {partners.length > 4 && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: Math.ceil(partners.length / 4) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'bg-primary w-8 h-2'
                    : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            )
          )}
        </div>
      )}
    </div>
  )
}

export default PartnersCarousel



