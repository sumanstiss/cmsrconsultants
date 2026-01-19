
import { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import indiaTopoJson from '@/assets/india-states.json';
import { Badge } from '@/components/ui/badge';

// Detailed State-wise Theme Data extracted from user image
const STATE_THEME_DATA: Record<string, Record<string, number>> = {
    'Andhra Pradesh': { 'Agriculture & Livelihood': 1, 'Health & Nutrition': 1, 'Education & Skill Development': 1 },
    'Assam': { 'Agriculture & Livelihood': 1, 'Health & Nutrition': 2 },
    'Bihar': { 'Agriculture & Livelihood': 2, 'Health & Nutrition': 1, 'Education & Skill Development': 1 },
    'Chhattisgarh': { 'Agriculture & Livelihood': 6, 'Health & Nutrition': 7, 'Education & Skill Development': 5, 'Environment & Climate Change': 6, 'WASH': 5 },
    'Dadra and Nagar Haveli': { 'Education & Skill Development': 1 }, // Adjusted name for likely map match
    'Delhi': { 'Agriculture & Livelihood': 1, 'Environment & Climate Change': 1, 'WASH': 1, 'Sustainable Transportation': 1, 'Urban Planning & Public Policy': 1 },
    'Gujarat': { 'Agriculture & Livelihood': 1, 'Education & Skill Development': 1, 'Environment & Climate Change': 1 },
    'Haryana': { 'Agriculture & Livelihood': 2, 'Health & Nutrition': 1, 'Education & Skill Development': 1 },
    'Himachal Pradesh': { 'Education & Skill Development': 2, 'WASH': 1 },
    'Jammu and Kashmir': { 'Health & Nutrition': 1 },
    'Jharkhand': { 'Agriculture & Livelihood': 1, 'Environment & Climate Change': 1 },
    'Karnataka': { 'Agriculture & Livelihood': 1, 'Environment & Climate Change': 1, 'WASH': 1, 'Sustainable Transportation': 1, 'Urban Planning & Public Policy': 1 },
    'Kerala': { 'Agriculture & Livelihood': 1 },
    'Madhya Pradesh': { 'Agriculture & Livelihood': 3, 'Health & Nutrition': 5, 'Education & Skill Development': 3, 'WASH': 4 },
    'Maharashtra': { 'Agriculture & Livelihood': 1, 'Health & Nutrition': 1, 'Education & Skill Development': 1, 'Environment & Climate Change': 1, 'WASH': 2, 'Sustainable Transportation': 1 },
    'Meghalaya': { 'Agriculture & Livelihood': 1, 'Health & Nutrition': 1, 'Education & Skill Development': 1, 'Environment & Climate Change': 1, 'WASH': 1 },
    'Odisha': { 'Agriculture & Livelihood': 1, 'Education & Skill Development': 1, 'Environment & Climate Change': 1, 'Urban Planning & Public Policy': 1 },
    'Punjab': { 'Agriculture & Livelihood': 1, 'Health & Nutrition': 1, 'Environment & Climate Change': 1, 'Sustainable Transportation': 1 },
    'Rajasthan': { 'Agriculture & Livelihood': 1, 'Health & Nutrition': 1, 'Sustainable Transportation': 2 },
    'Tamil Nadu': { 'Agriculture & Livelihood': 1, 'Health & Nutrition': 1, 'Education & Skill Development': 1, 'Environment & Climate Change': 1, 'Sustainable Transportation': 2 },
    'Telangana': { 'Agriculture & Livelihood': 1 },
    'Uttar Pradesh': { 'Agriculture & Livelihood': 1, 'Health & Nutrition': 1, 'Education & Skill Development': 1, 'Environment & Climate Change': 1, 'WASH': 2, 'Sustainable Transportation': 1, 'Urban Planning & Public Policy': 2 },
    'Uttarakhand': { 'Health & Nutrition': 1, 'Environment & Climate Change': 1, 'Sustainable Transportation': 1 },
    'West Bengal': { 'Agriculture & Livelihood': 1, 'Environment & Climate Change': 1, 'Sustainable Transportation': 1 },
};

interface IndiaMapInteractiveProps {
    onStateClick?: (stateName: string) => void;
    className?: string;
}

const IndiaMapInteractive = ({ onStateClick, className = '' }: IndiaMapInteractiveProps) => {
    const [hoveredState, setHoveredState] = useState<string | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [activeState, setActiveState] = useState<string | null>(null);

    const colorScale = scaleLinear<string>()
        .domain([0, 10]) // Adjusted domain based on max projects in a state (~30 total, but max per theme is lower)
        .range(['#e2e8f0', '#0f766e']);

    const handleMouseEnter = (geo: any, evt: React.MouseEvent) => {
        const { name } = geo.properties;
        setHoveredState(name);
        // setTooltipPos({ x: evt.clientX, y: evt.clientY }); // Using static box instead
    };

    const handleMouseLeave = () => {
        setHoveredState(null);
    };

    const handleClick = (geo: any) => {
        const { name } = geo.properties;
        setActiveState(name);
        if (onStateClick) {
            onStateClick(name);
        }
    };

    // Get data for the currently hovered or active state
    const displayedState = hoveredState || activeState;
    const displayedData = displayedState ? STATE_THEME_DATA[displayedState] : null;

    // Calculate total for coloring
    const getTotalProjects = (stateName: string) => {
        const data = STATE_THEME_DATA[stateName];
        if (!data) return 0;
        return Object.values(data).reduce((a, b) => a + b, 0);
    };

    return (
        <div className={`relative w-full h-full min-h-[500px] bg-slate-50/50 rounded-3xl border border-slate-100 overflow-hidden ${className}`}>

            {/* Info Box "Inside the Map" */}
            <div className="absolute top-4 right-4 z-20 w-72 pointer-events-none">
                {/* Pointer events none to allow clicking map behind if needed, but box content might need clicks? 
             Actually for a purely informational box overlay, pointer-events-none is fine unless we have buttons.
             Let's keep text selectable? No, just info.
         */}
                <div className={`bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-slate-100 transition-all duration-300 transform ${displayedState && displayedData ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                    {displayedState && displayedData ? (
                        <>
                            <h4 className="text-lg font-serif font-bold text-primary mb-3 pb-2 border-b border-slate-100">
                                {displayedState}
                            </h4>
                            <div className="space-y-2">
                                {Object.entries(displayedData).map(([theme, count]) => (
                                    <div key={theme} className="flex items-center justify-between text-sm">
                                        <span className="text-slate-600 truncate mr-2" title={theme}>{theme}</span>
                                        <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                                            {count}
                                        </Badge>
                                    </div>
                                ))}
                                <div className="pt-2 mt-2 border-t border-slate-100 flex justify-between font-bold text-primary">
                                    <span>Total Projects</span>
                                    <span>{Object.values(displayedData).reduce((a, b) => a + b, 0)}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-slate-400 text-sm italic py-2 text-center">
                            Hover over a state to see detailed project breakdown.
                        </div>
                    )}
                </div>
            </div>

            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 1000,
                    center: [78.9629, 23.5937]
                }}
                className="w-full h-full"
            >
                <ZoomableGroup zoom={1}>
                    <Geographies geography={indiaTopoJson}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const stateName = geo.properties.name;
                                // Fuzzy match or direct match? STATE_THEME_DATA keys should match topojson names
                                // Let's rely on STATE_THEME_DATA matching for now.
                                // Need to handle "Jammu & Kashmir" vs "Jammu and Kashmir"
                                // Map probably has "Jammu and Kashmir"

                                const total = getTotalProjects(stateName);
                                const isActive = activeState === stateName;
                                const isHovered = hoveredState === stateName;

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onMouseEnter={(evt) => handleMouseEnter(geo, evt)}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleClick(geo)}
                                        style={{
                                            default: {
                                                fill: isActive ? '#093C73' : (total > 0 ? colorScale(total) : '#f1f5f9'),
                                                outline: 'none',
                                                stroke: '#ffffff',
                                                strokeWidth: 0.5,
                                                transition: 'all 0.3s ease'
                                            },
                                            hover: {
                                                fill: '#F59E0B',
                                                outline: 'none',
                                                stroke: '#ffffff',
                                                strokeWidth: 1,
                                                cursor: 'pointer'
                                            },
                                            pressed: {
                                                fill: '#093C73',
                                                outline: 'none',
                                            }
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>

            {/* Visual Legend */}
            <div className="absolute bottom-6 left-6 pointer-events-none">
                <div className="bg-white/80 backdrop-blur p-3 rounded-xl shadow-sm border border-slate-100 text-xs">
                    <span className="block mb-2 font-semibold text-slate-500 uppercase tracking-widest text-[10px]">Intensity</span>
                    <div className="flex items-center gap-2">
                        <div className="flex h-2 w-24 rounded-full overflow-hidden">
                            <div className="w-1/3 bg-slate-200"></div>
                            <div className="w-1/3 bg-[#5eead4]"></div>
                            <div className="w-1/3 bg-[#0f766e]"></div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-1 text-[10px] text-slate-400">
                        <span>Low</span>
                        <span>High</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndiaMapInteractive;
