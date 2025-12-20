const OurThinking = () => {
  const insights = [
    {
      title: 'Research-Driven Approach',
      description:
        'We believe in evidence-based solutions. Every project begins with rigorous research to understand the context, challenges, and opportunities.',
      icon: '📊',
    },
    {
      title: 'Communication for Change',
      description:
        'Effective communication is the bridge between research and impact. We craft compelling narratives that drive action and inspire change.',
      icon: '💬',
    },
    {
      title: 'Capacity Building',
      description:
        'Sustainable change requires empowered communities. We invest in building local capacity to ensure long-term impact beyond project timelines.',
      icon: '🎓',
    },
    {
      title: 'Partnership Model',
      description:
        'We work collaboratively with clients, communities, and partners, fostering relationships built on trust, transparency, and shared values.',
      icon: '🤝',
    },
  ]

  const principles = [
    {
      title: 'Social Equity',
      description:
        'Every solution we design prioritizes inclusivity and addresses systemic barriers to create equitable outcomes.',
    },
    {
      title: 'Innovation',
      description:
        'We continuously explore new methodologies, technologies, and approaches to enhance our impact and effectiveness.',
    },
    {
      title: 'Sustainability',
      description:
        'Our interventions are designed for long-term sustainability, ensuring positive change endures beyond project completion.',
    },
    {
      title: 'Local Context',
      description:
        'We recognize that solutions must be contextual. Our work is deeply rooted in understanding local realities and needs.',
    },
  ]

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-primary text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
            OUR THINKING
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Our Philosophy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles and approaches that guide our work towards creating
            meaningful social impact
          </p>
        </div>

        {/* Core Insights */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Core Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-5xl mb-4">{insight.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {insight.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Guiding Principles */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Guiding Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20"
              >
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {principle.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Approach Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Our Approach</h2>
            <p className="text-xl leading-relaxed mb-8">
              We combine rigorous research methodologies with innovative
              communication strategies and comprehensive capacity building to
              create holistic solutions that drive sustainable social change.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-4xl font-bold mb-2">01</div>
                <div className="text-lg font-semibold mb-2">Research</div>
                <div className="text-white/90">
                  Understanding context and evidence
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">02</div>
                <div className="text-lg font-semibold mb-2">Communicate</div>
                <div className="text-white/90">
                  Crafting compelling narratives
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">03</div>
                <div className="text-lg font-semibold mb-2">Empower</div>
                <div className="text-white/90">
                  Building capacity for lasting impact
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurThinking

