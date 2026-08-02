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
  publicSimulationIntent: "/bioprocess-simulation-software",
  publicSchedulingIntent: "/biomanufacturing-scheduling-software",
  publicTeaIntent: "/bioprocess-tea-lca-software",
  publicBiopharmaIntent: "/biopharma-process-simulation",
  publicFermentationIntent: "/fermentation-process-modeling",
  publicReadiness: "/security",
  publicComparison: "/superpro-designer-alternative",
  publicMigration: "/superpro-designer-migration",
  publicPricing: "/pricing",
  publicPilot: "/pilot",
  publicLegal: "/legal",
  loginPanel: "/login",
};

let workspacePromise;

function loadWorkspace() {
  if (!workspacePromise) workspacePromise = import("./app.js?v=20260802-fast-login-v1");
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
      const loadCheckoutWorkspace = () => loadWorkspace().catch(() => {});
      checkoutForm.addEventListener("focusin", loadCheckoutWorkspace, { once: true });
      const handOffCheckout = async (event) => {
        event.preventDefault();
        const submit = checkoutForm.querySelector('button[type="submit"]');
        if (submit) {
          submit.disabled = true;
          submit.textContent = "Preparing secure checkout...";
        }
        try {
          await loadWorkspace();
          checkoutForm.removeEventListener("submit", handOffCheckout);
          if (submit) submit.disabled = false;
          checkoutForm.requestSubmit();
        } catch {
          if (submit) {
            submit.disabled = false;
            submit.textContent = "Continue to secure checkout";
          }
          const result = checkoutForm.querySelector("#checkoutResult");
          if (result) result.textContent = "Secure checkout could not be prepared. Please retry.";
        }
      };
      checkoutForm.addEventListener("submit", handOffCheckout);
    }

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

const lightweightPublicPages = new Set([
  "home", "platform", "workflow", "ecosystem", "resources", "simulation", "scheduling", "tea",
  "biopharma", "fermentation", "compare", "migration", "readiness", "legal", "login",
]);
const requiresWorkspaceBundle = checkoutReturn
  || ["pricing", "pilot"].includes(requestedPage)
  || !lightweightPublicPages.has(requestedPage)
  || (Boolean(session) && requestedPage === "home");

if (requiresWorkspaceBundle) {
  loadWorkspace();
} else {
  document.addEventListener("click", interceptPublicAction, true);
  document.querySelector("#publicBriefSignupForm")?.addEventListener("submit", submitPublicEngineeringBrief);
  document.querySelector("#migrationAssessmentForm")?.addEventListener("submit", submitMigrationAssessment);
  if (requestedPage === "login") {
    bindLightweightLogin();
  }
}
