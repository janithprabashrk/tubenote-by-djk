"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Sparkles, Loader2, Copy, Youtube, AlertCircle, Check } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setNotes("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate notes");
      }

      setNotes(data.notes);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(notes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-blue-600 mb-3 tracking-tight">
            TubeNote-by-DJK
          </h1>
          <p className="text-slate-500 text-lg">AI-powered YouTube Study Companion</p>
        </div>

        {/* Input Card */}
        <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-3 mb-8">
          <div className="flex-1 flex items-center px-4 gap-3 bg-slate-50 rounded-2xl border border-transparent focus-within:border-blue-300 transition-all">
            <Youtube className="text-red-500" />
            <input 
              className="w-full py-4 bg-transparent outline-none text-slate-800"
              placeholder="Paste YouTube Link here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button 
            onClick={handleGenerate}
            disabled={loading || !url}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-blue-200"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
            {loading ? "Analyzing..." : "Generate"}
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl mb-8">
            <AlertCircle size={20} />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Results Card */}
        {notes && (
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center px-8 py-5 border-b border-slate-50 bg-slate-50/50">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Study Notes</span>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="p-8 md:p-12">
              <article className="prose prose-slate max-w-none">
                <ReactMarkdown>{notes}</ReactMarkdown>
              </article>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}