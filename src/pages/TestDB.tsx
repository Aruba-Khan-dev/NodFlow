'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TestDB() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase.from('projects').select('*').limit(5);
      if (error) setError(error.message);
      else setData(data || []);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  // Function to insert a test project
  const addTestProject = async () => {
    const clientId = data[0]?.client_id || 'replace-with-valid-client-uuid'; // use existing client UUID
    const { data: inserted, error } = await supabase.from('projects').insert([
      {
        title: "Test Project",
        client_id: clientId,
        status: "in_progress"
      }
    ]);
    if (error) alert("Error: " + error.message);
    else alert("Inserted project with ID: " + inserted[0].id);
    // Refresh the list
    const { data: refreshed } = await supabase.from('projects').select('*').limit(5);
    setData(refreshed || []);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Supabase Test — Projects Table</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button
        onClick={addTestProject}
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        Add Test Project
      </button>
    </div>
  );
}
