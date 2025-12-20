// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import WhoWeAre from './pages/WhoWeAre'
import WhatWeDo from './pages/WhatWeDo'
import OurThinking from './pages/OurThinking'
import OurTeam from './pages/OurTeam'
import Careers from './pages/Careers'
import Location from './pages/Location'
import Projects from './pages/Projects'           // <-- new page

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/our-thinking" element={<OurThinking />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/location" element={<Location />} />
          <Route path="/projects" element={<Projects />} /> {/* list */}
          <Route path="/projects/:id" element={<Projects />} /> {/* detail handled inside same component */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
