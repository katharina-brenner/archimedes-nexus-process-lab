const apiBase = process.env.AXION_API_BASE_URL || "http://127.0.0.1:8899";

export default function Page() {
  return (
    <main className="shell">
      <section>
        <p>Axion Process OS</p>
        <h1>Next.js backend-for-frontend adapter</h1>
        <span>
          This service is the deployable app edge for Axion. It keeps browser-facing
          routes, future SSR/auth gates, and public domain traffic separate from the
          modelling API core.
        </span>
        <div>
          <a href="/api/health">BFF health</a>
          <a href="/api/core/health">API core health</a>
          <a href={apiBase}>Open API core app</a>
        </div>
      </section>
    </main>
  );
}
