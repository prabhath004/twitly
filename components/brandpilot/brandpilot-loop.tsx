"use client";

import { motion } from "framer-motion";
import { Globe, Bot, Send, MessageSquare, Check, Database } from "lucide-react";

const steps = [
  {
    icon: Globe,
    title: "Connect Accounts",
    description: "Link X, Reddit, and WhatsApp",
  },
  {
    icon: Database,
    title: "Scrape Brand Website",
    description: "AI learns your brand voice",
  },
  {
    icon: Bot,
    title: "Generate Drafts",
    description: "Create context-aware replies",
  },
  {
    icon: MessageSquare,
    title: "Send to WhatsApp",
    description: "Review before posting",
  },
  {
    icon: Check,
    title: "Approve/Edit/Skip",
    description: "You have full control",
  },
  {
    icon: Send,
    title: "Post & Log",
    description: "Auto-post and track activity",
  },
];

export function BrandPilotLoop() {
  return (
    <section className="py-32 bg-gradient-to-b from-white to-neutral-50" id="how-it-works">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-mono font-bold mb-6 text-neutral-900"
          >
            The BrandPilot Loop
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-neutral-600 font-mono max-w-2xl mx-auto"
          >
            From connection to posting — fully automated with optional human oversight
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Grid layout with better spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center p-8 bg-white border-2 border-neutral-200 rounded-xl hover:border-[#1D9BF0] hover:shadow-xl transition-all duration-300 h-full">
                  <div className="mb-6 rounded-full bg-gradient-to-br from-[#1D9BF0]/10 to-[#1D9BF0]/5 p-5 relative">
                    <step.icon className="h-10 w-10 text-[#1D9BF0]" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#1D9BF0] text-white flex items-center justify-center font-mono font-bold text-sm shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-mono font-bold mb-3 text-neutral-900">{step.title}</h3>
                  <p className="text-sm text-neutral-600 font-mono leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Connecting arrows - horizontal for same row */}
                {index < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#1D9BF0]/40 to-transparent">
                    <svg className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M0 6L8 6M8 6L5 3M8 6L5 9" stroke="#1D9BF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
                
                {/* Vertical arrow from step 1 to step 4 */}
                {index === 0 && (
                  <div className="hidden lg:block absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-[#1D9BF0]/40 to-transparent">
                    <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 0L6 8M6 8L3 5M6 8L9 5" stroke="#1D9BF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
                
                {/* Horizontal arrows for bottom row */}
                {index >= 3 && index < 5 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#1D9BF0]/40 to-transparent">
                    <svg className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M0 6L8 6M8 6L5 3M8 6L5 9" stroke="#1D9BF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
