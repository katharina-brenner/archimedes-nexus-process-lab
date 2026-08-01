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
  "bioprocess-simulation-software": "resources",
  "biomanufacturing-scheduling-software": "resources",
  "bioprocess-tea-lca-software": "resources",
  compare: "compare",
  "superpro-designer-alternative": "compare",
  security: "readiness",
  pricing: "pricing",
  pilot: "pilot",
  legal: "legal",
  login: "login",
};
const pathPage = routePages[window.location.pathname.replace(/^\/+|\/+$/g, "")];
const requestedPage = params.get("page") || pathPage || "home";
const checkoutReturn = params.has("checkout") || params.has("session_id");
const publicTargetPaths = {
  publicHome: "/",
  publicPlatform: "/product",
  publicWorkflow: "/workflow",
  publicEcosystem: "/solutions",
  publicResources: "/resources",
  publicReadiness: "/security",
  publicComparison: "/superpro-designer-alternative",
  publicPricing: "/pricing",
  publicPilot: "/pilot",
  publicLegal: "/legal",
  loginPanel: "/login",
};

let workspacePromise;

function loadWorkspace() {
  if (!workspacePromise) workspacePromise = import("./app.js?v=20260801-growth-v1");
  return workspacePromise;
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

function openPublicHome() {
  if (window.location.pathname === "/") publicGate?.scrollTo({ top: 0, behavior: "smooth" });
  else window.location.assign("/");
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

  if (target instanceof HTMLAnchorElement && target.hasAttribute("data-public-target")) return;

  const publicPath = publicTargetPaths[target.dataset.publicTarget];
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

if (requestedPage !== "home") showRequestedPublicPageImmediately(requestedPage);

const lightweightPublicPages = new Set(["home", "platform", "workflow", "ecosystem", "resources", "compare", "readiness", "legal"]);
const requiresWorkspaceBundle = checkoutReturn
  || ["login", "pricing", "pilot"].includes(requestedPage)
  || !lightweightPublicPages.has(requestedPage)
  || (Boolean(session) && requestedPage === "home");

if (requiresWorkspaceBundle) {
  loadWorkspace();
} else {
  document.addEventListener("click", interceptPublicAction, true);
  document.querySelector("#publicBriefSignupForm")?.addEventListener("submit", submitPublicEngineeringBrief);
}
