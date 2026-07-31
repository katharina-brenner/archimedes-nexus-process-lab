const publicGate = document.querySelector("#loginGate");
const session = window.localStorage.getItem("axion-session");
const params = new URLSearchParams(window.location.search);
const requestedPage = params.get("page") || "home";
const checkoutReturn = params.has("checkout") || params.has("session_id");

let workspacePromise;

function loadWorkspace() {
  if (!workspacePromise) workspacePromise = import("./app.js?v=20260731-engineering-export-v2");
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
  publicGate?.scrollTo({ top: 0, behavior: "smooth" });
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

  event.preventDefault();
  event.stopImmediatePropagation();
  handOffToWorkspace(target);
}

if (requestedPage !== "home") showRequestedPublicPageImmediately(requestedPage);

if (session || requestedPage !== "home" || checkoutReturn) {
  loadWorkspace();
} else {
  document.addEventListener("click", interceptPublicAction, true);
}
