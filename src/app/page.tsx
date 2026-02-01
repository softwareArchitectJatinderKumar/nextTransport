import Dashboard from "./Dashboard/page";

export default function HomePage() {
  return (
    <div className="container text-center py-5">
      {/* <h1 className="display-4 fw-bold">Enterprise Fast-Track</h1>
      <p className="lead text-muted">A Solution Architect's blueprint for Next.js.</p>
      <div className="mt-4">
        <button className="btn btn-primary btn-lg px-4 me-md-2">Get Started</button>
        <button className="btn btn-outline-secondary btn-lg px-4">Documentation</button>
      </div> */}
      <Dashboard readOnly={true} />
    </div>
  );
}