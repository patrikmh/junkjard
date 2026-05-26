// audio.js — procedural Web Audio for the junkyard scene.
// All sounds synthesized from oscillators + envelopes. No external files.

(function(){
  let ctx = null;
  let masterGain = null;
  let ambientNodes = null;
  let volume = 0.7;
  let muted = false;

  function ensure(){
    if(ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if(!AC) return null;
    ctx = new AC();
    masterGain = ctx.createGain();
    masterGain.gain.value = muted ? 0 : volume;
    masterGain.connect(ctx.destination);
    return ctx;
  }

  function resume(){
    const c = ensure();
    if(c && c.state === 'suspended') c.resume();
  }

  function blip(freq, dur, type='sine', vol=0.25, attack=0.005, release=null){
    const c = ensure(); if(!c) return;
    const t0 = c.currentTime;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(masterGain);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  function noiseBuf(dur){
    const c = ensure(); if(!c) return null;
    const n = Math.floor(c.sampleRate * dur);
    const buf = c.createBuffer(1, n, c.sampleRate);
    const ch = buf.getChannelData(0);
    for(let i=0;i<n;i++) ch[i] = (Math.random()*2-1) * (1 - i/n);
    return buf;
  }

  // ── Public SFX ────────────────────────────────────────────
  const SFX = {
    hover(){
      blip(900, 0.07, 'sine', 0.08);
    },
    pickup(){
      // ascending blip
      blip(440, 0.08, 'triangle', 0.15);
      setTimeout(()=>blip(660, 0.08, 'triangle', 0.12), 50);
    },
    drop(){
      // wood clunk: short noise + low sine
      const c = ensure(); if(!c) return;
      const t0 = c.currentTime;
      const src = c.createBufferSource();
      const filter = c.createBiquadFilter();
      const g = c.createGain();
      src.buffer = noiseBuf(0.12);
      filter.type = 'lowpass';
      filter.frequency.value = 600;
      g.gain.setValueAtTime(0.3, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.18);
      src.connect(filter).connect(g).connect(masterGain);
      src.start(t0);
      // thud body
      blip(110, 0.18, 'sine', 0.35, 0.002);
      blip(72, 0.22, 'sine', 0.18, 0.002);
    },
    clink(){
      // metal tink: 2-3 high partials, fast decay
      blip(2400, 0.18, 'triangle', 0.06, 0.001);
      setTimeout(()=>blip(3200, 0.14, 'sine', 0.04), 10);
      setTimeout(()=>blip(1700, 0.22, 'triangle', 0.05), 20);
    },
    open(){
      // ascending arpeggio
      const notes = [392, 523, 659, 784];
      notes.forEach((f,i)=>setTimeout(()=>blip(f, 0.22, 'triangle', 0.16), i*55));
    },
    close(){
      blip(660, 0.08, 'triangle', 0.1);
      setTimeout(()=>blip(440, 0.1, 'triangle', 0.08), 50);
    },
    achievement(){
      // triumphant arpeggio
      const notes = [523, 659, 784, 1047, 1319];
      notes.forEach((f,i)=>setTimeout(()=>{
        blip(f, 0.3, 'triangle', 0.18);
        blip(f*2, 0.3, 'sine', 0.06);
      }, i*80));
    },
    buzz(){
      // bee buzz: short rough tone
      const c = ensure(); if(!c) return;
      const t0 = c.currentTime;
      const osc = c.createOscillator();
      const g = c.createGain();
      const lfo = c.createOscillator();
      const lfoG = c.createGain();
      osc.type = 'sawtooth';
      osc.frequency.value = 220;
      lfo.frequency.value = 28;
      lfoG.gain.value = 40;
      lfo.connect(lfoG).connect(osc.frequency);
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.12, t0 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.4);
      osc.connect(g).connect(masterGain);
      osc.start(t0); lfo.start(t0);
      osc.stop(t0 + 0.42); lfo.stop(t0 + 0.42);
    },
    error(){
      blip(220, 0.18, 'square', 0.08);
    }
  };

  // ── Ambient loop: wind + occasional bird ──────────────────
  function startAmbient(){
    const c = ensure(); if(!c) return;
    if(ambientNodes) return;

    // pink-ish noise wind
    const src = c.createBufferSource();
    const n = Math.floor(c.sampleRate * 4);
    const buf = c.createBuffer(1, n, c.sampleRate);
    const ch = buf.getChannelData(0);
    let b0=0,b1=0,b2=0;
    for(let i=0;i<n;i++){
      const w = Math.random()*2-1;
      b0 = 0.99*b0 + w*0.05; b1 = 0.96*b1 + w*0.04; b2 = 0.86*b2 + w*0.03;
      ch[i] = (b0+b1+b2) * 0.45;
    }
    src.buffer = buf; src.loop = true;

    const filter = c.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 380;

    const lfo = c.createOscillator();
    const lfoG = c.createGain();
    lfo.frequency.value = 0.08;
    lfoG.gain.value = 120;
    lfo.connect(lfoG).connect(filter.frequency);

    const g = c.createGain();
    g.gain.value = 0.18;
    src.connect(filter).connect(g).connect(masterGain);
    src.start();
    lfo.start();

    // birds: random chirps every 6-14s
    const birdTimer = setInterval(()=>{
      if(muted) return;
      const base = 1400 + Math.random()*1200;
      const c2 = ensure(); if(!c2) return;
      const t0 = c2.currentTime;
      const osc = c2.createOscillator();
      const og = c2.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(base, t0);
      osc.frequency.exponentialRampToValueAtTime(base*1.5, t0+0.06);
      osc.frequency.exponentialRampToValueAtTime(base*0.9, t0+0.14);
      og.gain.setValueAtTime(0, t0);
      og.gain.linearRampToValueAtTime(0.06, t0+0.02);
      og.gain.exponentialRampToValueAtTime(0.0001, t0+0.16);
      osc.connect(og).connect(masterGain);
      osc.start(t0); osc.stop(t0+0.18);
      // second chirp
      setTimeout(()=>{
        const tt = c2.currentTime;
        const o2 = c2.createOscillator(); const g2 = c2.createGain();
        o2.type = 'sine'; o2.frequency.setValueAtTime(base*1.1, tt);
        o2.frequency.exponentialRampToValueAtTime(base*0.85, tt+0.12);
        g2.gain.setValueAtTime(0, tt);
        g2.gain.linearRampToValueAtTime(0.05, tt+0.02);
        g2.gain.exponentialRampToValueAtTime(0.0001, tt+0.14);
        o2.connect(g2).connect(masterGain);
        o2.start(tt); o2.stop(tt+0.16);
      }, 180);
    }, 6000 + Math.random()*8000);

    ambientNodes = { src, lfo, birdTimer };
  }
  function stopAmbient(){
    if(!ambientNodes) return;
    try{ ambientNodes.src.stop(); }catch(e){}
    try{ ambientNodes.lfo.stop(); }catch(e){}
    clearInterval(ambientNodes.birdTimer);
    ambientNodes = null;
  }

  // ── Controls ──────────────────────────────────────────────
  function setVolume(v){
    volume = v;
    if(masterGain) masterGain.gain.value = muted ? 0 : v;
  }
  function setMuted(m){
    muted = m;
    if(masterGain) masterGain.gain.value = m ? 0 : volume;
    if(m) stopAmbient();
  }

  window.JunkAudio = {
    resume, SFX, startAmbient, stopAmbient, setVolume, setMuted,
    get muted(){ return muted; },
    get volume(){ return volume; }
  };
})();
