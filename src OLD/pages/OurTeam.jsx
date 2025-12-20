const OurTeam = () => {
  const teamMembers = [
    {
      name: 'Leadership Team',
      role: 'Strategic Direction',
      description:
        'Our leadership team brings decades of combined experience in research, communication, and social development.',
    },
    {
      name: 'Research Team',
      role: 'Evidence Generation',
      description:
        'A diverse team of researchers, evaluators, and analysts committed to generating high-quality evidence.',
    },
    {
      name: 'Communication Team',
      role: 'Storytelling & Production',
      description:
        'Creative professionals who transform research into compelling narratives and impactful communications.',
    },
    {
      name: 'Training Team',
      role: 'Capacity Building',
      description:
        'Expert trainers and facilitators who design and deliver contextual, hands-on learning experiences.',
    },
  ]

  const values = [
    'Diversity & Inclusion',
    'Collaboration',
    'Excellence',
    'Innovation',
    'Integrity',
    'Impact-Driven',
  ]

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-primary text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
            OUR TEAM
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A diverse group of professionals united by a shared commitment to
            creating positive social impact
          </p>
        </div>

        {/* Team Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {member.name}
              </h3>
              <div className="text-primary font-semibold mb-4">
                {member.role}
              </div>
              <p className="text-gray-700 leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>

        {/* Team Values */}
        <div className="bg-gray-50 rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What Unites Us
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-primary font-semibold">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Us CTA */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Team</h2>
          <p className="text-xl mb-8 text-white/90">
            We're always looking for passionate individuals who share our
            commitment to creating positive social change.
          </p>
          <a
            href="/careers"
            className="inline-flex items-center space-x-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
          >
            <span>View Open Positions</span>
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default OurTeam

