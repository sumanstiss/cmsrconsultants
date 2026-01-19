
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Dummy project data
export const PROJECTS_DATA = [
    {
        id: 1,
        title: 'Women Entrepreneurship Development',
        theme: 'Livelihood',
        state: 'Rajasthan',
        description: 'Empowering rural women through skill development and market linkages.',
        impact: '2,500+ women trained',
        image: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&q=80',
        tags: ['Skill Development', 'Rural', 'Women']
    },
    {
        id: 2,
        title: 'Sustainable Agriculture Initiative',
        theme: 'Agriculture',
        state: 'Maharashtra',
        description: 'Promoting organic farming practices and water conservation techniques.',
        impact: '500+ acres converted to organic',
        image: 'https://images.unsplash.com/photo-1625246333195-bf7f941f173d?auto=format&fit=crop&q=80',
        tags: ['Farming', 'Sustainability', 'Water']
    },
    {
        id: 3,
        title: 'Digital Literacy for Youth',
        theme: 'Education',
        state: 'Delhi',
        description: 'Bridging the digital divide by providing computer education to slum children.',
        impact: '10,000+ students certified',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80',
        tags: ['Education', 'Digital', 'Youth']
    },
    {
        id: 4,
        title: 'Clean Water Access Program',
        theme: 'WASH',
        state: 'Bihar',
        description: 'Installing community water filters and conducting sanitation workshops.',
        impact: '50 villages covered',
        image: 'https://images.unsplash.com/photo-1536094916369-0130db18af24?auto=format&fit=crop&q=80',
        tags: ['Water', 'Health', 'Sanitation']
    },
    {
        id: 5,
        title: 'Rural Healthcare Network',
        theme: 'Health',
        state: 'Odisha',
        description: 'Mobile medical units providing primary healthcare to remote tribal areas.',
        impact: '15,000+ patients treated',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80',
        tags: ['Health', 'Tribal', 'Access']
    },
    {
        id: 6,
        title: 'Renewable Energy Adoption',
        theme: 'Environment',
        state: 'Karnataka',
        description: 'Facilitating solar power adoption in rural schools and health centers.',
        impact: '1MW+ capacity installed',
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80',
        tags: ['Solar', 'Energy', 'Green']
    },
];

interface ProjectGridProps {
    filterTheme: string | null;
    filterState: string | null;
}

const ProjectGrid = ({ filterTheme, filterState }: ProjectGridProps) => {
    const filteredProjects = PROJECTS_DATA.filter(project => {
        if (filterTheme && filterTheme !== 'All' && project.theme !== filterTheme) return false;
        if (filterState && filterState !== 'All' && project.state !== filterState) return false;
        return true;
    });

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
                <Dialog key={project.id}>
                    <DialogTrigger asChild>
                        <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute top-4 left-4">
                                    <Badge variant="secondary" className="backdrop-blur-md bg-white/90 text-primary hover:bg-white shadow-sm">
                                        {project.theme}
                                    </Badge>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold font-serif text-primary group-hover:text-secondary transition-colors line-clamp-2">
                                        {project.title}
                                    </h3>
                                </div>

                                <p className="text-slate-600 mb-6 text-sm line-clamp-3 flex-grow">
                                    {project.description}
                                </p>

                                <div className="border-t border-slate-100 pt-4 mt-auto">
                                    <div className="flex items-center justify-between text-sm font-medium text-slate-500">
                                        <span>{project.state}</span>
                                        <span className="flex items-center gap-1 text-secondary group-hover:translate-x-1 transition-transform">
                                            View Details <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl rounded-3xl overflow-hidden p-0 border-none bg-white/95 backdrop-blur-xl">
                        <div className="grid md:grid-cols-2">
                            <div className="relative h-64 md:h-full">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
                                    <div className="text-white">
                                        <div className="flex gap-2 mb-2">
                                            <Badge className="bg-secondary text-white border-none">{project.theme}</Badge>
                                            <Badge variant="outline" className="text-white border-white/50">{project.state}</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col justify-center">
                                <DialogHeader className="mb-6">
                                    <DialogTitle className="text-3xl font-serif font-bold text-primary mb-2">
                                        {project.title}
                                    </DialogTitle>
                                </DialogHeader>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-2">Description</h4>
                                        <p className="text-slate-600 leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-2">Key Impact</h4>
                                        <div className="bg-secondary/5 p-4 rounded-xl border border-secondary/10">
                                            <p className="text-lg font-bold text-secondary">
                                                {project.impact}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-2">Tags</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            ))}
        </div>
    );
};

export default ProjectGrid;
