'use client';

import { useMemo, useState } from "react";
import {
  BrainCircuit,
  Cpu,
  Database,
  Lock,
  Radar,
  Send,
  ServerCog,
  ShieldCheck,
  Sparkle,
  TerminalSquare,
  Zap,
} from "lucide-react";

type Role = "user" | "assistant";

type Message = {
  id: string;
  role: Role;
  content: string;
  timestamp: string;
};

const developerCommands = [
  {
    name: "TRAIN:ADD",
    description: "Stream new examples into the training buffer for rapid prototyping.",
  },
  {
    name: "TRAIN:PREPARE",
    description: "Start LoRA/QLoRA fine-tuning with your curated buffer and dataset bundle.",
  },
  {
    name: "TRAIN:EVAL",
    description: "Benchmark adapter checkpoints against local eval suites with instant reports.",
  },
  {
    name: "TRAIN:EXPORT_ADAPTER",
    description: "Package LoRA adapters for on-device deployment or sharing with your team.",
  },
  {
    name: "TRAIN:LOAD_ADAPTER",
    description: "Hot-swap adapters without restarting the runtime and keep conversation context.",
  },
  {
    name: "TRAIN:RESET_BUFFER",
    description: "Clear pending examples to rewind experiments without touching archived data.",
  },
  {
    name: "TRAIN:CONFIRM_PII",
    description: "Force a manual review of flagged records before they enter the training loop.",
  },
];

const stats = [
  {
    title: "100% Air-Gapped",
    value: "Offline-first",
    icon: ShieldCheck,
    blurb: "No telemetry, no analytics, no phone-home. LocalTrainer stays on your device.",
  },
  {
    title: "LoRA + QLoRA",
    value: "Adapter-ready",
    icon: ServerCog,
    blurb: "Mix and match adapters to specialize base models in minutes instead of days.",
  },
  {
    title: "Dataset Control",
    value: "Granular ACLs",
    icon: Database,
    blurb: "Tag, version, and diff datasets to keep provenance airtight across projects.",
  },
];

const knowledgeHighlights = [
  {
    icon: Lock,
    title: "Private by Design",
    description:
      "All reasoning, training, and evaluation happen on your workstation or dedicated edge nodes. You decide what leaves the room—if anything ever does.",
  },
  {
    icon: BrainCircuit,
    title: "Adaptive Memory",
    description:
      "Teach LocalTrainer new behaviors through conversational feedback, structured datasets, or advanced adapter training pipelines.",
  },
  {
    icon: Cpu,
    title: "Hardware Conscious",
    description:
      "Optimized for consumer GPUs and Apple Silicon. Automatically tunes batch sizes, quantization, and caching for smooth fine-tuning.",
  },
];

const datasetFeatures = [
  {
    title: "Curate with Confidence",
    points: [
      "Segment datasets by project, domain, and compliance tier.",
      "Version snapshots with diff previews to audit every edit.",
      "Blend synthetic data with human-reviewed examples safely.",
    ],
  },
  {
    title: "Automated Sanitization",
    points: [
      "PII scrubbing pipeline with manual checkpoints.",
      "Smart dedupe to keep buffers lean and signal-rich.",
      "Schema-aware validators for structured corpora.",
    ],
  },
  {
    title: "Live Monitoring",
    points: [
      "Track loss, accuracy, and drift in real time.",
      "Compare adapters side-by-side before promotion.",
      "Export eval summaries in JSON or Markdown.",
    ],
  },
];

const cannedReplies = [
  {
    match: /status|health|uptime/i,
    reply:
      "All systems nominal. Last fine-tune completed 2h ago with adapter `sales-coach-lora`. Ready for new instructions.",
  },
  {
    match: /train|fine-?tune/i,
    reply:
      "Queueing TRAIN:PREPARE. Please review the staged dataset `demo-playbook-v4` and confirm PII before execution.",
  },
  {
    match: /adapter|load/i,
    reply:
      "Available adapters: support-lite, sales-coach-lora, onboarding-pro. Use TRAIN:LOAD_ADAPTER <name> to hot-swap.",
  },
  {
    match: /dataset|data/i,
    reply:
      "Dataset volumes: `support_tickets` (12k), `knowledge_articles` (3.1k), `synthetic_prompts` (640). Buffer ready for merge.",
  },
];

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "LocalTrainer online. Your private co-pilot for on-device reasoning, rapid fine-tuning, and compliance-safe workflows.",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: crypto.randomUUID(),
      role: "user",
      content: "Give me a status update on training.",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Latest adapter `support-lite` reached target accuracy at step 430. Drift monitors are green across support KPIs.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const suggestions = useMemo(
    () => [
      "How do I add new examples?",
      "List active adapters",
      "Prep a QLoRA run",
      "Show dataset audit log",
    ],
    []
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) {
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    const assistantReply = cannedReplies.find((item) =>
      item.match.test(input.trim())
    )?.reply;

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        assistantReply ??
        "Buffer updated. Ready to orchestrate the next training sequence whenever you are.",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#12f7ff33,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 -left-48 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,#7b61ff2b,transparent_65%)] blur-3xl" />
        <div className="absolute bottom-20 -right-44 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,#12f7ff29,transparent_60%)] blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-24 px-6 pb-24 pt-16 sm:px-10 lg:px-16 xl:px-20">
        <header className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/60 bg-cyan-400/10">
              <Sparkle className="h-5 w-5 text-cyan-300" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-wide text-slate-100">
                LocalTrainer
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">
                Offline AI Studio
              </p>
            </div>
          </div>
          <a
            href="#developer-mode"
            className="group inline-flex items-center gap-2 rounded-full border border-cyan-400/70 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20"
          >
            <TerminalSquare className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            Explore Developer Mode
          </a>
        </header>

        <section className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div className="flex flex-col gap-10">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.45em] text-cyan-200/80">
                Private. Trainable. Yours.
              </span>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Bring an offline AI copilot to your workstation.
              </h1>
              <p className="max-w-xl text-lg text-slate-300">
                LocalTrainer blends a privacy-first runtime with adapter-ready
                training workflows. Give it context, refine its instincts, and
                deploy specialized models without leaking a single token.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button className="group inline-flex items-center gap-3 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                  Launch Sandbox
                  <Zap className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-200">
                  View Documentation
                </button>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.title}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-300/50 hover:bg-cyan-300/10"
                >
                  <stat.icon className="mb-4 h-6 w-6 text-cyan-300" />
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                    {stat.title}
                  </p>
                  <p className="mb-2 text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-400">{stat.blurb}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_50px_-20px_rgba(18,247,255,0.6)] backdrop-blur-md">
            <div className="absolute -inset-x-16 -top-16 h-32 bg-[radial-gradient(circle,_rgba(18,247,255,0.25)_0%,_transparent_70%)]" />
            <div className="relative space-y-4">
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-[0.4em] text-cyan-200/70">
                <Radar className="h-4 w-4 text-cyan-300" />
                Live session
              </div>
              <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                <p>
                  “LocalTrainer gives us a private control plane for internal AI
                  agents. We iterate on adapters daily without ever touching the
                  public cloud.”
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">
                  — Elena Ortiz, Lead ML Engineer
                </p>
              </div>
              <div className="rounded-2xl border border-cyan-400/30 bg-slate-950/80 p-5 shadow-inner">
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
                  Offline Core
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  Encrypted tensor cache, GPU-aware scheduler, native CLI +
                  gRPC bridge. All on your desk.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h2 className="flex items-center gap-3 text-2xl font-semibold text-white">
              <Lock className="h-6 w-6 text-cyan-300" />
              Airtight privacy
            </h2>
            <p className="mt-4 text-slate-300">
              Install LocalTrainer on an offline workstation, laptop, or
              air-gapped rack. It runs fully locally, caches weights securely,
              and signs every adapter so you know exactly what is running.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {knowledgeHighlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 transition hover:border-cyan-300/40 hover:bg-slate-900/70"
                >
                  <highlight.icon className="mb-3 h-6 w-6 text-cyan-300" />
                  <p className="text-lg font-semibold text-white">
                    {highlight.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Chat with LocalTrainer</h2>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                live demo
              </span>
            </div>
            <div className="flex-1 space-y-4 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
              <div className="space-y-3 overflow-y-auto pr-2" style={{ maxHeight: "20rem" }}>
                {messages.map((message) => (
                  <div key={message.id} className="space-y-1">
                    <p
                      className={`text-xs uppercase tracking-[0.35em] ${
                        message.role === "assistant" ? "text-cyan-200/80" : "text-slate-500"
                      }`}
                    >
                      {message.role === "assistant" ? "LocalTrainer" : "You"} · {message.timestamp}
                    </p>
                    <p
                      className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                        message.role === "assistant"
                          ? "bg-cyan-400/10 text-cyan-100"
                          : "ml-auto bg-white/10 text-slate-100"
                      }`}
                    >
                      {message.content}
                    </p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                  placeholder="Ask about training, adapters, or datasets..."
                />
                <button
                  type="submit"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 text-slate-950 transition hover:bg-cyan-300"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setInput(suggestion)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-3xl font-semibold text-white">
                Fine-tune at your pace with LoRA and QLoRA
              </h2>
              <p className="text-lg text-slate-300">
                LocalTrainer ships with opinionated pipelines for adapter-based fine-tuning. Jump
                from curated datasets to production-ready checkpoints with a single command, using
                quantized flows that keep VRAM usage low without sacrificing quality.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-cyan-400/40 bg-cyan-400/10 p-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
                  LoRA Toolkit
                </h3>
                <p className="mt-2 text-sm text-slate-100">
                  Compose adapters, freeze layers selectively, and export to GGUF, safetensors, or
                  ONNX formats.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                  QLoRA Flow
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  Mixed-precision optimizers plus double-quantization keep memory footprints small
                  for laptop-grade GPUs.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {datasetFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 transition hover:border-cyan-300/40 hover:bg-slate-900/70"
              >
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="developer-mode" className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-white">Developer Mode Command Palette</h2>
              <p className="mt-2 text-slate-300">
                Automate adapter experimentation, enforce privacy gates, and move faster with a CLI
                designed for power users.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-200/80">
              <TerminalSquare className="h-4 w-4 text-cyan-300" />
              typed once · scripted forever
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {developerCommands.map((command) => (
              <div
                key={command.name}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-5 transition hover:border-cyan-300/40 hover:bg-slate-900/70"
              >
                <span className="inline-flex w-max items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.45em] text-cyan-200">
                  {command.name}
                </span>
                <p className="text-sm text-slate-300">{command.description}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="flex flex-col items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-xs uppercase tracking-[0.4em] text-slate-500 backdrop-blur-md sm:flex-row sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} LocalTrainer · Offline AI, perfected.</p>
          <div className="flex items-center gap-4 text-[0.6rem]">
            <span className="flex items-center gap-2 text-cyan-200/80">
              <Zap className="h-3.5 w-3.5" />
              Adapter snapshots synced locally
            </span>
            <span className="flex items-center gap-2 text-slate-400">
              <Database className="h-3.5 w-3.5" />
              Dataset integrity verified
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
