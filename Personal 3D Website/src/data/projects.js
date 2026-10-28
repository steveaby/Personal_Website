export const projectCategories = [
  { id: "all", label: "All Projects & Research" },
  { id: "research", label: "Published Research (Springer Nature)" },
  { id: "ai_ml", label: "AI & ML Autonomous Systems" },
  { id: "fullstack", label: "Full-Stack & Database Systems" }
];

export const projectsData = [
  {
    id: "vectorquest",
    category: "research",
    categoryLabel: "Published Research (Springer Nature)",
    badge: "Springer Nature Published Research",
    badgeColor: "emerald",
    title: "VectorQuest // Research Publication",
    subtitle: "High-Speed Vector Space Indexing & Multi-Modal Question Answering",
    description: "Peer-reviewed published research in Springer Nature introducing compressed vector embedding topologies for high-dimensional semantic search and lightning-fast question answering.",
    detailedBio: "VectorQuest addresses high latency in multi-modal vector search by designing quantized sparse-dense hybrid indices. By pruning redundant high-dimensional embeddings and optimizing distance metric kernels, the system achieves 50x faster inference query cycles while preserving 98.2% semantic precision across multi-modal retrieval benchmarks.",
    images: [
      "/assets/VectorQuest.jpg"
    ],
    imageCaptions: [
      "Springer Nature Publication: Compressed Vector Embedding Space Architecture & Benchmark Latency Reductions"
    ],
    primaryImage: "/assets/VectorQuest.jpg",
    videoOrGif: null,
    techStack: ["NLP Embeddings", "Vector DBs (FAISS / Milvus)", "Python", "PyTorch", "Transformers", "Information Retrieval", "Quantization"],
    links: {
      publication: "https://link.springer.com/chapter/10.1007/978-3-031-88237-1_4"
    },
    metrics: [
      { label: "Prediction Speedup", value: "50x Faster" },
      { label: "Semantic Precision", value: "98.2% Accuracy" },
      { label: "Publisher", value: "Springer Nature" },
      { label: "Indexing Technique", value: "Quantized Hybrid Embeddings" }
    ],
    highlights: [
      "Co-authored research paper published by Springer Nature focusing on multi-modal information retrieval.",
      "Engineered vector quantization pipeline reducing embedding memory footprint by 75%.",
      "Benchmark evaluated on million-scale corpus achieving sub-5ms semantic retrieval times."
    ]
  },
  {
    id: "bugcatcher-joey",
    category: "ai_ml",
    categoryLabel: "AI & ML Autonomous Systems",
    badge: "Independent AI Venture",
    badgeColor: "violet",
    title: "BugCatcher Joey",
    subtitle: "AI Pokémon Strategist & Battle Simulator Suite",
    description: "An advanced competitive AI battle strategist utilizing combinatorial heuristics, Monte Carlo tree search (MCTS) algorithms, and predictive damage calculus to formulate optimal turn-by-turn strategies.",
    detailedBio: "BugCatcher Joey is a full-featured AI game intelligence suite featuring deep predictive decision trees. It computes minimax turn-ahead damage estimations, handles imperfect information and probabilistic move predictions, and provides a sleek interactive web dashboard for real-time battle simulation, item management, and team synergy optimization.",
    images: [
      "/assets/Bug_Sim.jpg",
      "/assets/Bug_Item.jpg",
      "/assets/Bug_Home.jpg",
      "/assets/Bug_Poke.jpg",
      "/assets/Bug_Opti.jpg"
    ],
    imageCaptions: [
      "1. Real-Time Battle Simulation Engine: Turn-by-Turn AI Decision Engine",
      "2. Item & Equipment Strategy Management Dashboard",
      "3. AI Strategist Home Command Center",
      "4. Pokémon Combat Roster & Stat Distribution Visualizer",
      "5. Team Synergy & Combinatorial Win-Rate Optimizer"
    ],
    primaryImage: "/assets/Bug_Sim.jpg",
    videoOrGif: null,
    techStack: ["Python", "PyTorch", "Monte Carlo Tree Search", "Game Theory", "React", "FastAPI", "Tailwind CSS"],
    links: {
      github: "https://github.com/ChinDandekar/bugcatcherjoey",
      demo: null
    },
    metrics: [
      { label: "Decision Engine", value: "Predictive MCTS" },
      { label: "Win Rate vs Baseline", value: "89.4%" },
      { label: "Search Space", value: "O(b^d) Optimized" },
      { label: "Simulation Speed", value: "10,000 Turns/sec" }
    ],
    highlights: [
      "Implemented customized Monte Carlo Tree Search algorithm with heuristic evaluation pruning.",
      "Engineered full reactive React frontend dashboard with live state telemetry and battle log feeds.",
      "Simulated over 1,000,000 automated matchups to tune neural network scoring weights."
    ]
  },
  {
    id: "hypersafety",
    category: "ai_ml",
    categoryLabel: "AI & ML Autonomous Systems",
    badge: "Computer Vision & ML Venture",
    badgeColor: "emerald",
    title: "HyperSafety",
    subtitle: "Vision & Real-Time ML Safety Intelligence System",
    description: "Deep learning computer vision framework for zero-latency hazardous condition recognition, PPE adherence monitoring, and autonomous edge alert generation.",
    detailedBio: "HyperSafety leverages high-throughput convolutional and transformer vision backbones optimized with TensorRT and CUDA. Operating on live camera streams, it detects safety non-compliance, hazardous machine proximities, and environmental risks with sub-14ms latency, generating instantaneous webhook alerts and forensic event logs.",
    images: [
      "/assets/hypersafety.gif",
      "/assets/HyperSafety_Logo.png"
    ],
    imageCaptions: [
      "1. Real-Time Live Inference Feed: Autonomous Bounding Box & PPE Compliance Tracking",
      "2. HyperSafety Neural Engine Brand & Architecture Architecture Topology"
    ],
    primaryImage: "/assets/hypersafety.gif",
    videoOrGif: "/assets/hypersafety.gif",
    techStack: ["OpenCV", "PyTorch", "YOLOv8 / CNNs", "TensorRT", "CUDA", "FastAPI", "Edge Computing"],
    links: {
      github: "https://github.com/ritviksharma4/HyperSafety_Frontend",
      demo: null
    },
    metrics: [
      { label: "Inference Latency", value: "< 14ms (60 FPS)" },
      { label: "Detection Precision", value: "97.8% mAP" },
      { label: "Deployment Model", value: "Edge / CUDA / TensorRT" },
      { label: "Alert Dispatch", value: "Sub-Second Webhooks" }
    ],
    highlights: [
      "Engineered real-time video pipeline capable of processing multiple concurrent HD camera feeds.",
      "Optimized model inference using TensorRT FP16 quantization for low-power edge devices.",
      "Built telemetry dashboard for automated incident logging and compliance analytics."
    ]
  },
  {
    id: "illiniride",
    category: "fullstack",
    categoryLabel: "Full-Stack & Database Systems",
    badge: "Featured Systems Project",
    badgeColor: "cyan",
    title: "IlliniRide",
    subtitle: "Full-Stack Campus Carpooling Database Platform",
    description: "A high-performance university ride-sharing and carpool coordination platform engineered for real-time concurrency, route optimization, and bulletproof relational integrity.",
    detailedBio: "IlliniRide is built to solve university transit logistics across Champaign-Urbana. Engineered with a strictly normalized BCNF/3NF relational schema in MariaDB, it uses atomic stored procedures and triggers to guarantee zero over-booking anomalies under high concurrent seat reservations, coupled with an Express.js API layer.",
    images: [],
    imageCaptions: [],
    primaryImage: null,
    videoOrGif: null,
    architecture: {
      backend: "Node.js / Express backend with connection pooling and secure JWT authentication.",
      database: "Complex SQL stored procedures & triggers ensuring atomic real-time seat reservation without deadlocks.",
      schema: "Formally verified BCNF / 3NF normalized schema preventing all update, deletion, and insertion anomalies."
    },
    techStack: ["Node.js", "Express.js", "MySQL / MariaDB", "SQL Stored Procedures", "BCNF / 3NF Schema Design", "REST APIs", "JavaScript"],
    links: {
      github: "https://github.com/steveaby/illiniride",
      demo: null
    },
    metrics: [
      { label: "Concurrency", value: "Real-Time Atomic" },
      { label: "Schema Normal Form", value: "BCNF / 3NF" },
      { label: "Transaction Speed", value: "< 2ms Stored Procs" },
      { label: "Data Integrity", value: "100% ACID Guaranteed" }
    ],
    highlights: [
      "Designed and proved formal mathematical BCNF decomposition across 8+ relational tables.",
      "Implemented database triggers and stored routines to handle concurrent booking race conditions.",
      "Constructed RESTful API endpoints with validation middleware and connection pool management."
    ]
  }
];
