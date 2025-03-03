import React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MandateAgentDiagram } from "@/components/diagrams/MandateAgentDiagram";
import { ContinuousImprovementDiagram } from "@/components/diagrams/ContinuousImprovementDiagram";
import { MemoryLayerDiagram } from "@/components/diagrams/MemoryLayerDiagram";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border py-4 px-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-semibold text-sm text-primary-foreground">M</span>
              </div>
              <h1 className="text-xl font-medium">Mandate</h1>
            </Link>
          </div>
          
          <Navbar />
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
              <span className="text-sm font-medium">JS</span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow p-6 md:p-8 max-w-[1200px] mx-auto w-full">
        <div className="space-y-12">
          <section className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About Mandate</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Mandate is a powerful AI-driven platform designed to transform your productivity and decision-making.
            </p>
          </section>
          
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 mt-12">
            {/* Infographic 1: AI Agents - Now with Flow Diagram */}
            <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-xl font-semibold mb-4 text-center">Powerful AI Agents</h3>
              <div className="mb-6">
                <MandateAgentDiagram />
              </div>
              <p className="text-muted-foreground text-center">
                Each suggestion is powered by an AI agent called a "Mandate." These agents leverage LLM technology with access to multiple architectural components including tool use, computer use, and knowledge bases.
              </p>
            </div>
            
            {/* Infographic 2: Continuous Improvement - Now with Flow Diagram */}
            <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-xl font-semibold mb-4 text-center">Continuous Improvement</h3>
              <div className="mb-6">
                <ContinuousImprovementDiagram />
              </div>
              <p className="text-muted-foreground text-center">
                These agents continuously improve their recommendations as you interact with them, learning from your preferences and behaviors to deliver increasingly relevant suggestions.
              </p>
            </div>
            
            {/* Infographic 3: Memory Layer - Now with Flow Diagram */}
            <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-xl font-semibold mb-4 text-center">Collaborative Memory</h3>
              <div className="mb-6">
                <MemoryLayerDiagram />
              </div>
              <p className="text-muted-foreground text-center">
                Agents interact with each other through a shared memory layer, improving collective intelligence and enhancing all recommendations across the platform.
              </p>
            </div>
          </div>
          
          <section className="mt-16 bg-card p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">How Mandate Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium mb-4">Personalized Intelligence</h3>
                <p className="text-muted-foreground mb-4">
                  Mandate uses advanced AI to understand your unique workflow, preferences, and goals.
                  As you interact with the platform, our AI agents learn and adapt to provide increasingly
                  relevant and timely suggestions.
                </p>
                <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                  <li>Contextual understanding of your needs</li>
                  <li>Adaptive learning from your interactions</li>
                  <li>Proactive suggestions based on patterns</li>
                </ul>
              </div>
              <div>
                <div className="w-full aspect-video overflow-hidden rounded-lg bg-secondary flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
                    alt="Mandate Intelligence" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="border-t border-border py-4 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Mandate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
