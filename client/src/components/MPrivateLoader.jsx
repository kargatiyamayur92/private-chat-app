import React from "react";

/**
 * M-Private animated loading screen.
 * Self-contained: styles are injected via a <style> tag, so this
 * component needs no external CSS file or build config to work.
 *
 * Usage:
 *   import MPrivateLoader from "./MPrivateLoader";
 *   <MPrivateLoader statusText="Securing your session" />
 */
export default function MPrivateLoader({
    statusText = "Securing your session",
    tagline = "End-to-end encrypted messaging",
}) {
    return (
        <div className="mp-stage">
            <style>{css}</style>

            <div className="mp-mark-wrap">
                <div className="mp-glow" />
                <div className="mp-ring mp-ring-outer" />
                <div className="mp-ring" />
                <div className="mp-badge">
                    <svg viewBox="0 0 24 24" fill="none" width="46" height="46">
                        <path
                            d="M4 6L12 12L20 6"
                            stroke="url(#mp-g1)"
                            strokeWidth="2.1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M4 6V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V6"
                            stroke="url(#mp-g1)"
                            strokeWidth="2.1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <defs>
                            <linearGradient id="mp-g1" x1="4" y1="6" x2="20" y2="18" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#7C5CFC" />
                                <stop offset="0.55" stopColor="#F0479B" />
                                <stop offset="1" stopColor="#FFB454" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="mp-lock-chip">
                        <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                            <rect x="5" y="11" width="14" height="9" rx="2" stroke="#0A0E17" strokeWidth="2" />
                            <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="#0A0E17" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>
            </div>

            <h1 className="mp-wordmark">
                <span className="mp-m">M</span>
                <span className="mp-dash">-</span>Private
            </h1>
            <p className="mp-tagline">{tagline}</p>

            <div className="mp-progress-track">
                <div className="mp-progress-fill" />
            </div>
            <p className="mp-status">
                {statusText}
                <span className="mp-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </span>
            </p>
        </div>
    );
}

const css = `
:root{
  --mp-bg-0:#0A0E17;
  --mp-bg-1:#0F1526;
  --mp-violet:#7C5CFC;
  --mp-pink:#F0479B;
  --mp-cyan:#2BD4D9;
  --mp-amber:#FFB454;
  --mp-ink:#EDEFF7;
  --mp-muted:#8890A6;
}

.mp-stage{
  position:absolute;
  z-index:1000;
  width:100%;
  height:100vh;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
   top: 50%;
   left:50%;
   transform: translate(-50%, -50%);
  overflow:hidden;
  backdrop-filter: blur(1px);           /* The magic line that blurs the background */
  -webkit-backdrop-filter: blur(10px);  
  font-family:'Segoe UI', ui-sans-serif, system-ui, -apple-system, sans-serif;
 
}

.mp-stage::before{
  content:"";
  position:absolute; inset:0;
   background-image:radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px);
  background-size:26px 26px;
  pointer-events:none;
}

.mp-mark-wrap{
  position:relative;
  width:150px;
  height:150px;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-bottom:34px;
}

.mp-ring{
  position:absolute;
  inset:0;
  border-radius:50%;
  padding:3px;
  background:conic-gradient(from 0deg,
    var(--mp-violet), var(--mp-pink) 30%, var(--mp-amber) 55%, var(--mp-cyan) 78%, var(--mp-violet) 100%);
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: mp-spin 2.4s linear infinite;
  opacity:0.95;
}
.mp-ring-outer{ animation-duration:5.5s; opacity:0.35; }

@keyframes mp-spin{ to{ transform:rotate(360deg); } }

.mp-glow{
  position:absolute;
  width:112px; height:112px;
  border-radius:50%;
  background:radial-gradient(circle, rgba(124,92,252,0.55), rgba(240,71,155,0.25) 55%, transparent 75%);
  filter:blur(14px);
  animation: mp-pulse 2.4s ease-in-out infinite;
}
@keyframes mp-pulse{
  0%,100%{ transform:scale(0.92); opacity:0.7; }
  50%{ transform:scale(1.08); opacity:1; }
}

.mp-badge{
  position:relative;
  width:92px; height:92px;
  border-radius:26px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:linear-gradient(145deg, #171E32, #0D1220);
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.06) inset,
    0 18px 40px -12px rgba(124,92,252,0.55);
}

.mp-lock-chip{
  position:absolute;
  bottom:-6px;
  right:-6px;
  width:30px; height:30px;
  border-radius:10px;
  background:linear-gradient(135deg, var(--mp-cyan), var(--mp-violet));
  display:flex;
  align-items:center;
  justify-content:center;
  box-shadow:0 6px 16px -4px rgba(43,212,217,0.6), 0 0 0 4px var(--mp-bg-0);
}

.mp-wordmark{
  font-size:28px;
  font-weight:700;
  letter-spacing:0.01em;
  color:var(--mp-ink);
  margin:0;
  display:flex;
  align-items:baseline;
  gap:2px;
}
.mp-m{
  background:linear-gradient(100deg, var(--mp-violet), var(--mp-pink) 55%, var(--mp-amber));
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
}
.mp-dash{ color:var(--mp-muted); font-weight:400; margin:0 1px; }

.mp-tagline{
  margin:8px 0 30px;
  font-size:13.5px;
  color:var(--mp-muted);
  letter-spacing:0.02em;
}

.mp-progress-track{
  width:180px;
  height:4px;
  border-radius:999px;
  background:rgba(255,255,255,0.08);
  overflow:hidden;
  position:relative;
}
.mp-progress-fill{
  position:absolute;
  inset:0;
  width:40%;
  border-radius:999px;
  background:linear-gradient(90deg, var(--mp-violet), var(--mp-pink), var(--mp-cyan));
  animation: mp-slide 1.6s ease-in-out infinite;
}
@keyframes mp-slide{
  0%{ transform:translateX(-100%); }
  50%{ transform:translateX(60%); }
  100%{ transform:translateX(220%); }
}

.mp-status{
  margin-top:16px;
  font-size:12px;
  color:var(--mp-muted);
  letter-spacing:0.03em;
}
.mp-dots span{
  animation: mp-blink 1.4s infinite;
  opacity:0;
}
.mp-dots span:nth-child(1){ animation-delay:0s; }
.mp-dots span:nth-child(2){ animation-delay:0.2s; }
.mp-dots span:nth-child(3){ animation-delay:0.4s; }
@keyframes mp-blink{
  0%, 20%{ opacity:0; }
  35%{ opacity:1; }
  80%,100%{ opacity:0; }
}

@media (prefers-reduced-motion: reduce){
  .mp-ring, .mp-glow, .mp-progress-fill, .mp-dots span{ animation:none !important; }
}
`