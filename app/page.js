"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState("");
  const [business, setBusiness] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: "bot", text: "Bonjour ! Je suis l'assistant de La Maison du Coiffeur. Comment puis-je vous aider ?", done: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [currentFull, setCurrentFull] = useState("");

  const replies = {
    "Quels sont vos horaires ?": [
      "Nous sommes ouverts du lundi au vendredi de 9h à 19h30, le samedi de 9h à 18h. Le dimanche nous sommes fermés. Souhaitez-vous prendre rendez-vous ?",
      "Nos horaires : lundi–vendredi 9h–19h30, samedi 9h–18h. Fermé le dimanche et les jours fériés belges. On vous attend !",
    ],
    "Prenez-vous des rendez-vous ?": [
      "Oui bien sûr ! Vous pouvez réserver en ligne sur notre site, par téléphone au 02 123 45 67, ou directement en boutique. Les créneaux sont disponibles sous 24h.",
      "Absolument. Réservation en ligne 24h/24 via notre agenda, ou appelez-nous au 02 123 45 67 pendant les heures d'ouverture. Quel jour vous conviendrait ?",
    ],
    "Quels sont vos tarifs ?": [
      "Coupe homme à partir de 18€, coupe femme à partir de 35€. Balayage à partir de 55€, coloration complète à partir de 65€. Tous nos soins sont sur devis personnalisé.",
      "Nos prix : coupe homme 18€+, coupe femme 35€+, balayage 55€+. Nous proposons aussi des forfaits mariage et des soins kératine. Souhaitez-vous plus de détails ?",
    ],
  };

  useEffect(() => {
    const box = document.getElementById("chat-scroll-box");
    if (box) box.scrollTop = box.scrollHeight;
  }, [chatMessages, typingText]);

  useEffect(() => {
    if (!currentFull) return;
    let i = 0;
    setTypingText("");
    const interval = setInterval(() => {
      i++;
      setTypingText(currentFull.slice(0, i));
      if (i >= currentFull.length) {
        clearInterval(interval);
        setChatMessages(prev => [...prev, { from: "bot", text: currentFull, done: true }]);
        setTypingText("");
        setCurrentFull("");
        setIsTyping(false);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [currentFull]);

  const handleDemo = (question) => {
    if (isTyping) return;
    const alreadyAsked = chatMessages.some(m => m.from === "user" && m.text === question);
    if (alreadyAsked) return;
    const options = replies[question];
    const answer = options[Math.floor(Math.random() * options.length)];
    setChatMessages(prev => [...prev, { from: "user", text: question, done: true }]);
    setIsTyping(true);
    setTimeout(() => setCurrentFull(answer), 600);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prenom || !email || !business) return;
    try {
      const res = await fetch("https://formspree.io/f/xeedwowa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom, email, business }),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#0a0a0f", color: "#f0efe8", minHeight: "100vh", paddingTop: "64px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet" />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #c8f060; color: #0a0a0f; }
        .btn-primary {
          background: #c8f060;
          color: #0a0a0f;
          border: none;
          padding: 14px 32px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: transform 0.15s, opacity 0.15s;
        }
        .btn-primary:hover { transform: scale(1.03); opacity: 0.92; }
        .chip {
          display: inline-block;
          background: rgba(200,240,96,0.12);
          color: #c8f060;
          border: 1px solid rgba(200,240,96,0.25);
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 1.5rem;
        }
        .card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.5rem;
        }
        input, select {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          padding: 12px 16px;
          color: #f0efe8;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        input:focus, select:focus { border-color: #c8f060; }
        input::placeholder { color: rgba(240,239,232,0.35); }
        select option { background: #1a1a24; }
        .bubble-bot {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px 16px 16px 4px;
          padding: 10px 14px;
          font-size: 13px;
          line-height: 1.5;
          max-width: 80%;
          color: #f0efe8;
        }
        .bubble-user {
          background: #c8f060;
          color: #0a0a0f;
          border-radius: 16px 16px 4px 16px;
          padding: 10px 14px;
          font-size: 13px;
          line-height: 1.5;
          max-width: 80%;
          margin-left: auto;
        }
        .suggestion-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px;
          padding: 8px 14px;
          font-size: 12px;
          color: #f0efe8;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }
        .suggestion-btn:hover:not(:disabled) { background: rgba(200,240,96,0.1); border-color: rgba(200,240,96,0.3); }
        .suggestion-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .step-num {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(200,240,96,0.12);
          border: 1px solid rgba(200,240,96,0.25);
          color: #c8f060;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 500;
          flex-shrink: 0;
        }
        .price-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.5rem;
          flex: 1;
          min-width: 180px;
        }
        #chat-scroll-box::-webkit-scrollbar { display: none; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 600px) {
          .hero-title { font-size: 36px !important; }
          .pricing-grid { flex-direction: column !important; }
          .form-row { flex-direction: column !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ padding: "1.25rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(10,10,15,0.85)", backdropFilter: "blur(12px)" }}>
        <img src="/cheasio-logo.png" alt="Cheasio" style={{ height: "32px", width: "auto" }} />
        <button className="btn-primary" style={{ padding: "10px 22px", fontSize: "14px" }} onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}>
          Accès bêta gratuit
        </button>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "5rem 2rem 4rem", textAlign: "center" }}>
        <div className="chip">✦ Assistant IA pour votre commerce</div>
        <h1 className="hero-title" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "52px", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: "1.5rem" }}>
          Vos clients posent des questions.<br />
          <span style={{ color: "#c8f060" }}>Cheasio répond.</span>
        </h1>
        <p style={{ fontSize: "17px", color: "rgba(240,239,232,0.6)", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto 2rem" }}>
          Un assistant IA installé sur votre site en 2 minutes. Il répond automatiquement à vos clients — horaires, tarifs, services — 24h/24, sans vous déranger.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}>
            Essayer gratuitement →
          </button>
          <button style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#f0efe8", padding: "14px 28px", borderRadius: "100px", fontSize: "15px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
            onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}>
            Voir la démo
          </button>
        </div>
        <p style={{ fontSize: "13px", color: "rgba(240,239,232,0.35)", marginTop: "1rem" }}>Aucune carte bancaire · Installation en 2 min</p>
      </section>

      {/* DEMO */}
      <section id="demo" style={{ maxWidth: "520px", margin: "0 auto", padding: "2rem 2rem 4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div className="chip">Démo interactive</div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "26px", fontWeight: 700 }}>Voyez-le en action</h2>
        </div>
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "0.75rem" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#c8f060", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "14px" }}>🤖</span>
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 500 }}>Assistant — La Maison du Coiffeur</div>
              <div style={{ fontSize: "11px", color: "#c8f060" }}>● En ligne</div>
            </div>
          </div>

          <div
            id="chat-scroll-box"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              minHeight: "140px",
              maxHeight: "280px",
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingRight: "4px"
            }}
          >
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
                <div className={msg.from === "bot" ? "bubble-bot" : "bubble-user"}>{msg.text}</div>
              </div>
            ))}

            {isTyping && typingText === "" && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div className="bubble-bot" style={{ display: "flex", gap: "4px", alignItems: "center", padding: "12px 16px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(240,239,232,0.4)", display: "inline-block", animation: "bounce 1s infinite 0s" }}></span>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(240,239,232,0.4)", display: "inline-block", animation: "bounce 1s infinite 0.2s" }}></span>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(240,239,232,0.4)", display: "inline-block", animation: "bounce 1s infinite 0.4s" }}></span>
                </div>
              </div>
            )}

            {isTyping && typingText !== "" && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div className="bubble-bot">
                  {typingText}
                  <span style={{ display: "inline-block", width: "2px", height: "13px", background: "#c8f060", marginLeft: "2px", animation: "blink 0.7s infinite", verticalAlign: "middle" }}></span>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: "0.75rem", display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {Object.keys(replies).map((q) => {
              const asked = chatMessages.some(m => m.from === "user" && m.text === q);
              return (
                <button key={q} className="suggestion-btn" onClick={() => handleDemo(q)} disabled={asked || isTyping}>
                  {q}
                </button>
              );
            })}
          </div>
          <p style={{ fontSize: "11px", color: "rgba(240,239,232,0.3)", marginTop: "0.75rem", textAlign: "center" }}>
            Posez jusqu'à 3 questions à l'assistant
          </p>
        </div>
      </section>

      {/* STEPS */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "2rem 2rem 4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div className="chip">Simple comme bonjour</div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "26px", fontWeight: 700 }}>Prêt en 3 étapes</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { n: "1", title: "Entrez vos informations", desc: "Horaires, services, FAQ — vous remplissez un formulaire simple. Pas besoin de technique." },
            { n: "2", title: "Votre assistant est créé", desc: "En quelques secondes, Cheasio génère un assistant IA entraîné uniquement sur vos données." },
            { n: "3", title: "Copiez une ligne de code", desc: "Vous collez un simple script sur votre site. C'est tout. Votre assistant est en ligne." },
          ].map((s) => (
            <div key={s.n} className="card" style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div className="step-num">{s.n}</div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 500, marginBottom: "4px" }}>{s.title}</div>
                <div style={{ fontSize: "14px", color: "rgba(240,239,232,0.55)", lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "2rem 2rem 4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div className="chip">Tarifs</div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "26px", fontWeight: 700 }}>Simple et transparent</h2>
        </div>
        <div className="pricing-grid" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {[
            { name: "Gratuit", price: "0€", period: "/mois", feats: ["50 réponses / mois", "1 assistant", "Widget sur votre site"] },
            { name: "Starter", price: "19€", period: "/mois", feats: ["500 réponses / mois", "1 assistant personnalisé", "Dashboard des conversations", "Support email"] },
            { name: "Pro", price: "39€", period: "/mois", feats: ["Réponses illimitées", "3 assistants", "Personnalisation avancée", "Support prioritaire"] },
          ].map((p) => (
            <div key={p.name} className="price-card">
              <div style={{ fontSize: "15px", fontWeight: 500, marginBottom: "0.25rem" }}>{p.name}</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "30px", fontWeight: 800, marginBottom: "1rem" }}>
                {p.price}<span style={{ fontSize: "14px", fontWeight: 400, color: "rgba(240,239,232,0.45)" }}>{p.period}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {p.feats.map((f) => (
                  <div key={f} style={{ fontSize: "13px", color: "rgba(240,239,232,0.65)", display: "flex", gap: "8px" }}>
                    <span style={{ color: "#c8f060" }}>✓</span>{f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" style={{ maxWidth: "560px", margin: "0 auto", padding: "2rem 2rem 5rem" }}>
        <div className="card" style={{ padding: "2rem" }}>
          {!submitted ? (
            <>
              <div className="chip">Accès bêta</div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "24px", fontWeight: 700, marginBottom: "0.5rem" }}>
                Rejoignez la liste d'attente
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(240,239,232,0.5)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                Soyez parmi les premiers à tester Cheasio gratuitement.
              </p>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div className="form-row" style={{ display: "flex", gap: "0.75rem" }}>
                  <input type="text" name="prenom" placeholder="Votre prénom" value={prenom} onChange={e => setPrenom(e.target.value)} required />
                  <input type="email" name="email" placeholder="Votre email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <select name="business" value={business} onChange={e => setBusiness(e.target.value)} required>
                  <option value="">Type de commerce...</option>
                  <option>Boucherie / épicerie halal</option>
                  <option>Restaurant</option>
                  <option>Coiffeur / esthétique</option>
                  <option>E-commerce</option>
                  <option>Association / mosquée</option>
                  <option>Autre</option>
                </select>
                <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "0.25rem" }}>
                  Je rejoins la liste d'attente →
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <div style={{ fontSize: "40px", marginBottom: "1rem" }}>✦</div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "20px", fontWeight: 700, marginBottom: "0.5rem" }}>Vous êtes sur la liste !</h3>
              <p style={{ fontSize: "14px", color: "rgba(240,239,232,0.5)", lineHeight: 1.6 }}>On vous contacte dès l'ouverture de la bêta. Merci pour votre confiance.</p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "1.5rem 2rem", textAlign: "center" }}>
        <img src="/cheasio-logo.png" alt="Cheasio" style={{ height: "24px", width: "auto", display: "block", margin: "0 auto 0.5rem" }} />
        <p style={{ fontSize: "12px", color: "rgba(240,239,232,0.3)", marginTop: "0.5rem" }}>Bruxelles, Belgique · contact@cheasio.com</p>
      </footer>
    </main>
  );
}