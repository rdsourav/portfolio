"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "PokéAPI",
    category: "Open API",
    description: "The RESTful Pokémon API. A comprehensive database for all things Pokémon.",
    link: "https://pokeapi.co/",
  },
  {
    id: 2,
    title: "Excalidraw",
    category: "Open Source",
    description: "Virtual whiteboard for sketching hand-drawn like diagrams. Fully open source.",
    link: "https://excalidraw.com/",
  },
  {
    id: 3,
    title: "JSONPlaceholder",
    category: "Dev Tool",
    description: "Free fake and reliable API for testing and prototyping user interfaces.",
    link: "https://jsonplaceholder.typicode.com/",
  },
  {
    id: 4,
    title: "Dog API",
    category: "Open API",
    description: "The internet's biggest collection of open source dog pictures.",
    link: "https://dog.ceo/dog-api/",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

export default function Projects() {
  return (
    <section className="relative z-10 w-full min-h-screen bg-[#121212] py-32 px-4 md:px-12 lg:px-24 flex flex-col items-center">
      
      <div className="max-w-7xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter block text-white">
              Selected <span className="text-white/40 italic">Works.</span>
            </h2>
            <div className="w-24 h-1 bg-white/20 mt-6 rounded-full" />
          </div>
          <p className="text-white/50 max-w-sm text-sm">
            A curated selection of my latest projects. Hover to explore project details.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              onClick={() => window.open(project.link, "_blank")}
              className="glass rounded-3xl p-8 lg:p-12 relative overflow-hidden group cursor-pointer transition-all duration-500 hover:bg-white/10 hover:border-white/20"
            >
              {/* Decorative gradient orb on hover */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="flex justify-between items-start mb-24">
                <span className="text-xs font-medium tracking-widest uppercase text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10 group-hover:bg-white/10 group-hover:text-white transition-colors duration-300">
                  {project.category}
                </span>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300 ease-out transform group-hover:scale-110">
                  <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              <div className="relative z-10 text-white">
                <h3 className="text-3xl font-semibold mb-3 tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                  {project.title}
                </h3>
                <p className="text-white/60 font-light leading-relaxed max-w-md group-hover:text-white/80 transition-colors duration-300">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Footer Contact Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-40 text-center flex flex-col items-center"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Let&apos;s collaborate</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white hover:text-white/80 cursor-pointer transition-colors duration-300">
            <a href="mailto:souravrd29@gmail.com">souravrd29@gmail.com</a>
          </h2>
          <div className="mt-8 text-white/60 font-light text-lg tracking-wide hover:text-white transition-colors duration-300">
             +91 8637274563
          </div>
          <div className="mt-12 text-white/30 text-xs flex gap-6">
            <a href="https://instagram.com/caeser_x.0" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-white transition-colors">Instagram</a>
            <span className="cursor-pointer hover:text-white transition-colors">LinkedIn</span>
            <span className="cursor-pointer hover:text-white transition-colors">GitHub</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
