"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { 
  Sparkles, Loader2, Copy, Youtube, 
  AlertCircle, Check, BookOpen, Clock, Zap, ArrowRight 
} from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleGenerate = async () => {
    if (!url) return;
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
      if (!res.ok) throw new Error(data.error || "Failed to generate notes");
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

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* 1. Cinematic Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[128px] animate-pulse mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[128px] animate-pulse delay-1000 mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto py-20 px-6">
        
        {/* 2. Modern Badge & Hero */}
        <div className="text-center space-y-8 mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-indigo-500/10 transition-transform hover:scale-105 cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-xs font-medium text-indigo-300 tracking-wide">V2.0 LIVE</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-500 drop-shadow-2xl">
            TubeNote<span className="text-indigo-500">.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Turn chaotic video lectures into <span className="text-indigo-300 font-semibold">crystal clear</span> study guides. 
            Powered by the new Gemini 2.5 engine.
          </p>
        </div>

        {/* 3. The "Glow" Input Field */}
        <div className="max-w-3xl mx-auto mb-16 relative group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          {/* Animated Gradient Border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-[2.2rem] opacity-30 group-hover:opacity-70 blur transition duration-500"></div>
          
          <div className="relative flex items-center bg-[#0B1121] rounded-[2rem] p-2 shadow-2xl border border-white/5">
            <div className="pl-6 pr-4 text-slate-500">
              <Youtube size={28} className="group-focus-within:text-red-500 transition-colors duration-300" />
            </div>
            
            <input 
              className="flex-1 bg-transparent py-5 text-lg outline-none text-white placeholder:text-slate-600 font-medium"
              placeholder="Paste YouTube URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />

            <button 
              onClick={handleGenerate}
              disabled={loading || !url}
              className="relative overflow-hidden bg-white text-black px-8 py-4 rounded-[1.6rem] font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-indigo-600" />
                  <span>Generate</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-200 rounded-xl flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-top-2">
            <AlertCircle className="shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* 4. Results Card with Glassmorphism */}
        {notes && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="relative bg-[#0F1629]/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Card Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <BookOpen size={16} />
                  </div>
                  <span className="text-sm font-semibold text-slate-300 tracking-wide">STUDY GUIDE</span>
                </div>
                <button 
                  onClick={handleCopy}
                  className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs font-medium text-slate-300 hover:text-white"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  <span>{copied ? "COPIED" : "COPY"}</span>
                </button>
              </div>

              {/* Markdown Content */}
              <div className="p-8 md:p-12">
                <article className="prose prose-invert prose-lg max-w-none 
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
                  prose-p:text-slate-300 prose-p:leading-8
                  prose-li:text-slate-300 prose-strong:text-indigo-300
                  prose-blockquote:border-l-indigo-500 prose-blockquote:bg-indigo-500/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                  prose-code:text-indigo-300 prose-code:bg-indigo-950/50 prose-code:px-1 prose-code:rounded">
                  <ReactMarkdown>{notes}</ReactMarkdown>
                </article>
              </div>
            </div>
          </div>
        )}

        {/* 5. Feature Grid (Empty State) */}
        {!notes && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 opacity-40 hover:opacity-100 transition-opacity duration-500">
            {[
              { icon: Zap, label: "Instant Analysis", desc: "Process 1hr videos in seconds" },
              { icon: BookOpen, label: "Smart Formatting", desc: "Auto-structured key points" },
              { icon: Clock, label: "Time Saver", desc: "Skip the fluff, get the facts" }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center gap-3">
                <feature.icon className="text-indigo-400" size={24} />
                <h3 className="text-slate-200 font-semibold">{feature.label}</h3>
                <p className="text-slate-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}