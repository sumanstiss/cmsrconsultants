// WhatWeDo.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* -------------------------
   Constants & sample data
   ------------------------- */
   const CATEGORY_LIST = [
    'Agriculture & Livelihoods',
    'Education & Skill Development',
    'Health & Nutrition',
    'Environment & Climate Change',
    'WASH',
    'Sustainable Transportation',
    'Urban Planning & Public Policy',
  ]
  
  /*
    SAMPLE_PROJECTS: 3 projects per category (21 total).
    Replace images/strings with real content later as needed.
  */
  const SAMPLE_PROJECTS = [
    // Agriculture & Livelihoods (3)
    {
      id: 'agr-1',
      title: 'Climate-Smart Farming Initiative',
      category: 'Agriculture & Livelihoods',
      location: 'Rajasthan, India',
      year: 2023,
      summary:
        'Built farmer capacity for climate-resilient practices, introduced drought-tolerant seeds and market linkages for 2,000 households.',
      results: ['2,000 households reached', 'Yield +18%', 'Market linkages for 600 farmers'],
      images: ['https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&q=80'],
      partners: ['AIF', 'NIUA'],
      budget: 'INR 2.1 Cr',
      duration: '18 months',
      contact: 'gajendra@cmsrconsultants.com',
      fullText:
        'Strengthened climate resilience in smallholder systems through demonstrations, trainings and market facilitation with SHGs and extension staff.',
    },
    {
      id: 'agr-2',
      title: 'Livelihoods Recovery Post-Floods',
      category: 'Agriculture & Livelihoods',
      location: 'Assam, India',
      year: 2022,
      summary:
        'Cash-for-work and input distribution after floods; supported adoption of kitchen gardening and small-scale livestock rearing.',
      results: ['3,500 beneficiaries', '100 demonstration plots'],
      images: ['https://images.unsplash.com/photo-1522527203850-3f80f2b9b6c7?w=1200&q=80'],
      partners: ['CARE'],
      budget: 'INR 1.2 Cr',
      duration: '12 months',
      contact: 'info@cmsrconsultants.com',
      fullText:
        'Rapid livelihoods recovery using community labour, seed/tool kits, and market linkages to restore incomes and food security.',
    },
    {
      id: 'agr-3',
      title: 'Market Linkages for Smallholders',
      category: 'Agriculture & Livelihoods',
      location: 'Madhya Pradesh, India',
      year: 2021,
      summary:
        'Developed aggregation models and buyer engagement to increase farmer incomes for horticulture producers.',
      results: ['800 farmers onboarded', 'Avg. income +22%'],
      images: ['https://images.unsplash.com/photo-1547555993-2a8f1f4d0d35?w=1200&q=80'],
      partners: ['Palladium'],
      budget: 'INR 95 Lakh',
      duration: '14 months',
      contact: 'market@cmsrconsultants.com',
      fullText:
        'Implemented aggregation hubs, quality protocols, and buyer meet events that helped farmers access better value-chains.',
    },
  
    // Education & Skill Development (3)
    {
      id: 'edu-1',
      title: 'Skill-Linked Vocational Training',
      category: 'Education & Skill Development',
      location: 'Uttar Pradesh, India',
      year: 2024,
      summary:
        'Provided market-oriented short courses (digital skills, tailoring) to 1,200 youth with placement support.',
      results: ['1,200 trainees', 'Placement rate 62%'],
      images: ['https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&q=80'],
      partners: ['TATA Trusts'],
      budget: 'INR 85 Lakh',
      duration: '9 months',
      contact: 'training@cmsrconsultants.com',
      fullText:
        'Short vocational courses designed with employers, with internships and post-training support to increase employability.',
    },
    {
      id: 'edu-2',
      title: 'Early Grade Reading Program',
      category: 'Education & Skill Development',
      location: 'Bihar, India',
      year: 2022,
      summary:
        'Classroom coaching and learning materials improved reading outcomes in grades 1–3 across 120 schools.',
      results: ['Reading proficiency +28%', '120 schools engaged'],
      images: ['https://images.unsplash.com/photo-1529070538774-1853cb3265df?w=1200&q=80'],
      partners: ['UNICEF'],
      budget: 'INR 1.1 Cr',
      duration: '12 months',
      contact: 'edu@cmsrconsultants.com',
      fullText:
        'Teacher training, remedial modules and community reading drives led to measurable improvements in foundational literacy.',
    },
    {
      id: 'edu-3',
      title: 'Digital Classroom Pilot',
      category: 'Education & Skill Development',
      location: 'Karnataka, India',
      year: 2023,
      summary:
        'Piloted low-cost digital content and teacher support in remote schools to enhance maths outcomes.',
      results: ['Pilot in 40 schools', 'Teacher satisfaction 78%'],
      images: ['https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80'],
      partners: ['Cornell University'],
      budget: 'INR 48 Lakh',
      duration: '8 months',
      contact: 'digital@cmsrconsultants.com',
      fullText:
        'Combined offline-first digital modules with teacher coaching and community engagement for scalable learning improvements.',
    },
  
    // Health & Nutrition (3)
    {
      id: 'health-1',
      title: 'Community Nutrition & Micronutrients',
      category: 'Health & Nutrition',
      location: 'Bihar, India',
      year: 2021,
      summary:
        'Behavior-change communication and home fortification program reaching pregnant women and infants.',
      results: ['Improved exclusive breastfeeding rates', '2,400 households engaged'],
      images: ['https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&q=80'],
      partners: ['UNICEF'],
      budget: 'INR 65 Lakh',
      duration: '12 months',
      contact: 'health@cmsrconsultants.com',
      fullText:
        'Counselling, distribution of micronutrient supplements and community sessions to improve maternal and child nutrition.',
    },
    {
      id: 'health-2',
      title: 'Mobile Health Camps',
      category: 'Health & Nutrition',
      location: 'Odisha, India',
      year: 2022,
      summary:
        'Mobile camps providing screening, referrals and health education across remote habitations.',
      results: ['6,500 screenings', 'Referral linkage 1,200'],
      images: ['https://images.unsplash.com/photo-1580281657521-5c0b7c2b6b9b?w=1200&q=80'],
      partners: ['CARE'],
      budget: 'INR 72 Lakh',
      duration: '10 months',
      contact: 'mhc@cmsrconsultants.com',
      fullText:
        'Integrated screening and referral model with local facilities strengthened continuity of care for rural populations.',
    },
    {
      id: 'health-3',
      title: 'Adolescent Health & Hygiene',
      category: 'Health & Nutrition',
      location: 'Jharkhand, India',
      year: 2023,
      summary:
        'School-based sessions coupled with community outreach focused on adolescent nutrition and menstrual health.',
      results: ['40 schools reached', 'Peer educator network formed'],
      images: ['https://images.unsplash.com/photo-1526676035374-4b9b1a4b2d6f?w=1200&q=80'],
      partners: ['Save the Children'],
      budget: 'INR 38 Lakh',
      duration: '9 months',
      contact: 'adolescent@cmsrconsultants.com',
      fullText:
        'Peer-led sessions and sanitary product pilots improved knowledge and school attendance among adolescent girls.',
    },
  
    // Environment & Climate Change (3)
    {
      id: 'env-1',
      title: 'Urban Greening & Watershed',
      category: 'Environment & Climate Change',
      location: 'Pune, India',
      year: 2023,
      summary:
        'Green infrastructure framed to mitigate urban heat and improve local watershed management.',
      results: ['5 public spaces greened', 'Community stewardship groups formed'],
      images: ['https://images.unsplash.com/photo-1508780709619-79562169bc64?w=1200&q=80'],
      partners: ['WRI India'],
      budget: 'INR 1.5 Cr',
      duration: '15 months',
      contact: 'env@cmsrconsultants.com',
      fullText:
        'Integrated green corridors, recharge pits and community management to address urban heat and flooding risks.',
    },
    {
      id: 'env-2',
      title: 'Climate Resilience for Coastal Communities',
      category: 'Environment & Climate Change',
      location: 'Goa, India',
      year: 2022,
      summary:
        'Mangrove restoration and local livelihood support to increase coastal resilience.',
      results: ['0.8 km coastline replanted', '200 households supported'],
      images: ['https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=1200&q=80'],
      partners: ['GIZ'],
      budget: 'INR 55 Lakh',
      duration: '12 months',
      contact: 'coast@cmsrconsultants.com',
      fullText:
        'Community-driven restoration plus alternative livelihoods reduced exposure and enhanced local stewardship.',
    },
    {
      id: 'env-3',
      title: 'Renewable Energy Adoption Study',
      category: 'Environment & Climate Change',
      location: 'Tamil Nadu, India',
      year: 2024,
      summary:
        'Assessment and pilot subsidy mechanisms to accelerate household solar adoption in peri-urban areas.',
      results: ['Pilot: 400 installations', 'Feasibility toolkit produced'],
      images: ['https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1200&q=80'],
      partners: ['Deloitte'],
      budget: 'INR 2.8 Cr',
      duration: '18 months',
      contact: 'energy@cmsrconsultants.com',
      fullText:
        'Policy and market research led to a pilot financing mechanism to de-risk household solar investments.',
    },
  
    // WASH (3)
    {
      id: 'wash-1',
      title: 'Community WASH Behavior Change',
      category: 'WASH',
      location: 'Tamil Nadu, India',
      year: 2022,
      summary:
        'IEC campaigns plus school WASH improvements; latrine adoption and handwashing increased across target villages.',
      results: ['10,000 people reached', '10 schools upgraded'],
      images: ['https://images.unsplash.com/photo-1542343638-ec6029b3f9e1?w=1200&q=80'],
      partners: ['CARE'],
      budget: 'INR 1.0 Cr',
      duration: '12 months',
      contact: 'wash@cmsrconsultants.com',
      fullText:
        'Combined hardware upgrades and behaviour-change communication to improve sanitation and hygiene outcomes.',
    },
    {
      id: 'wash-2',
      title: 'School WASH Infrastructure Upgrade',
      category: 'WASH',
      location: 'Karnataka, India',
      year: 2021,
      summary:
        'Upgraded water and sanitation facilities in rural schools with maintenance training for staff.',
      results: ['25 schools upgraded', 'Maintenance committees established'],
      images: ['https://images.unsplash.com/photo-1509395176048-3d2b8d8ff7b2?w=1200&q=80'],
      partners: ['HDFC Bank Parivartan'],
      budget: 'INR 68 Lakh',
      duration: '10 months',
      contact: 'schoolswash@cmsrconsultants.com',
      fullText:
        'Focus on durable infrastructure with local ownership models and routine maintenance protocols.',
    },
    {
      id: 'wash-3',
      title: 'Water Quality Monitoring Pilot',
      category: 'WASH',
      location: 'Uttarakhand, India',
      year: 2023,
      summary:
        'Community-based water testing and dashboard for village-level water quality reporting.',
      results: ['150 water sources tested', 'Dashboard launched'],
      images: ['https://images.unsplash.com/photo-1501000418895-4f6c2f2c3f0f?w=1200&q=80'],
      partners: ['NIUA'],
      budget: 'INR 34 Lakh',
      duration: '8 months',
      contact: 'water@cmsrconsultants.com',
      fullText:
        'Trained local volunteers to conduct testing and to use simple remedial actions where contaminants were found.',
    },
  
    // Sustainable Transportation (3)
    {
      id: 'trans-1',
      title: 'Low-Emission Urban Shuttle Pilot',
      category: 'Sustainable Transportation',
      location: 'Gurugram, India',
      year: 2024,
      summary:
        'Piloted electric shuttle routes with first/last-mile integration and ridership incentives.',
      results: ['Pilot ridership 5,000+', 'Carbon savings estimated'],
      images: ['https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80'],
      partners: ['WRI India'],
      budget: 'INR 2.6 Cr',
      duration: '12 months',
      contact: 'transit@cmsrconsultants.com',
      fullText:
        'Designed route optimization and pricing experiments to encourage modal shift to low-emission shared vehicles.',
    },
    {
      id: 'trans-2',
      title: 'Non-Motorised Transport Network',
      category: 'Sustainable Transportation',
      location: 'Pune, India',
      year: 2022,
      summary:
        'Cycle-lane pilots and pedestrian priority zones to improve safety and promote active transport.',
      results: ['3 km cycle-lanes', 'Local cycling groups formed'],
      images: ['https://images.unsplash.com/photo-1509395176049-4a6c2f2c2d1a?w=1200&q=80'],
      partners: ['TATA Trusts'],
      budget: 'INR 72 Lakh',
      duration: '9 months',
      contact: 'active@cmsrconsultants.com',
      fullText:
        'Combined design interventions with local promotion to demonstrate feasibility of safe walking and cycling networks.',
    },
    {
      id: 'trans-3',
      title: 'EV Charging Feasibility Study',
      category: 'Sustainable Transportation',
      location: 'Hyderabad, India',
      year: 2023,
      summary:
        'Feasibility study and business model design for public EV charging infrastructure in peri-urban zones.',
      results: ['Business model report', '3 pilot sites identified'],
      images: ['https://images.unsplash.com/photo-1511918984145-48de785d4c4b?w=1200&q=80'],
      partners: ['Deloitte'],
      budget: 'INR 45 Lakh',
      duration: '6 months',
      contact: 'ev@cmsrconsultants.com',
      fullText:
        'Market analysis and stakeholder consultations produced a bankable pilot plan for charging infrastructure.',
    },
  
    // Urban Planning & Public Policy (3)
    {
      id: 'urban-1',
      title: 'Participatory Urban Planning Toolkit',
      category: 'Urban Planning & Public Policy',
      location: 'Lucknow, India',
      year: 2023,
      summary:
        'Co-created a planning toolkit with municipal staff and citizen groups to make budgets more inclusive.',
      results: ['Toolkit adopted by 3 wards', '20+ consultations held'],
      images: ['https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80'],
      partners: ['NIUA'],
      budget: 'INR 55 Lakh',
      duration: '10 months',
      contact: 'urban@cmsrconsultants.com',
      fullText:
        'Participatory budgeting and ward-level planning tools increased transparency and citizen participation.',
    },
    {
      id: 'urban-2',
      title: 'Inclusive Public Space Design',
      category: 'Urban Planning & Public Policy',
      location: 'Ahmedabad, India',
      year: 2022,
      summary:
        'Design and pilot of inclusive public spaces prioritizing women, elderly and children.',
      results: ['2 public spaces redesigned', 'User satisfaction +40%'],
      images: ['https://images.unsplash.com/photo-1509395176047-6a66953bd231?w=1200&q=80'],
      partners: ['Palladium'],
      budget: 'INR 78 Lakh',
      duration: '11 months',
      contact: 'publicspace@cmsrconsultants.com',
      fullText:
        'User-centric designs and co-production with communities encouraged shared stewardship of public assets.',
    },
    {
      id: 'urban-3',
      title: 'Urban Policy Review for Service Delivery',
      category: 'Urban Planning & Public Policy',
      location: 'Chennai, India',
      year: 2024,
      summary:
        'Policy review and institutional strengthening to improve urban service delivery in medium-sized cities.',
      results: ['Policy recommendations delivered', 'Capacity building for 40 officials'],
      images: ['https://images.unsplash.com/photo-1509395176048-6a6695a3bd12?w=1200&q=80'],
      partners: ['Cornell University'],
      budget: 'INR 1.2 Cr',
      duration: '14 months',
      contact: 'policy@cmsrconsultants.com',
      fullText:
        'Diagnostic and governance reform roadmap helped cities prioritize investments for equitable service delivery.',
    },
  ]
  
  const SERVICES = [
    {
      id: 's1',
      title: 'Research & Evaluation',
      subtitle: 'Evidence-driven decisions',
      short:
        'Independent & policy research, evaluations, M&E, baselines, feasibility studies and market research.',
      long:
        'We conduct rigorous research and evaluations using mixed methods — from baseline to endline, rapid assessments to complex policy analysis. We design surveys, manage data collection, and deliver actionable recommendations to improve programs and policies.',
      iconPath:
        'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
    {
      id: 's2',
      title: 'Integrated Communications',
      subtitle: 'From concept to impact',
      short:
        'IEC/BCC campaigns, audio-visual production, documentation and strategic storytelling for behaviour change.',
      long:
        'We design multi-channel communication strategies and produce high-quality audio-visual material and IEC content — combining evidence with creative storytelling to influence behaviours at scale.',
      iconPath:
        'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064',
    },
    {
      id: 's3',
      title: 'Training & Capacity Building',
      subtitle: 'Contextual, hands-on learning',
      short:
        'Sector-specific training, stakeholder engagement, and practical workshops for officials, frontline workers, and communities.',
      long:
        'Our capacity building programs are contextual and hands-on — designed with local partners, delivered by senior trainers, and focused on practice, not only theory.',
      iconPath:
        'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    },
    {
      id: 's4',
      title: 'Project Management',
      subtitle: 'Adaptive & accountable delivery',
      short:
        'Project planning, stakeholder coordination, monitoring frameworks and adaptive management.',
      long:
        'Our expertise spans end-to-end project planning, stakeholder coordination, monitoring frameworks, and adaptive management approaches. We combine analytical rigor with on-ground agility to deliver sustainable and scalable impact.',
      iconPath:
        'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
  ]
  
  /* -------------------------
     Component
     ------------------------- */
  const SLIDE_HEIGHT = 240
  const VIEWPORT_HEIGHT = Math.round(SLIDE_HEIGHT * 1.5)
  
  const WhatWeDo = () => {
    // Projects / filters
    const [activeCategory, setActiveCategory] = useState(CATEGORY_LIST[0])
    const [projects] = useState(SAMPLE_PROJECTS)
    const filtered = projects.filter((p) => p.category === activeCategory)
  
    // Services slider state
    const sliderRef = useRef(null)
    const [activeService, setActiveService] = useState(SERVICES[0].id)
    const [selectedService, setSelectedService] = useState(SERVICES[0]) // show details banner
  
    // Projects slider state
    const [index, setIndex] = useState(0)
    const viewportRef = useRef(null)
    const isUserScrollingRef = useRef(false)
    const scrollTimeoutRef = useRef(null)
  
    // Project details
    const [selectedProject, setSelectedProject] = useState(null)
    const detailsRef = useRef(null)
  
    /* --------- SERVICE BANNER: auto-center + scale center card --------- */
    const focusService = (id, opts = { smooth: true }) => {
      const el = sliderRef.current
      if (!el) return
      const card = el.querySelector(`[data-service-id="${id}"]`)
      if (!card) return
      // center the card
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const targetScroll = Math.max(0, cardCenter - el.clientWidth / 2)
      el.scrollTo({ left: targetScroll, behavior: opts.smooth ? 'smooth' : 'auto' })
      setActiveService(id)
      const svc = SERVICES.find((s) => s.id === id)
      if (svc) setSelectedService(svc)
    }
  
    // center active service on mount and on resize
    useEffect(() => {
      const centerActive = (smooth = true) => {
        focusService(activeService, { smooth })
      }
      centerActive(false)
      const onResize = () => centerActive(true)
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // run once on mount
  
    // update activeService based on scroll center
    useEffect(() => {
      const el = sliderRef.current
      if (!el) return
      let raf = null
      const onScroll = () => {
        if (raf) cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          const cards = Array.from(el.querySelectorAll('[data-service-id]'))
          const center = el.scrollLeft + el.clientWidth / 2
          let best = null
          let bestDist = Infinity
          cards.forEach((c) => {
            const cCenter = c.offsetLeft + c.offsetWidth / 2
            const dist = Math.abs(cCenter - center)
            if (dist < bestDist) {
              bestDist = dist
              best = c
            }
          })
          if (best) {
            const id = best.getAttribute('data-service-id')
            setActiveService((prev) => {
              if (prev !== id) {
                const svc = SERVICES.find((s) => s.id === id)
                if (svc) setSelectedService(svc)
                return id
              }
              return prev
            })
          }
        })
      }
      el.addEventListener('scroll', onScroll, { passive: true })
      return () => {
        el.removeEventListener('scroll', onScroll)
        if (raf) cancelAnimationFrame(raf)
      }
    }, [])
  
    /* ----------------- Projects slider behavior (unchanged) ----------------- */
    useEffect(() => {
      setIndex(0)
      if (viewportRef.current) viewportRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      setSelectedProject(null)
    }, [activeCategory])
  
    useEffect(() => {
      const vp = viewportRef.current
      if (!vp) return
      const targetTop = index * SLIDE_HEIGHT
      if (!isUserScrollingRef.current) vp.scrollTo({ top: targetTop, behavior: 'smooth' })
    }, [index])
  
    useEffect(() => {
      const vp = viewportRef.current
      if (!vp) return
      const onScroll = () => {
        isUserScrollingRef.current = true
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
        const scrollTop = vp.scrollTop
        const approx = Math.round(scrollTop / SLIDE_HEIGHT)
        const bounded = Math.max(0, Math.min(approx, Math.max(0, filtered.length - 1)))
        setIndex(bounded)
        scrollTimeoutRef.current = setTimeout(() => {
          isUserScrollingRef.current = false
        }, 120)
      }
      vp.addEventListener('scroll', onScroll, { passive: true })
      return () => {
        vp.removeEventListener('scroll', onScroll)
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      }
    }, [filtered.length])
  
    useEffect(() => {
      const onKey = (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setIndex((i) => Math.min(i + 1, Math.max(0, filtered.length - 1)))
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          setIndex((i) => Math.max(0, i - 1))
        }
      }
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }, [filtered.length])
  
    const goNext = () => setIndex((i) => Math.min(i + 1, Math.max(0, filtered.length - 1)))
    const goPrev = () => setIndex((i) => Math.max(0, i - 1))
  
    const onSelectProject = (project) => {
      setSelectedProject(project)
      setTimeout(() => {
        if (detailsRef.current) {
          detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 120)
    }
  
    /* ----------------- Small subcomponents ----------------- */
    const ServiceCard = ({ s }) => {
      const isActive = activeService === s.id
      return (
        <button
          data-service-id={s.id}
          data-interactive="true"
          onClick={() => focusService(s.id)}
          className={`flex-none w-64 md:w-72 lg:w-80 p-4 mr-4 rounded-xl border transition-transform duration-300 transform ${
            isActive ? 'scale-105 shadow-2xl bg-primary text-white border-transparent' : 'scale-100 bg-white text-gray-800 border'
          }`}
          aria-pressed={isActive}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-primary/10'}`}>
              <svg className={`w-5 h-5 ${isActive ? 'text-white' : 'text-primary'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d={s.iconPath} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-sm font-semibold">{s.title}</div>
          </div>
  
          <div className="text-sm mb-3">{s.subtitle}</div>
          <div className="text-xs text-gray-400 line-clamp-3">{s.short}</div>
        </button>
      )
    }
  
    const ProjectCard = ({ project, onClick }) => (
      <div
        className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row h-full cursor-pointer"
        onClick={() => onClick(project)}
        data-interactive="true"
      >
        <div className="md:w-1/3 h-full overflow-hidden">
          <img src={project.images?.[0] || ''} alt={project.title} className="object-cover w-full h-full" />
        </div>
  
        <div className="p-6 md:w-2/3 flex-1 flex flex-col">
          <div className="text-sm text-primary font-semibold mb-2">{project.category}</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
          <div className="text-sm text-gray-600 mb-4">
            <span className="font-medium">{project.location}</span> · {project.year}
          </div>
          <p className="text-gray-700 mb-4 flex-1">{project.summary}</p>
  
          <ul className="text-sm text-gray-700 mb-4 space-y-2">
            {project.results?.map((r, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full mt-2" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
  
          <div className="mt-auto flex items-center justify-between">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onClick(project)
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
              data-interactive="true"
            >
              View Details
            </button>
  
            <Link to={`/projects/${project.id}`} onClick={(e) => e.stopPropagation()} className="text-sm text-gray-500" data-interactive="true">
              Case study · {project.year}
            </Link>
          </div>
        </div>
      </div>
    )
  
    const ProjectDetails = ({ project, onClose }) => {
      const [imgIndex, setImgIndex] = useState(0)
      if (!project) return null
      const images = project.images || []
  
      return (
        <div ref={detailsRef} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-8 transition-all duration-300">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="text-sm text-primary font-semibold mb-2">PROJECT DETAILS</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
              <div className="text-sm text-gray-600 mb-4">
                <span className="font-medium">{project.location}</span> · {project.year} · {project.duration || '—'}
              </div>
            </div>
  
            <div className="flex-shrink-0 text-right">
              <button onClick={onClose} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200" data-interactive="true">
                Close
              </button>
            </div>
          </div>
  
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-gray-50 rounded-lg overflow-hidden relative">
                {images.length ? (
                  <>
                    <img src={images[imgIndex]} alt={`${project.title} ${imgIndex + 1}`} className="w-full h-64 object-cover rounded-lg" />
                    {images.length > 1 && (
                      <>
                        <button onClick={() => setImgIndex((i) => (i - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center" data-interactive="true" aria-label="Previous image">
                          ‹
                        </button>
                        <button onClick={() => setImgIndex((i) => (i + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center" data-interactive="true" aria-label="Next image">
                          ›
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-64 flex items-center justify-center text-gray-400">No image</div>
                )}
              </div>
  
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Overview</h4>
                <p className="text-gray-700 leading-relaxed">{project.fullText || project.summary}</p>
  
                <div className="mt-4">
                  <h5 className="text-sm font-semibold text-gray-800 mb-2">Results</h5>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {project.results?.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
  
            <aside className="bg-primary/5 rounded-lg p-4">
              <div className="text-sm font-semibold text-primary mb-3">Project facts</div>
              <dl className="text-sm text-gray-700 space-y-2">
                <div>
                  <dt className="font-medium">Partners</dt>
                  <dd>{(project.partners || []).join(', ') || '—'}</dd>
                </div>
                <div>
                  <dt className="font-medium">Budget</dt>
                  <dd>{project.budget || '—'}</dd>
                </div>
                <div>
                  <dt className="font-medium">Duration</dt>
                  <dd>{project.duration || '—'}</dd>
                </div>
                <div>
                  <dt className="font-medium">Contact</dt>
                  <dd>{project.contact || '—'}</dd>
                </div>
              </dl>
  
              <div className="mt-4 flex flex-col gap-2">
                <Link to={`/projects/${project.id}`} data-interactive="true" className="px-3 py-2 bg-primary text-white rounded-lg text-sm text-center">
                  Full Case Study
                </Link>
                <button onClick={onClose} data-interactive="true" className="px-3 py-2 border rounded-lg text-sm bg-white">
                  Back to projects
                </button>
              </div>
            </aside>
          </div>
        </div>
      )
    }
  
    return (
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-primary text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">WHAT WE DO</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">Our Services</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">End-to-end solutions from research to communication and training</p>
          </div>
  
          {/* Services banner */}
          <div className="mb-4">
            <div className="relative">
              <button
                data-interactive="true"
                onClick={() => {
                  if (!sliderRef.current) return
                  const step = Math.round(sliderRef.current.clientWidth * 0.6)
                  sliderRef.current.scrollBy({ left: -step, behavior: 'smooth' })
                }}
                aria-label="Scroll services left"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
  
              <div
                ref={sliderRef}
                className="overflow-x-auto scroll-smooth no-scrollbar py-3"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  scrollSnapType: 'x mandatory',
                  display: 'flex',
                  alignItems: 'stretch',
                  paddingLeft: '56px',
                  paddingRight: '56px',
                }}
              >
                <div className="flex items-stretch">
                  {SERVICES.map((s) => (
                    <div key={s.id} style={{ scrollSnapAlign: 'center' }}>
                      <ServiceCard s={s} />
                    </div>
                  ))}
                </div>
              </div>
  
              <button
                data-interactive="true"
                onClick={() => {
                  if (!sliderRef.current) return
                  const step = Math.round(sliderRef.current.clientWidth * 0.6)
                  sliderRef.current.scrollBy({ left: step, behavior: 'smooth' })
                }}
                aria-label="Scroll services right"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
  
            {/* active label */}
            <div className="mt-3 flex items-center justify-between gap-4">
              <div className="text-sm text-gray-600">Selected: <span className="font-semibold text-gray-800">{SERVICES.find(s => s.id === activeService)?.title}</span></div>
              <div className="text-xs text-gray-400">Drag, scroll or use arrows to browse services</div>
            </div>
          </div>
  
          {/* Service details banner (appears when a service clicked / active) */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-primary/10">
                    <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d={selectedService.iconPath} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
  
                  <div>
                    <div className="text-xs font-semibold text-primary mb-1">SERVICE</div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedService.title}</h3>
                    <div className="text-sm text-gray-600 mt-1">{selectedService.subtitle}</div>
                  </div>
                </div>
  
                <div className="flex-1 text-gray-700 md:pl-8">
                  <p>{selectedService.long}</p>
                </div>
  
                <div className="flex-shrink-0">
                  <button
                    data-interactive="true"
                    onClick={() => {
                      window.location.href = '/what-we-do'
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-lg"
                  >
                    Explore this service
                  </button>
                </div>
              </div>
            </div>
          </div>
  
          {/* Thematic Expertise and Projects box (kept) */}
          <div className="bg-gray-50 rounded-2xl p-12 mb-8">
            <div className="text-center mb-8">
              <div className="inline-block bg-primary text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">THEMATIC EXPERTISE</div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Where we deliver</h2>
            </div>
  
            <div className="flex flex-wrap justify-center gap-4 text-lg text-gray-700 mb-6">
              {CATEGORY_LIST.map((cat) => (
                <button
                  key={cat}
                  data-interactive="true"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${activeCategory === cat ? 'bg-primary text-white shadow' : 'bg-white text-gray-700 border'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
  
            <div className="max-w-5xl mx-auto">
              {/* Projects box */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="text-sm text-primary font-semibold mb-2">PROJECTS</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{activeCategory} — Projects</h3>
                    <p className="text-gray-600 mb-4">Browse project case studies and summaries for {activeCategory}. Use the arrows, dots or the scrollbar to navigate.</p>
  
                    {/* scrollable viewport (1.5 slides visible) */}
                    <div className="relative">
                      <div
                        ref={viewportRef}
                        role="list"
                        aria-live="polite"
                        className="overflow-y-auto rounded-lg"
                        style={{
                          height: `${VIEWPORT_HEIGHT}px`,
                          scrollSnapType: 'y mandatory',
                        }}
                      >
                        <div style={{ position: 'relative' }}>
                          {filtered.length === 0 ? (
                            <div style={{ height: `${SLIDE_HEIGHT}px` }} className="flex items-center justify-center text-gray-500">No projects available for this category.</div>
                          ) : (
                            filtered.map((project) => (
                              <div
                                key={project.id}
                                role="listitem"
                                style={{
                                  height: `${SLIDE_HEIGHT}px`,
                                  scrollSnapAlign: 'start',
                                  padding: '8px 0',
                                }}
                              >
                                <div className="h-full px-2">
                                  <ProjectCard project={project} onClick={onSelectProject} />
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
  
                      {/* project arrows */}
                      <div className="absolute right-4 top-2/3 -translate-y-1/2 flex flex-col gap-3">
                        <button data-interactive="true" onClick={goPrev} disabled={index === 0} className={`w-10 h-10 rounded-full shadow flex items-center justify-center bg-white ${index === 0 ? 'opacity-40 cursor-not-allowed' : ''}`} aria-label="Previous project">
                          <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
                        </button>
                        <button data-interactive="true" onClick={goNext} disabled={index >= Math.max(0, filtered.length - 1)} className={`w-10 h-10 rounded-full shadow flex items-center justify-center bg-white ${index >= Math.max(0, filtered.length - 1) ? 'opacity-40 cursor-not-allowed' : ''}`} aria-label="Next project">
                          <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                      </div>
  
                      {/* dots */}
                      <div className="mt-4 flex items-center justify-center gap-3">
                        {filtered.map((_, i) => (
                          <button key={i} data-interactive="true" onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full ${i === index ? 'bg-primary' : 'bg-gray-300'}`} aria-label={`Go to project ${i + 1}`} />
                        ))}
                      </div>
                    </div>
                  </div>
  
                  {/* Right panel */}
                  <aside className="w-80 hidden md:block">
                    <div className="bg-primary/5 rounded-lg p-4">
                      <div className="text-sm font-semibold text-primary mb-3">Quick filters</div>
                      <div className="text-gray-700 text-sm">
                        <div className="mb-3"><strong>{filtered.length}</strong> project(s)</div>
                        <div className="mb-2 text-xs text-gray-500">Tip: Use Up / Down arrow keys to navigate, or scroll the box.</div>
  
                        <div className="mt-4">
                          <Link to="/projects" data-interactive="true" className="inline-block px-3 py-2 bg-primary text-white rounded-lg text-sm">All projects</Link>
                        </div>
                      </div>
                    </div>
  
                    <div className="mt-6">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Recent projects</div>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {projects.slice(0, 3).map((p) => (
                          <li key={p.id} className="flex items-center gap-3">
                            <img src={p.images?.[0]} alt="" className="w-12 h-8 object-cover rounded" />
                            <div>
                              <div className="font-medium text-gray-800">{p.title}</div>
                              <div className="text-xs text-gray-500">{p.year}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </aside>
                </div>
              </div>
  
              {/* Project Details box */}
              <div className="mt-6">
                {selectedProject ? (
                  <ProjectDetails project={selectedProject} onClose={() => { setSelectedProject(null); if (viewportRef.current) viewportRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) }} />
                ) : (
                  <div className="bg-white rounded-2xl shadow border-dashed border-2 border-gray-100 p-6 text-center text-gray-500">
                    Click a project to see full details here.
                  </div>
                )}
              </div>
            </div>
          </div>
  
          {/* CTA */}
          <div className="mt-12 text-center">
            <Link to="/contact" className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-primary text-white font-semibold" data-interactive="true">
              Work with us
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  export default WhatWeDo