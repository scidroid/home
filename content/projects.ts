export const projects = [
  {
    id: "pulpoo",
    title: "Pulpoo",
    shortDescription: "AI-powered productivity platform for businesses",
    fullDescription: "Pulpoo is a comprehensive productivity platform designed to streamline business operations through intelligent automation and AI-driven insights. The platform integrates task management, team collaboration, and performance analytics into a unified solution. With features like smart scheduling, automated workflow optimization, and real-time productivity metrics, Pulpoo helps teams work more efficiently. The platform leverages machine learning to identify bottlenecks, suggest process improvements, and provide personalized productivity recommendations for each team member.",
    tech: ["React", "Node.js", "AI/ML", "PostgreSQL", "AWS", "Docker"],
    link: "https://pulpoo.com",
    github: null,
    status: "active",
    year: "2024",
    featured: true,
    color: "purple",
    icon: "🚀",
    image: "/images/pulpoo.webp",
    highlights: [
      "AI-powered task automation",
      "Real-time productivity analytics",
      "Smart workflow optimization",
      "Team collaboration tools",
      "Performance insights dashboard"
    ]
  },
  {
    id: "col-ovo",
    title: "Col-Ovo",
    shortDescription: "Community-based epidemiological control system powered by AI",
    fullDescription: "Col-Ovo is an innovative epidemiological control system that combines community reporting with artificial intelligence to track and predict disease outbreaks. The platform enables citizens to report health symptoms and concerns through a mobile app, while AI algorithms analyze patterns to identify potential outbreaks early. Healthcare professionals access real-time dashboards showing disease spread, risk zones, and predictive models. The system includes features for contact tracing, vaccination tracking, and automated alerts to health authorities, making it a comprehensive solution for modern public health management.",
    tech: ["React Native", "Python", "TensorFlow", "MongoDB", "FastAPI", "Kubernetes"],
    link: null,
    github: null,
    status: "active",
    year: "2024",
    featured: true,
    color: "green",
    icon: "🏥",
    image: "/images/col-ovo.webp",
    highlights: [
      "Community health reporting",
      "AI-powered outbreak detection",
      "Real-time epidemiological tracking",
      "Contact tracing capabilities",
      "Predictive disease modeling"
    ]
  },
  {
    id: "agroscan",
    title: "Agroscan",
    shortDescription: "Offline distribution platform for agricultural AI models",
    fullDescription: "Agroscan is a revolutionary platform designed to bring AI-powered agricultural solutions to farmers in areas with limited internet connectivity. The platform allows users to download and run AI models locally on their devices for crop disease detection, yield prediction, and farming recommendations. With a focus on offline functionality, Agroscan includes a model marketplace where farmers can browse and download specialized AI models for their specific crops and regions. The platform features automatic model updates when connected, edge computing capabilities, and a simple interface designed for users with varying levels of technical expertise.",
    tech: ["Flutter", "TensorFlow Lite", "Python", "SQLite", "Edge Computing", "ONNX"],
    link: null,
    github: null,
    status: "development",
    year: "2024",
    featured: true,
    color: "orange",
    icon: "🌾",
    image: "/images/agroscan.webp",
    highlights: [
      "Offline AI model execution",
      "Agricultural model marketplace",
      "Crop disease detection",
      "Yield prediction algorithms",
      "Edge computing optimization"
    ]
  },
  {
    id: "canvas",
    title: "Canvas",
    shortDescription: "Interactive visual collaboration platform for creative teams",
    fullDescription: "Canvas is a modern collaboration platform designed for creative teams to work together on visual projects in real-time. The platform features an infinite canvas where team members can add designs, sketches, notes, and multimedia content. With built-in version control, real-time synchronization, and AI-powered design suggestions, Canvas facilitates seamless collaboration across distributed teams. The platform includes tools for mood boards, wireframing, prototyping, and design system management, making it a comprehensive solution for creative workflows. Advanced features include automated asset organization, smart layout suggestions, and integration with popular design tools.",
    tech: ["Vue.js", "WebRTC", "Canvas API", "Node.js", "Redis", "WebSockets"],
    link: null,
    github: null,
    status: "development",
    year: "2024",
    featured: true,
    color: "blue",
    icon: "🎨",
    image: "/images/canvas.webp",
    highlights: [
      "Real-time collaboration",
      "Infinite visual canvas",
      "AI-powered design suggestions",
      "Version control for designs",
      "Creative workflow management"
    ]
  }
];

export type Project = typeof projects[0];