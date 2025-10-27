import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialSlide, setTestimonialSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('ai');
  const [email, setEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [stats, setStats] = useState({ users: 0, projects: 0, models: 0, uptime: 0 });
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [faqOpen, setFaqOpen] = useState(null);
  const [blogFilter, setBlogFilter] = useState('all');
  const [pricingPeriod, setPricingPeriod] = useState('monthly');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [newsletter, setNewsletter] = useState('');
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [portfolioFilter, setPortfolioFilter] = useState('all');
  const [teamMemberModal, setTeamMemberModal] = useState(null);
  const [techStackActive, setTechStackActive] = useState('frontend');
  const [counterStart, setCounterStart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [comparisonSlider, setComparisonSlider] = useState(50);
  const [timelineActive, setTimelineActive] = useState(0);

  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const pricingRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);
  const portfolioRef = useRef(null);
  const blogRef = useRef(null);

  const isStatsInView = useInView(statsRef, { once: true });
  const isFeaturesInView = useInView(featuresRef, { once: true });
  const isPortfolioInView = useInView(portfolioRef, { once: true });

  // Unsplash images - Using Unsplash Source API
  const heroImages = [
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80', // AI/ML
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80', // Blockchain
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80', // Technology
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80', // Network
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80', // Code
  ];

  const featureImages = {
    ai: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80',
    blockchain: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    security: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    cloud: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    database: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  };

  const teamImages = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
  ];

  const portfolioImages = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
  ];

  const blogImages = [
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
    'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=600&q=80',
    'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&q=80',
    'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&q=80',
  ];

  const partnerLogos = [
    'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80',
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&q=80',
    'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&q=80',
    'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=200&q=80',
    'https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=200&q=80',
    'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80',
  ];

  // Hero Slider Data
  const heroSlides = [
    {
      title: 'AI Nexus Platform',
      subtitle: 'Next-Gen AI Infrastructure',
      description: 'Combine the power of MERN stack, AI/ML models, RAG systems, blockchain storage, and Web3 authentication in one unified platform.',
      cta: 'Explore Dashboard',
      image: heroImages[0],
    },
    {
      title: 'Blockchain Integration',
      subtitle: 'Decentralized Storage Solutions',
      description: 'Secure your data with IPFS and Hardhat blockchain technology. Build trustless applications with ease.',
      cta: 'Learn More',
      image: heroImages[1],
    },
    {
      title: 'AI/ML Excellence',
      subtitle: 'Powered by Ollama & LangChain',
      description: 'Deploy cutting-edge machine learning models with seamless integration and optimal performance.',
      cta: 'Get Started',
      image: heroImages[2],
    },
    {
      title: 'Enterprise Security',
      subtitle: 'Bank-Grade Protection',
      description: 'JWT authentication, Keycloak integration, and advanced encryption keep your data safe.',
      cta: 'View Features',
      image: heroImages[3],
    },
    {
      title: 'Web3 Ready',
      subtitle: 'MetaMask Integration',
      description: 'Connect seamlessly with Web3 wallets and build the future of decentralized applications.',
      cta: 'Connect Wallet',
      image: heroImages[4],
    },
  ];

  // Features Data
  const features = [
    {
      id: 'ai',
      icon: '🤖',
      title: 'AI/ML Integration',
      description: 'Advanced AI capabilities with Ollama and LangChain',
      details: 'Leverage state-of-the-art machine learning models for natural language processing, computer vision, and predictive analytics. Our platform supports custom model training and deployment.',
      benefits: ['Custom Model Training', 'Real-time Inference', 'Auto-scaling', 'Model Versioning'],
      image: featureImages.ai,
    },
    {
      id: 'blockchain',
      icon: '🔗',
      title: 'Blockchain Storage',
      description: 'Decentralized storage with IPFS and Hardhat',
      details: 'Store your data securely on the blockchain with IPFS integration. Deploy smart contracts effortlessly using Hardhat development environment.',
      benefits: ['Immutable Storage', 'Smart Contracts', 'Gas Optimization', 'Multi-chain Support'],
      image: featureImages.blockchain,
    },
    {
      id: 'security',
      icon: '🔐',
      title: 'Secure Authentication',
      description: 'JWT tokens with Keycloak integration',
      details: 'Enterprise-grade security with JSON Web Tokens and Keycloak identity management. Support for SSO, OAuth2, and multi-factor authentication.',
      benefits: ['SSO Integration', 'OAuth2 Support', 'MFA Enabled', 'Role-based Access'],
      image: featureImages.security,
    },
    {
      id: 'rag',
      icon: '📊',
      title: 'RAG System',
      description: 'Retrieval-Augmented Generation with ChromaDB',
      details: 'Build intelligent chatbots and search systems with our RAG implementation. ChromaDB provides efficient vector storage and retrieval.',
      benefits: ['Vector Search', 'Semantic Matching', 'Context Aware', 'Fast Retrieval'],
      image: featureImages.analytics,
    },
    {
      id: 'web3',
      icon: '🌐',
      title: 'Web3 Ready',
      description: 'MetaMask and wallet integration',
      details: 'Connect to Web3 wallets seamlessly. Support for MetaMask, WalletConnect, and other popular wallet providers.',
      benefits: ['Wallet Connect', 'Transaction Signing', 'Network Switching', 'Token Management'],
      image: featureImages.cloud,
    },
    {
      id: 'cloud',
      icon: '☁️',
      title: 'Cloud Deployment',
      description: 'Free and scalable cloud hosting',
      details: 'Deploy your applications to the cloud with one click. Auto-scaling, load balancing, and CDN included.',
      benefits: ['Auto-scaling', 'Load Balancing', 'CDN Integration', 'Zero Downtime'],
      image: featureImages.database,
    },
  ];

  // Pricing Plans
  const pricingPlans = [
    {
      name: 'Starter',
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for learning and small projects',
      features: [
        '5 AI Models',
        '100 API Calls/day',
        '1 GB Storage',
        'Community Support',
        'Basic Analytics',
        'Public Repositories',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: { monthly: 49, annual: 470 },
      description: 'For professional developers and teams',
      features: [
        'Unlimited AI Models',
        '10,000 API Calls/day',
        '50 GB Storage',
        'Priority Support',
        'Advanced Analytics',
        'Private Repositories',
        'Custom Domains',
        'Collaboration Tools',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: { monthly: 199, annual: 1910 },
      description: 'For large-scale applications',
      features: [
        'Unlimited Everything',
        'Dedicated Support',
        '500 GB Storage',
        'Custom Integrations',
        'SLA Guarantee',
        'Advanced Security',
        'On-premise Option',
        'Training & Consulting',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  // Testimonials Data
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO at TechCorp',
      image: teamImages[1],
      rating: 5,
      text: 'AI Nexus transformed our development process. The integration of AI and blockchain is seamless and powerful.',
    },
    {
      name: 'Michael Chen',
      role: 'Lead Developer at StartupXYZ',
      image: teamImages[2],
      rating: 5,
      text: 'The best platform for building modern AI-powered applications. The documentation is excellent and the community is helpful.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Manager at InnovateLabs',
      image: teamImages[3],
      rating: 5,
      text: 'We reduced our development time by 60% using AI Nexus. The pre-built components and integrations are game-changers.',
    },
    {
      name: 'David Kim',
      role: 'Blockchain Architect',
      image: teamImages[4],
      rating: 5,
      text: 'The IPFS and Hardhat integration is flawless. Perfect for building decentralized applications quickly.',
    },
    {
      name: 'Lisa Anderson',
      role: 'AI Research Scientist',
      image: teamImages[5],
      rating: 5,
      text: 'Outstanding AI/ML capabilities. The platform supports all major frameworks and makes deployment effortless.',
    },
  ];

  // Team Members
  const teamMembers = [
    {
      name: 'Alex Thompson',
      role: 'CEO & Founder',
      image: teamImages[0],
      bio: 'Serial entrepreneur with 15+ years in AI and blockchain technology.',
      social: { twitter: '#', linkedin: '#', github: '#' },
    },
    {
      name: 'Sarah Martinez',
      role: 'Chief Technology Officer',
      image: teamImages[1],
      bio: 'Former Google engineer specializing in distributed systems and ML infrastructure.',
      social: { twitter: '#', linkedin: '#', github: '#' },
    },
    {
      name: 'James Wilson',
      role: 'Head of AI Research',
      image: teamImages[2],
      bio: 'PhD in Machine Learning from MIT, published researcher in NLP and computer vision.',
      social: { twitter: '#', linkedin: '#', github: '#' },
    },
    {
      name: 'Emma Brown',
      role: 'Blockchain Lead',
      image: teamImages[3],
      bio: 'Smart contract expert with contributions to major DeFi protocols.',
      social: { twitter: '#', linkedin: '#', github: '#' },
    },
    {
      name: 'Robert Lee',
      role: 'Head of Product',
      image: teamImages[4],
      bio: 'Product visionary with experience at Microsoft and Amazon.',
      social: { twitter: '#', linkedin: '#', github: '#' },
    },
    {
      name: 'Olivia Davis',
      role: 'Lead Designer',
      image: teamImages[5],
      bio: 'Award-winning UX designer focused on creating intuitive AI interfaces.',
      social: { twitter: '#', linkedin: '#', github: '#' },
    },
  ];

  // Blog Posts
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with AI Nexus Platform',
      excerpt: 'Learn how to set up your first AI-powered application in minutes.',
      image: blogImages[0],
      category: 'Tutorial',
      author: 'Alex Thompson',
      date: 'October 20, 2025',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'Building Decentralized Apps with IPFS',
      excerpt: 'A comprehensive guide to integrating IPFS storage in your projects.',
      image: blogImages[1],
      category: 'Blockchain',
      author: 'Emma Brown',
      date: 'October 18, 2025',
      readTime: '8 min read',
    },
    {
      id: 3,
      title: 'Advanced RAG Techniques with ChromaDB',
      excerpt: 'Optimize your retrieval-augmented generation systems for better performance.',
      image: blogImages[2],
      category: 'AI/ML',
      author: 'James Wilson',
      date: 'October 15, 2025',
      readTime: '10 min read',
    },
    {
      id: 4,
      title: 'Securing Your Applications with Keycloak',
      excerpt: 'Implement enterprise-grade authentication and authorization.',
      image: blogImages[3],
      category: 'Security',
      author: 'Sarah Martinez',
      date: 'October 12, 2025',
      readTime: '7 min read',
    },
    {
      id: 5,
      title: 'Web3 Integration Best Practices',
      excerpt: 'Connect your app to MetaMask and other Web3 wallets seamlessly.',
      image: blogImages[4],
      category: 'Web3',
      author: 'Robert Lee',
      date: 'October 10, 2025',
      readTime: '6 min read',
    },
    {
      id: 6,
      title: 'Deploying to Production: A Complete Guide',
      excerpt: 'Everything you need to know about deploying AI Nexus applications.',
      image: blogImages[5],
      category: 'DevOps',
      author: 'Olivia Davis',
      date: 'October 8, 2025',
      readTime: '12 min read',
    },
  ];

  // Portfolio Projects
  const portfolioProjects = [
    {
      id: 1,
      title: 'E-Commerce AI Chatbot',
      category: 'AI/ML',
      description: 'Intelligent customer service bot with natural language understanding.',
      image: portfolioImages[0],
      tags: ['LangChain', 'RAG', 'Node.js'],
      link: '#',
    },
    {
      id: 2,
      title: 'NFT Marketplace',
      category: 'Blockchain',
      description: 'Decentralized marketplace for digital collectibles.',
      image: portfolioImages[1],
      tags: ['IPFS', 'Hardhat', 'React'],
      link: '#',
    },
    {
      id: 3,
      title: 'Document Analysis System',
      category: 'AI/ML',
      description: 'AI-powered document processing and information extraction.',
      image: portfolioImages[2],
      tags: ['Ollama', 'Python', 'MongoDB'],
      link: '#',
    },
    {
      id: 4,
      title: 'Crypto Wallet Dashboard',
      category: 'Web3',
      description: 'Multi-chain wallet management interface.',
      image: portfolioImages[3],
      tags: ['MetaMask', 'Web3.js', 'React'],
      link: '#',
    },
    {
      id: 5,
      title: 'Supply Chain Tracker',
      category: 'Blockchain',
      description: 'Transparent supply chain management on blockchain.',
      image: portfolioImages[4],
      tags: ['Smart Contracts', 'IPFS', 'Express'],
      link: '#',
    },
    {
      id: 6,
      title: 'Sentiment Analysis Tool',
      category: 'AI/ML',
      description: 'Real-time social media sentiment monitoring.',
      image: portfolioImages[5],
      tags: ['NLP', 'LangChain', 'ChromaDB'],
      link: '#',
    },
    {
      id: 7,
      title: 'Decentralized Identity',
      category: 'Security',
      description: 'Self-sovereign identity management system.',
      image: portfolioImages[6],
      tags: ['Keycloak', 'Blockchain', 'JWT'],
      link: '#',
    },
    {
      id: 8,
      title: 'AI Code Assistant',
      category: 'AI/ML',
      description: 'Intelligent code completion and generation tool.',
      image: portfolioImages[7],
      tags: ['Ollama', 'VSCode', 'Node.js'],
      link: '#',
    },
  ];

  // FAQ Data
  const faqs = [
    {
      question: 'What is AI Nexus Platform?',
      answer: 'AI Nexus is a comprehensive development platform that combines MERN stack, AI/ML models, blockchain technology, and Web3 capabilities in a unified environment. It provides developers with all the tools needed to build modern, intelligent applications.',
    },
    {
      question: 'How does the pricing work?',
      answer: 'We offer three pricing tiers: Starter (free), Professional ($49/month), and Enterprise ($199/month). Annual plans receive a 20% discount. All plans include core features, with higher tiers offering more resources and premium support.',
    },
    {
      question: 'What AI models are supported?',
      answer: 'AI Nexus supports all major AI frameworks including Ollama for local LLM deployment, LangChain for building AI applications, and custom model integration. You can deploy GPT-style models, image recognition, and more.',
    },
    {
      question: 'Is blockchain integration included?',
      answer: 'Yes! Every plan includes IPFS integration for decentralized storage and Hardhat for smart contract development. Professional and Enterprise plans offer additional blockchain features and higher storage limits.',
    },
    {
      question: 'Can I deploy my own AI models?',
      answer: 'Absolutely! AI Nexus supports custom model deployment. You can train your own models or import pre-trained ones. We provide GPU acceleration and auto-scaling for optimal performance.',
    },
    {
      question: 'What security features are included?',
      answer: 'All plans include JWT authentication, encrypted data storage, and SSL certificates. Professional and Enterprise tiers add Keycloak integration, SSO, MFA, and advanced security auditing.',
    },
    {
      question: 'How does the RAG system work?',
      answer: 'Our RAG (Retrieval-Augmented Generation) system uses ChromaDB for vector storage and efficient semantic search. It enables you to build chatbots and search systems that understand context and provide accurate responses.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'The Starter plan is completely free forever. Professional plan includes a 14-day free trial with full access to all features. No credit card required to start.',
    },
    {
      question: 'What kind of support do you offer?',
      answer: 'Starter plans receive community support. Professional plans get priority email support with 24-hour response time. Enterprise customers receive dedicated support with a guaranteed SLA and phone support.',
    },
    {
      question: 'Can I migrate my existing application?',
      answer: 'Yes! We provide migration tools and documentation to help you transfer your existing applications to AI Nexus. Enterprise customers receive hands-on migration assistance from our team.',
    },
  ];

  // Technology Stack
  const techStack = {
    frontend: [
      { name: 'React', icon: '⚛️', description: 'UI Library' },
      { name: 'Next.js', icon: '▲', description: 'React Framework' },
      { name: 'TypeScript', icon: '💙', description: 'Type Safety' },
      { name: 'Tailwind CSS', icon: '🎨', description: 'Styling' },
      { name: 'Framer Motion', icon: '✨', description: 'Animations' },
      { name: 'Redux', icon: '🔄', description: 'State Management' },
    ],
    backend: [
      { name: 'Node.js', icon: '🟢', description: 'Runtime' },
      { name: 'Express', icon: '⚡', description: 'Web Framework' },
      { name: 'MongoDB', icon: '🍃', description: 'Database' },
      { name: 'PostgreSQL', icon: '🐘', description: 'SQL Database' },
      { name: 'Redis', icon: '🔴', description: 'Caching' },
      { name: 'GraphQL', icon: '◼️', description: 'API Layer' },
    ],
    ai: [
      { name: 'Ollama', icon: '🦙', description: 'LLM Runtime' },
      { name: 'LangChain', icon: '🦜', description: 'AI Framework' },
      { name: 'ChromaDB', icon: '🎨', description: 'Vector DB' },
      { name: 'TensorFlow', icon: '🧮', description: 'ML Framework' },
      { name: 'PyTorch', icon: '🔥', description: 'Deep Learning' },
      { name: 'Hugging Face', icon: '🤗', description: 'Model Hub' },
    ],
    blockchain: [
      { name: 'Hardhat', icon: '⛑️', description: 'Smart Contracts' },
      { name: 'IPFS', icon: '📦', description: 'Storage' },
      { name: 'Ethers.js', icon: '💎', description: 'Web3 Library' },
      { name: 'MetaMask', icon: '🦊', description: 'Wallet' },
      { name: 'Solidity', icon: '📜', description: 'Contract Language' },
      { name: 'The Graph', icon: '📊', description: 'Indexing' },
    ],
  };

  // Stats Counter Animation
  useEffect(() => {
    if (isStatsInView && !counterStart) {
      setCounterStart(true);
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      const targets = { users: 50000, projects: 12000, models: 500, uptime: 99.9 };

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setStats({
          users: Math.floor(targets.users * progress),
          projects: Math.floor(targets.projects * progress),
          models: Math.floor(targets.models * progress),
          uptime: Math.min(targets.uptime, (targets.uptime * progress).toFixed(1)),
        });

        if (step >= steps) {
          clearInterval(timer);
          setStats(targets);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isStatsInView, counterStart]);

  // Auto-play slider
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, heroSlides.length]);

  // Testimonial auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Scroll Progress
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setScrollProgress((scrolled / scrollHeight) * 100);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  // Image Lazy Loading
  const handleImageLoad = (imageUrl) => {
    setLoadedImages((prev) => ({ ...prev, [imageUrl]: true }));
  };

  // Form Handlers
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', newsletter);
    alert('Thank you for subscribing!');
    setNewsletter('');
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Filter Functions
  const filteredBlogPosts = blogFilter === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category.toLowerCase() === blogFilter.toLowerCase());

  const filteredPortfolio = portfolioFilter === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(project => project.category.toLowerCase() === portfolioFilter.toLowerCase());

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardHoverVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        type: 'spring',
        stiffness: 300,
      },
    },
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className={`homepage-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Scroll Progress Bar */}
      <motion.div
        className='scroll-progress-bar'
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #ff6b35, #f7931e)',
          transformOrigin: '0%',
          zIndex: 9999,
          scaleX: scrollProgress / 100,
        }}
      />

      {/* Navigation Header */}
     

      {/* Hero Section with Slider */}
      <section className='hero-section-enhanced' ref={heroRef} style={{  position: 'relative', height: '90vh',width:'full', overflow: 'hidden' }}>
        <AnimatePresence initial={false} custom={currentSlide}>
          <motion.div
            key={currentSlide}
            custom={currentSlide}
            variants={slideVariants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${heroSlides[currentSlide].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '0 50px' }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ textAlign: 'center', maxWidth: '800px' }}
              >
                <h1 style={{ fontSize: '64px', fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>
                  <span style={{ color: '#ff6b35' }}>{heroSlides[currentSlide].title.split(' ')[0]}</span>{' '}
                  {heroSlides[currentSlide].title.split(' ').slice(1).join(' ')}
                </h1>
                <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#f7931e' }}>
                  {heroSlides[currentSlide].subtitle}
                </h2>
                <p style={{ fontSize: '20px', lineHeight: '1.8', color: '#b8b8b8', marginBottom: '40px' }}>
                  {heroSlides[currentSlide].description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/dashboard')}
                  style={{
                    background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                    color: '#fff',
                    padding: '18px 40px',
                    fontSize: '18px',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  {heroSlides[currentSlide].cta} →
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <div style={{ position: 'absolute', bottom: '50px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '15px', zIndex: 10 }}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: currentSlide === index ? '40px' : '12px',
                height: '12px',
                borderRadius: '6px',
                background: currentSlide === index ? '#ff6b35' : 'rgba(255,255,255,0.5)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>

        {/* Slider Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          style={{
            position: 'absolute',
            left: '30px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,107,53,0.8)',
            border: 'none',
            color: '#fff',
            fontSize: '30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          ‹
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          style={{
            position: 'absolute',
            right: '30px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,107,53,0.8)',
            border: 'none',
            color: '#fff',
            fontSize: '30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          ›
        </button>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} style={{ padding: '100px 50px', background: 'linear-gradient(135deg, #1e293b, #0f172a)' }}>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isStatsInView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '50px', maxWidth: '1200px', margin: '0 auto' }}
        >
          <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '56px', fontWeight: 'bold', color: '#ff6b35', marginBottom: '10px' }}>
              {stats.users.toLocaleString()}+
            </div>
            <div style={{ fontSize: '20px', color: '#b8b8b8' }}>Active Users</div>
          </motion.div>
          <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '56px', fontWeight: 'bold', color: '#f7931e', marginBottom: '10px' }}>
              {stats.projects.toLocaleString()}+
            </div>
            <div style={{ fontSize: '20px', color: '#b8b8b8' }}>Projects Built</div>
          </motion.div>
          <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '56px', fontWeight: 'bold', color: '#4ade80', marginBottom: '10px' }}>
              {stats.models}+
            </div>
            <div style={{ fontSize: '20px', color: '#b8b8b8' }}>AI Models</div>
          </motion.div>
          <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '56px', fontWeight: 'bold', color: '#60a5fa', marginBottom: '10px' }}>
              {stats.uptime}%
            </div>
            <div style={{ fontSize: '20px', color: '#b8b8b8' }}>Uptime</div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section with Tabs */}
      <section id='features' ref={featuresRef} style={{ padding: '100px 50px', background: '#111827' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: '1400px', margin: '0 auto' }}
        >
          <h2 style={{ fontSize: '48px', textAlign: 'center', marginBottom: '20px', color: '#fff' }}>
            Powerful <span style={{ color: '#ff6b35' }}>Features</span>
          </h2>
          <p style={{ textAlign: 'center', fontSize: '20px', color: '#b8b8b8', marginBottom: '60px', maxWidth: '800px', margin: '0 auto 60px' }}>
            Everything you need to build next-generation AI and blockchain applications
          </p>

          {/* Feature Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '50px', flexWrap: 'wrap' }}>
            {features.map((feature) => (
              <motion.button
                key={feature.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(feature.id)}
                style={{
                  background: activeTab === feature.id ? 'linear-gradient(135deg, #ff6b35, #f7931e)' : 'transparent',
                  border: `2px solid ${activeTab === feature.id ? '#ff6b35' : '#374151'}`,
                  color: '#fff',
                  padding: '12px 30px',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s',
                }}
              >
                {feature.icon} {feature.title}
              </motion.button>
            ))}
          </div>

          {/* Active Feature Display */}
          <AnimatePresence mode='wait'>
            {features.map(
              (feature) =>
                activeTab === feature.id && (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '60px',
                      alignItems: 'center',
                      background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                      padding: '60px',
                      borderRadius: '20px',
                      border: '1px solid #374151',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '64px', marginBottom: '20px' }}>{feature.icon}</div>
                      <h3 style={{ fontSize: '36px', color: '#fff', marginBottom: '20px' }}>{feature.title}</h3>
                      <p style={{ fontSize: '18px', color: '#b8b8b8', lineHeight: '1.8', marginBottom: '30px' }}>
                        {feature.details}
                      </p>
                      <h4 style={{ fontSize: '24px', color: '#ff6b35', marginBottom: '15px' }}>Key Benefits</h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {feature.benefits.map((benefit, index) => (
                          <li key={index} style={{ fontSize: '16px', color: '#b8b8b8', marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                            <span style={{ color: '#4ade80', marginRight: '10px', fontSize: '20px' }}>✓</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <img
                        src={feature.image}
                        alt={feature.title}
                        style={{
                          width: '100%',
                          borderRadius: '15px',
                          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                        }}
                        onLoad={() => handleImageLoad(feature.image)}
                      />
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>

          {/* Feature Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate={isFeaturesInView ? 'visible' : 'hidden'}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '80px' }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                whileHover='hover'
                initial='rest'
                style={{
                  background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                  padding: '40px',
                  borderRadius: '15px',
                  border: '1px solid #374151',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '15px' }}>{feature.title}</h3>
                <p style={{ fontSize: '16px', color: '#b8b8b8', lineHeight: '1.6' }}>{feature.description}</p>
                {hoveredCard === feature.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ marginTop: '20px' }}
                  >
                    <button
                      onClick={() => setSelectedFeature(feature)}
                      style={{
                        background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                        color: '#fff',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        width: '100%',
                        fontWeight: 'bold',
                      }}
                    >
                      Learn More →
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Technology Stack Section */}
      <section style={{ padding: '100px 50px', background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '48px', textAlign: 'center', marginBottom: '20px', color: '#fff' }}>
            Technology <span style={{ color: '#ff6b35' }}>Stack</span>
          </h2>
          <p style={{ textAlign: 'center', fontSize: '20px', color: '#b8b8b8', marginBottom: '60px' }}>
            Built with the best open-source technologies
          </p>

          {/* Tech Stack Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '50px' }}>
            {Object.keys(techStack).map((category) => (
              <button
                key={category}
                onClick={() => setTechStackActive(category)}
                style={{
                  background: techStackActive === category ? 'linear-gradient(135deg, #ff6b35, #f7931e)' : 'transparent',
                  border: `2px solid ${techStackActive === category ? '#ff6b35' : '#374151'}`,
                  color: '#fff',
                  padding: '12px 30px',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  transition: 'all 0.3s',
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tech Stack Grid */}
          <AnimatePresence mode='wait'>
            <motion.div
              key={techStackActive}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}
            >
              {techStack[techStackActive].map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                    padding: '30px',
                    borderRadius: '15px',
                    border: '1px solid #374151',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>{tech.icon}</div>
                  <h4 style={{ fontSize: '24px', color: '#fff', marginBottom: '10px' }}>{tech.name}</h4>
                  <p style={{ fontSize: '16px', color: '#b8b8b8' }}>{tech.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id='portfolio' ref={portfolioRef} style={{ padding: '100px 50px', background: '#111827' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '48px', textAlign: 'center', marginBottom: '20px', color: '#fff' }}>
            Our <span style={{ color: '#ff6b35' }}>Portfolio</span>
          </h2>
          <p style={{ textAlign: 'center', fontSize: '20px', color: '#b8b8b8', marginBottom: '60px' }}>
            Explore projects built with AI Nexus Platform
          </p>

          {/* Portfolio Filter */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '50px', flexWrap: 'wrap' }}>
            {['all', 'AI/ML', 'Blockchain', 'Web3', 'Security'].map((category) => (
              <button
                key={category}
                onClick={() => setPortfolioFilter(category.toLowerCase())}
                style={{
                  background: portfolioFilter === category.toLowerCase() ? 'linear-gradient(135deg, #ff6b35, #f7931e)' : 'transparent',
                  border: `2px solid ${portfolioFilter === category.toLowerCase() ? '#ff6b35' : '#374151'}`,
                  color: '#fff',
                  padding: '10px 25px',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  textTransform: 'capitalize',
                  transition: 'all 0.3s',
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate={isPortfolioInView ? 'visible' : 'hidden'}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}
          >
            {filteredPortfolio.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                style={{
                  background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  border: '1px solid #374151',
                  cursor: 'pointer',
                }}
              >
                <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s',
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: '#ff6b35',
                      color: '#fff',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    {project.category}
                  </div>
                </div>
                <div style={{ padding: '25px' }}>
                  <h4 style={{ fontSize: '20px', color: '#fff', marginBottom: '10px' }}>{project.title}</h4>
                  <p style={{ fontSize: '14px', color: '#b8b8b8', marginBottom: '15px', lineHeight: '1.6' }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          background: '#374151',
                          color: '#b8b8b8',
                          padding: '5px 12px',
                          borderRadius: '15px',
                          fontSize: '12px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id='pricing' ref={pricingRef} style={{ padding: '100px 50px', background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '48px', textAlign: 'center', marginBottom: '20px', color: '#fff' }}>
            Simple <span style={{ color: '#ff6b35' }}>Pricing</span>
          </h2>
          <p style={{ textAlign: 'center', fontSize: '20px', color: '#b8b8b8', marginBottom: '40px' }}>
            Choose the perfect plan for your needs
          </p>

          {/* Pricing Toggle */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '60px' }}>
            <span style={{ color: '#b8b8b8', fontSize: '18px' }}>Monthly</span>
            <button
              onClick={() => setPricingPeriod(pricingPeriod === 'monthly' ? 'annual' : 'monthly')}
              style={{
                width: '60px',
                height: '30px',
                borderRadius: '15px',
                background: pricingPeriod === 'annual' ? '#ff6b35' : '#374151',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s',
              }}
            >
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: '#fff',
                  position: 'absolute',
                  top: '2px',
                  left: pricingPeriod === 'annual' ? '32px' : '2px',
                  transition: 'all 0.3s',
                }}
              />
            </button>
            <span style={{ color: '#b8b8b8', fontSize: '18px' }}>
              Annual <span style={{ color: '#4ade80', fontSize: '14px' }}>(Save 20%)</span>
            </span>
          </div>

          {/* Pricing Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                style={{
                  background: plan.popular ? 'linear-gradient(135deg, #ff6b35, #f7931e)' : 'linear-gradient(135deg, #1e293b, #0f172a)',
                  padding: '50px 40px',
                  borderRadius: '20px',
                  border: plan.popular ? '3px solid #ff6b35' : '1px solid #374151',
                  position: 'relative',
                  textAlign: 'center',
                }}
              >
                {plan.popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-15px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#4ade80',
                      color: '#000',
                      padding: '5px 20px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    MOST POPULAR
                  </div>
                )}
                <h3 style={{ fontSize: '28px', color: '#fff', marginBottom: '15px' }}>{plan.name}</h3>
                <p style={{ fontSize: '16px', color: plan.popular ? '#fff' : '#b8b8b8', marginBottom: '30px' }}>
                  {plan.description}
                </p>
                <div style={{ marginBottom: '30px' }}>
                  <span style={{ fontSize: '56px', fontWeight: 'bold', color: '#fff' }}>
                    ${plan.price[pricingPeriod]}
                  </span>
                  <span style={{ fontSize: '18px', color: plan.popular ? '#fff' : '#b8b8b8' }}>
                    /{pricingPeriod === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>
                <button
                  onClick={() => navigate('/signup')}
                  style={{
                    background: plan.popular ? '#fff' : 'linear-gradient(135deg, #ff6b35, #f7931e)',
                    color: plan.popular ? '#ff6b35' : '#fff',
                    padding: '15px 40px',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    width: '100%',
                    marginBottom: '30px',
                  }}
                >
                  {plan.cta}
                </button>
                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: '16px',
                        color: plan.popular ? '#fff' : '#b8b8b8',
                        marginBottom: '15px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ color: '#4ade80', marginRight: '10px', fontSize: '20px' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Slider */}
      <section id='testimonials' ref={testimonialsRef} style={{ padding: '100px 50px', background: '#111827', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '48px', textAlign: 'center', marginBottom: '20px', color: '#fff' }}>
            What Our <span style={{ color: '#ff6b35' }}>Users Say</span>
          </h2>
          <p style={{ textAlign: 'center', fontSize: '20px', color: '#b8b8b8', marginBottom: '60px' }}>
            Trusted by thousands of developers worldwide
          </p>

          {/* Testimonial Slider */}
          <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
            <AnimatePresence mode='wait'>
              <motion.div
                key={testimonialSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                  padding: '60px',
                  borderRadius: '20px',
                  border: '1px solid #374151',
                  textAlign: 'center',
                }}
              >
                <div style={{ marginBottom: '30px' }}>
                  {[...Array(testimonials[testimonialSlide].rating)].map((_, i) => (
                    <span key={i} style={{ color: '#f7931e', fontSize: '24px' }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: '22px', color: '#fff', lineHeight: '1.8', marginBottom: '40px', fontStyle: 'italic' }}>
                  "{testimonials[testimonialSlide].text}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                  <img
                    src={testimonials[testimonialSlide].image}
                    alt={testimonials[testimonialSlide].name}
                    style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <h4 style={{ fontSize: '22px', color: '#fff', marginBottom: '5px' }}>
                      {testimonials[testimonialSlide].name}
                    </h4>
                    <p style={{ fontSize: '16px', color: '#b8b8b8' }}>{testimonials[testimonialSlide].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonialSlide(index)}
                  style={{
                    width: testimonialSlide === index ? '30px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    background: testimonialSlide === index ? '#ff6b35' : '#374151',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                />
              ))}
            </div>
          </div>

          {/* All Testimonials Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '80px' }}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                style={{
                  background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                  padding: '30px',
                  borderRadius: '15px',
                  border: '1px solid #374151',
                }}
              >
                <div style={{ marginBottom: '15px' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} style={{ color: '#f7931e', fontSize: '18px' }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: '16px', color: '#b8b8b8', lineHeight: '1.6', marginBottom: '20px', fontStyle: 'italic' }}>
                  "{testimonial.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h5 style={{ fontSize: '16px', color: '#fff', marginBottom: '3px' }}>{testimonial.name}</h5>
                    <p style={{ fontSize: '14px', color: '#b8b8b8' }}>{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: '100px 50px', background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '48px', textAlign: 'center', marginBottom: '20px', color: '#fff' }}>
            Meet Our <span style={{ color: '#ff6b35' }}>Team</span>
          </h2>
          <p style={{ textAlign: 'center', fontSize: '20px', color: '#b8b8b8', marginBottom: '60px' }}>
            Passionate experts building the future of AI and blockchain
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                style={{
                  background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #374151',
                  cursor: 'pointer',
                }}
                onClick={() => setTeamMemberModal(member)}
              >
                <div style={{ height: '300px', overflow: 'hidden' }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s',
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  />
                </div>
                <div style={{ padding: '30px', textAlign: 'center' }}>
                  <h4 style={{ fontSize: '24px', color: '#fff', marginBottom: '10px' }}>{member.name}</h4>
                  <p style={{ fontSize: '16px', color: '#ff6b35', marginBottom: '15px' }}>{member.role}</p>
                  <p style={{ fontSize: '14px', color: '#b8b8b8', lineHeight: '1.6', marginBottom: '20px' }}>
                    {member.bio}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <a href={member.social.twitter} style={{ color: '#60a5fa', fontSize: '20px' }}>𝕏</a>
                    <a href={member.social.linkedin} style={{ color: '#60a5fa', fontSize: '20px' }}>in</a>
                    <a href={member.social.github} style={{ color: '#60a5fa', fontSize: '20px' }}>⚙</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id='blog' ref={blogRef} style={{ padding: '100px 50px', background: '#111827' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '48px', textAlign: 'center', marginBottom: '20px', color: '#fff' }}>
            Latest <span style={{ color: '#ff6b35' }}>Blog Posts</span>
          </h2>
          <p style={{ textAlign: 'center', fontSize: '20px', color: '#b8b8b8', marginBottom: '60px' }}>
            Insights, tutorials, and updates from our team
          </p>

          {/* Blog Filter */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '50px', flexWrap: 'wrap' }}>
            {['all', 'Tutorial', 'AI/ML', 'Blockchain', 'Security', 'Web3', 'DevOps'].map((category) => (
              <button
                key={category}
                onClick={() => setBlogFilter(category.toLowerCase())}
                style={{
                  background: blogFilter === category.toLowerCase() ? 'linear-gradient(135deg, #ff6b35, #f7931e)' : 'transparent',
                  border: `2px solid ${blogFilter === category.toLowerCase() ? '#ff6b35' : '#374151'}`,
                  color: '#fff',
                  padding: '10px 25px',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  textTransform: 'capitalize',
                  transition: 'all 0.3s',
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {filteredBlogPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                style={{
                  background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #374151',
                  cursor: 'pointer',
                }}
              >
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s',
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '15px',
                      left: '15px',
                      background: '#ff6b35',
                      color: '#fff',
                      padding: '6px 18px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    {post.category}
                  </div>
                </div>
                <div style={{ padding: '30px' }}>
                  <h4 style={{ fontSize: '22px', color: '#fff', marginBottom: '15px', lineHeight: '1.4' }}>
                    {post.title}
                  </h4>
                  <p style={{ fontSize: '16px', color: '#b8b8b8', lineHeight: '1.6', marginBottom: '20px' }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: '#b8b8b8' }}>
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <div style={{ marginTop: '15px', fontSize: '14px', color: '#b8b8b8' }}>{post.date}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '100px 50px', background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '48px', textAlign: 'center', marginBottom: '20px', color: '#fff' }}>
            Frequently Asked <span style={{ color: '#ff6b35' }}>Questions</span>
          </h2>
          <p style={{ textAlign: 'center', fontSize: '20px', color: '#b8b8b8', marginBottom: '60px' }}>
            Everything you need to know about AI Nexus Platform
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                style={{
                  background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                  borderRadius: '15px',
                  border: '1px solid #374151',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  style={{
                    width: '100%',
                    padding: '25px 30px',
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {faq.question}
                  <span style={{ fontSize: '24px', color: '#ff6b35' }}>
                    {faqOpen === index ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence>
                  {faqOpen === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ padding: '0 30px 25px', color: '#b8b8b8', fontSize: '16px', lineHeight: '1.8' }}
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section style={{ padding: '100px 50px', background: '#111827' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '48px', textAlign: 'center', marginBottom: '20px', color: '#fff' }}>
            Trusted By <span style={{ color: '#ff6b35' }}>Industry Leaders</span>
          </h2>
          <p style={{ textAlign: 'center', fontSize: '20px', color: '#b8b8b8', marginBottom: '60px' }}>
            Join thousands of companies building with AI Nexus
          </p>

          {/* Infinite Scroll Partners */}
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{ display: 'flex', gap: '60px', alignItems: 'center' }}
            >
              {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                <div
                  key={index}
                  style={{
                    minWidth: '200px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #374151',
                  }}
                >
                  <img
                    src={logo}
                    alt={`Partner ${index}`}
                    style={{ maxWidth: '150px', maxHeight: '60px', filter: 'grayscale(100%)', opacity: 0.7 }}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '120px 50px', background: 'linear-gradient(135deg, #ff6b35, #f7931e)', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ maxWidth: '900px', margin: '0 auto' }}
        >
          <h2 style={{ fontSize: '56px', color: '#fff', marginBottom: '30px', fontWeight: 'bold' }}>
            Ready to Build the Future?
          </h2>
          <p style={{ fontSize: '24px', color: '#fff', marginBottom: '50px', lineHeight: '1.6' }}>
            Join 50,000+ developers building AI-powered applications with blockchain technology
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signup')}
              style={{
                background: '#fff',
                color: '#ff6b35',
                padding: '20px 50px',
                fontSize: '20px',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Get Started Free →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              style={{
                background: 'transparent',
                color: '#fff',
                padding: '20px 50px',
                fontSize: '20px',
                border: '2px solid #fff',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              View Demo
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section style={{ padding: '100px 50px', background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '42px', color: '#fff', marginBottom: '20px' }}>
            Stay Updated with <span style={{ color: '#ff6b35' }}>AI Nexus</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#b8b8b8', marginBottom: '40px' }}>
            Get the latest updates, tutorials, and exclusive content delivered to your inbox
          </p>
          <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '15px', maxWidth: '600px', margin: '0 auto' }}>
            <input
              type='email'
              value={newsletter}
              onChange={(e) => setNewsletter(e.target.value)}
              placeholder='Enter your email address'
              required
              style={{
                flex: 1,
                padding: '18px 25px',
                borderRadius: '50px',
                border: '1px solid #374151',
                background: '#1e293b',
                color: '#fff',
                fontSize: '16px',
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type='submit'
              style={{
                background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                color: '#fff',
                padding: '18px 40px',
                border: 'none',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Subscribe
            </motion.button>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section id='contact' ref={contactRef} style={{ padding: '100px 50px', background: '#111827' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '48px', textAlign: 'center', marginBottom: '20px', color: '#fff' }}>
            Get In <span style={{ color: '#ff6b35' }}>Touch</span>
          </h2>
          <p style={{ textAlign: 'center', fontSize: '20px', color: '#b8b8b8', marginBottom: '60px' }}>
            Have questions? We'd love to hear from you
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder='Your Name'
                  required
                  style={{
                    padding: '18px 25px',
                    borderRadius: '10px',
                    border: '1px solid #374151',
                    background: '#1e293b',
                    color: '#fff',
                    fontSize: '16px',
                  }}
                />
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder='Your Email'
                  required
                  style={{
                    padding: '18px 25px',
                    borderRadius: '10px',
                    border: '1px solid #374151',
                    background: '#1e293b',
                    color: '#fff',
                    fontSize: '16px',
                  }}
                />
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder='Your Message'
                  required
                  rows='6'
                  style={{
                    padding: '18px 25px',
                    borderRadius: '10px',
                    border: '1px solid #374151',
                    background: '#1e293b',
                    color: '#fff',
                    fontSize: '16px',
                    resize: 'vertical',
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type='submit'
                  style={{
                    background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                    color: '#fff',
                    padding: '18px',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Send Message →
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                  padding: '30px',
                  borderRadius: '15px',
                  border: '1px solid #374151',
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>📧</div>
                <h4 style={{ fontSize: '22px', color: '#fff', marginBottom: '10px' }}>Email Us</h4>
                <p style={{ fontSize: '16px', color: '#b8b8b8' }}>support@ainexus.com</p>
              </div>
              <div
                style={{
                  background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                  padding: '30px',
                  borderRadius: '15px',
                  border: '1px solid #374151',
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>💬</div>
                <h4 style={{ fontSize: '22px', color: '#fff', marginBottom: '10px' }}>Live Chat</h4>
                <p style={{ fontSize: '16px', color: '#b8b8b8' }}>Available 24/7 for support</p>
              </div>
              <div
                style={{
                  background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                  padding: '30px',
                  borderRadius: '15px',
                  border: '1px solid #374151',
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>📍</div>
                <h4 style={{ fontSize: '22px', color: '#fff', marginBottom: '10px' }}>Visit Us</h4>
                <p style={{ fontSize: '16px', color: '#b8b8b8' }}>
                  123 AI Street, Tech Valley<br />
                  San Francisco, CA 94105
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', padding: '80px 50px 40px', borderTop: '1px solid #374151' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '60px', marginBottom: '60px' }}>
            <div>
              <h3 style={{ fontSize: '28px', color: '#ff6b35', marginBottom: '20px', fontWeight: 'bold' }}>
                AI Nexus
              </h3>
              <p style={{ fontSize: '16px', color: '#b8b8b8', lineHeight: '1.8', marginBottom: '25px' }}>
                Next-generation AI infrastructure combining MERN, blockchain, and Web3 technologies.
              </p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <a href='#' style={{ color: '#60a5fa', fontSize: '24px' }}>𝕏</a>
                <a href='#' style={{ color: '#60a5fa', fontSize: '24px' }}>in</a>
                <a href='#' style={{ color: '#60a5fa', fontSize: '24px' }}>⚙</a>
                <a href='#' style={{ color: '#60a5fa', fontSize: '24px' }}>📘</a>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '20px', color: '#fff', marginBottom: '20px' }}>Product</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Features', 'Pricing', 'Documentation', 'API Reference', 'Changelog'].map((item) => (
                  <li key={item} style={{ marginBottom: '12px' }}>
                    <a href='#' style={{ color: '#b8b8b8', fontSize: '16px', textDecoration: 'none' }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '20px', color: '#fff', marginBottom: '20px' }}>Resources</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Blog', 'Tutorials', 'Community', 'Support', 'Status'].map((item) => (
                  <li key={item} style={{ marginBottom: '12px' }}>
                    <a href='#' style={{ color: '#b8b8b8', fontSize: '16px', textDecoration: 'none' }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '20px', color: '#fff', marginBottom: '20px' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['About Us', 'Careers', 'Press Kit', 'Partners', 'Contact'].map((item) => (
                  <li key={item} style={{ marginBottom: '12px' }}>
                    <a href='#' style={{ color: '#b8b8b8', fontSize: '16px', textDecoration: 'none' }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid #374151',
              paddingTop: '40px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <p style={{ color: '#b8b8b8', fontSize: '14px' }}>
              © 2025 AI Nexus Platform. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '30px' }}>
              <a href='#' style={{ color: '#b8b8b8', fontSize: '14px', textDecoration: 'none' }}>
                Privacy Policy
              </a>
              <a href='#' style={{ color: '#b8b8b8', fontSize: '14px', textDecoration: 'none' }}>
                Terms of Service
              </a>
              <a href='#' style={{ color: '#b8b8b8', fontSize: '14px', textDecoration: 'none' }}>
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {scrollProgress > 20 && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              position: 'fixed',
              bottom: '40px',
              right: '40px',
              background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
              color: '#fff',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              zIndex: 1000,
              boxShadow: '0 10px 30px rgba(255, 107, 53, 0.4)',
            }}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* Feature Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFeature(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000,
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                padding: '50px',
                borderRadius: '20px',
                maxWidth: '800px',
                width: '100%',
                border: '1px solid #374151',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '30px' }}>
                <div>
                  <div style={{ fontSize: '64px', marginBottom: '10px' }}>{selectedFeature.icon}</div>
                  <h3 style={{ fontSize: '36px', color: '#fff' }}>{selectedFeature.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedFeature(null)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '32px',
                    cursor: 'pointer',
                  }}
                >
                  ×
                </button>
              </div>
              <img
                src={selectedFeature.image}
                alt={selectedFeature.title}
                style={{ width: '100%', borderRadius: '10px', marginBottom: '30px' }}
              />
              <p style={{ fontSize: '18px', color: '#b8b8b8', lineHeight: '1.8', marginBottom: '30px' }}>
                {selectedFeature.details}
              </p>
              <h4 style={{ fontSize: '24px', color: '#ff6b35', marginBottom: '15px' }}>Key Benefits</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                {selectedFeature.benefits.map((benefit, index) => (
                  <li key={index} style={{ fontSize: '16px', color: '#b8b8b8', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#4ade80', marginRight: '10px', fontSize: '20px' }}>✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
