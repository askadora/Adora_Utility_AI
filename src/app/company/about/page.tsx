'use client';

import React, { useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import StoryAccordion from './StoryAccordion';
import TeamAccordion from './TeamAccordion';
import AdvisorsAccordion from './AdvisorsAccordion';
import PartnersAccordion from './PartnersAccordion';
import { useSidebar } from '@/context/SidebarContext';

// Define types for modal content
type ModalType = 'kyle' | 'kevin' | 'chittal' | 'sridurga' | 'sai' | 'anthony' | 'jacob' | 
                 'naomi' | 'karina' | 'sharad' | 'antonio' | 'klyne' | 'kathi' | 'mercedes' | 'shakeel' |
                 'techgenies' | 'magical' | 'growit' | 'hexa';

export default function AboutPage() {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const closeModal = () => setActiveModal(null);
  const closeApplicationForm = () => setShowApplicationForm(false);

  const handleApplicationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const profile = formData.get('profile');
    const email = formData.get('email');
    const phone = formData.get('phone');
    
    const emailBody = `Name: ${name}%0D%0ALinkedIn/GitHub Profile: ${profile}%0D%0AEmail: ${email}%0D%0APhone: ${phone}`;
    const subject = 'Job Application - Adora AI';
    
    window.location.href = `mailto:hello@adorahq.com?subject=${subject}&body=${emailBody}`;
    setShowApplicationForm(false);
  };

  // Modal content data
  const modalData = {
    kyle: {
      name: 'Kyle Thomas',
      title: 'Founder',
      video: 'https://www.youtube.com/embed/tzsaa5kd-DY?start=4',
      image: '/company/about/KyleProfileSmall.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/kyleconnect',
        instagram: 'https://instagram.com/kyleconnect',
        github: 'https://github.com/kyleconnect'
      },
      bio: {
        intro: "I love being the founder of Adora AI. It's a privilege to be responsible for a next-gen AI-OS. Designing something that can help organizations in a way that won't compromise on data sovereignty or speed is a wonderful challenge. Playing with multi-model orchestration, symbolic-entropy encryption, and agentic workflows to give enterprises super-powers without handing their IP to a single vendor is very satisfying.",
        motivations: [
          "Frontier AI design — marrying UX clarity with model-level innovation is quite fun",
          "Privacy-by-design security — Building on-device, NFC/NFMI-ready next-gen encryption is about as brain teasing as it gets",
          "Brand-first growth — story-driven attraction brings me back to my days around the camp fire",
          "Regenerative impact — using Adora to Do Good in the world is the ultimate driver"
        ],
        background: "Marketing mad scientist since age 13, later earning my Eagle Scout rank, and yes— even as a survivor of an 86-foot rock-climbing fall has all taught me urgency, resilience, and empathy in equal measure. I've operated everywhere from bootstrapped scrums to PE-backed scale-ups, raising capital, shipping product, and mentoring founders along the way.",
        thesis: "Great tech should narrow divides, not widen them. Bring Humans closer to humanity, not further away, and ultimately Do Good in the world. My north star is building systems that reward generosity, protect privacy, and invite everyone to the table.",
        cta: "If you want to partner, work here at Adora AI, Invest, or even if you have an awesome idea about how we can improve then what are you waiting for? Send me a message, email me, let's get connected!"
      }
    },
    kevin: {
      name: 'Kevin Bultongez',
      title: 'Head Architect',
      bio: {
        intro: "As Head Architect at Adora AI, I lead the technical vision and architecture decisions that power our next-generation AI platform. My focus is on building scalable, secure, and innovative systems that can handle the complex demands of enterprise AI workloads.",
        motivations: [
          "System architecture design — Creating robust, scalable infrastructure is my passion",
          "Technical leadership — Mentoring teams and driving technical excellence",
          "Innovation in AI — Pushing the boundaries of what's possible with AI systems",
          "Enterprise solutions — Building technology that solves real business problems"
        ],
        background: "With over a decade of experience in software architecture and system design, I've worked across various industries from fintech to healthcare. My expertise spans cloud infrastructure, microservices, and AI/ML system architecture.",
        thesis: "Great architecture is invisible to users but enables everything they love about a product. My goal is to build systems that are not just functional, but elegant, maintainable, and future-proof."
      }
    },
    chittal: {
      name: 'Chittal Karuppiah',
      title: 'AI/ML Engineer',
      bio: {
        intro: "As an AI/ML Engineer at Adora AI, I work on developing and optimizing machine learning models that power our intelligent platform. My focus is on creating efficient, accurate, and scalable AI solutions.",
        motivations: [
          "Machine learning innovation — Developing cutting-edge ML models and algorithms",
          "Model optimization — Making AI systems faster and more efficient",
          "Data science — Extracting insights from complex datasets",
          "AI research — Contributing to the advancement of artificial intelligence"
        ],
        background: "I bring expertise in deep learning, natural language processing, and computer vision. My experience includes working with large-scale ML systems and deploying models in production environments.",
        thesis: "AI should augment human intelligence, not replace it. I believe in building AI systems that empower people to make better decisions and achieve more than they could alone."
      }
    },
    sridurga: {
      name: 'Sridurga Linga',
      title: 'AI/ML Engineer',
      bio: {
        intro: "I'm passionate about developing AI solutions that make a real difference in how businesses operate. At Adora AI, I focus on building robust machine learning pipelines and ensuring our AI models perform reliably at scale.",
        motivations: [
          "AI pipeline development — Building end-to-end ML systems",
          "Model reliability — Ensuring consistent AI performance",
          "Data engineering — Creating efficient data processing workflows",
          "Applied research — Turning AI research into practical solutions"
        ],
        background: "My background spans machine learning engineering, data science, and software development. I have experience with various ML frameworks and cloud platforms, specializing in production ML systems.",
        thesis: "The best AI is the AI that works seamlessly in the background, making complex tasks simple and empowering users to focus on what matters most."
      }
    },
    sai: {
      name: 'Sai Akhil Sakhamuri',
      title: 'AI/ML Engineer',
      bio: {
        intro: "At Adora AI, I contribute to developing intelligent systems that can understand and process complex business data. My work focuses on natural language processing and creating AI models that can communicate effectively with users.",
        motivations: [
          "Natural language processing — Making AI understand human communication",
          "Model training — Developing and fine-tuning AI models",
          "Performance optimization — Making AI systems faster and more accurate",
          "User experience — Ensuring AI interactions feel natural and helpful"
        ],
        background: "I have a strong foundation in computer science and machine learning, with particular expertise in NLP and conversational AI. I enjoy working on problems that require both technical depth and creative thinking.",
        thesis: "AI should feel like a natural extension of human thought processes, helping us process information and make decisions more effectively."
      }
    },
    anthony: {
      name: 'Anthony Porter',
      title: 'Corporate Relationships',
      bio: {
        intro: "I lead corporate relationship development at Adora AI, focusing on building strategic partnerships and fostering connections that drive mutual growth and innovation in the AI space.",
        motivations: [
          "Strategic partnerships — Building relationships that create value for all parties",
          "Business development — Identifying and pursuing growth opportunities",
          "Corporate strategy — Aligning partnerships with company goals",
          "Relationship management — Maintaining long-term business relationships"
        ],
        background: "With extensive experience in business development and corporate partnerships, I've helped organizations across various industries build meaningful connections and achieve their strategic objectives.",
        thesis: "Strong relationships are the foundation of sustainable business growth. I believe in creating partnerships that are built on trust, mutual benefit, and shared vision for the future."
      }
    },
    jacob: {
      name: 'Jacob Gresham',
      title: 'Talent Acquisition',
      bio: {
        intro: "I'm responsible for attracting and recruiting top talent to join the Adora AI team. My focus is on finding individuals who not only have the right skills but also share our vision and values.",
        motivations: [
          "Talent identification — Finding exceptional people who can make a difference",
          "Team building — Creating diverse, high-performing teams",
          "Culture development — Ensuring new hires align with our values",
          "Growth facilitation — Helping the company scale with the right people"
        ],
        background: "I have a passion for connecting great people with great opportunities. My experience in talent acquisition spans multiple industries, with a focus on technical and leadership roles.",
        thesis: "The right people are the most important factor in any company's success. I believe in finding individuals who are not just skilled, but who are also passionate about making a positive impact."
      }
    },
    naomi: {
      name: 'Naomi Wang',
      title: 'Senior Product Advisor',
      bio: {
        intro: "As a Senior Product Advisor, I provide strategic guidance on product development, user experience, and market positioning. My role is to help Adora AI build products that truly serve our users' needs.",
        motivations: [
          "Product strategy — Defining product vision and roadmap",
          "User experience — Ensuring products are intuitive and valuable",
          "Market analysis — Understanding user needs and market opportunities",
          "Innovation guidance — Helping teams think creatively about solutions"
        ],
        background: "I bring years of experience in product management and strategy across various technology companies. My expertise includes user research, product design, and go-to-market strategy.",
        thesis: "Great products solve real problems in elegant ways. I believe in putting users at the center of every product decision and building solutions that make their lives better."
      }
    },
    karina: {
      name: 'Karina Lupercio',
      title: 'Fractional COO',
      bio: {
        intro: "As Fractional COO, I help optimize Adora AI's operations, processes, and organizational structure to support sustainable growth and operational excellence.",
        motivations: [
          "Operational excellence — Building efficient, scalable processes",
          "Team development — Creating environments where people can thrive",
          "Strategic execution — Turning vision into actionable plans",
          "Growth enablement — Scaling operations to support business growth"
        ],
        background: "I have extensive experience in operations management, organizational development, and business strategy. I've helped numerous companies optimize their operations and scale effectively.",
        thesis: "Strong operations are the backbone of any successful company. I believe in creating systems and processes that enable teams to do their best work while maintaining focus on what matters most."
      }
    },
    sharad: {
      name: 'Sharad Karkera',
      title: 'Fractional CTO',
      bio: {
        intro: "As Fractional CTO, I provide technical leadership and strategic guidance on technology decisions, architecture, and engineering practices that will scale with Adora AI's growth.",
        motivations: [
          "Technical strategy — Defining long-term technology vision",
          "Engineering excellence — Building high-quality, maintainable systems",
          "Team leadership — Mentoring and developing technical talent",
          "Innovation guidance — Staying ahead of technology trends"
        ],
        background: "I have over 15 years of experience in technology leadership, having served as CTO and technical advisor for multiple startups and established companies across various industries.",
        thesis: "Technology should enable business success, not constrain it. I believe in making smart technology choices that provide both immediate value and long-term flexibility."
      }
    },
    antonio: {
      name: 'Antonio Paes',
      title: 'Principal AI Advisor',
      bio: {
        intro: "As Principal AI Advisor, I provide deep expertise in artificial intelligence research and development, helping guide Adora AI's technical direction and innovation in AI technologies.",
        motivations: [
          "AI research — Advancing the state of artificial intelligence",
          "Technical innovation — Exploring new possibilities in AI",
          "Strategic guidance — Helping make informed AI technology decisions",
          "Knowledge sharing — Educating teams on AI best practices"
        ],
        background: "I have extensive experience in AI research and development, with a focus on machine learning, deep learning, and AI system architecture. I've contributed to numerous AI projects and publications.",
        thesis: "AI has the potential to transform how we work and live. I believe in developing AI systems that are not only powerful but also ethical, transparent, and beneficial to society."
      }
    },
    klyne: {
      name: 'Dr. Klyne Smith',
      title: 'Security & Cryptography Advisor',
      bio: {
        intro: "I provide expertise in cybersecurity and cryptography, ensuring that Adora AI's systems are built with security as a fundamental principle, not an afterthought.",
        motivations: [
          "Security architecture — Building systems that are secure by design",
          "Cryptographic research — Advancing encryption and security technologies",
          "Privacy protection — Ensuring user data remains private and secure",
          "Risk management — Identifying and mitigating security risks"
        ],
        background: "With a PhD in cryptography and years of experience in cybersecurity, I've worked on security systems for government, financial, and technology organizations.",
        thesis: "Security and privacy are fundamental rights in the digital age. I believe in building systems that protect users while still enabling innovation and functionality."
      }
    },
    kathi: {
      name: 'Kathi Vidal',
      title: 'IP Advisor',
      bio: {
        intro: "As IP Advisor, I help Adora AI navigate intellectual property strategy, patent protection, and compliance to ensure our innovations are properly protected and positioned for success.",
        motivations: [
          "IP strategy — Developing comprehensive intellectual property strategies",
          "Patent protection — Securing patents for key innovations",
          "Legal compliance — Ensuring adherence to IP laws and regulations",
          "Innovation support — Enabling innovation while managing IP risks"
        ],
        background: "I have extensive experience in intellectual property law, patent prosecution, and IP strategy for technology companies. I've helped numerous organizations protect and leverage their intellectual property.",
        thesis: "Intellectual property is a crucial asset for technology companies. I believe in creating IP strategies that protect innovation while enabling business growth and collaboration."
      }
    },
    mercedes: {
      name: 'Mercedes Ballard',
      title: 'Magical Teams Strategist',
      bio: {
        intro: "As Magical Teams Strategist, I bring strategic insight and innovative approaches to help Adora AI optimize team dynamics, enhance collaboration, and achieve breakthrough results through strategic team organization and workflow optimization.",
        motivations: [
          "Team optimization — Creating high-performing, collaborative teams",
          "Strategic planning — Developing comprehensive team strategies",
          "Workflow innovation — Designing efficient team processes",
          "Collaborative excellence — Fostering effective team communication"
        ],
        background: "I specialize in team strategy, organizational development, and collaborative workflow design. My experience spans helping technology companies build exceptional teams and optimize their collaborative processes.",
        thesis: "Great teams are more than the sum of their parts. I believe in creating team environments where individual strengths combine to achieve extraordinary collective results."
      }
    },
    shakeel: {
      name: 'Shakeel Raja',
      title: 'Director Data Science @ TechGenies',
      bio: {
        intro: "As Director of Data Science at TechGenies, I lead data science initiatives and provide strategic guidance on AI/ML implementation, data architecture, and advanced analytics to help Adora AI leverage data-driven insights for optimal decision-making.",
        motivations: [
          "Data science leadership — Driving innovative data science solutions",
          "AI/ML strategy — Developing comprehensive machine learning strategies",
          "Analytics architecture — Building scalable data analytics systems",
          "Strategic insights — Transforming data into actionable business intelligence"
        ],
        background: "I bring extensive experience in data science, machine learning, and analytics leadership across various technology companies. My expertise includes building data science teams, implementing ML pipelines, and developing data-driven strategies.",
        thesis: "Data is the foundation of intelligent decision-making. I believe in creating data science solutions that not only provide insights but also drive meaningful business outcomes and innovation."
      }
    },
    techgenies: {
      name: 'TechGenies',
      title: 'Technical Development Partner',
      bio: {
        intro: "TechGenies is our trusted technical development partner, providing specialized expertise in software development, system integration, and technical implementation to accelerate our product development.",
        motivations: [
          "Technical excellence — Delivering high-quality software solutions",
          "Partnership — Building long-term collaborative relationships",
          "Innovation support — Helping bring innovative ideas to life",
          "Scalable development — Providing flexible development resources"
        ],
        background: "TechGenies brings years of experience in software development, system architecture, and technical consulting across various industries and technology stacks.",
        thesis: "Great partnerships are built on trust, expertise, and shared commitment to excellence. We work together to turn vision into reality."
      }
    },
    magical: {
      name: 'Magical Teams',
      title: 'Strategic Partner',
      bio: {
        intro: "Magical Teams partners with us to provide strategic insights, operational support, and specialized expertise that helps Adora AI achieve its goals more effectively.",
        motivations: [
          "Strategic partnership — Providing strategic guidance and support",
          "Operational excellence — Helping optimize business operations",
          "Growth enablement — Supporting sustainable business growth",
          "Collaborative success — Achieving mutual success through partnership"
        ],
        background: "Magical Teams specializes in helping technology companies scale their operations, optimize their processes, and achieve their strategic objectives.",
        thesis: "Success is better when shared. We believe in creating partnerships that generate value for all parties involved."
      }
    },
    growit: {
      name: 'GrowIT',
      title: 'Growth Partner',
      bio: {
        intro: "GrowIT is our growth partner, providing expertise in marketing, business development, and growth strategies to help Adora AI expand its reach and impact.",
        motivations: [
          "Growth strategy — Developing comprehensive growth plans",
          "Market expansion — Helping reach new markets and customers",
          "Brand development — Building strong brand presence",
          "Performance optimization — Maximizing growth initiatives"
        ],
        background: "GrowIT specializes in helping technology companies accelerate their growth through strategic marketing, business development, and growth optimization.",
        thesis: "Growth should be sustainable and aligned with company values. We focus on building long-term success rather than short-term gains."
      }
    },
    hexa: {
      name: 'Hexa',
      title: 'Innovation Partner',
      bio: {
        intro: "Hexa serves as our innovation partner, bringing fresh perspectives, creative solutions, and cutting-edge expertise to help Adora AI stay at the forefront of AI innovation.",
        motivations: [
          "Innovation catalyst — Driving creative and innovative solutions",
          "Technology advancement — Exploring emerging technologies",
          "Creative collaboration — Bringing fresh perspectives to challenges",
          "Future-focused — Anticipating and preparing for future trends"
        ],
        background: "Hexa specializes in innovation consulting, emerging technology research, and creative problem-solving for technology companies.",
        thesis: "Innovation requires both technical expertise and creative thinking. We believe in pushing boundaries while maintaining practical focus on real-world applications."
      }
    }
  };

  // Render modal function
  const renderModal = () => {
    if (!activeModal) return null;

    const data = modalData[activeModal];
    if (!data) return null;

    // Calculate sidebar offset for desktop - matches the layout system
    const getSidebarOffset = () => {
      // On mobile, sidebar overlays so no offset needed
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        return '0px';
      }
      
      // Desktop: match the layout system's margin logic
      if (isExpanded || isHovered) {
        return '290px'; // Full sidebar width
      }
      return '90px'; // Collapsed sidebar width
    };

    return (
      <>
        {/* Overlay for lightbox - covers entire viewport */}
        <div
          className="fixed inset-0 bg-black/60 z-40 transition-opacity"
          onClick={closeModal}
        />
        
        {/* Modal positioned to account for sidebar and header */}
        <div 
          className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          style={{
            top: '80px', // Account for header height
            left: '0',
            right: '0', 
            bottom: '0',
            marginLeft: getSidebarOffset(),
            // Add smooth transition for sidebar state changes
            transition: 'margin-left 300ms ease-in-out'
          }}
        >
          {/* Scrollable container with max height */}
          <div className="w-full max-w-2xl max-h-full overflow-y-auto">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 relative min-h-0">
              {/* Close button */}
              <button
                className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                onClick={closeModal}
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Video section for Kyle only */}
              {(data as any).video && (
                <div className="mb-6 w-full rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <iframe
                    src={(data as any).video}
                    title={`${data.name} Video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  ></iframe>
                </div>
              )}
              
              {/* Content area */}
              <div className="text-gray-900 dark:text-white pr-8">
                {/* Header with name, title, and social links */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{data.name}</h3>
                    <p className="text-base text-gray-600 dark:text-gray-400 mt-1">{data.title}</p>
                  </div>
                  {(data as any).social && (
                    <div className="flex space-x-3 flex-shrink-0">
                      {(data as any).social.linkedin && (
                        <a
                          href={(data as any).social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      )}
                      {(data as any).social.instagram && (
                        <a
                          href={(data as any).social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                          </svg>
                        </a>
                      )}
                      {(data as any).social.github && (
                        <a
                          href={(data as any).social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Bio content */}
                <div className="space-y-6 text-sm leading-relaxed">
                  <p className="text-gray-700 dark:text-gray-300">{data.bio.intro}</p>
                  
                  {data.bio.motivations && (
                    <div>
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">What drives my focus?</h4>
                      <ul className="space-y-2 ml-4">
                        {data.bio.motivations.map((motivation, index) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300">
                            <strong className="text-gray-900 dark:text-white">{motivation.split(' — ')[0]}</strong> — {motivation.split(' — ')[1]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {data.bio.background && (
                    <div>
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Background</h4>
                      <p className="text-gray-700 dark:text-gray-300">{data.bio.background}</p>
                    </div>
                  )}
                  
                  {data.bio.thesis && (
                    <div>
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Philosophy</h4>
                      <p className="text-gray-700 dark:text-gray-300">{data.bio.thesis}</p>
                    </div>
                  )}
                  
                  {(data.bio as any).cta && (
                    <p className="italic text-gray-600 dark:text-gray-400 border-l-4 border-blue-500 pl-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-r-lg">
                      {(data.bio as any).cta}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Application form modal with same positioning logic
  const renderApplicationForm = () => {
    if (!showApplicationForm) return null;

    const getSidebarOffset = () => {
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        return '0px';
      }
      
      if (isExpanded || isHovered) {
        return '290px';
      }
      return '90px';
    };

    return (
      <>
        <div
          className="fixed inset-0 bg-black/60 z-40 transition-opacity"
          onClick={closeApplicationForm}
        />
        <div 
          className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          style={{
            top: '80px',
            left: '0',
            right: '0', 
            bottom: '0',
            marginLeft: getSidebarOffset(),
            transition: 'margin-left 300ms ease-in-out'
          }}
        >
          <div className="w-full max-w-md max-h-full overflow-y-auto">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 relative">
                             <button
                 className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                 onClick={closeApplicationForm}
                 aria-label="Close"
               >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-gray-900 dark:text-white pr-8">
                <h3 className="text-xl font-bold mb-2">Apply to Adora AI</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Please fill out the following form and we'll get in touch with you.
                </p>
                
                <form onSubmit={handleApplicationSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="profile" className="block text-sm font-medium mb-2">
                      LinkedIn/GitHub Profile
                    </label>
                    <input
                      type="url"
                      id="profile"
                      name="profile"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors mt-6"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="space-y-6 md:space-y-8 relative">
      {/* Modal */}
      {renderModal()}

      {/* Application Form Modal */}
      {renderApplicationForm()}

      {/* PAGE HEADER - FLEXBOX (1D) Layout */}
      <header className="flex flex-col gap-2 pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl">
          About Adora AI
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Discover our mission to transform business intelligence with AI, meet our team, 
          and learn about career opportunities at Adora AI.
        </p>
      </header>

      {/* Our Story Section */}
      <StoryAccordion />

      {/* Team Section */}
      <TeamAccordion 
        onPersonClick={(person: ModalType) => setActiveModal(person)}
      />

      {/* Advisors Section */}
      <AdvisorsAccordion 
        onPersonClick={(person: ModalType) => setActiveModal(person)}
      />

      {/* Partners Section */}
      <PartnersAccordion 
        onPersonClick={(partner: ModalType) => setActiveModal(partner)}
      />

      {/* Careers Section */}
      <ComponentCard title="Join Our Team" desc="Build the future of AI with us">
        <div className="space-y-6">
          <p className="text-gray-600 dark:text-gray-300">
            We're always looking for talented individuals who are passionate about AI 
            and want to make a difference. Join us in our mission to transform how 
            businesses use artificial intelligence.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/5 rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Open Positions
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                <li>Lead Cryptography Systems Engineer — Symbolic Encryption (Rust | C/C++)</li>
                <li>Principal AI Systems Integrator — GenAI & LLM-Ops (Python | TypeScript | RAG | n8n)</li>
                <li>Principal Product Designer — Agentic AI OS UI/UX (Web | Desktop | Mobile)</li>
                <li>Principal Product Manager — Agentic AI OS Team Organization (Jira, Asana, Discord, Figma)</li>
                <li>AI first Social Media Manager</li>
                <li>AI Educational Content Creator</li>
                <li>Paid Internships Available</li>
              </ul>
              <button 
                onClick={() => setShowApplicationForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
              >
                Apply Now
              </button>
            </div>
            <div className="md:w-2/5 rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Benefits
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Competitive salary + equity (ESOP), backed by max investment matching, Comprehensive health coverage with employer-funded HSA, Primarily remote work—punctuated by focused, in-office sprint weeks and quarterly travel stipends, Six months fully paid maternity & paternity leave for every new parent, Unlimited vacation with a culture that actually encourages you to use it, $200 monthly wellness budget for mind & body, $2-5k technical / home-office setup stipend to keep your workspace sharp, Dedicated learning & professional-development fund to fuel continuous growth.
              </p>
            </div>
          </div>
        </div>
      </ComponentCard>

      {/* Contact Section */}
      <ComponentCard title="Contact Us" desc="Get in touch with our team">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Email
              </h3>
              <a href="mailto:hello@adorahq.com" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                hello@adorahq.com
              </a>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Follow Us
              </h3>
              <div className="flex space-x-6">
                <a href="https://www.linkedin.com/company/ask-adora-ai/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://x.com/AskAdoraAI" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://github.com/askadora" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/askadoraai/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/askadoraai" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
} 