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
                 'techgenies' | 'magical' | 'growit' | 'hexa' | 'winston';

export default function AboutPage() {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showPartnerPDF, setShowPartnerPDF] = useState<ModalType | null>(null);
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const closeModal = () => setActiveModal(null);
  const closeApplicationForm = () => {
    setShowApplicationForm(false);
    setSubmitMessage(null);
  };
  const closePartnerPDF = () => setShowPartnerPDF(null);

  const handleApplicationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
    const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;
      const profile = formData.get('profile') as string;
      const email = formData.get('email') as string;
      const phone = formData.get('phone') as string;

      const response = await fetch('/api/job-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, profile, email, phone }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: 'Application submitted successfully! We\'ll get back to you soon.' });
        // Reset form
        // e.currentTarget.reset();
        // Close form after 3 seconds
        setTimeout(() => {
          setShowApplicationForm(false);
          setSubmitMessage(null);
        }, 1000);
      } else {
        setSubmitMessage({ type: 'error', text: result.error || 'Failed to submit application. Please try again.' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
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
    tarryn: {
      name: "Tarryn Thomas",
      title: "Head of Experience",
      image: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/team-profile-image/taryn1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWFtLXByb2ZpbGUtaW1hZ2UvdGFyeW4xLmpwZyIsImlhdCI6MTc1MDc4NTg2MiwiZXhwIjoxNzgyMzIxODYyfQ.rJjhPZ4Edn0eNePmIOSjvQWiL0tcYexYsEtgZdNGskU',
      bio: {
        intro: "Tarryn is an Alchemist at Adora, where she supports culture, operations and experience strategy to help the team scale with soul and precision.",
        motivations: [
          "Customer experience — Designing aligned, high-touch experiences",
          "Leadership development — Supporting mission-driven teams",
          "Operations — Building systems that scale with soul and intention",
          "Visionary growth — Helping teams build meaningful companies"
        ],
        background: "Before joining Adora, she led transformational programs and retreats, advised founders, and designed high-end experiences that delivered real impact.",
        thesis: "She’s excited to build Adora because she believes in the power of meaningful AI and teams that make magic."
      }
    },
    kevin: {
      name: "Kevin Bultongez",
      title: "Head Architect",
      image: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/team-profile-image/kevin.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWFtLXByb2ZpbGUtaW1hZ2Uva2V2aW4uanBnIiwiaWF0IjoxNzUwODE5NjUzLCJleHAiOjE3ODIzNTU2NTN9.LIWitCoCpYdHOrfuwklLtNBhId-l0hMLNW5n6es2K60',
      bio: {
        intro: "Kevin Bultongez is the Head Architect at Adora AI, where he drives business architecture, external engagement, and strategic partnerships to establish Adora’s market leadership in the AI ecosystem.",
        motivations: [
          "Business architecture — Designing scalable infrastructure for AI",
          "Strategic partnerships — Bridging technical solutions with business needs",
          "Regulatory strategy — Navigating compliance in complex systems",
          "Innovation — Creating human-first, AI-native platforms"
        ],
        background: "Kevin has over a decade of experience managing high-stakes technical programs at Procter & Gamble, Novo Nordisk, Insulet, and Regeneron. He holds a Master's in Mechanical Engineering.",
        thesis: "He’s excited to build Adora because he believes in infrastructure that transforms business and improves global quality of life."
      }
    },
    chittal: {
      name: "Chittal Karuppiah",
      title: "AI/ML Engineer",
      image: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/team-profile-image/chittal1.JPG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWFtLXByb2ZpbGUtaW1hZ2UvY2hpdHRhbDEuSlBHIiwiaWF0IjoxNzUwNzg1MjY3LCJleHAiOjE3ODIzMjEyNjd9.lNkRECZUGxVg6FEhZDmBVd8Evd1EfSdPGAyOEKjce58',
      bio: {
        intro: "Chittal Karuppiah is an AI/ML Engineer at Adora, where she develops AI-powered systems that synthesize outputs from multiple large language models.",
        motivations: [
          "Conversational AI — Building smart, human-feeling systems",
          "Scalable architecture — Designing reliable backend for real-time applications",
          "NLP & ML — Applying deep technical knowledge to useful AI products",
          "System integration — Merging research and product into seamless experiences"
        ],
        background: "Chittal has a background in backend development and NLP. Before Adora, she built scalable cloud systems with a focus on deep learning and generative AI.",
        thesis: "She’s excited to shape the future of AI at Adora with tools that are both robust and deeply human."
      }
    },
    sridurga: {
      name: "Sridurga Linga",
      title: "AI/ML Engineer",
      image: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/team-profile-image/sri1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWFtLXByb2ZpbGUtaW1hZ2Uvc3JpMS5qcGciLCJpYXQiOjE3NTA3ODU4NDksImV4cCI6MTc4MjMyMTg0OX0.fj5nMpe6hwWwgDAnj2Cz6EaHkDXgOpoqSe0aC7m-XcI',
      bio: {
        intro: "Sridurga Linga is an AI/ML Engineer at Adora, where she builds agentic systems and AI-first recommendation engines.",
        motivations: [
          "Autonomous AI — Designing intelligent, integrated agents",
          "Computer vision — Delivering real-time insights at scale",
          "MLOps — Streamlining ML pipelines from prototype to production",
          "Human-AI synergy — Empowering people through seamless automation"
        ],
        background: "Sridurga worked at Zentron Labs and UT Arlington, building inspection pipelines and forecasting platforms using Python, NLP, OpenCV, and TensorFlow.",
        thesis: "She’s excited to help build Adora’s AI OS—an ecosystem of modular agents that power intelligent operations everywhere."
      }
    },
    sai: {
    name: "Sai Akhil Sakhamuri",
    title: "AI/ML Engineer",
    image: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/team-profile-image/sai2.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWFtLXByb2ZpbGUtaW1hZ2Uvc2FpMi5wbmciLCJpYXQiOjE3NTA3ODY0NjAsImV4cCI6MTc4MjMyMjQ2MH0.Gmqw-FOXmBkrwKBSPHPET7xNyhOgfry6IhS-mzWJl4M',
    bio: {
      intro: "Sai Akhil is an AI/ML Engineer at Adora, where he architects intelligent infrastructure and workflow engines that support scalable agent collaboration and secure data operations.",
      motivations: [
        "Backend engineering \u2014 Building modular AI pipelines and orchestration systems",
        "Data operations \u2014 Architecting secure, real-time analytics platforms",
        "RAG systems \u2014 Leveraging retrieval-augmented generation for intelligent agents",
        "Cross-functional AI \u2014 Integrating AI across products, teams, and cloud systems"
      ],
      background: "Sai has contributed to RAG chatbots, multi-agent orchestration, and data platforms at Verizon and Genpact. He specializes in secure deployments, MLOps, and cloud-native infrastructure.",
      thesis: "He\u2019s driven to build Adora as a platform for next-gen automation\u2014empowering teams to build faster, think smarter, and operate securely at scale."
    }
  },
    anthony: {
      name: "Anthony Porter",
      title: "Events & Outreach Coordinator",
      image: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/team-profile-image/anthony.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWFtLXByb2ZpbGUtaW1hZ2UvYW50aG9ueS5qcGciLCJpYXQiOjE3NTA3ODUyNDUsImV4cCI6MTc4MjMyMTI0NX0.yaLJwjSffppeyweTdcNkXmoDOIv8CAx87ZfjJ9GuzEA',
      bio: {
        intro: "Anthony Porter is the Events and Outreach Coordinator at Adora, where he leads national AI hackathons, learning experiences, and workforce readiness initiatives.",
        motivations: [
          "Education equity — Expanding access to emerging technologies",
          "Community leadership — Designing impactful, inclusive learning programs",
          "Systems thinking — Bringing operational insight to complex environments",
          "AI integration — Scaling future-ready education rooted in ethics"
        ],
        background: "Anthony has worked in mechanical design, pharmacy ownership, and compliance roles at Maximus and U.S. banks. He’s certified in CompTIA Security+ and Microsoft Azure AI.",
        thesis: "He’s excited to help build Adora because he believes innovation must be inclusive, ethical, and human-centered."
      }
    },
    jacob: {
      name: "Jacob Gresham",
      title: "Talent & Founder Support Coordinator",
      image: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/team-profile-image/jacob1.JPG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWFtLXByb2ZpbGUtaW1hZ2UvamFjb2IxLkpQRyIsImlhdCI6MTc1MDc4NTI4MywiZXhwIjoxNzgyMzIxMjgzfQ.IwzXTaPoM8QnxXaOm3jWmdP79K14100UQXt-k4VzbEU',
      bio: {
        intro: "Jacob Gresham is the Talent & Founder Support Coordinator at Adora, where he recruits mission-aligned talent and supports founder initiatives.",
        motivations: [
          "Talent acquisition — Recruiting mission-driven, emotionally intelligent teammates",
          "Founder support — Enabling founders to scale with integrity",
          "Community engagement — Building trust through immersive experiences",
          "Innovation coaching — Advising on tools, soft skills, and curriculum"
        ],
        background: "Jacob has led community events, fundraising campaigns, and immersive learning initiatives. He advises an EMT training program and draws on experience in mentorship and public speaking.",
        thesis: "He’s excited to help shape Adora’s culture—where purpose and performance go hand in hand."
      }
    },
    naomi: {
      name: 'Naomi Wang',
      title: 'Senior Product Advisor',
      image: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/team-profile-image/naomi1.JPG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWFtLXByb2ZpbGUtaW1hZ2UvbmFvbWkxLkpQRyIsImlhdCI6MTc1MDc4NTgwMSwiZXhwIjoxNzgyMzIxODAxfQ.0UlNQXB936Z14ljwM7ZaBsi09FPss0mhFSDi1NaN1G0',
      bio: {
        intro: "As a Senior Product Advisor at Adora, I architect and build scalable systems that power AI-native applications. My focus is on creating performant infrastructure and intelligent features that directly support user and business needs.",
        motivations: [
          "AI system design — Building intelligent, real-time products that scale",
          "Infrastructure & architecture — Designing backend systems that support growth",
          "Cross-platform experience — Delivering web and native experiences for diverse users",
          "ML innovation — Exploring the boundaries of multimodal and generative AI"
        ],
        background: "With a foundation in full-stack engineering and experience in AI/ML pipelines, cloud infrastructure, and system design, she's worked on everything from web apps to deep infrastructure, embedded systems to supercomputers. I care about clean architecture, developer experience, and delivering polished AI-first products.",
        thesis: "The best AI products are those that combine thoughtful engineering with responsible innovation. I believe in designing systems that are both technically robust and deeply human-centered."
      }
    },
    karina: {
      name: "Karina Lupercio",
      title: "Fractional COO",
      image: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/team-profile-image/karina1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWFtLXByb2ZpbGUtaW1hZ2Uva2FyaW5hMS5qcGciLCJpYXQiOjE3NTA3ODYwODUsImV4cCI6MTc4MjMyMjA4NX0.Zo0DyLp1Pr3My5bzExgQXmiH9TP8uq58v-yEPphYqzE',
      bio: {
        intro: "Karina Lupercio is an Advisor at Adora AI, where she guides operational strategy, systems design, and implementation to help the company scale with intention.",
        motivations: [
          "Operational strategy — Implementing scalable and effective systems",
          "Healthcare innovation — Designing tech-enabled solutions that empower people",
          "Team enablement — Supporting collaborative and mission-aligned cultures",
          "Execution — Translating complex ideas into high-performance operations"
        ],
        background: "Karina brings deep experience in startup and healthcare operations. She’s led operational transformations and scaled tech-driven teams with soul.",
        thesis: "She’s excited to help build systems that empower, not replace, and believes great ops unlock purpose-driven impact."
      }
    },
    sharad: {
    name: "Sharad Karkera",
    title: "Fractional CTO",
    image: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/team-profile-image/Sharad.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWFtLXByb2ZpbGUtaW1hZ2UvU2hhcmFkLnBuZyIsImlhdCI6MTc1MDc4NTgzOCwiZXhwIjoxNzgyMzIxODM4fQ.pzO3Q30rJe7UB4AQs3QpDqwEUqmI_N0TGhoBrU4iGj0',
    bio: {
      intro: "Sharad Karkera is a seasoned technology executive recognized for driving transformative growth and efficiency at scale.",
      motivations: [
        "Technology strategy \u2014 Leading innovation at enterprise scale",
        "Digital transformation \u2014 Unlocking new growth through systems redesign",
        "Team leadership \u2014 Scaling technical excellence with clarity and purpose",
        "Operational excellence \u2014 Building resilient, high-retention platforms"
      ],
      background: "As CTO at Channel Control Merchants, he led a 200% loyalty increase. At Texas LawShield, he launched platforms achieving 92% retention. He's managed multi-million budgets and enterprise transformations.",
      thesis: "Sharad brings strategic vision, operational excellence, and deep tech experience to help Adora grow with discipline and innovation."
    }
  },
    antonio: {
    name: "Antonio Paes",
    title: "Principal AI Advisor",
    image: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/team-profile-image/Antonio_photo.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWFtLXByb2ZpbGUtaW1hZ2UvQW50b25pb19waG90by5qcGVnIiwiaWF0IjoxNzUwNzg1NjI4LCJleHAiOjE3ODIzMjE2Mjh9.qRansga4QZMCMv8lx7qx_bEta9ualykMXTnFwjVr5gs',
    bio: {
      intro: "Antonio Paes is an accomplished technology executive and thought leader in Artificial Intelligence and Machine Learning.",
      motivations: [
        "AI strategy \u2014 Guiding enterprise adoption of advanced AI systems",
        "Academic leadership \u2014 Educating future leaders in AI and analytics",
        "Generative & quantum AI \u2014 Innovating at the edge of ML technology",
        "Transformation initiatives \u2014 Driving real-world AI integration at scale"
      ],
      background: "Antonio is Chief AI Officer at Zallpy Digital and directs the AI MS program at UT Dallas. His experience includes NASA, IBM, and ThoughtWorks, and he developed the widely adopted AI Maturity Model.",
      thesis: "He\u2019s excited to support Adora in pioneering responsible, high-impact AI that transforms industries."
    }
  },
    klyne: {
      name: 'Dr. Klyne Smith',
      title: 'Security & Cryptography Advisor',
      image: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/team-profile-image/Klyne.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWFtLXByb2ZpbGUtaW1hZ2UvS2x5bmUucG5nIiwiaWF0IjoxNzUwNzg1Nzc0LCJleHAiOjE3ODIzMjE3NzR9.lpFus082UskbEnrrJxRZUHDOFKVWBUJCitRws-0oBW0',
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
      image: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/team-profile-image/Kathi.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWFtLXByb2ZpbGUtaW1hZ2UvS2F0aGkucG5nIiwiaWF0IjoxNzUwNzg1NzIzLCJleHAiOjE3ODIzMjE3MjN9.ByZVqdriedmrl2zYFPDSKgX7j3j7FUTidMFi5QlHoiQ',
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
      name: "Mercedes Ballard",
      title: "Advisor",
      image: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/team-profile-image/mercedes1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWFtLXByb2ZpbGUtaW1hZ2UvbWVyY2VkZXMxLmpwZyIsImlhdCI6MTc1MDc4NTc5MiwiZXhwIjoxNzgyMzIxNzkyfQ.Gdb8SrVZiTfam8XVDqfPLiZltr6E8cr6TLkVpngTXfg',
      bio: {
        intro: "Mercedes Ballard is an Advisor at Adora, where she brings hands-on support in strategic planning, team building, and operational infrastructure.",
        motivations: [
          "Strategic planning — Supporting teams from vision to execution",
          "Startup growth — Helping founders scale operations and culture",
          "People operations — Building founder-first systems",
          "Workflow design — Creating structures that enable scale and alignment"
        ],
        background: "Before Adora, she co-founded a consultancy for tech startups and nonprofits and led growth and people operations at Magical Teams. She specializes in startup validation, lean ops, and talent acquisition.",
        thesis: "Mercedes believes the future of AI in the workplace should be built intentionally, inclusively, and with operational excellence at the core."
      }
    },
    shakeel: {
      name: 'Shakeel Raja',
      title: 'Director Data Science @ TechGenies',
      image: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/team-profile-image/Shakeel.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWFtLXByb2ZpbGUtaW1hZ2UvU2hha2VlbC5wbmciLCJpYXQiOjE3NTA3ODU4MjMsImV4cCI6MTc4MjMyMTgyM30.7YyO1c3YR_xDNEAs8UnAve1GZzB404bnke_Hgo253GA',
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
      image: '',
      pdfUrl: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Team_HR/Key%20Partnership%20Profile%20-%20TechGenies%20(1).pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9UZWFtX0hSL0tleSBQYXJ0bmVyc2hpcCBQcm9maWxlIC0gVGVjaEdlbmllcyAoMSkucGRmIiwiaWF0IjoxNzUwODE1NDcxLCJleHAiOjIwNjYxNzU0NzF9.Who7mUCcraRq62zxxFAbU3FYtufYbC-rb94-e1LuwKY',
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
      image: '',
      pdfUrl: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Team_HR/Key%20Partnership%20Profile%20-%20Magical%20Teams%20(1).pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9UZWFtX0hSL0tleSBQYXJ0bmVyc2hpcCBQcm9maWxlIC0gTWFnaWNhbCBUZWFtcyAoMSkucGRmIiwiaWF0IjoxNzUwODE1MjE0LCJleHAiOjIwNjYxNzUyMTR9.SntCdTOzZUtR42K0zkE3djE-rnCl_9mFjvU31mSCraU',
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
      name: 'Grow IT Partners',
      title: 'Growth Partner',
      image: '',
      pdfUrl: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Team_HR/Key%20Partnership%20Profile%20-%20Grow%20IT%20Partners.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9UZWFtX0hSL0tleSBQYXJ0bmVyc2hpcCBQcm9maWxlIC0gR3JvdyBJVCBQYXJ0bmVycy5wZGYiLCJpYXQiOjE3NTA4NzA1ODEsImV4cCI6MTc4MjQwNjU4MX0.Lu4j6VBGbNXbamci9ejFzy7IJdt02_IbesgdB6kZ1qI',
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
      image: '',
      pdfUrl: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Team_HR/Key%20Partnership%20Profile%20-%20HEXA%20Innovation%20(1).pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9UZWFtX0hSL0tleSBQYXJ0bmVyc2hpcCBQcm9maWxlIC0gSEVYQSBJbm5vdmF0aW9uICgxKS5wZGYiLCJpYXQiOjE3NTA4MTUwNzEsImV4cCI6MjA2NjE3NTA3MX0.Pl9p_WeHV15S_Dd1DRd1Kw1MkaqiGGmqzqNV-raCox8',
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
    },
    winston: {
      name: 'Winston & Strawn LLP',
      title: 'Legal Partner',
      image: '',
      pdfUrl: 'https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Team_HR/Key%20Partnership%20Profile%20-%20Wiston%20&%20Strawn%20LLP%20(1).pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9UZWFtX0hSL0tleSBQYXJ0bmVyc2hpcCBQcm9maWxlIC0gV2lzdG9uICYgU3RyYXduIExMUCAoMSkucGRmIiwiaWF0IjoxNzUwODE1MTI0LCJleHAiOjIwNjYxNzUxMjR9.bDMCEB7MzP0PhgU2mKO8oBRwqpCPoDOZ9BbL7b2zbTk',
      bio: {
        intro: "Winston & Strawn LLP serves as our legal partner, providing expert legal advice and support to help Adora AI navigate complex legal challenges and ensure compliance with all relevant laws and regulations.",
        motivations: [
          "Legal compliance — Ensuring adherence to all relevant laws and regulations",
          "IP protection — Securing patents and trademarks for key innovations",
          "Regulatory guidance — Providing expert guidance on compliance and compliance",
          "Litigation support — Supporting legal disputes and litigation"
        ],
        background: "Winston & Strawn LLP is a leading law firm with a strong reputation for providing expert legal advice and support to technology companies.",
        thesis: "Legal compliance is essential for the success of any technology company. We believe in ensuring that Adora AI operates in a legally compliant manner while also driving innovation and growth."
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
                  {/* Success/Error Message */}
                  {submitMessage && (
                    <div className={`p-3 rounded-md ${
                      submitMessage.type === 'success' 
                        ? 'bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400' 
                        : 'bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
                    }`}>
                      {submitMessage.text}
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="profile" className="block text-sm font-medium mb-2">
                      LinkedIn/GitHub Profile
                    </label>
                    <input
                      type="text"
                      id="profile"
                      name="profile"
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors mt-6 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Render PDF modal function
  const renderPDFModal = () => {
    if (!showPartnerPDF) return null;

    const data = modalData[showPartnerPDF];
    if (!data || !(data as any).pdfUrl) return null;

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
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/60 z-40 transition-opacity" 
          onClick={closePartnerPDF} 
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
            transition: 'margin-left 300ms ease-in-out'
          }}
        >
          <div className="w-full max-w-7xl max-h-full overflow-y-auto">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
              {/* Close button */}
              <button 
                className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                onClick={closePartnerPDF}
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {data.name} - Partnership Profile
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {data.title}
                </p>
              </div>
              
              {/* PDF Viewer */}
              <div className="p-6">
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg" style={{ height: '70vh' }}>
                  <iframe
                    src={`${(data as any).pdfUrl}#zoom=85`}
                    title={`${data.name} Partnership Profile`}
                    className="w-full h-full rounded-lg"
                    style={{ border: 'none' }}
                  />
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div className="flex space-x-4">
                  <a
                    href={(data as any).pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </a>
                  <a
                    href="mailto:hello@adorahq.com?subject=Partnership Inquiry"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Us
                  </a>
                </div>
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

      {/* PDF Modal */}
      {renderPDFModal()}

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
        modalData={modalData}
      />

      {/* Advisors Section */}
      <AdvisorsAccordion 
        onPersonClick={(person: ModalType) => setActiveModal(person)}
        modalData={modalData}
      />

      {/* Partners Section */}
      <PartnersAccordion 
        onPersonClick={(partner: ModalType) => setActiveModal(partner)}
        onPDFClick={(partner: ModalType) => setShowPartnerPDF(partner)}
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
                <li>Cryptography Systems Engineer — Symbolic Encryption (Rust | C/C++)</li>
                <li>AI Systems Integrator — GenAI & LLM-Ops (Python | TypeScript | RAG | n8n)</li>
                <li>Product Designer — Agentic AI OS UI/UX (Web | Desktop | Mobile)</li>
                <li>Product Manager — Agentic AI OS Team Organization (Jira, Asana, Discord, Figma)</li>
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