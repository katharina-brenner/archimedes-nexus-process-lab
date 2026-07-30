import { buildCrossingAwareRoutePlan } from "./canvas-router.js?v=20260730-hierarchical-router-v2";

self.addEventListener("message", (event) => {
  const { signature, input } = event.data || {};
  if (!signature || !input) return;
  try {
    self.postMessage({
      signature,
      plan: buildCrossingAwareRoutePlan(input),
    });
  } catch (error) {
    self.postMessage({
      signature,
      error: error instanceof Error ? error.message : "Global routing failed",
    });
  }
});
