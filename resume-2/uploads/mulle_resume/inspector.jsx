// inspector.jsx — content panels for each resume section.

const RESUME = {
  name: "Patrik G. Andersson",
  role: "Data Scientist",
  location: "Göteborg, Sweden (Hybrid / Remote EU)",
  email: "patrik.andersson@example.com",
  phone: "+46 76 901 18 98",
  linkedin: "linkedin.com/in/patrik-g-andersson-771891158",
  github: "github.com/PatrikGAndersson",

  summary: [
    "Data Scientist with 4+ years building production ML systems, AI-agents, and recommendation engines across event marketing, automotive safety, and engineering consulting.",
    "Delivered topic modeling, sales forecasting, and classification pipelines on Azure ML; designed RAG-based agentic systems with PostgreSQL/pgvector serving end users.",
    "MSc Cognitive Neuroscience + BSc Psychology (Cum Laude) with deep expertise in experimental design, statistical inference, and end-to-end model deployment."
  ],

  experience: [
    {
      role: "Data Scientist",
      company: "MarketHype",
      location: "Göteborg, Sweden — Hybrid",
      dates: "Jun 2025 — Present",
      bullets: [
        "Built agentic AI systems (A2UI, AGUI) that automate event marketing workflows across an internal webapp, email editor, and stats assistant.",
        "Developed BERTopic pipelines that segment customer survey responses and content into actionable clusters.",
        "Deployed sales forecasting models on Azure ML to predict ticket demand ahead of event launches.",
        "Architected a vector-DB solution on PostgreSQL + pgvector + RAG, with embedding auto-generated via DB triggers.",
        "Built recommendation, classification, and lead-scoring models for personalised email targeting.",
        "Built an agentic event classifier (Pydantic AI) that categorises events into taxonomy classes for search and filtering."
      ]
    },
    {
      role: "Data Scientist / ML Engineer",
      company: "2550 Engineering (Qamcom Group)",
      location: "Göteborg, Sweden — Hybrid",
      dates: "Oct 2024 — Apr 2025",
      bullets: [
        "Built containerised Linux environments (Docker) supporting a digital-twin platform for truck head-unit systems.",
        "Validated embedded-software behaviour with embedded-SW teams in simulated head-unit environments.",
        "Delivered automated testing and CI workflows for containerised embedded-Linux platforms."
      ]
    },
    {
      role: "Data / ML Consultant",
      company: "Infotiv",
      location: "Göteborg, Sweden",
      dates: "May 2022 — Sep 2024",
      bullets: [
        "Consulted on data science and ML projects across multiple clients; delivered statistical analyses, predictive models, and experimental designs."
      ]
    },
    {
      role: "Safety Researcher",
      company: "Volvo Cars",
      location: "Göteborg, Sweden",
      dates: "May 2022 — Sep 2024",
      bullets: [
        "Led experiments at the Volvo test track as test leader for automotive safety research.",
        "Completed an internal ML upskilling programme on Pandas + analytical workflows.",
        "Designed simulator studies evaluating driver behaviour under controlled experimental conditions.",
        "Applied clustering (Hierarchical, DBSCAN) to segment driver feedback into safety insights.",
        "Built FastAPI + SQL layer over internal fleet data systems for programmatic telemetry access.",
        "Analysed safety-function usage data (collision avoidance, lane keeping, AEB) to identify adoption patterns.",
        "Built a fullstack gamification project to increase safety feature adoption, combining statistical analysis with an Android Automotive app."
      ]
    }
  ],

  projects: [
    { name: "Spotify Playlist Generator", desc: "AI app (Solar 10.7-b + Streamlit + DALL-E) that generates and saves playlists to Spotify." },
    { name: "TinyML Edge Inference", desc: "Real-time computer vision at ~15 fps on embedded devices using YOLO + MobileNet." },
    { name: "Intelligent Cat Water Fountain", desc: "Embedded CV (YOLO on MCU) that identifies individual cats and adjusts water flow live." },
    { name: "Agent Swarm Intelligence (pi.dev)", desc: "Bee-hive-inspired multi-agent swarm experiments to study emergent coordination." },
    { name: "Coding-Agent Harness Engineering", desc: "Extended the pi coding-agent harness with custom tooling for agent dev workflows." },
    { name: "Notion CLI Integration Tool", desc: "CLI that interfaces with Notion REST API to automate page creation, queries, and workspace management." },
    { name: "LLM Creative-Thinking Enhancer (.pi)", desc: "Implemented a research paper's method to elicit more divergent output from LLMs." },
    { name: "HybridGraphSemantic Space", desc: "Hybrid graph-vector DB combining knowledge-graph traversal with semantic search for local agent memory." }
  ],

  skills: {
    "Languages & Tools": ["Python", "SQL", "Bash", "Linux", "Git", "Streamlit", "Cursor", "Claude Code", "pi"],
    "ML & AI": ["Scikit-learn", "TensorFlow", "Keras", "PyTorch", "TinyML", "TF Lite", "LLMs", "CrewAI", "AutoGen", "LangChain", "LangGraph", "BERTopic", "Pydantic AI", "SHAP", "LIME"],
    "LLMs & Agents": ["OpenAI", "Anthropic", "Hugging Face", "LlamaIndex", "Ollama", "DSPy", "Dify", "n8n", "LiteLLM", "Instructor", "CrewAI", "LangGraph", "Pydantic AI", "Claude Code", "pi"],
    "Data & Cloud": ["Pandas", "NumPy", "Matplotlib", "Spark SQL", "Azure ML", "Azure", "Docker", "FastAPI", "MLflow", "REST APIs"],
    "Statistics": ["Mixed Effects", "TDA", "Bayesian Inference", "Experimental Design", "Causal Inference", "Time-Series", "Multivariate"],
    "DBs & Search": ["PostgreSQL", "pgvector", "Vector DBs", "RAG", "GraphRAG", "ChromaDB", "Pinecone"],
    "Edge & Vision": ["YOLO", "MobileNet", "Real-time Inference", "Embedded ML", "OpenCV"]
  },

  education: [
    { degree: "MSc, Cognitive Neuroscience", school: "Radboud University, Netherlands" },
    { degree: "BSc, Psychology (Cum Laude)", school: "Göteborgs Universitet, Sweden", years: "2014 — 2016" },
    { degree: "Computer Software Engineering (IoT)", school: "KYH, Sweden" }
  ],

  hobbies: [
    { title: "Sailing", desc: "Owner of a Vindö 30 sailboat — chasing wind and quiet anchorages." },
    { title: "Music & playlists", desc: "Love discovering new music and obsessively curating playlists for every mood." },
    { title: "Nature", desc: "Being outdoors, hiking, and getting lost in forests and coastlines." },
    { title: "Food", desc: "Both eating and cooking — from experimental weeknight dinners to proper slow-food weekends." },
    { title: "Cats (and their water fountains)", desc: "One of my cats stars in an embedded CV system that recognises her and adjusts flow. Yes, really." },
    { title: "Multi-agent swarms", desc: "Tinkering with bee-hive inspired agent populations — emergent coordination in decentralised AI." },
    { title: "Hand-soldered electronics", desc: "If it has a microcontroller and can be made worse by adding a screen, I'm interested." }
  ],

  languages: [
    { name: "Swedish", level: "Native" },
    { name: "English", level: "Professional working" },
    { name: "Dutch", level: "Conversational" }
  ]
};

/* ── Inspector body components ────────────────────────────────── */

function InspAbout(){
  return (
    <div className="about">
      <div className="about-photo">
        <img src="assets/patrik.jpeg" alt="Patrik" />
      </div>
      <p><b>{RESUME.role}</b> · {RESUME.location}</p>
      {RESUME.summary.map((s,i)=> <p key={i}>{s}</p>)}
      <p style={{ marginTop: 8, fontFamily: 'Caveat, cursive', fontSize: 22, lineHeight: 1.1,
        color: '#5e7e3a' }}>
        Currently in: agentic AI, recommendation systems, RAG pipelines.
      </p>
    </div>
  );
}

function InspWork(){
  return (
    <div className="work">
      {RESUME.experience.map((j,i)=>(
        <div className="exp-block" key={i}>
          <h3 className="exp-role">{j.role}</h3>
          <p className="exp-co">
            <em>{j.company} — {j.location}</em>
            <span>{j.dates}</span>
          </p>
          <ul className="exp-bullets">
            {j.bullets.map((b,k)=> <li key={k}>{b}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

function InspProjects(){
  return (
    <div className="proj-grid">
      {RESUME.projects.map((p,i)=>(
        <div className="proj" key={i}>
          <h4>{p.name}</h4>
          <p>{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

function InspSkills(){
  return (
    <div>
      {Object.entries(RESUME.skills).map(([grp, list])=>(
        <div className="skills-grp" key={grp}>
          <h4>{grp}</h4>
          <div className="chips">
            {list.map(s => <span className="chip" key={s}>{s}</span>)}
          </div>
        </div>
      ))}
      <div className="skills-grp">
        <h4>Languages</h4>
        <div className="chips">
          {RESUME.languages.map(l => (
            <span className="chip" key={l.name}>{l.name} · <em>{l.level}</em></span>
          ))}
        </div>
      </div>
    </div>
  );
}

function InspEducation(){
  return (
    <div className="edu-grid">
      {RESUME.education.map((e,i)=>(
        <div className="edu" key={i}>
          <h4>{e.degree}</h4>
          <p>{e.school}{e.years ? ` · ${e.years}` : ''}</p>
        </div>
      ))}
    </div>
  );
}

function InspContact(){
  return (
    <div className="contact">
      <div className="contact-row"><b>Email</b><a href={`mailto:${RESUME.email}`}>{RESUME.email}</a></div>
      <div className="contact-row"><b>Phone</b><a href={`tel:${RESUME.phone}`}>{RESUME.phone}</a></div>
      <div className="contact-row"><b>LinkedIn</b><a href={`https://${RESUME.linkedin}`} target="_blank" rel="noreferrer">{RESUME.linkedin}</a></div>
      <div className="contact-row"><b>GitHub</b><a href={`https://${RESUME.github}`} target="_blank" rel="noreferrer">{RESUME.github}</a></div>
      <div className="contact-row"><b>Where</b><span>{RESUME.location}</span></div>
    </div>
  );
}

function InspHobbies(){
  return (
    <div className="hobbies">
      <p>The bits of life that fall outside the keyboard.</p>
      <ul className="hobby-list">
        {RESUME.hobbies.map((h,i)=>(
          <li key={i}><b>{h.title}</b><span>{h.desc}</span></li>
        ))}
      </ul>
    </div>
  );
}

const INSPECTORS = {
  about: InspAbout,
  work: InspWork,
  projects: InspProjects,
  skills: InspSkills,
  education: InspEducation,
  contact: InspContact,
  hobbies: InspHobbies
};

Object.assign(window, { RESUME, INSPECTORS });
