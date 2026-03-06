"use client";

import { memo } from "react";

interface Props {
  tags: string[];
  energy: number;
  className?: string;
}

function AdventureScene({ tags, energy, className = "" }: Props) {
  const has = (tag: string) => tags.includes(tag);

  return (
    <div className={`relative w-full select-none ${className}`}>
      <svg
        viewBox="0 0 400 250"
        className="w-full h-auto rounded-xl border border-white/10 bg-[#1a1f35]"
      >
        {/* Floor */}
        <rect x="0" y="200" width="400" height="50" fill="#151929" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="#2a3050" strokeWidth="1" />

        {/* Back wall */}
        <rect x="0" y="0" width="400" height="200" fill="#1e2440" />

        {/* Window */}
        <rect x="20" y="20" width="80" height="60" rx="3" fill="#0c1020" stroke="#3a4570" strokeWidth="1.5" />
        <line x1="60" y1="20" x2="60" y2="80" stroke="#3a4570" strokeWidth="1" />
        <line x1="20" y1="50" x2="100" y2="50" stroke="#3a4570" strokeWidth="1" />
        {/* Stars in window */}
        <circle cx="35" cy="35" r="1" fill="#ffd700" opacity="0.7" />
        <circle cx="75" cy="42" r="1" fill="#ffd700" opacity="0.5" />
        <circle cx="50" cy="28" r="1.2" fill="#ffd700" opacity="0.6" />

        {/* Desk */}
        <rect x="120" y="145" width="140" height="8" rx="2" fill="#3d3528" />
        <rect x="130" y="153" width="8" height="47" fill="#3d3528" />
        <rect x="242" y="153" width="8" height="47" fill="#3d3528" />

        {/* Monitor */}
        <rect x="155" y="105" width="70" height="42" rx="3" fill="#0f1520" stroke="#4a5580" strokeWidth="1.5" />
        <rect x="186" y="147" width="8" height="5" fill="#4a5580" />
        {/* Screen glow */}
        <rect x="158" y="108" width="64" height="36" rx="2" fill={has("terminal_red") ? "#3a0808" : has("dark_datacenter") ? "#0a0a0a" : "#0d2847"} />
        {has("terminal_red") && (
          <>
            <text x="165" y="125" fontSize="6" fill="#ff4444" fontFamily="monospace">DELETE FROM</text>
            <text x="165" y="134" fontSize="6" fill="#ff4444" fontFamily="monospace">transactions</text>
          </>
        )}
        {has("spaghetti_code") && (
          <>
            <text x="162" y="122" fontSize="5" fill="#66ff66" fontFamily="monospace">{"{{{}}}()()"}</text>
            <text x="162" y="130" fontSize="5" fill="#ff6666" fontFamily="monospace">{"ERR ERR ERR"}</text>
            <text x="162" y="138" fontSize="5" fill="#ffff66" fontFamily="monospace">{"TODO: fix"}</text>
          </>
        )}
        {has("presentation") && (
          <>
            <rect x="162" y="112" width="56" height="4" rx="1" fill="#2563EB" />
            <rect x="162" y="119" width="40" height="3" rx="1" fill="#3b82f6" opacity="0.6" />
            <rect x="162" y="125" width="48" height="3" rx="1" fill="#3b82f6" opacity="0.4" />
            <text x="165" y="138" fontSize="5" fill="#94a3b8" fontFamily="sans-serif">STRATEGY 2026</text>
          </>
        )}
        {has("spreadsheet") && (
          <>
            <rect x="160" y="111" width="58" height="30" fill="#0d3320" />
            <line x1="180" y1="111" x2="180" y2="141" stroke="#1a5c38" strokeWidth="0.5" />
            <line x1="200" y1="111" x2="200" y2="141" stroke="#1a5c38" strokeWidth="0.5" />
            <line x1="160" y1="121" x2="218" y2="121" stroke="#1a5c38" strokeWidth="0.5" />
            <line x1="160" y1="131" x2="218" y2="131" stroke="#1a5c38" strokeWidth="0.5" />
            <text x="163" y="118" fontSize="4" fill="#66ff66">$$$</text>
          </>
        )}
        {has("login_page") && (
          <>
            <rect x="168" y="115" width="44" height="6" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
            <rect x="168" y="124" width="44" height="6" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
            <rect x="178" y="133" width="24" height="6" rx="2" fill="#2563EB" />
          </>
        )}
        {has("slack_chat") && (
          <>
            <rect x="160" y="110" width="60" height="32" rx="2" fill="#1a1d25" />
            <rect x="163" y="114" width="40" height="4" rx="1" fill="#3b82f6" opacity="0.3" />
            <rect x="163" y="121" width="50" height="4" rx="1" fill="#ef4444" opacity="0.3" />
            <rect x="163" y="128" width="35" height="4" rx="1" fill="#f59e0b" opacity="0.3" />
            <text x="206" y="132" fontSize="6" fill="#ef4444">47❤</text>
          </>
        )}

        {/* Chair */}
        <ellipse cx="190" cy="185" rx="20" ry="8" fill="#2a2a3a" />
        <rect x="185" y="185" width="10" height="15" fill="#222233" />

        {/* Coffee cup on desk */}
        <rect x="240" y="137" width="10" height="10" rx="2" fill="#5c3a1e" />
        <ellipse cx="245" cy="137" rx="6" ry="2" fill="#7a5030" />

        {/* Server rack (right side) */}
        <rect x="310" y="60" width="70" height="140" rx="3" fill="#1a1d2e" stroke="#2a3050" strokeWidth="1.5" />
        {/* Server units */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={`srv-${i}`}>
            <rect x="315" y={70 + i * 25} width="60" height="18" rx="2" fill="#222840" />
            {/* Status lights */}
            <circle
              cx="365" cy={79 + i * 25} r="2.5"
              fill={has("server_fire") || has("dark_datacenter") ? "#ff3333" : has("server_smoke") ? "#ff8800" : has("server_blink") ? "#ffdd00" : "#33ff66"}
            >
              {(has("server_blink") || has("server_fire")) && (
                <animate attributeName="opacity" values="1;0.3;1" dur={has("server_fire") ? "0.3s" : "1s"} repeatCount="indefinite" />
              )}
            </circle>
            <circle cx="358" cy={79 + i * 25} r="2" fill="#334" />
          </g>
        ))}

        {/* Fire on servers */}
        {has("server_fire") && (
          <g>
            <ellipse cx="345" cy="55" rx="25" ry="15" fill="#ff4400" opacity="0.3">
              <animate attributeName="ry" values="15;20;15" dur="0.8s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="345" cy="58" rx="15" ry="10" fill="#ff8800" opacity="0.4">
              <animate attributeName="ry" values="10;14;10" dur="0.6s" repeatCount="indefinite" />
            </ellipse>
          </g>
        )}

        {/* Smoke from server */}
        {has("server_smoke") && (
          <g opacity="0.4">
            <circle cx="340" cy="50" r="8" fill="#888">
              <animate attributeName="cy" values="50;30;10" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.2;0" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="355" cy="55" r="6" fill="#999">
              <animate attributeName="cy" values="55;35;15" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.15;0" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </g>
        )}

        {/* Dark overlay for blackout */}
        {has("dark_datacenter") && (
          <rect x="0" y="0" width="400" height="250" fill="#000" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.7;0.5" dur="2s" repeatCount="indefinite" />
          </rect>
        )}

        {/* Meeting room table (for board scenes) */}
        {has("meeting_room") && (
          <>
            <ellipse cx="190" cy="170" rx="80" ry="25" fill="#3d3528" opacity="0.8" />
            <ellipse cx="190" cy="168" rx="78" ry="23" fill="#4a4030" />
          </>
        )}

        {/* Split office divider */}
        {has("split_office") && (
          <line x1="200" y1="0" x2="200" y2="200" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
        )}

        {/* ATM error */}
        {has("atm_error") && (
          <g>
            <rect x="30" y="130" width="35" height="50" rx="3" fill="#2a2a3a" stroke="#444" strokeWidth="1" />
            <rect x="35" y="135" width="25" height="15" rx="2" fill="#330000" />
            <text x="38" y="146" fontSize="6" fill="#ff4444" fontFamily="monospace">ERR</text>
          </g>
        )}

        {/* Sleeping CIO */}
        {energy < 20 && (
          <g>
            <text x="160" y="140" fontSize="14">😴</text>
            <text x="178" y="125" fontSize="8" fill="#aaa" opacity="0.6">z z z</text>
          </g>
        )}
      </svg>

      {/* Emoji overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* CEO */}
        {(has("ceo") || has("ceo_whisper")) && (
          <span className="absolute text-xl animate-bounce" style={{ top: "25%", left: "25%" }}>
            👨‍💼
          </span>
        )}

        {/* Auditors */}
        {has("auditors") && (
          <>
            <span className="absolute text-lg" style={{ top: "55%", left: "5%" }}>🕵️</span>
            <span className="absolute text-lg" style={{ top: "60%", left: "15%" }}>👩‍⚖️</span>
          </>
        )}

        {/* Panicking people */}
        {has("people_panic") && (
          <>
            <span className="absolute text-lg animate-bounce" style={{ top: "65%", left: "8%", animationDelay: "0s" }}>😱</span>
            <span className="absolute text-lg animate-bounce" style={{ top: "60%", left: "22%", animationDelay: "0.2s" }}>😰</span>
          </>
        )}

        {/* Angry people / protest */}
        {(has("people_protest") || has("people_angry")) && (
          <>
            <span className="absolute text-lg" style={{ top: "55%", left: "5%" }}>😡</span>
            <span className="absolute text-lg" style={{ top: "60%", left: "18%" }}>🪧</span>
          </>
        )}

        {/* Person leaving */}
        {has("person_leaving") && (
          <span className="absolute text-xl" style={{ top: "55%", left: "2%" }}>
            🧳
          </span>
        )}

        {/* Person crying */}
        {has("person_crying") && (
          <span className="absolute text-xl" style={{ top: "55%", left: "10%" }}>😢</span>
        )}

        {/* Person hiding */}
        {has("person_hiding") && (
          <span className="absolute text-lg" style={{ top: "65%", left: "25%", opacity: 0.7 }}>🫣</span>
        )}

        {/* Person on beach */}
        {has("person_beach") && (
          <span className="absolute text-lg" style={{ top: "12%", left: "7%" }}>🏖️</span>
        )}

        {/* Phone ringing */}
        {has("phone_red") && (
          <span className="absolute text-lg animate-pulse" style={{ top: "35%", left: "32%" }}>
            📱
          </span>
        )}

        {/* Flowers */}
        {has("flowers") && (
          <span className="absolute text-xl" style={{ top: "25%", left: "5%" }}>💐</span>
        )}

        {/* Team saying no */}
        {has("team_no") && (
          <span className="absolute text-sm" style={{ top: "50%", left: "30%", opacity: 0.8 }}>🙅‍♂️</span>
        )}

        {/* Robots */}
        {has("robots") && (
          <>
            <span className="absolute text-lg" style={{ top: "55%", left: "55%" }}>🤖</span>
            <span className="absolute text-lg" style={{ top: "60%", left: "65%" }}>🤖</span>
          </>
        )}

        {/* HR with calculator */}
        {has("hr_calculator") && (
          <span className="absolute text-lg" style={{ top: "30%", left: "5%" }}>🧮</span>
        )}

        {/* Tumbleweed */}
        {has("tumbleweed") && (
          <span className="absolute text-xl" style={{ top: "70%", left: "15%" }}>
            🌾
          </span>
        )}

        {/* Empty office */}
        {has("empty_office") && (
          <span className="absolute text-sm text-slate-500" style={{ top: "45%", left: "10%" }}>
            🏚️
          </span>
        )}

        {/* Bot with crazy eyes */}
        {has("bot_crazy") && (
          <span className="absolute text-2xl animate-spin" style={{ top: "20%", left: "5%", animationDuration: "3s" }}>
            🤖
          </span>
        )}

        {/* Calendar showing long time */}
        {has("calendar_long") && (
          <span className="absolute text-lg" style={{ top: "15%", left: "28%" }}>📅</span>
        )}

        {/* Tesla */}
        {has("tesla") && (
          <span className="absolute text-xl" style={{ top: "12%", left: "6%" }}>🚗</span>
        )}

        {/* Angel & Devil */}
        {has("angel_devil") && (
          <>
            <span className="absolute text-sm" style={{ top: "25%", left: "38%" }}>😇</span>
            <span className="absolute text-sm" style={{ top: "25%", left: "48%" }}>😈</span>
          </>
        )}

        {/* Two offices comparison */}
        {has("two_offices") && (
          <span className="absolute text-lg" style={{ top: "15%", left: "18%" }}>🏢</span>
        )}

        {/* Confetti */}
        {has("confetti") && (
          <>
            <span className="absolute text-lg animate-bounce" style={{ top: "5%", left: "20%" }}>🎉</span>
            <span className="absolute text-lg animate-bounce" style={{ top: "8%", left: "60%", animationDelay: "0.3s" }}>🎊</span>
          </>
        )}

        {/* Hackathon */}
        {has("hackathon") && (
          <span className="absolute text-lg" style={{ top: "55%", left: "60%" }}>🍕</span>
        )}

        {/* People in queue */}
        {has("people_queue") && (
          <>
            <span className="absolute text-sm" style={{ top: "72%", left: "5%" }}>🧍</span>
            <span className="absolute text-sm" style={{ top: "72%", left: "10%" }}>🧍</span>
            <span className="absolute text-sm" style={{ top: "72%", left: "15%" }}>🧍</span>
          </>
        )}

        {/* Chaos indicator */}
        {has("chaos") && (
          <span className="absolute text-xl animate-pulse" style={{ top: "5%", right: "5%" }}>🚨</span>
        )}

        {/* Server clean (freshly cleaned for inspection) */}
        {has("server_clean") && (
          <span className="absolute text-sm" style={{ top: "25%", right: "8%" }}>✨</span>
        )}
      </div>
    </div>
  );
}

export default memo(AdventureScene);
