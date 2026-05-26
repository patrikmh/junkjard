// items.jsx — visual components for each electronic part.
// Built from simple geometric primitives (rects, circles, basic clip-paths).
// Each item is a self-contained box with art + screws/details.

const ItemArt = {
  /* CRT Monitor — Work Experience */
  monitor: ({ size = 110 }) => (
    <div style={{ position: 'relative', width: size, height: size * 0.95 }}>
      {/* base trapezoid */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: size * 0.45, height: size * 0.12, background: '#c9c2a8',
        clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0 100%)',
        boxShadow: 'inset 0 -2px 0 #8a8266'
      }} />
      {/* body */}
      <div style={{
        position: 'absolute', bottom: size * 0.1, left: '5%', width: '90%', height: size * 0.78,
        background: 'linear-gradient(180deg, #e6dcc0 0%, #c9bd9a 100%)',
        borderRadius: 8,
        boxShadow: 'inset -3px -3px 0 rgba(0,0,0,.15), inset 2px 2px 0 rgba(255,255,255,.3), 0 2px 0 #8a8266'
      }}>
        {/* screen */}
        <div style={{
          position: 'absolute', left: '8%', top: '12%', right: '8%', bottom: '24%',
          background: 'radial-gradient(ellipse at center, #6ec4d4 0%, #2a5a6e 80%)',
          borderRadius: 10,
          boxShadow: 'inset 0 0 12px rgba(0,0,0,.5), inset 0 2px 4px rgba(255,255,255,.2)'
        }}>
          {/* scanlines */}
          <div style={{ position: 'absolute', inset: 0, borderRadius: 10,
            background: 'repeating-linear-gradient(0deg, transparent 0 3px, rgba(0,0,0,.15) 3px 4px)',
            opacity: 0.5 }} />
          {/* tiny code */}
          <div style={{ position: 'absolute', left: '12%', top: '20%', color: '#cfe9ee',
            fontFamily: 'monospace', fontSize: size * 0.06, lineHeight: 1, opacity: 0.9,
            textShadow: '0 0 4px #6ec4d4' }}>
            $ ./run<br/>OK
          </div>
        </div>
        {/* knobs */}
        <div style={{ position: 'absolute', right: '6%', bottom: '6%', width: 8, height: 8,
          borderRadius: '50%', background: '#5a4a3a', boxShadow: '-14px 0 0 #5a4a3a' }} />
      </div>
    </div>
  ),

  /* Raspberry Pi board — Projects */
  pi: ({ size = 100 }) => (
    <div style={{ position: 'relative', width: size, height: size * 0.7 }}>
      <div style={{
        position: 'absolute', inset: 0, background: '#1f6a3a',
        borderRadius: 4,
        boxShadow: 'inset 0 0 0 1px #0e3a20, 0 2px 0 #0e3a20',
        backgroundImage:
          'radial-gradient(circle at 8% 12%, #c0c0c0 0 3px, transparent 3.5px),' +
          'radial-gradient(circle at 92% 12%, #c0c0c0 0 3px, transparent 3.5px),' +
          'radial-gradient(circle at 8% 88%, #c0c0c0 0 3px, transparent 3.5px),' +
          'radial-gradient(circle at 92% 88%, #c0c0c0 0 3px, transparent 3.5px)'
      }}>
        {/* central chip */}
        <div style={{ position: 'absolute', left: '30%', top: '30%', width: '28%', height: '40%',
          background: '#1a1a1a', borderRadius: 2,
          boxShadow: 'inset 0 0 0 1px #444, inset -2px -2px 0 rgba(255,255,255,.1)' }}>
          <div style={{ position: 'absolute', inset: '20% 20%', background: '#2a2a2a',
            borderRadius: 1 }} />
        </div>
        {/* gpio pins */}
        <div style={{ position: 'absolute', left: '6%', top: '6%', width: '20%', height: 5,
          background: '#3a2010',
          backgroundImage: 'repeating-linear-gradient(90deg, #d9a040 0 2px, transparent 2px 3px)' }} />
        {/* usb block */}
        <div style={{ position: 'absolute', right: '4%', bottom: '24%', width: '14%', height: '24%',
          background: '#8a8478', borderRadius: 1,
          boxShadow: 'inset 0 0 0 1px #5a564a' }} />
        {/* small caps */}
        <div style={{ position: 'absolute', left: '64%', top: '20%', width: 6, height: 6,
          borderRadius: '50%', background: '#d9a040',
          boxShadow: '0 12px 0 #d9a040, 12px 0 0 #d9a040' }} />
      </div>
    </div>
  ),

  /* Robot head — Skills */
  robot: ({ size = 110 }) => (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* antenna */}
      <div style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)',
        width: 2, height: size * 0.15, background: '#3a3a3a' }} />
      <div style={{ position: 'absolute', left: '50%', top: -2, transform: 'translateX(-50%)',
        width: 8, height: 8, borderRadius: '50%', background: '#c94a3a',
        boxShadow: '0 0 8px rgba(220,80,60,.6)' }} />
      {/* head */}
      <div style={{
        position: 'absolute', left: '8%', top: size * 0.15, right: '8%', bottom: '8%',
        background: 'linear-gradient(180deg, #b8b4a6 0%, #8a8478 100%)',
        borderRadius: 12,
        boxShadow: 'inset -3px -3px 0 rgba(0,0,0,.2), inset 2px 2px 0 rgba(255,255,255,.4), 0 2px 0 #5a564a'
      }}>
        {/* eye panel */}
        <div style={{ position: 'absolute', left: '12%', top: '18%', right: '12%', height: '32%',
          background: '#1a2a2e', borderRadius: 6,
          boxShadow: 'inset 0 0 0 1px #4a5a5e', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#6ec4d4',
            boxShadow: '0 0 6px #6ec4d4' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#6ec4d4',
            boxShadow: '0 0 6px #6ec4d4' }} />
        </div>
        {/* mouth grille */}
        <div style={{ position: 'absolute', left: '24%', right: '24%', bottom: '16%', height: '20%',
          background: '#2a2622', borderRadius: 3,
          backgroundImage: 'repeating-linear-gradient(0deg, #2a2622 0 2px, #4a4238 2px 3px)' }} />
        {/* screws */}
        <div style={{ position: 'absolute', left: 4, top: 4, width: 5, height: 5,
          borderRadius: '50%', background: '#3a352a', boxShadow: 'inset 0 0 0 1px #1a1a1a' }} />
        <div style={{ position: 'absolute', right: 4, top: 4, width: 5, height: 5,
          borderRadius: '50%', background: '#3a352a', boxShadow: 'inset 0 0 0 1px #1a1a1a' }} />
      </div>
    </div>
  ),

  /* Floppy disk — Education */
  floppy: ({ size = 90 }) => (
    <div style={{ position: 'relative', width: size, height: size }}>
      <div style={{
        position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #3a4a6a 0%, #2a3a52 100%)',
        borderRadius: 4,
        boxShadow: 'inset -2px -2px 0 rgba(0,0,0,.3), inset 2px 2px 0 rgba(255,255,255,.15), 0 2px 0 #1a2238'
      }}>
        {/* metal slider */}
        <div style={{ position: 'absolute', left: '24%', right: '24%', top: '8%', height: '24%',
          background: '#c8c8c0',
          boxShadow: 'inset 0 0 0 1px #888, inset 2px 0 0 #fff' }}>
          <div style={{ position: 'absolute', left: '40%', top: '20%', width: '20%', height: '60%',
            background: '#2a2a2a', borderRadius: 1 }} />
        </div>
        {/* label */}
        <div style={{ position: 'absolute', left: '10%', right: '10%', bottom: '8%', height: '52%',
          background: '#f3e9d6', borderRadius: 2,
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.25)',
          fontFamily: 'Caveat, cursive', fontSize: size * 0.13, lineHeight: 1.05,
          color: '#2d2419', padding: '6px 4px', textAlign: 'center' }}>
          MSc<br/>cog. neuro.
        </div>
      </div>
    </div>
  ),

  /* Vintage handset / phone — Contact */
  phone: ({ size = 120 }) => (
    <div style={{ position: 'relative', width: size, height: size * 0.6 }}>
      {/* base */}
      <div style={{ position: 'absolute', left: '6%', right: '6%', bottom: 0, height: '36%',
        background: 'linear-gradient(180deg, #3a2a1a 0%, #2a1a0e 100%)',
        borderRadius: '6px 6px 4px 4px',
        boxShadow: 'inset 0 -3px 0 rgba(0,0,0,.4), inset 0 2px 0 rgba(255,255,255,.1), 0 2px 0 #1a0e08'
      }} />
      {/* dial circle */}
      <div style={{ position: 'absolute', left: '40%', bottom: '6%', width: size * 0.22, height: size * 0.22,
        background: '#d9c8a8', borderRadius: '50%',
        boxShadow: 'inset 0 0 0 2px #3a2a1a' }}>
        <div style={{ position: 'absolute', inset: '24%', borderRadius: '50%', background: '#3a2a1a' }} />
      </div>
      {/* handset cradle (curved bar) */}
      <div style={{ position: 'absolute', left: '12%', right: '12%', top: '8%', height: size * 0.22,
        background: 'linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)',
        borderRadius: size * 0.11,
        boxShadow: 'inset 0 -3px 0 rgba(0,0,0,.5), inset 0 2px 0 rgba(255,255,255,.2)'
      }}>
        {/* ear & mouthpieces */}
        <div style={{ position: 'absolute', left: 4, top: '50%', transform: 'translateY(-50%)',
          width: size * 0.16, height: size * 0.16, borderRadius: '50%', background: '#0a0a0a',
          boxShadow: 'inset 0 0 0 2px #2a2a2a' }} />
        <div style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)',
          width: size * 0.16, height: size * 0.16, borderRadius: '50%', background: '#0a0a0a',
          boxShadow: 'inset 0 0 0 2px #2a2a2a' }} />
      </div>
      {/* coiled cord (just a few wavy circles) */}
      <div style={{ position: 'absolute', right: '2%', bottom: '24%', display: 'flex', gap: 1 }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ width: 4, height: 8, borderRadius: '50%',
            border: '1.5px solid #1a1a1a', background: 'transparent',
            transform: `translateY(${i%2 ? 2 : 0}px)` }} />
        ))}
      </div>
    </div>
  ),

  /* Climbing helmet (cat circuit detail) — Hobbies */
  helmet: ({ size = 110 }) => (
    <div style={{ position: 'relative', width: size, height: size * 0.7 }}>
      {/* helmet dome */}
      <div style={{ position: 'absolute', left: '8%', right: '8%', top: 0, bottom: '20%',
        background: 'linear-gradient(180deg, #d9d2bc 0%, #9c9580 100%)',
        borderRadius: '50% 50% 18% 18% / 80% 80% 28% 28%',
        boxShadow: 'inset -4px -4px 0 rgba(0,0,0,.18), inset 3px 3px 0 rgba(255,255,255,.4), 0 2px 0 #6e6852'
      }}>
        {/* sticker — yellow circle */}
        <div style={{ position: 'absolute', left: '38%', top: '22%', width: '28%', height: '28%',
          background: '#f0c419', borderRadius: '50%',
          boxShadow: 'inset 0 0 0 2px #2d2419',
          fontFamily: 'Caveat, cursive', fontSize: size * 0.08, lineHeight: 1,
          color: '#2d2419', display: 'grid', placeItems: 'center', textAlign: 'center', padding: 2 }}>
          GO<br/>EXPLORE
        </div>
        {/* vent slits */}
        <div style={{ position: 'absolute', left: '14%', top: '10%', width: '14%', height: '8%',
          background: '#2d2419', borderRadius: 2 }} />
        <div style={{ position: 'absolute', right: '14%', top: '10%', width: '14%', height: '8%',
          background: '#2d2419', borderRadius: 2 }} />
      </div>
      {/* chin straps */}
      <div style={{ position: 'absolute', left: '10%', bottom: 0, width: '8%', height: '24%',
        background: '#4a3a26', borderRadius: 1 }} />
      <div style={{ position: 'absolute', right: '10%', bottom: 0, width: '8%', height: '24%',
        background: '#4a3a26', borderRadius: 1 }} />
    </div>
  ),

  /* Polaroid camera — About */
  polaroid: ({ size = 110 }) => (
    <div style={{ position: 'relative', width: size, height: size * 0.85 }}>
      {/* body */}
      <div style={{ position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #e8e0c8 0%, #c0b89a 100%)',
        borderRadius: 6,
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.25), inset 0 -4px 0 rgba(0,0,0,.15), 0 2px 0 #6e6852'
      }}>
        {/* rainbow stripe */}
        <div style={{ position: 'absolute', left: 0, top: '14%', right: 0, height: 3,
          background: 'linear-gradient(90deg, #c94a3a 0 25%, #f0c419 25% 50%, #4f7e80 50% 75%, #5e7e3a 75% 100%)' }} />
        {/* lens */}
        <div style={{ position: 'absolute', left: '50%', top: '38%', transform: 'translateX(-50%)',
          width: size * 0.32, height: size * 0.32, borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #5a5a5a 0%, #1a1a1a 70%)',
          boxShadow: 'inset 0 0 0 4px #d9d2bc, inset 0 0 0 6px #2d2419, 0 2px 4px rgba(0,0,0,.4)' }}>
          <div style={{ position: 'absolute', left: '24%', top: '20%', width: '24%', height: '20%',
            borderRadius: '50%', background: 'rgba(255,255,255,.4)' }} />
        </div>
        {/* viewfinder */}
        <div style={{ position: 'absolute', right: '10%', top: '24%', width: size * 0.16, height: size * 0.12,
          background: '#1a1a1a', borderRadius: 2,
          boxShadow: 'inset 0 0 0 2px #d9d2bc' }} />
        {/* shutter button */}
        <div style={{ position: 'absolute', left: '14%', top: '20%', width: 8, height: 8,
          borderRadius: '50%', background: '#c94a3a',
          boxShadow: '0 1px 0 #6e2418' }} />
      </div>
    </div>
  )
};

/* Resume sections */
const SECTIONS = {
  about: {
    key: 'about', kind: 'polaroid', label: 'Polaroid',
    eyebrow: 'About me', title: 'Patrik G. Andersson',
    quip: '"That\'s me — the one in the junkyard."'
  },
  work: {
    key: 'work', kind: 'monitor', label: 'Old monitor',
    eyebrow: 'Work history', title: 'Boot sequence',
    quip: '"Let me power this thing up..."'
  },
  projects: {
    key: 'projects', kind: 'pi', label: 'Raspberry Pi',
    eyebrow: 'Projects', title: 'Side experiments',
    quip: '"This one still has scorch marks."'
  },
  skills: {
    key: 'skills', kind: 'robot', label: 'Robot head',
    eyebrow: 'Skills', title: 'What I tinker with',
    quip: '"He doesn\'t talk much, but he listens."'
  },
  education: {
    key: 'education', kind: 'floppy', label: 'Floppy disk',
    eyebrow: 'Education', title: 'School transcripts',
    quip: '"Hope this drive still spins..."'
  },
  contact: {
    key: 'contact', kind: 'phone', label: 'Rotary phone',
    eyebrow: 'Contact', title: 'Get in touch',
    quip: '"Dial-tone still works, somehow."'
  },
  hobbies: {
    key: 'hobbies', kind: 'helmet', label: 'Climbing helmet',
    eyebrow: 'Off the clock', title: 'Hobbies & curiosities',
    quip: '"Sailing a Vindö 30, curating playlists, cooking, and getting lost in nature."'
  }
};

/* Layout presets — item positions on stage (1280×542). */
const LAYOUTS = {
  classic: {
    /* loose arrangement across the foreground of the two piles */
    about:     { x: 130, y: 320, rot: -6 },
    work:      { x: 280, y: 270, rot: 3 },
    projects:  { x: 450, y: 340, rot: -2 },
    skills:    { x: 580, y: 250, rot: 4 },
    education: { x: 720, y: 340, rot: 8 },
    contact:   { x: 850, y: 290, rot: -4 },
    hobbies:   { x: 1000,y: 320, rot: 2 },
    bee:       { x: 600, y: 70,  rot: 0 }
  },
  scattered: {
    about:     { x: 110, y: 380, rot: 12 },
    work:      { x: 310, y: 220, rot: -8 },
    projects:  { x: 500, y: 380, rot: 10 },
    skills:    { x: 660, y: 200, rot: -6 },
    education: { x: 240, y: 360, rot: -14 },
    contact:   { x: 890, y: 350, rot: 8 },
    hobbies:   { x: 1020,y: 270, rot: -4 },
    bee:       { x: 380, y: 90,  rot: 0 }
  },
  stacked: {
    /* climbing up the right pile */
    about:     { x: 700, y: 380, rot: -3 },
    work:      { x: 800, y: 300, rot: 2 },
    projects:  { x: 720, y: 230, rot: -2 },
    skills:    { x: 830, y: 160, rot: 4 },
    education: { x: 650, y: 320, rot: -8 },
    contact:   { x: 880, y: 230, rot: 6 },
    hobbies:   { x: 760, y: 100, rot: -3 },
    bee:       { x: 500, y: 90,  rot: 0 }
  },
  workshop: {
    /* neat line on the foreground */
    about:     { x: 150, y: 380, rot: -2 },
    work:      { x: 290, y: 360, rot: 1 },
    projects:  { x: 430, y: 380, rot: -1 },
    skills:    { x: 570, y: 360, rot: 2 },
    education: { x: 710, y: 380, rot: 0 },
    contact:   { x: 850, y: 370, rot: -2 },
    hobbies:   { x: 990, y: 380, rot: 1 },
    bee:       { x: 1100,y: 130, rot: 0 }
  }
};

Object.assign(window, { ItemArt, SECTIONS, LAYOUTS });
