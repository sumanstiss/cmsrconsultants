
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useState, useMemo } from 'react';
import StatsCounter from '@/components/projects/StatsCounter';
import IndiaMapInteractive from '@/components/projects/IndiaMapInteractive';
import ProjectGrid from '@/components/projects/ProjectGrid';
import { Button } from '@/components/ui/button';
import { MapPin, LayoutGrid, RotateCcw } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Data extracted from user image
const THEME_STATS: Record<string, { states: number; projects: number; quantitative: number; qualitative: number }> = {
  'Agriculture & Livelihood': { states: 20, projects: 110, quantitative: 55000, qualitative: 5500 },
  'Health & Nutrition': { states: 12, projects: 75, quantitative: 25000, qualitative: 3000 },
  'Environment & Climate Change': { states: 65, projects: 20, quantitative: 40000, qualitative: 1150 },
  'Education & Skill Development': { states: 55, projects: 10, quantitative: 18000, qualitative: 2000 },
  'WASH': { states: 4, projects: 28, quantitative: 35000, qualitative: 1000 },
  'Sustainable Transportation': { states: 9, projects: 5, quantitative: 16000, qualitative: 600 },
  'Urban Planning & Public Policy': { states: 3, projects: 2, quantitative: 1000, qualitative: 500 },
};

const THEMES = ['All', ...Object.keys(THEME_STATS)];

const STATES = [
  'All',
  'Rajasthan',
  'Maharashtra',
  'Delhi',
  'Bihar',
  'Odisha',
  'Karnataka',
  'Andhra Pradesh',
  'Uttar Pradesh'
];

const Projects = () => {
  const [filterTheme, setFilterTheme] = useState<string>('All');
  const [filterState, setFilterState] = useState<string>('All');

  // Calculate stats based on filterTheme
  const currentStats = useMemo(() => {
    if (filterTheme === 'All') {
      // Aggregate for 'All'
      // Note: States for 'All' is hardcoded to 25+ as per brand, since we can't sum overlaps provided in table.
      // Summing specific metrics:
      const totalProjects = Object.values(THEME_STATS).reduce((acc, curr) => acc + curr.projects, 0);
      const totalQuant = Object.values(THEME_STATS).reduce((acc, curr) => acc + curr.quantitative, 0);
      const totalQual = Object.values(THEME_STATS).reduce((acc, curr) => acc + curr.qualitative, 0);

      return {
        states: 25,
        projects: totalProjects,
        quantitative: totalQuant,
        qualitative: totalQual
      };
    } else {
      return THEME_STATS[filterTheme] || { states: 0, projects: 0, quantitative: 0, qualitative: 0 };
    }
  }, [filterTheme]);

  // Handlers
  const handleStateClick = (stateName: string) => {
    setFilterState(stateName);
    const gridElement = document.getElementById('project-grid');
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setFilterTheme('All');
    setFilterState('All');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans">
      <Navigation />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">
                OUR IMPACT
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary leading-tight">
                Projects
              </h1>
              <p className="text-slate-600 mt-4 text-lg max-w-2xl leading-relaxed">
                Explore our footprint across India. Filter by theme or state to see how we drive change.
              </p>
            </div>

            {/* Main Filters */}
            <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
              <Select value={filterTheme} onValueChange={setFilterTheme}>
                <SelectTrigger className="w-[220px] border-none bg-slate-50 hover:bg-slate-100 rounded-xl focus:ring-0">
                  <div className="flex items-center gap-2 text-slate-600 truncate">
                    <LayoutGrid size={16} className="shrink-0" />
                    <SelectValue placeholder="Theme" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {THEMES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>

              <div className="w-px h-8 bg-slate-200" />

              <Select value={filterState} onValueChange={setFilterState}>
                <SelectTrigger className="w-[160px] border-none bg-slate-50 hover:bg-slate-100 rounded-xl focus:ring-0">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin size={16} />
                    <SelectValue placeholder="State" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>

              <div className="w-px h-8 bg-slate-200" />

              <Button
                variant="ghost"
                size="icon"
                onClick={handleResetFilters}
                className="text-slate-400 hover:text-primary hover:bg-slate-50 rounded-xl"
                title="Reset Filters"
              >
                <RotateCcw size={18} />
              </Button>
            </div>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatsCounter
              value={currentStats.states}
              label="States & UTs"
              suffix={filterTheme === 'All' ? '+' : ''}
            />
            <StatsCounter
              value={currentStats.projects}
              label="Projects Executed"
              suffix="+"
            />
            <StatsCounter
              value={currentStats.quantitative}
              label="Quantitative Reach"
              suffix="+"
            />
            <StatsCounter
              value={currentStats.qualitative}
              label="Qualitative Reach"
              suffix="+"
            />
          </div>

          {/* Map Section */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <MapPin className="text-secondary" size={20} />
                    Project Footprint
                  </h3>
                  {(filterState !== 'All' || filterTheme !== 'All') && (
                    <div className="flex gap-2">
                      {filterTheme !== 'All' && (
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wide">
                          {filterTheme}
                        </span>
                      )}
                      {filterState !== 'All' && (
                        <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase tracking-wide">
                          {filterState}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {/* Map Component */}
                <div className="h-[500px] w-full">
                  <IndiaMapInteractive
                    onStateClick={handleStateClick}
                    className="h-full w-full"
                  />
                </div>
              </div>
            </div>

            {/* Side Panel / Quick Stats / Info */}
            <div className="space-y-6">
              <div className="bg-primary text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-serif font-bold mb-2">Did You Know?</h3>
                  <p className="text-primary-foreground/90 leading-relaxed mb-6">
                    Our interventions in <span className="font-bold text-secondary">Aspirational Districts</span> have improved health outcomes for over 50,000 women and children in the last year alone.
                  </p>
                  <div className="h-1 w-12 bg-secondary rounded-full" />
                </div>
                {/* Decorative circles */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h4 className="font-bold text-slate-700 mb-4">Focus Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {THEMES.filter(t => t !== 'All').map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-sm font-medium rounded-lg border border-slate-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Project List */}
          <div id="project-grid" className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1 bg-secondary rounded-full" />
              <h2 className="text-3xl font-bold text-primary">Featured Projects</h2>
            </div>

            <ProjectGrid filterTheme={filterTheme} filterState={filterState} />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
