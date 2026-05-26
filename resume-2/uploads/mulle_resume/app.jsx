// app.jsx — main React app: scene assembly, drag/drop, parallax, state.

const { useState, useEffect, useRef, useCallback } = React;

/* ── Scene background pieces ──────────────────────────────────── */

function Sky({ parallax }){
  const px = parallax.x * 8;
  const py = parallax.y * 4;
  return (
    <>
      <div className="sky" />
      <div className="sun" style={{ transform: `translate(${-px}px,${-py}px)` }} />
      <div className="cloud" style={{ left: '10%', top: '8%', width: 120, height: 32,
        transform: `translate(${-px*1.5}px, 0)` }} />
      <div className="cloud" style={{ left: '36%', top: '14%', width: 80, height: 22,
        transform: `translate(${-px*2}px, 0)` }} />
      <div className="cloud" style={{ left: '78%', top: '6%', width: 100, height: 26,
        transform: `translate(${-px*1.2}px, 0)` }} />
      <div className="cloud" style={{ left: '55%', top: '18%', width: 60, height: 14,
        transform: `translate(${-px*2.4}px, 0)`, opacity: 0.6 }} />

      {/* Birds far away */}
      <div className="bird" style={{ left: '52%', top: '16%' }} />
      <div className="bird" style={{ left: '60%', top: '14%', transform: 'scale(0.7)',
        animationDelay: '6s' }} />
      <div className="bird" style={{ left: '46%', top: '20%', transform: 'scale(0.6)',
        animationDelay: '12s' }} />

      <div className="hills-far" style={{ transform: `translate(${-px*0.6}px, 0)` }} />
      <div className="water" style={{ transform: `translate(${-px*0.4}px, 0)` }} />
      <div className="hills-near" style={{ transform: `translate(${-px*0.9}px, 0)` }} />

      {/* distant trees */}
      <div className="tree" style={{ left: '4%', bottom: '50%' }} />
      <div className="tree" style={{ left: '9%', bottom: '49%', transform: 'scale(.8)' }} />
      <div className="tree" style={{ left: '70%', bottom: '50%', transform: 'scale(.9)' }} />
      <div className="tree" style={{ left: '76%', bottom: '49%', transform: 'scale(.7)' }} />
      <div className="tree" style={{ left: '88%', bottom: '50%', transform: 'scale(.85)' }} />
    </>
  );
}

function Ground(){
  return (
    <>
      <div className="ground" />
      <div className="ground-shadow" />
      {/* grass tufts */}
      <div className="grass-tuft" style={{ left: 80,  bottom: 60 }} />
      <div className="grass-tuft" style={{ left: 210, bottom: 100 }} />
      <div className="grass-tuft" style={{ left: 320, bottom: 60 }} />
      <div className="grass-tuft" style={{ left: 460, bottom: 110 }} />
      <div className="grass-tuft" style={{ left: 1100, bottom: 80 }} />
      <div className="grass-tuft" style={{ left: 1180, bottom: 130 }} />
      <div className="grass-tuft" style={{ left: 40,  bottom: 180 }} />
    </>
  );
}

function Barn(){
  return (
    <div className="barn">
      <div className="barn-roof" />
      <div className="barn-trim-top" />
      <div className="barn-body" />
      <div className="barn-window w1" />
      <div className="barn-window w2" />
      <div className="barn-door" />
    </div>
  );
}

function Decor(){
  return (
    <>
      {/* Satellite dish — big back element */}
      <div className="dish">
        <div className="dish-pole" />
        <div className="dish-bowl">
          <div className="dish-stripes" />
        </div>
      </div>

      {/* Wooden sign + post next to barn */}
      <div className="signpost" />
      <div className="sign">Patrik's Junk Lab — open</div>

      {/* Plants */}
      <div className="plant" style={{ left: 268, bottom: 240, transform: 'scale(1)' }}>
        <div className="plant-stem" />
        <div className="plant-leaf" />
        <div className="plant-leaf r" />
        <div className="plant-flower r" />
      </div>
      <div className="plant" style={{ left: 18, bottom: 230, transform: 'scale(.9)' }}>
        <div className="plant-stem" />
        <div className="plant-leaf" />
        <div className="plant-leaf r" />
        <div className="plant-flower" />
      </div>
      <div className="plant" style={{ left: 1140, bottom: 200, transform: 'scale(1.1)' }}>
        <div className="plant-stem" />
        <div className="plant-leaf" />
        <div className="plant-leaf r" />
        <div className="plant-flower b" />
      </div>
    </>
  );
}

function CatBuddy({ onPet }){
  return (
    <div className="cat" onClick={onPet} title="Pet the cat">
      <div className="cat-tail" />
      <div className="cat-body" />
      <div className="cat-head">
        <div className="cat-ear-l" />
        <div className="cat-ear-r" />
        <div className="cat-eye-l" />
        <div className="cat-eye-r" />
        <div className="cat-nose" />
      </div>
    </div>
  );
}

function Character({ talking }){
  return (
    <div className={`character${talking ? ' talking' : ''}`}>
      <div className="char-body" />
      <div className="char-arm left" />
      <div className="char-arm right" />
      <div className="char-portrait">
        <img src="assets/patrik.jpeg" alt="Patrik" />
      </div>
      <div className="char-speech">
        Hi! Drag a part to the workbench<br/>
        — or just click one to open.
      </div>
    </div>
  );
}

function Dust(){
  const motes = Array.from({ length: 14 }, (_, i) => i);
  return motes.map(i => (
    <div key={i} className="dust" style={{
      left: `${10 + Math.random()*80}%`,
      bottom: `${20 + Math.random()*40}%`,
      animationDelay: `${Math.random()*8}s`,
      animationDuration: `${6 + Math.random()*6}s`,
    }} />
  ));
}

/* ── Draggable Item ───────────────────────────────────────────── */

function DraggableItem({ section, layout, examined, stageRef, wobbleSeed = 0, onPick, onDrop, onClick, onHover }){
  const ref = useRef(null);
  const [pos, setPos] = useState(null);   // {x, y} in STAGE-LOCAL coords during drag
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });  // pointer offset from item top-left, in stage-local
  const startViewport = useRef({ x: 0, y: 0 });
  const moved = useRef(false);
  const Art = ItemArt[section.kind];

  // Viewport -> stage-local
  const toStage = (vx, vy) => {
    const stage = stageRef && stageRef.current;
    if(!stage) return { x: vx, y: vy };
    const r = stage.getBoundingClientRect();
    const sx = r.width / 1280;   // stage native is 1280 wide
    return { x: (vx - r.left) / sx, y: (vy - r.top) / sx };
  };

  const onPointerDown = (e) => {
    if(examined) return;
    e.preventDefault();
    const rect = ref.current.getBoundingClientRect();
    const ptStage = toStage(e.clientX, e.clientY);
    const itemTopLeftStage = toStage(rect.left, rect.top);
    offset.current = {
      x: ptStage.x - itemTopLeftStage.x,
      y: ptStage.y - itemTopLeftStage.y
    };
    startViewport.current = { x: e.clientX, y: e.clientY };
    moved.current = false;
    setPos({ x: ptStage.x - offset.current.x, y: ptStage.y - offset.current.y });
    setDragging(true);
    ref.current.setPointerCapture(e.pointerId);
    onPick(section.key);
  };
  const onPointerMove = (e) => {
    if(!dragging) return;
    const dx = e.clientX - startViewport.current.x;
    const dy = e.clientY - startViewport.current.y;
    if(Math.abs(dx) + Math.abs(dy) > 4) moved.current = true;
    const ptStage = toStage(e.clientX, e.clientY);
    setPos({ x: ptStage.x - offset.current.x, y: ptStage.y - offset.current.y });
  };
  const onPointerUp = (e) => {
    if(!dragging) return;
    setDragging(false);
    if(!moved.current){
      onClick(section.key);
    } else {
      onDrop(section.key, e.clientX, e.clientY);
    }
    setPos(null);
    try { ref.current.releasePointerCapture(e.pointerId); } catch(_){}
  };

  // Resting position from layout (absolute on stage)
  const restingStyle = {
    left: layout.x, top: layout.y,
    transform: `rotate(${layout.rot}deg)`,
    '--item-rot': `${layout.rot}deg`,
    '--wobble-dur': `${3.6 + (wobbleSeed % 4) * 0.6}s`,
    '--wobble-delay': `${(wobbleSeed % 5) * 0.3}s`
  };
  // Dragging style — absolute inside stage, stage-local coords
  const dragStyle = pos ? {
    left: pos.x, top: pos.y,
    transform: 'rotate(-2deg) scale(1.08)',
    transformOrigin: 'center center',
    zIndex: 1000
  } : null;

  return (
    <div
      ref={ref}
      className={`item${dragging ? ' dragging' : ''}${examined ? ' examined' : ''}`}
      style={dragStyle || restingStyle}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onMouseEnter={() => onHover(section.key)}
    >
      <Art />
      <div className="item-label">{section.label}</div>
    </div>
  );
}

/* ── Bee easter egg ───────────────────────────────────────────── */

function Bee({ x, y, found, onCatch }){
  if(found) return null;
  return (
    <div className="bee" style={{ left: x, top: y }} onClick={onCatch}>
      <div className="bee-body" />
      <div className="bee-wing" />
    </div>
  );
}

/* ── Inspector overlay ────────────────────────────────────────── */

function Inspector({ section, onClose }){
  const open = !!section;
  const Body = section ? INSPECTORS[section.key] : null;
  return (
    <>
      <div className={`inspector-backdrop${open ? ' open' : ''}`} onClick={onClose} />
      <div className={`inspector${open ? ' open' : ''}`}>
        {section && (
          <>
            <div className="insp-head">
              <div>
                <div className="insp-eyebrow">{section.eyebrow}</div>
                <h2 className="insp-title">{section.title}</h2>
                <div style={{ fontFamily: 'Caveat, cursive', fontSize: 18,
                  color: '#5e7e3a', marginTop: 4 }}>{section.quip}</div>
              </div>
              <button className="insp-close" onClick={onClose} aria-label="Close">✕</button>
            </div>
            <div className="insp-body">
              {Body && <Body />}
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ── Toast ────────────────────────────────────────────────────── */

function Toast({ message, sub, show }){
  return (
    <div className={`toast${show ? ' show' : ''}`}>
      {message}
      {sub && <small>{sub}</small>}
    </div>
  );
}

/* ── Stage scaler ─────────────────────────────────────────────── */

function useStageScale(){
  const [scale, setScale] = useState(1);
  useEffect(()=>{
    const update = () => {
      const sx = window.innerWidth / 1280;
      const sy = window.innerHeight / 542;
      setScale(Math.min(sx, sy, 1.4));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return scale;
}

/* ── Main App ─────────────────────────────────────────────────── */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "classic",
  "lighting": "day",
  "volume": 70,
  "muted": false
}/*EDITMODE-END*/;

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const scale = useStageScale();
  const stageRef = useRef(null);
  const workbenchRef = useRef(null);

  const [intro, setIntro] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [examined, setExamined] = useState(new Set());
  const [hoveredKey, setHoveredKey] = useState(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [toast, setToast] = useState(null);
  const [characterTalking, setCharacterTalking] = useState(true);
  const [beeFound, setBeeFound] = useState(false);
  const [wbTarget, setWbTarget] = useState(false);

  const layout = LAYOUTS[t.layout] || LAYOUTS.classic;
  const sectionList = ['about','work','projects','skills','education','contact','hobbies'];

  // audio init + ambient
  useEffect(()=>{
    JunkAudio.setVolume((t.volume ?? 70) / 100);
    JunkAudio.setMuted(!!t.muted);
  }, [t.volume, t.muted]);

  const startAudio = useCallback(()=>{
    JunkAudio.resume();
    if(!t.muted) JunkAudio.startAmbient();
  }, [t.muted]);

  // parallax
  useEffect(()=>{
    const onMove = (e) => {
      const cx = window.innerWidth/2;
      const cy = window.innerHeight/2;
      setParallax({
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // achievement
  useEffect(()=>{
    if(examined.size === sectionList.length){
      setToast({ msg: "All parts examined!", sub: "Now go hire the man" });
      JunkAudio.SFX.achievement();
      const id = setTimeout(()=> setToast(null), 4200);
      return () => clearTimeout(id);
    }
  }, [examined]);

  // hide intro after 9s automatically
  useEffect(()=>{
    if(!intro) return;
    const id = setTimeout(()=> setIntro(false), 9000);
    return () => clearTimeout(id);
  }, [intro]);

  // character speech ON first 6 seconds after intro dismiss
  useEffect(()=>{
    if(intro) return;
    setCharacterTalking(true);
    const id = setTimeout(()=> setCharacterTalking(false), 5500);
    return () => clearTimeout(id);
  }, [intro]);

  const handleHover = (key) => {
    if(hoveredKey === key) return;
    setHoveredKey(key);
    JunkAudio.SFX.hover();
  };
  const handlePick = (key) => {
    JunkAudio.SFX.pickup();
  };
  const openSection = (key) => {
    const sec = SECTIONS[key];
    if(!sec) return;
    setActiveSection(sec);
    setExamined(prev => new Set(prev).add(key));
    JunkAudio.SFX.open();
  };
  const closeSection = () => {
    setActiveSection(null);
    JunkAudio.SFX.close();
  };

  // Detect drop on workbench (page coords)
  const handleDrop = (key, x, y) => {
    const wb = workbenchRef.current;
    if(!wb){ JunkAudio.SFX.drop(); return; }
    const r = wb.getBoundingClientRect();
    const hit = x >= r.left && x <= r.right && y >= r.top && y <= r.bottom + 30;
    JunkAudio.SFX.drop();
    if(hit){
      // small delay for the clink/clunk sequence
      setTimeout(()=> JunkAudio.SFX.clink(), 140);
      setTimeout(()=> openSection(key), 280);
    }
    setWbTarget(false);
  };

  // While ANY item is dragging, listen for pointermove on window to highlight workbench
  useEffect(()=>{
    const onMove = (e) => {
      // Only when a drag is happening — detect via .dragging element existing
      const drag = document.querySelector('.item.dragging');
      if(!drag){ setWbTarget(false); return; }
      const wb = workbenchRef.current;
      if(!wb) return;
      const r = wb.getBoundingClientRect();
      const hit = e.clientX >= r.left && e.clientX <= r.right
                  && e.clientY >= r.top && e.clientY <= r.bottom + 30;
      setWbTarget(hit);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const catchBee = () => {
    setBeeFound(true);
    JunkAudio.SFX.buzz();
    setToast({ msg: "Easter egg found 🐝", sub: "Ask Patrik about Agent Swarm Intelligence" });
    setTimeout(()=> setToast(null), 4500);
  };

  return (
    <div id="stage-wrap" onClick={startAudio}>
      <div
        id="stage"
        ref={stageRef}
        className={t.lighting === 'dusk' ? 'dusk' : ''}
        data-screen-label="Junkyard scene"
        style={{ transform: `translate(-50%,-50%) scale(${scale})` }}
      >
        {/* Painted background */}
        <div
          id="stage-bg"
          className={t.lighting === 'dusk' ? 'dusk-tint' : ''}
          style={{ backgroundImage: `url(${window.PATRIK_BG || 'assets/scrap.jpeg'})` }}
        />

        {/* Watercolor edge filter (used by selected overlays) */}
        <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
          <filter id="wc-edge">
            <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="3" />
          </filter>
        </svg>

        {/* Patrik's character (overlaid near the barn) */}
        <Character talking={characterTalking && !intro} />
        <CatBuddy onPet={() => JunkAudio.SFX.buzz()} />

        {/* Draggable items overlaid on the painting */}
        {sectionList.map((key, i) => (
          <DraggableItem
            key={key}
            section={SECTIONS[key]}
            layout={layout[key]}
            examined={examined.has(key)}
            stageRef={stageRef}
            wobbleSeed={i}
            onHover={handleHover}
            onPick={handlePick}
            onClick={openSection}
            onDrop={handleDrop}
          />
        ))}
        <Bee x={layout.bee.x} y={layout.bee.y} found={beeFound} onCatch={catchBee} />

        {/* Workbench (drop target) */}
        <div ref={workbenchRef} className={`workbench${wbTarget ? ' target' : ''}`}>
          <div className="workbench-label">Inspection Tray</div>
          <div className="workbench-hint">↳ drop a part here to inspect it</div>
          <div className="wb-tools">
            <div className="wb-lamp wb-tool">
              <div className="wb-lamp-base" />
              <div className="wb-lamp-neck" />
              <div className="wb-lamp-shade" />
              <div className="wb-lamp-bulb" />
            </div>
            <div className="wb-tool wb-screwdriver" />
            <div className="wb-tool wb-notepad" />
          </div>
          <div className="wb-lamp-glow" />
        </div>

        {/* HUD */}
        <div className="hud">
          <div className="title">
            Patrik's Junkyard
            <small>An interactive résumé</small>
          </div>
          <div className="counter">
            <span className="counter-label">{examined.size}/{sectionList.length}</span>
            <div className="counter-pips">
              {sectionList.map(k => (
                <div key={k} className={`pip${examined.has(k) ? ' on' : ''}`} title={SECTIONS[k].label} />
              ))}
            </div>
          </div>
        </div>

        <div className="toolbar">
          <button
            className="icon-btn"
            title={t.muted ? "Unmute" : "Mute"}
            onClick={() => {
              const m = !t.muted;
              setTweak('muted', m);
              if(!m){ JunkAudio.resume(); JunkAudio.startAmbient(); }
            }}
          >{t.muted ? '🔇' : '🔊'}</button>
        </div>

        {/* Intro card */}
        {intro && (
          <div className="intro">
            <h2>Welcome to the junkyard</h2>
            <p>
              I'm Patrik — Data Scientist, tinkerer, occasional canyoner.<br/>
              Each piece of electronic scrap is a part of my résumé.<br/>
              <b>Drag a part to the workbench</b> to inspect it, or just <b>click</b> to open.
            </p>
            <button onClick={() => { setIntro(false); startAudio(); }}>
              Start poking around →
            </button>
          </div>
        )}

        {toast && <Toast message={toast.msg} sub={toast.sub} show={!!toast} />}
        <Inspector section={activeSection} onClose={closeSection} />

        {/* Tweaks panel */}
        <TweaksPanel title="Tweaks">
          <TweakSection label="Scene" />
          <TweakSelect
            label="Item layout"
            value={t.layout}
            options={[
              { value:'classic',   label:'Classic pile' },
              { value:'scattered', label:'Scattered' },
              { value:'stacked',   label:'Stacked tower' },
              { value:'workshop',  label:'Workshop row' }
            ]}
            onChange={(v)=> setTweak('layout', v)}
          />
          <TweakRadio
            label="Lighting"
            value={t.lighting}
            options={['day','dusk']}
            onChange={(v)=> setTweak('lighting', v)}
          />
          <TweakSection label="Sound" />
          <TweakSlider
            label="Volume" value={t.volume} min={0} max={100} unit="%"
            onChange={(v)=> setTweak('volume', v)}
          />
          <TweakToggle
            label="Muted" value={t.muted}
            onChange={(v)=> setTweak('muted', v)}
          />
          <TweakSection label="Progress" />
          <TweakButton onClick={()=> {
            setExamined(new Set());
            setBeeFound(false);
            setActiveSection(null);
          }}>Reset exploration</TweakButton>
        </TweaksPanel>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
