import { publicDetailStories } from "./public-detail-stories.js";

const publicGate = document.querySelector("#loginGate");
const session = window.localStorage.getItem("axion-session");
const params = new URLSearchParams(window.location.search);
const routePages = {
  product: "platform",
  workflow: "workflow",
  solutions: "ecosystem",
  industries: "ecosystem",
  resources: "resources",
  guides: "resources",
  "bioprocess-model-readiness": "resources",
  "bioprocess-simulation-software": "simulation",
  "biomanufacturing-scheduling-software": "scheduling",
  "bioprocess-tea-lca-software": "tea",
  "biopharma-process-simulation": "biopharma",
  "fermentation-process-modeling": "fermentation",
  compare: "compare",
  "superpro-designer-alternative": "compare",
  "superpro-designer-migration": "migration",
  security: "readiness",
  faq: "faq",
  pricing: "pricing",
  pilot: "pilot",
  legal: "legal",
  brand: "brand",
  login: "login",
};
const pathPage = routePages[window.location.pathname.replace(/^\/+|\/+$/g, "")];
const requestedPage = params.get("page") || pathPage || "home";
const requestedDetail = params.get("detail");
const publicTargetPaths = {
  publicHome: "/",
  publicPlatform: "/product",
  publicWorkflow: "/workflow",
  publicEcosystem: "/solutions",
  publicResources: "/resources",
  publicSimulationIntent: "/bioprocess-simulation-software",
  publicSchedulingIntent: "/biomanufacturing-scheduling-software",
  publicTeaIntent: "/bioprocess-tea-lca-software",
  publicBiopharmaIntent: "/biopharma-process-simulation",
  publicFermentationIntent: "/fermentation-process-modeling",
  publicReadiness: "/security",
  publicFaq: "/faq",
  publicComparison: "/superpro-designer-alternative",
  publicMigration: "/superpro-designer-migration",
  publicPricing: "/pricing",
  publicPilot: "/pilot",
  publicLegal: "/legal",
  publicBrand: "/brand",
  loginPanel: "/login",
};

let workspacePromise;

const fallbackCheckoutPlans = [
  { id: "academic", name: "Research", amountFormatted: "€149", seats: 1 },
  { id: "professional", name: "Professional", amountFormatted: "€590", seats: 1 },
  { id: "team", name: "Engineering Team", amountFormatted: "€2,490", seats: 5 },
  { id: "enterprise", name: "Enterprise Site", amountFormatted: "€6,900", seats: 20 },
];

function loadWorkspace() {
  if (!workspacePromise) workspacePromise = import("./app.js?v=20260803-payments-faq-v1");
  return workspacePromise;
}

async function lightweightApiRequest(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(options.headers || {}),
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "The secure workspace could not be reached.");
  return payload;
}

function selectedCheckoutPlan(config, planId) {
  const plans = Array.isArray(config?.plans) && config.plans.length ? config.plans : fallbackCheckoutPlans;
  return plans.find((plan) => plan.id === planId)
    || plans.find((plan) => plan.id === "professional")
    || fallbackCheckoutPlans[1];
}

function renderLightweightCheckoutPlan(config, planId) {
  const plan = selectedCheckoutPlan(config, planId);
  const select = document.querySelector("#checkoutPlan");
  if (select) select.value = plan.id;
  const name = document.querySelector("#checkoutPlanName");
  const price = document.querySelector("#checkoutPrice");
  const mode = document.querySelector("#checkoutBillingMode");
  if (name) name.textContent = `Axion ${plan.name}`;
  if (price) price.textContent = `${plan.amountFormatted || `€${plan.amount}`} / month`;
  if (mode) mode.textContent = `Monthly subscription · ${plan.seats} named seat${Number(plan.seats) === 1 ? "" : "s"} · manage or cancel in the billing portal`;
  return plan;
}

function renderLightweightCheckoutResult(title, message, kind = "") {
  const result = document.querySelector("#checkoutResult");
  if (!result) return;
  result.className = `checkout-result${kind ? ` is-${kind}` : ""}`;
  const heading = document.createElement("strong");
  heading.textContent = title;
  const copy = document.createElement("p");
  copy.textContent = message;
  result.replaceChildren(heading, copy);
}

async function submitLightweightCheckout(event, config) {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  const customerName = form.querySelector("#checkoutName")?.value.trim() || "";
  const customerEmail = form.querySelector("#checkoutEmail")?.value.trim() || "";
  const company = form.querySelector("#checkoutCompany")?.value.trim() || "";
  const planId = form.querySelector("#checkoutPlan")?.value || "professional";
  const acceptedTerms = Boolean(form.querySelector("#checkoutTerms")?.checked);
  if (!customerName || !customerEmail.includes("@")) {
    renderLightweightCheckoutResult("Complete billing details", "Enter a customer name and valid billing email.", "error");
    return;
  }
  if (!acceptedTerms) {
    renderLightweightCheckoutResult("Confirm the terms", "Accept the terms and privacy notice before continuing.", "error");
    return;
  }
  button.disabled = true;
  button.textContent = "Opening secure checkout...";
  renderLightweightCheckoutResult("Preparing checkout", "Axion is creating your monthly subscription securely with Stripe.", "pending");
  try {
    const payload = await lightweightApiRequest("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ customerName, customerEmail, company, planId, acceptedTerms: true }),
    });
    const checkoutUrl = payload.payment?.checkoutUrl || payload.order?.checkoutUrl;
    if (!checkoutUrl) throw new Error("Stripe did not return a checkout URL.");
    window.location.assign(checkoutUrl);
  } catch (error) {
    button.disabled = false;
    button.textContent = "Continue to secure checkout";
    renderLightweightCheckoutResult("Checkout could not start", error.message || "Please retry.", "error");
  }
}

async function handleLightweightCheckoutReturn(controls) {
  const checkoutState = params.get("checkout");
  const sessionId = params.get("session_id");
  if (!checkoutState) return;
  if (checkoutState === "cancelled") {
    renderLightweightCheckoutResult("Checkout cancelled", "No payment was taken. You can change the plan or restart checkout.", "pending");
    return;
  }
  if (checkoutState !== "success" || !sessionId) return;
  renderLightweightCheckoutResult("Confirming payment", "Stripe is confirming the subscription and Axion is activating the workspace.", "pending");
  try {
    const status = await lightweightApiRequest(`/api/checkout/session/${encodeURIComponent(sessionId)}`);
    if (!status.paid || !status.licenseKey) throw new Error("Payment is still processing. Reload this page in a moment.");
    renderLightweightCheckoutResult("Subscription active", "Payment is confirmed. Your workspace is opening now.", "success");
    const loginPayload = await lightweightApiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ user: status.customerEmail, password: status.licenseKey, licenseKey: status.licenseKey }),
    });
    await openAuthenticatedWorkspace(loginPayload, controls);
  } catch (error) {
    renderLightweightCheckoutResult("Activation pending", error.message || "Payment could not be confirmed yet.", "error");
  }
}

async function openAuthenticatedWorkspace(payload, controls = {}) {
  if (!payload?.token) throw new Error("The login response did not contain a session token.");
  window.localStorage.setItem("axion-session", payload.token);
  window.__AXION_AUTH_BOOTSTRAP__ = { token: payload.token, account: payload.account || null };
  if (controls.password) controls.password.value = "";
  if (controls.button) {
    controls.button.disabled = true;
    controls.button.textContent = "Opening workspace...";
  }
  if (controls.status) controls.status.textContent = "Access verified. Preparing your engineering workspace.";
  if (typeof window.__AXION_ACCEPT_AUTH__ === "function") {
    window.__AXION_ACCEPT_AUTH__(payload);
    return;
  }
  await loadWorkspace();
}

function loadGoogleIdentityScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }
    const existing = document.querySelector("script[data-google-identity]");
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentity = "true";
    script.addEventListener("load", resolve, { once: true });
    script.addEventListener("error", reject, { once: true });
    document.head.append(script);
  });
}

async function bindLightweightLogin() {
  const form = document.querySelector("#loginForm");
  if (!form || form.dataset.lightweightLoginBound === "true") return;
  form.dataset.lightweightLoginBound = "true";
  const user = form.querySelector("#loginUser");
  const password = form.querySelector("#loginPassword");
  const error = form.querySelector("#loginError");
  const status = form.querySelector("#loginOrigin");
  const button = form.querySelector('button[type="submit"]');
  const googleFallback = form.querySelector("#googleLoginFallback");
  const googleStatus = form.querySelector("#googleLoginStatus");
  const googleMount = form.querySelector("#googleButtonMount");
  const checkoutForm = document.querySelector("#checkoutForm");
  const checkoutUnavailable = document.querySelector("#checkoutUnavailable");
  const controls = { password, status, button };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    error.textContent = "";
    if (!user.value.trim() || !password.value) {
      error.textContent = "Enter your username and password.";
      return;
    }
    button.disabled = true;
    button.textContent = "Checking access...";
    status.textContent = "Verifying your private workspace access.";
    try {
      const payload = await lightweightApiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ user: user.value.trim(), password: password.value, licenseKey: password.value }),
      });
      await openAuthenticatedWorkspace(payload, controls);
    } catch (requestError) {
      button.disabled = false;
      button.textContent = "Enter workspace";
      status.textContent = "Secure workspace ready.";
      error.textContent = requestError.message || "Access denied. Check your credentials.";
    }
  });

  try {
    if (session) {
      status.textContent = "Restoring your secure workspace session.";
      try {
        const restored = await lightweightApiRequest("/api/account", {
          headers: { authorization: `Bearer ${session}` },
        });
        await openAuthenticatedWorkspace({ token: session, account: restored.account || null }, controls);
        return;
      } catch {
        window.localStorage.removeItem("axion-session");
        status.textContent = "Secure workspace ready.";
      }
    }

    const product = await lightweightApiRequest("/api/product");
    status.textContent = product?.productName ? "Secure workspace ready." : "Backend online.";
    const checkoutAvailable = Boolean(product?.payments?.stripeEnabled);
    if (checkoutForm) checkoutForm.hidden = !checkoutAvailable;
    if (checkoutUnavailable) checkoutUnavailable.hidden = checkoutAvailable;
    if (checkoutAvailable && checkoutForm) {
      renderLightweightCheckoutPlan(product, params.get("plan") || "professional");
      checkoutForm.querySelector("#checkoutPlan")?.addEventListener("change", (event) => {
        renderLightweightCheckoutPlan(product, event.currentTarget.value);
      });
      checkoutForm.addEventListener("submit", (event) => submitLightweightCheckout(event, product));
    }

    await handleLightweightCheckoutReturn(controls);

    const googleConfig = await lightweightApiRequest("/api/auth/google-config");
    if (!googleConfig.enabled || !googleConfig.clientId) {
      googleFallback.disabled = true;
      googleStatus.textContent = "Password login is available.";
      return;
    }
    await loadGoogleIdentityScript();
    googleFallback.hidden = true;
    googleStatus.textContent = "Google login ready.";
    window.google.accounts.id.initialize({
      client_id: googleConfig.clientId,
      ux_mode: "popup",
      callback: async (response) => {
        error.textContent = "";
        try {
          const payload = await lightweightApiRequest("/api/auth/google", {
            method: "POST",
            body: JSON.stringify({ credential: response.credential }),
          });
          await openAuthenticatedWorkspace(payload, controls);
        } catch (requestError) {
          error.textContent = requestError.message || "Google login could not be completed.";
        }
      },
    });
    window.google.accounts.id.renderButton(googleMount, {
      theme: "filled_black",
      size: "large",
      text: "continue_with",
      shape: "pill",
      width: 320,
    });
  } catch {
    status.textContent = "The workspace service is currently unavailable. Please retry shortly.";
    googleFallback.disabled = true;
    googleStatus.textContent = "Password login will resume when the backend is reachable.";
  }
}

function showRequestedPublicPageImmediately(page) {
  const target = document.querySelector(`.public-page[data-public-page="${CSS.escape(page)}"]`);
  if (!target) return false;
  document.querySelectorAll(".public-page").forEach((section) => {
    section.classList.toggle("active-public-page", section === target);
  });
  publicGate?.scrollTo({ top: 0, behavior: "auto" });
  return true;
}

function bindPublicScrollProgress() {
  const progress = document.querySelector(".public-scroll-progress > span");
  const publicScroll = document.querySelector(".public-scroll");
  if (!progress || !publicScroll) return;

  let frame = 0;
  const update = () => {
    frame = 0;
    const documentScroller = document.scrollingElement;
    const publicScrollable = publicScroll.scrollHeight > publicScroll.clientHeight + 2;
    const scroller = publicScrollable ? publicScroll : documentScroller;
    const maximum = Math.max(1, scroller.scrollHeight - scroller.clientHeight);
    const ratio = Math.min(1, Math.max(0, scroller.scrollTop / maximum));
    progress.style.transform = `scaleX(${ratio})`;
  };
  const scheduleUpdate = () => {
    if (!frame) frame = window.requestAnimationFrame(update);
  };

  publicScroll.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate, { passive: true });
  update();
}

function bindPublicHeroMotion() {
  const hero = document.querySelector(".editorial-statement");
  const orbit = hero?.querySelector(".axion-system-orbit");
  const allowsMotion = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
  if (!hero || !orbit || !allowsMotion) return;

  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;
  const update = () => {
    frame = 0;
    const bounds = hero.getBoundingClientRect();
    const x = ((pointerX - bounds.left) / Math.max(1, bounds.width) - 0.5) * 22;
    const y = ((pointerY - bounds.top) / Math.max(1, bounds.height) - 0.5) * 18;
    orbit.style.setProperty("--orbit-x", `${x.toFixed(1)}px`);
    orbit.style.setProperty("--orbit-y", `${y.toFixed(1)}px`);
  };
  hero.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (!frame) frame = window.requestAnimationFrame(update);
  }, { passive: true });
  hero.addEventListener("pointerleave", () => {
    orbit.style.setProperty("--orbit-x", "0px");
    orbit.style.setProperty("--orbit-y", "0px");
  });
}

function bindPublicPilot() {
  const board = document.querySelector(".pilot-process-board");
  const buttons = [...document.querySelectorAll("[data-pilot-mode]")];
  if (!board || !buttons.length) return;

  const modes = {
    batch: {
      name: "Recombinant enzyme · batch",
      reactor: "10,000 L · 75%",
      harvest: "94.0% yield",
      downstream: "2 recovery steps",
      output: "620 t/year",
      cycle: "5.8 d",
      utilization: "68%",
      cost: "€8.4–12.7/kg",
      limit: "Heat removal",
    },
    fedbatch: {
      name: "Monoclonal antibody · fed-batch",
      reactor: "2,000 L · 72%",
      harvest: "97.5% yield",
      downstream: "3 columns",
      output: "412 kg/year",
      cycle: "14.2 d",
      utilization: "78%",
      cost: "€89–112/g",
      limit: "O₂ transfer",
    },
    perfusion: {
      name: "Monoclonal antibody · perfusion",
      reactor: "2,000 L · 70%",
      harvest: "ATF · 99.0%",
      downstream: "4 columns",
      output: "865 kg/year",
      cycle: "32.0 d",
      utilization: "84%",
      cost: "€52–76/g",
      limit: "Media demand",
    },
  };

  const fields = {
    name: document.querySelector("#pilotProcessName"),
    reactor: document.querySelector("#pilotReactorMeta"),
    harvest: document.querySelector("#pilotHarvestMeta"),
    downstream: document.querySelector("#pilotDspMeta"),
    output: document.querySelector("#pilotOutput"),
    cycle: document.querySelector("#pilotCycle"),
    utilization: document.querySelector("#pilotUtilization"),
    cost: document.querySelector("#pilotCost"),
    limit: document.querySelector("#pilotLimit"),
  };

  const applyMode = (key) => {
    const mode = modes[key] || modes.fedbatch;
    board.dataset.pilotBoard = key;
    Object.entries(fields).forEach(([field, element]) => {
      if (element) element.textContent = mode[field];
    });
    buttons.forEach((button) => {
      const active = button.dataset.pilotMode === key;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  };

  buttons.forEach((button) => button.addEventListener("click", () => applyMode(button.dataset.pilotMode)));
  board.querySelectorAll(".pilot-unit, .pilot-support, .pilot-output").forEach((unit) => {
    unit.addEventListener("click", () => {
      board.querySelectorAll(".pilot-unit, .pilot-support, .pilot-output").forEach((candidate) => candidate.classList.remove("selected"));
      unit.classList.add("selected");
      const status = board.querySelector(".pilot-board-head span:last-child");
      if (status) status.textContent = unit.getAttribute("aria-label") || "Selected equipment";
    });
  });
  applyMode("fedbatch");
}

function bindPublicMenu() {
  const navigation = document.querySelector(".public-nav nav");
  const toggle = navigation?.querySelector(".public-menu-toggle");
  if (!navigation || !toggle) return;

  const setOpen = (open) => {
    navigation.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  };
  toggle.addEventListener("click", () => setOpen(!navigation.classList.contains("is-open")));
  navigation.querySelector(".public-nav-links")?.addEventListener("click", () => setOpen(false));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

function openPublicHome() {
  if (window.location.pathname === "/") publicGate?.scrollTo({ top: 0, behavior: "smooth" });
  else window.location.assign("/");
}

function publicDetailPath(key) {
  return `/product?detail=${encodeURIComponent(key)}`;
}

function canonicalPublicTarget(target) {
  const publicPath = publicTargetPaths[target?.dataset?.publicTarget];
  if (!publicPath) return "";
  if (!(target instanceof HTMLAnchorElement)) return publicPath;
  const declared = target.getAttribute("href") || "";
  const hashIndex = declared.indexOf("#");
  return hashIndex >= 0 ? `${publicPath}${declared.slice(hashIndex)}` : publicPath;
}

function renderPublicDetail(key = "mab-overview", { scroll = true, updateUrl = true } = {}) {
  const story = publicDetailStories[key] || publicDetailStories["mab-overview"];
  const resolvedKey = publicDetailStories[key] ? key : "mab-overview";
  const panel = document.querySelector("#publicDetailPanel");
  if (!panel) return false;

  const next = publicDetailStories[story.next] || publicDetailStories["mab-overview"];
  const nextKey = publicDetailStories[story.next] ? story.next : "mab-overview";
  panel.innerHTML = `
    <article class="public-enterprise-detail">
      <div>
        <span>${story.label}</span>
        <h3>${story.title}</h3>
        <p>${story.summary}</p>
      </div>
      <ul>${story.outcomes.map((outcome) => `<li>${outcome}</li>`).join("")}</ul>
      <footer>
        <a href="${publicDetailPath(nextKey)}" data-public-detail-next="${nextKey}">Next: ${next.label}</a>
        <a href="/pilot" data-public-target="publicPilot">Discuss this workflow</a>
      </footer>
    </article>`;

  document.querySelectorAll("[data-public-detail]").forEach((item) => {
    const active = item.dataset.publicDetail === resolvedKey;
    item.classList.toggle("active", active);
    if (item instanceof HTMLButtonElement) item.setAttribute("aria-pressed", String(active));
  });

  if (updateUrl && window.location.pathname === "/product") {
    window.history.pushState({ detail: resolvedKey }, "", publicDetailPath(resolvedKey));
  }
  if (scroll) panel.scrollIntoView({ behavior: "smooth", block: "center" });
  return true;
}

function markActivePublicNavigation() {
  const activeTargetByPage = {
    platform: "publicPlatform",
    workflow: "publicWorkflow",
    ecosystem: "publicEcosystem",
    simulation: "publicEcosystem",
    scheduling: "publicEcosystem",
    tea: "publicEcosystem",
    biopharma: "publicEcosystem",
    fermentation: "publicEcosystem",
    resources: "publicResources",
    compare: "publicResources",
    migration: "publicResources",
    readiness: "publicResources",
    brand: "publicResources",
    faq: "publicFaq",
    pricing: "publicPricing",
    pilot: "publicPilot",
  };
  const activeTarget = activeTargetByPage[requestedPage];
  document.querySelectorAll(".public-nav-links [data-public-target]").forEach((link) => {
    if (link.dataset.publicTarget === activeTarget) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function handOffToWorkspace(target) {
  loadWorkspace()
    .then(() => {
      document.removeEventListener("click", interceptPublicAction, true);
      target.click();
    })
    .catch(() => {
      window.location.reload();
    });
}

function interceptPublicAction(event) {
  const target = event.target.closest(
    "#publicLogo, #openLoginHero, [data-public-target], [data-public-detail], [data-public-detail-next]",
  );
  if (!target) return;

  if (target.id === "publicLogo") {
    event.preventDefault();
    openPublicHome();
    return;
  }

  if (target.dataset.checkoutPlan) {
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign(`/login?plan=${encodeURIComponent(target.dataset.checkoutPlan)}`);
    return;
  }

  const detailKey = target.dataset.publicDetailNext || target.dataset.publicDetail;
  if (detailKey) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (window.location.pathname === "/product" && document.querySelector("#publicDetailPanel")) {
      renderPublicDetail(detailKey);
    } else {
      window.location.assign(publicDetailPath(detailKey));
    }
    return;
  }

  const publicPath = canonicalPublicTarget(target);
  if (publicPath) {
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign(publicPath);
    return;
  }

  if (target.id === "openLoginHero") {
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign("/login");
    return;
  }

  event.preventDefault();
  event.stopImmediatePropagation();
  handOffToWorkspace(target);
}

async function submitPublicEngineeringBrief(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const result = form.querySelector("#publicBriefResult");
  const button = form.querySelector('button[type="submit"]');
  const payload = {
    email: form.querySelector("#publicBriefEmail")?.value.trim() || "",
    role: form.querySelector("#publicBriefRole")?.value.trim() || "",
    website: form.querySelector("#publicBriefWebsite")?.value || "",
    consent: Boolean(form.querySelector("#publicBriefConsent")?.checked),
    source: params.get("utm_source") || document.referrer || "website",
    campaign: params.get("utm_campaign") || "engineering-brief",
    landingPage: window.location.href,
  };
  button.disabled = true;
  button.textContent = "Joining...";
  result.className = "brief-result is-pending";
  result.textContent = "Saving your subscription securely.";
  try {
    const response = await fetch("/api/leads/engineering-brief", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || "The signup could not be saved.");
    result.className = "brief-result is-success";
    result.textContent = `You're on the list. Reference ${body.reference || "created"}.`;
    form.reset();
  } catch (error) {
    result.className = "brief-result is-error";
    result.textContent = error.message || "The signup could not be saved. Please try again.";
  } finally {
    button.disabled = false;
    button.textContent = "Join the engineering brief";
  }
}

async function submitTechnicalPilot(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const result = form.querySelector("#pilotResult");
  const button = form.querySelector('button[type="submit"]');
  const payload = {
    name: form.querySelector("#pilotName")?.value.trim() || "",
    email: form.querySelector("#pilotEmail")?.value.trim() || "",
    company: form.querySelector("#pilotCompany")?.value.trim() || "",
    role: form.querySelector("#pilotRole")?.value.trim() || "",
    process: form.querySelector("#pilotProcess")?.value || "",
    challenge: form.querySelector("#pilotChallenge")?.value.trim() || "",
    website: form.querySelector("#pilotWebsite")?.value || "",
    consent: Boolean(form.querySelector("#pilotConsent")?.checked),
    source: params.get("utm_source") || document.referrer || "website",
    campaign: params.get("utm_campaign") || "technical-pilot",
    landingPage: window.location.href,
  };
  button.disabled = true;
  button.textContent = "Sending request...";
  result.className = "pilot-result is-pending";
  result.textContent = "Saving your process evaluation request securely.";
  try {
    const response = await fetch("/api/leads/pilot", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || "The request could not be sent.");
    result.className = "pilot-result is-success";
    result.replaceChildren();
    const heading = document.createElement("strong");
    heading.textContent = "Request received";
    const copy = document.createElement("span");
    copy.textContent = `Reference ${body.reference || "created"}. Axion will use your engineering question to prepare the next step.`;
    result.append(heading, copy);
    form.reset();
  } catch (error) {
    result.className = "pilot-result is-error";
    result.textContent = error.message || "The request could not be sent. Please try again.";
  } finally {
    button.disabled = false;
    button.textContent = "Request technical pilot";
  }
}

async function submitMigrationAssessment(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const result = form.querySelector("#migrationAssessmentResult");
  const button = form.querySelector('button[type="submit"]');
  const currentWorkflow = form.querySelector("#migrationCurrentWorkflow")?.value.trim() || "Current process-modelling workflow";
  const priority = form.querySelector("#migrationPriority")?.value.trim() || "Workflow evaluation";
  const notes = form.querySelector("#migrationNotes")?.value.trim() || "Compare one authorized reference process using agreed acceptance criteria.";
  const payload = {
    name: form.querySelector("#migrationName")?.value.trim() || "Migration assessment",
    email: form.querySelector("#migrationEmail")?.value.trim() || "",
    company: form.querySelector("#migrationCompany")?.value.trim() || "",
    role: form.querySelector("#migrationRole")?.value.trim() || "Process engineering",
    process: currentWorkflow,
    challenge: `${priority}: ${notes}`,
    website: form.querySelector("#migrationWebsite")?.value || "",
    consent: Boolean(form.querySelector("#migrationConsent")?.checked),
    source: params.get("utm_source") || document.referrer || "website",
    campaign: params.get("utm_campaign") || "superpro-migration",
    landingPage: window.location.href,
  };
  button.disabled = true;
  button.textContent = "Submitting...";
  result.className = "intent-form-result is-pending";
  result.textContent = "Creating a private assessment request.";
  try {
    const response = await fetch("/api/leads/pilot", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || "The assessment request could not be saved.");
    result.className = "intent-form-result is-success";
    result.textContent = `Assessment request received. Reference ${body.reference || "created"}.`;
    form.reset();
  } catch (error) {
    result.className = "intent-form-result is-error";
    result.textContent = error.message || "The assessment request could not be saved.";
  } finally {
    button.disabled = false;
    button.textContent = "Request migration assessment";
  }
}

if (requestedPage !== "home") showRequestedPublicPageImmediately(requestedPage);
bindPublicScrollProgress();
bindPublicHeroMotion();
bindPublicPilot();
bindPublicMenu();
markActivePublicNavigation();
if (requestedPage === "platform") renderPublicDetail(requestedDetail || "mab-overview", { scroll: false, updateUrl: false });
window.addEventListener("popstate", () => {
  if (window.location.pathname === "/product") {
    renderPublicDetail(new URLSearchParams(window.location.search).get("detail") || "mab-overview", { scroll: false, updateUrl: false });
  }
});

const lightweightPublicPages = new Set([
  "home", "platform", "workflow", "ecosystem", "resources", "simulation", "scheduling", "tea",
  "biopharma", "fermentation", "compare", "migration", "readiness", "faq", "pricing", "pilot", "legal", "brand", "login",
]);
const requiresWorkspaceBundle = !lightweightPublicPages.has(requestedPage)
  || (Boolean(session) && requestedPage === "home");

if (requiresWorkspaceBundle) {
  loadWorkspace();
} else {
  document.addEventListener("click", interceptPublicAction, true);
  document.querySelector("#publicBriefSignupForm")?.addEventListener("submit", submitPublicEngineeringBrief);
  document.querySelector("#pilotForm")?.addEventListener("submit", submitTechnicalPilot);
  document.querySelector("#migrationAssessmentForm")?.addEventListener("submit", submitMigrationAssessment);
  if (requestedPage === "login") {
    bindLightweightLogin();
  }
}
