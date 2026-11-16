import { useEffect, useState } from "react";

// Describes the shape of the data the backend sends us
interface HealthResponse {
  status: string;
  time: string;
}

function App() {
  // <HealthResponse | null> means: "either a HealthResponse, or null (not loaded yet)"
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<HealthResponse>;
      })
      .then((data) => setHealth(data))
      .catch((err: Error) => setError(err.message));
  }, []); // [] = run once when the component first appears

  return (
    <div className="container py-5">
      <h1 className="mb-4">AI Job Application Assistant</h1>

      {error && <div className="alert alert-danger">Backend error: {error}</div>}

      {health ? (
        <div className="alert alert-success">
          Backend status: <strong>{health.status}</strong> ({health.time})
        </div>
      ) : (
        !error && <p>Checking backend…</p>
      )}
    </div>
  );
}

export default App;