// clickutil.eu — UX refresh 2025
document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
  const cmp = document.getElementById("cmp"), acc = document.getElementById("cmp-accept"), rej = document.getElementById("cmp-reject");
  const CMP_KEY = "clickutil.eu_cmp";
  function showCMP(){ if(cmp) cmp.style.display = "block"; } function hideCMP(){ if(cmp) cmp.style.display = "none"; }
  try { if(!localStorage.getItem(CMP_KEY)) showCMP(); } catch(e){}
  acc && acc.addEventListener("click", ()=>{ try{ localStorage.setItem(CMP_KEY, JSON.stringify({accepted:true,ts:Date.now()})); }catch(e){} hideCMP(); });
  rej && rej.addEventListener("click", ()=>{ try{ localStorage.setItem(CMP_KEY, JSON.stringify({accepted:false,ts:Date.now()})); }catch(e){} hideCMP(); });
  const header = document.querySelector("header");
  const onScroll = () => { if (!header) return; if (window.scrollY > 8) header.classList.add("is-scrolled"); else header.classList.remove("is-scrolled"); };
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  const topbar = document.querySelector("header .top"); const nav = document.querySelector("header nav");
  if (topbar && nav) { const btn = document.createElement("button"); btn.id = "nav-toggle"; btn.setAttribute("aria-expanded","false"); btn.setAttribute("aria-controls","main-nav"); btn.setAttribute("aria-label","Abrir menú"); btn.innerHTML = `<span class="bars" aria-hidden="true"></span>`; nav.id = "main-nav"; topbar.insertBefore(btn, nav);
    btn.addEventListener("click", () => { const isOpen = nav.classList.toggle("open"); btn.setAttribute("aria-expanded", String(isOpen)); });
    nav.addEventListener("click", (e) => { const el = e.target; if (el.tagName === "A" && nav.classList.contains("open")) { nav.classList.remove("open"); btn.setAttribute("aria-expanded","false"); } });
  }
  if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    const toReveal = document.querySelectorAll(".card, .hero, article, .ad, .ad-inarticle");
    toReveal.forEach(el => el.setAttribute("data-reveal",""));
    const io = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add("is-visible"); io.unobserve(e.target);} }); }, { rootMargin: "0px 0px -10% 0px", threshold: .08 });
    toReveal.forEach(el => io.observe(el));
  }
  // Contact form fake handler
  const form = document.getElementById("contact-form"); const msg = document.getElementById("contact-msg");
  if(form && msg){ form.addEventListener("submit",(e)=>{ e.preventDefault(); msg.textContent="Gracias. Hemos recibido tu mensaje."; form.reset(); }); }
});
