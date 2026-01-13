"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Sparkles, Loader2, Copy, Youtube } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setNotes("");
    
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setNotes(data.notes);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-900">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-blue-600 mb-2">TubeNote-by-DJK</h1>
          <p className="text-slate-500 text-lg">AI-powered YouTube to Structured Notes</p>
        </header>

        <div className="bg-white p-4 rounded-2xl shadow-sm border flex flex-col md:flex-row gap-3 mb-8">
          <input 
            className="flex-1 p-3 outline-none text-lg"
            placeholder="Paste YouTube URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            onClick={handleGenerate}
            disabled={loading || !url}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
            {loading ? "Processing..." : "Generate Notes"}
          </button>
        </div>

        {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg mb-8">{error}</div>}

        {notes && (
          <div className="bg-white p-8 rounded-3xl shadow-xl border relative animate-in fade-in duration-700">
            <button 
              onClick={() => navigator.clipboard.writeText(notes)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-blue-600 transition-colors"
              title="Copy to Clipboard"
            >
              <Copy size={24} />
            </button>
            <article className="prose prose-slate max-w-none">
              <ReactMarkdown>{notes}</ReactMarkdown>
            </article>
          </div>
        )}
      </div>
    </main>
  );
}