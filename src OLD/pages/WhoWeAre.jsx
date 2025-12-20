const WhoWeAre = () => {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-primary text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
            WHO WE ARE
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            About CMSR Consultants
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fostering Sustainable Partnership through research, communication,
            and capacity building
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              CMSR Consultants is a leading research and communication
              consultancy dedicated to creating positive social impact. We
              combine rigorous research methodologies with innovative
              communication strategies to drive meaningful change.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              With a pan-India presence and a network of 50+ production partners,
              we have successfully delivered projects across 24+ states and
              union territories, engaging over 2.5 lakh individuals and training
              more than 25,000 stakeholders.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Integrity & Excellence
                  </h3>
                  <p className="text-gray-600">
                    We maintain the highest standards in all our work
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Social Equity
                  </h3>
                  <p className="text-gray-600">
                    Committed to creating inclusive and equitable solutions
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Innovation
                  </h3>
                  <p className="text-gray-600">
                    Leveraging cutting-edge methodologies and technologies
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Partnership
                  </h3>
                  <p className="text-gray-600">
                    Building lasting relationships with clients and communities
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">24+</div>
              <div className="text-xl">States & UTs</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">2.5L+</div>
              <div className="text-xl">Individuals engaged</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">25K+</div>
              <div className="text-xl">Stakeholders trained</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhoWeAre

