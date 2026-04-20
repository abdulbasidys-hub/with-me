import { useState, useRef, useEffect } from 'react';

const CA = "PASTE_YOUR_CA_HERE";
const TWITTER = "https://x.com/your_me_handle";
const COMMUNITY = "https://x.com/i/communities/your_community_id";
const GEMINI_KEY = import.meta.env?.VITE_APP_GEMINI || '';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Permanent+Marker&family=Space+Grotesk:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--black:#0a0a0a;--white:#f5f0e8;--yellow:#FFE135;--red:#FF3B3B;--green:#22c55e}
html{scroll-behavior:smooth}
body{background:var(--black);color:var(--white);font-family:'Space Grotesk',sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased;cursor:crosshair}
::selection{background:var(--yellow);color:var(--black)}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:var(--black)}
::-webkit-scrollbar-thumb{background:var(--yellow)}

.marquee-outer{overflow:hidden;background:var(--yellow);border-top:3px solid var(--black);border-bottom:3px solid var(--black);padding:10px 0}
.marquee-track{display:flex;animation:marquee 18s linear infinite;white-space:nowrap}
.marquee-item{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:.08em;color:var(--black);padding:0 28px;flex-shrink:0;display:flex;align-items:center;gap:14px}
.mdot{width:7px;height:7px;background:var(--red);border-radius:50%;flex-shrink:0}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}

nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;background:rgba(10,10,10,.92);border-bottom:2px solid rgba(255,225,53,.2);backdrop-filter:blur(12px)}
.nav-logo{font-family:'Permanent Marker',cursive;font-size:26px;color:var(--yellow);transform:rotate(-2deg);display:inline-block;text-shadow:3px 3px 0 var(--red)}
.nav-right{display:flex;align-items:center;gap:8px}
.nav-btn{font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:.1em;padding:8px 18px;border:2px solid var(--white);background:transparent;color:var(--white);cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;transition:all .12s}
.nav-btn:hover{background:var(--white);color:var(--black)}
.nav-btn.yl{background:var(--yellow);border-color:var(--yellow);color:var(--black)}
.nav-btn.yl:hover{background:#f5d700}

.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:100px 24px 60px;position:relative;overflow:hidden}
.hero-bg{position:absolute;inset:0;background-image:url('wall.jpg');background-size:cover;background-position:center;opacity:.07;pointer-events:none}
.blob{position:absolute;border-radius:50%;pointer-events:none;opacity:.08}

.eyebrow{font-family:'Permanent Marker',cursive;font-size:18px;color:var(--yellow);transform:rotate(-2deg);display:inline-block;margin-bottom:16px;animation:wobble 3s ease-in-out infinite}
@keyframes wobble{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}

.hero-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(100px,20vw,220px);line-height:.88;letter-spacing:.02em;color:var(--white);position:relative;z-index:2;animation:titleDrop .6s cubic-bezier(.34,1.56,.64,1) both}
@keyframes titleDrop{from{opacity:0;transform:translateY(-40px) scale(1.05)}to{opacity:1;transform:translateY(0) scale(1)}}
.dollar{color:var(--yellow);text-shadow:6px 6px 0 var(--red),12px 12px 0 rgba(255,59,59,.3)}

.hero-sub{font-family:'Permanent Marker',cursive;font-size:clamp(18px,3vw,26px);color:var(--white);opacity:.7;margin:16px 0 36px;line-height:1.55;max-width:500px;animation:fadeUp .7s .2s ease-out both}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

.cta-row{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-bottom:36px;animation:fadeUp .7s .35s ease-out both}
.cta-big{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:.12em;padding:14px 36px;background:var(--yellow);color:var(--black);border:3px solid var(--black);cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;box-shadow:5px 5px 0 var(--black);transition:all .12s}
.cta-big:hover{transform:translate(-2px,-2px);box-shadow:7px 7px 0 var(--black)}
.cta-big:active{transform:translate(2px,2px);box-shadow:3px 3px 0 var(--black)}
.cta-sec{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:.12em;padding:14px 32px;background:transparent;color:var(--white);border:3px solid var(--white);cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;box-shadow:5px 5px 0 rgba(255,255,255,.25);transition:all .12s}
.cta-sec:hover{background:var(--white);color:var(--black)}

.ca-strip{display:flex;align-items:center;gap:14px;background:var(--white);border:3px solid var(--black);padding:12px 20px;cursor:pointer;max-width:560px;width:100%;box-shadow:4px 4px 0 var(--yellow);transition:all .12s;animation:fadeUp .7s .5s ease-out both;position:relative;z-index:2}
.ca-strip:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 var(--yellow)}
.ca-strip:active{transform:translate(1px,1px);box-shadow:3px 3px 0 var(--yellow)}
.ca-lbl{font-family:'Bebas Neue',sans-serif;font-size:13px;letter-spacing:.15em;color:var(--red);flex-shrink:0}
.ca-addr{font-family:'DM Mono',monospace;font-size:10px;color:var(--black);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ca-cpy{font-family:'Bebas Neue',sans-serif;font-size:13px;letter-spacing:.1em;color:var(--black);flex-shrink:0;transition:color .12s}
.ca-strip:hover .ca-cpy{color:var(--red)}

.why-section{padding:80px 24px;max-width:1000px;margin:0 auto}
.section-head{font-family:'Permanent Marker',cursive;font-size:clamp(36px,6vw,64px);color:var(--yellow);text-shadow:4px 4px 0 var(--red);margin-bottom:48px;transform:rotate(-1deg);display:inline-block}

.why-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:0}
.why-card{padding:32px 28px;border:3px solid var(--white);margin:-1.5px;position:relative;background:var(--black);transition:all .15s;cursor:default;overflow:hidden}
.why-card::before{content:'';position:absolute;inset:0;background:var(--yellow);transform:scaleY(0);transform-origin:bottom;transition:transform .2s ease;z-index:0}
.why-card:hover::before{transform:scaleY(1)}
.why-card:hover{color:var(--black)}
.why-card:hover .why-num{color:rgba(0,0,0,.12)}
.why-card:hover .why-txt{color:rgba(0,0,0,.65)}
.why-card>*{position:relative;z-index:1}
.why-num{font-family:'Bebas Neue',sans-serif;font-size:56px;line-height:1;color:rgba(255,255,255,.08);margin-bottom:8px;transition:color .15s}
.why-ttl{font-family:'Permanent Marker',cursive;font-size:22px;margin-bottom:12px;line-height:1.3}
.why-txt{font-size:13px;line-height:1.75;opacity:.6;transition:all .15s}

.manifesto{margin:48px 0 0;padding:36px 40px;background:var(--white);border:3px solid var(--black);box-shadow:8px 8px 0 var(--yellow);position:relative;overflow:hidden}
.manifesto::before{content:'"';position:absolute;top:-20px;left:16px;font-family:'Permanent Marker',cursive;font-size:120px;color:var(--yellow);opacity:.4;line-height:1;pointer-events:none}
.manifesto p{font-family:'Space Grotesk',sans-serif;font-size:clamp(14px,2vw,18px);line-height:1.85;color:var(--black);margin-bottom:12px;position:relative;z-index:1}
.manifesto p:last-child{font-family:'Permanent Marker',cursive;font-size:clamp(18px,2.5vw,24px);margin-bottom:0;color:var(--red)}

.pfp-section{background:var(--white);padding:80px 24px 100px;border-top:4px solid var(--black);border-bottom:4px solid var(--black);position:relative;overflow:hidden}
.pfp-section::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle,rgba(0,0,0,.05) 1px,transparent 1px);background-size:24px 24px;pointer-events:none}
.pfp-inner{max-width:960px;margin:0 auto;position:relative;z-index:1}

.pfp-head{text-align:center;margin-bottom:48px}
.pfp-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,8vw,88px);line-height:1;letter-spacing:.04em;color:var(--black);text-shadow:4px 4px 0 var(--yellow);margin-bottom:10px}
.pfp-sub{font-family:'Permanent Marker',cursive;font-size:clamp(16px,2.5vw,22px);color:rgba(0,0,0,.5);transform:rotate(-1deg);display:inline-block}

.pfp-layout{display:grid;grid-template-columns:1fr 56px 1fr;gap:0;align-items:start}
@media(max-width:640px){.pfp-layout{grid-template-columns:1fr;gap:20px}.pfp-arrow{transform:rotate(90deg)}}

.upload-panel,.result-panel{display:flex;flex-direction:column;gap:12px}
.panel-lbl{font-family:'Bebas Neue',sans-serif;font-size:14px;letter-spacing:.18em;color:var(--black);display:flex;align-items:center;gap:8px}
.panel-num{width:26px;height:26px;background:var(--black);color:var(--yellow);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0}

.drop-zone{aspect-ratio:1;border:3px dashed rgba(0,0,0,.22);background:rgba(0,0,0,.03);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s;overflow:hidden;position:relative}
.drop-zone:hover{border-color:var(--black);background:rgba(255,225,53,.1)}
.drop-zone.has-img{border-style:solid;border-color:var(--black)}
.drop-zone img{width:100%;height:100%;object-fit:cover;display:block}
.drop-inner{text-align:center;padding:20px;pointer-events:none}
.drop-icon{font-size:42px;margin-bottom:10px}
.drop-txt{font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:.1em;color:rgba(0,0,0,.4)}
.drop-hint{font-size:10px;color:rgba(0,0,0,.28);margin-top:4px;font-family:'DM Mono',monospace}

.arrow-col{display:flex;align-items:center;justify-content:center;padding-top:40px}
.pfp-arrow{font-family:'Bebas Neue',sans-serif;font-size:38px;color:var(--black);opacity:.25}

.result-zone{aspect-ratio:1;border:3px solid var(--black);background:#eee9e0;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}
.result-zone img{width:100%;height:100%;object-fit:cover;display:block}
.result-empty{text-align:center;padding:20px}
.result-big{font-family:'Bebas Neue',sans-serif;font-size:72px;line-height:1;color:rgba(0,0,0,.07);letter-spacing:.04em;margin-bottom:8px}
.result-hint{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:rgba(0,0,0,.22)}

.forge-wrap{margin-top:28px}
.forge-btn{width:100%;padding:20px;background:var(--black);color:var(--yellow);border:3px solid var(--black);font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,4vw,36px);letter-spacing:.12em;cursor:pointer;transition:all .12s;box-shadow:6px 6px 0 var(--yellow);display:flex;align-items:center;justify-content:center;gap:12px}
.forge-btn:hover:not(:disabled){background:var(--yellow);color:var(--black);transform:translate(-3px,-3px);box-shadow:9px 9px 0 var(--black)}
.forge-btn:active:not(:disabled){transform:translate(2px,2px);box-shadow:4px 4px 0 var(--yellow)}
.forge-btn:disabled{opacity:.38;cursor:not-allowed;box-shadow:none}

.prog-outer{height:6px;background:rgba(0,0,0,.1);border:2px solid var(--black);overflow:hidden;margin-top:8px}
.prog-inner{height:100%;background:var(--black);transition:width .5s ease}

.dl-btn{width:100%;padding:14px;background:var(--green);color:var(--black);border:3px solid var(--black);font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:.12em;cursor:pointer;transition:all .12s;box-shadow:4px 4px 0 var(--black);display:flex;align-items:center;justify-content:center;gap:8px;margin-top:10px}
.dl-btn:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 var(--black)}

.err-msg{padding:12px 16px;background:rgba(255,59,59,.1);border:2px solid var(--red);font-size:11px;color:var(--red);font-family:'DM Mono',monospace;display:flex;align-items:flex-start;gap:8px;margin-bottom:10px}
.err-msg button{background:none;border:none;color:var(--red);cursor:pointer;flex-shrink:0;font-size:16px;line-height:1}

.footer{background:var(--black);border-top:4px solid var(--white);padding:40px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px}
.footer-logo{font-family:'Permanent Marker',cursive;font-size:28px;color:var(--yellow);text-shadow:3px 3px 0 var(--red);transform:rotate(-2deg);display:inline-block}
.footer-links{display:flex;gap:10px;flex-wrap:wrap}
.footer-tag{font-family:'Permanent Marker',cursive;font-size:16px;color:rgba(255,255,255,.28);transform:rotate(1deg);display:inline-block}

@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.spin{animation:spin 1s linear infinite;display:inline-block}
@keyframes bncx{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
.bnc{animation:bncx .6s ease-in-out infinite}

@media(max-width:520px){
  nav{padding:0 14px;height:52px}
  .nav-btn span{display:none}
  .nav-btn{padding:6px 12px;font-size:13px}
  .hero{padding:80px 16px 48px}
  .why-section{padding:56px 16px}
  .pfp-section{padding:56px 16px 72px}
  .manifesto{padding:22px 18px}
  .ca-addr{font-size:9px}
}
`;

export default function App() {
  const [uploaded, setUploaded] = useState(null);
  const [b64, setB64] = useState(null);
  const [result, setResult] = useState(null);
  const [forging, setForging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState(null);
  const [copied, setCopied] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const fileRef = useRef(null);

  const STATUSES = ['Loading the mirror…','Swapping faces…','Becoming $ME…','Asking the trenches…','It starts with you…','Almost there…'];

  useEffect(() => {
    if (!forging) return;
    let i = 0; setStatusMsg(STATUSES[0]);
    const t = setInterval(() => { i = (i + 1) % STATUSES.length; setStatusMsg(STATUSES[i]); }, 2200);
    return () => clearInterval(t);
  }, [forging]);

  const handleFile = (f) => {
    if (!f || !f.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onloadend = () => { setUploaded(reader.result); setB64(reader.result.split(',')[1]); setResult(null); setErr(null); };
    reader.readAsDataURL(f);
  };

  const copyCA = () => {
    try { navigator.clipboard.writeText(CA); } catch { const el = document.createElement('textarea'); el.value = CA; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el); }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const forge = async () => {
    if (!b64 || forging) return;
    if (!GEMINI_KEY) { setErr('Add VITE_APP_GEMINI to your .env file.'); return; }
    setForging(true); setResult(null); setProgress(0); setErr(null);
    const timer = setInterval(() => setProgress(p => Math.min(p + Math.random() * 6, 88)), 800);
    try {
      const tRes = await fetch('/template.jpg');
      if (!tRes.ok) throw new Error('template.jpg not found in /public — add it first.');
      const tBlob = await tRes.blob();
      const templateB64 = await new Promise(resolve => { const r = new FileReader(); r.onloadend = () => resolve(r.result.split(',')[1]); r.readAsDataURL(tBlob); });

      const prompt = `Face swap task.

Image 1 = the $ME mascot template. Keep ALL of Image 1 exactly — the body, outfit, pose, background, art style, colors, everything. Do NOT change Image 1 at all except for the face/head area.

Image 2 = user's photo. Extract only their face/head.

Task: Replace the face of the character in Image 1 with the face from Image 2. The result should look like the $ME mascot wearing the user's face. Keep Image 1's style completely. Output same dimensions as Image 1, square format, high quality.`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${GEMINI_KEY}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: 'image/jpeg', data: templateB64 } }, { inlineData: { mimeType: 'image/jpeg', data: b64 } }] }], generationConfig: { responseModalities: ['TEXT', 'IMAGE'] } })
      });
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d?.error?.message || `API error ${res.status}`); }
      const data = await res.json();
      const imgData = data.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
      if (!imgData) throw new Error('No image returned — try again with a clearer photo.');
      setTimeout(() => { setResult(`data:image/png;base64,${imgData}`); setProgress(100); setForging(false); }, 400);
    } catch (e) { setErr(e.message || 'Something went wrong. Try again.'); setForging(false); }
    finally { clearInterval(timer); }
  };

  const MQ = ['$ME','Change Starts With Me','It Starts With Me','I Am The Floor','I Am The Culture','$ME','Stop Waiting','Be The Change','Make Your PFP','The Trenches Need You'];
  const MQ2 = [...MQ, ...MQ];

  return (
    <>
      <style>{css}</style>
      <nav>
        <div className="nav-logo">$ME</div>
        <div className="nav-right">
          <a className="nav-btn" href={TWITTER} target="_blank" rel="noopener noreferrer"><span>𝕏 Twitter</span></a>
          <a className="nav-btn" href={COMMUNITY} target="_blank" rel="noopener noreferrer"><span>Community</span></a>
          <a className="nav-btn yl" href="#pfpcult">Make PFP ↓</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        {[{w:300,h:300,top:'6%',left:'-7%',bg:'#FFE135'},{w:180,h:180,top:'65%',right:'-4%',bg:'#FF3B3B'},{w:150,h:150,top:'18%',right:'8%',bg:'#3B82FF'},{w:220,h:220,bottom:'6%',left:'4%',bg:'#FF6BDA'}].map((d,i)=>(
          <div key={i} className="blob" style={{width:d.w,height:d.h,top:d.top,left:d.left,right:d.right,bottom:d.bottom,background:d.bg}}/>
        ))}
        <div style={{position:'relative',zIndex:2,display:'flex',flexDirection:'column',alignItems:'center'}}>
          <div className="eyebrow">Solana's accountability coin ✌️</div>
          <h1 className="hero-title"><span className="dollar">$</span>ME</h1>
          <p className="hero-sub">The trenches doesn't need saving.<br/>It needs you to look in the mirror.</p>
          <div className="cta-row">
            <a className="cta-big" href="#pfpcult">🪞 Make Your $ME PFP</a>
            <a className="cta-sec" href={COMMUNITY} target="_blank" rel="noopener noreferrer">Join the Cult 🔥</a>
          </div>
          <div className="ca-strip" onClick={copyCA}>
            <div className="ca-lbl">CA</div>
            <div className="ca-addr">{CA}</div>
            <div className="ca-cpy">{copied ? '✓ Copied!' : 'Copy'}</div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-outer">
        <div className="marquee-track">{MQ2.map((t,i)=><div key={i} className="marquee-item">{t}<span className="mdot"/></div>)}</div>
      </div>

      {/* WHY */}
      <section className="why-section">
        <div className="section-head">Why $ME? 🤔</div>
        <div className="why-cards">
          {[
            {n:'01',title:"We're the problem 🤡",txt:"Not the bundlers. Not the bots. Not the devs. We snipe each other, dump on each other, follow the same callers into the same traps every single time."},
            {n:'02',title:"We keep waiting 😴",txt:"New meta, new narrative, new launchpad — always waiting for something outside us to change the game. Nobody is waiting for themselves to be the answer."},
            {n:'03',title:"Until now 🔥",txt:"$ME is for the person who finally looked in the mirror. Who stopped pointing. Who decided the only thing they can control is themselves."},
          ].map(c=>(
            <div key={c.n} className="why-card">
              <div className="why-num">{c.n}</div>
              <div className="why-ttl">{c.title}</div>
              <div className="why-txt">{c.txt}</div>
            </div>
          ))}
        </div>
        <div className="manifesto">
          <p>Nobody is coming to fix this. Not the platform. Not the devs. Not the next narrative. Not the bull run.</p>
          <p>The only person who changes how this goes is the person holding the phone right now.</p>
          <p>I am the floor. I am the culture. I am the solution. It starts with me. 🪞</p>
        </div>
      </section>

      {/* MARQUEE 2 */}
      <div className="marquee-outer" style={{background:'var(--black)',borderColor:'rgba(255,225,53,.3)'}}>
        <div className="marquee-track" style={{animationDirection:'reverse',animationDuration:'22s'}}>
          {MQ2.map((t,i)=><div key={i} className="marquee-item" style={{color:'var(--yellow)'}}>{t}<span className="mdot" style={{background:'var(--yellow)'}}/></div>)}
        </div>
      </div>

      {/* PFP CULT */}
      <section className="pfp-section" id="pfpcult">
        <div className="pfp-inner">
          <div className="pfp-head">
            <div className="pfp-title">PFP Cult 🪞</div>
            <div className="pfp-sub">Upload your face → become the $ME character</div>
          </div>
          <div className="pfp-layout">
            {/* Upload */}
            <div className="upload-panel">
              <div className="panel-lbl"><span className="panel-num">1</span>Your Photo</div>
              <div className={`drop-zone ${uploaded?'has-img':''}`} onClick={()=>fileRef.current?.click()} onDrop={e=>{e.preventDefault();handleFile(e.dataTransfer.files?.[0])}} onDragOver={e=>e.preventDefault()}>
                {uploaded ? <img src={uploaded} alt="Your face"/> : <div className="drop-inner"><div className="drop-icon">🤳</div><div className="drop-txt">Drop your photo here</div><div className="drop-hint">or click to browse</div></div>}
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={e=>handleFile(e.target.files?.[0])} style={{display:'none'}}/>
              {uploaded && <button onClick={()=>fileRef.current?.click()} style={{padding:'8px 14px',background:'transparent',border:'2px solid rgba(0,0,0,.2)',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'.1em',textTransform:'uppercase',cursor:'pointer',color:'rgba(0,0,0,.45)',transition:'all .12s'}} onMouseOver={e=>e.currentTarget.style.borderColor='var(--black)'} onMouseOut={e=>e.currentTarget.style.borderColor='rgba(0,0,0,.2)'}>Change photo</button>}
            </div>

            {/* Arrow */}
            <div className="arrow-col"><div className="pfp-arrow">→</div></div>

            {/* Result */}
            <div className="result-panel">
              <div className="panel-lbl"><span className="panel-num">2</span>Your $ME PFP</div>
              <div className="result-zone">
                {result ? <img src={result} alt="Your $ME PFP"/> : forging ? (
                  <div style={{textAlign:'center',padding:24}}>
                    <div className="spin" style={{fontSize:44,display:'block',marginBottom:14}}>🪞</div>
                    <div style={{fontFamily:'Permanent Marker,cursive',fontSize:17,color:'rgba(0,0,0,.45)',marginBottom:6}}>{statusMsg}</div>
                    <div style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'rgba(0,0,0,.28)'}}>{Math.round(progress)}%</div>
                  </div>
                ) : (
                  <div className="result-empty">
                    <div className="result-big">$ME</div>
                    <div className="result-hint">Your face goes here</div>
                  </div>
                )}
              </div>
              {forging && <div className="prog-outer"><div className="prog-inner" style={{width:`${progress}%`}}/></div>}
            </div>
          </div>

          {/* Forge */}
          <div className="forge-wrap">
            {err && <div className="err-msg"><span>{err}</span><button onClick={()=>setErr(null)}>✕</button></div>}
            <button className="forge-btn" onClick={forge} disabled={!b64||forging}>
              {forging ? <><span className="spin">⚡</span> Forging your $ME…</> : result ? '⚡ Forge Again' : '⚡ Forge My $ME PFP'}
            </button>
            {result && <button className="dl-btn" onClick={()=>{const a=document.createElement('a');a.href=result;a.download=`ME_PFP_${Date.now()}.png`;a.click()}}><span className="bnc">↓</span> Download & Set as PFP</button>}
            {result && <div style={{textAlign:'center',marginTop:14,fontFamily:'Permanent Marker,cursive',fontSize:16,color:'rgba(0,0,0,.4)',transform:'rotate(-1deg)'}}>Post it on X and tag us! 🔥</div>}
            <div style={{textAlign:'center',marginTop:result?8:14,fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'.14em',textTransform:'uppercase',color:'rgba(0,0,0,.25)'}}>Powered by Gemini AI · Your image is never stored</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">$ME</div>
        <div className="footer-links">
          <a className="nav-btn" href={TWITTER} target="_blank" rel="noopener noreferrer">𝕏 Twitter</a>
          <a className="nav-btn" href={COMMUNITY} target="_blank" rel="noopener noreferrer">Community</a>
          <div className="nav-btn" style={{cursor:'pointer'}} onClick={copyCA}>{copied?'✓ Copied':'Copy CA'}</div>
        </div>
        <div className="footer-tag">It starts with me. 🪞</div>
      </footer>
    </>
  );
}
