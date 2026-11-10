"use client";

import { useEffect, useRef } from "react";

interface ReviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewDrawer({ isOpen, onClose }: ReviewDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (isOpen) {
      if (!wasOpenRef.current) {
        previousFocusRef.current = document.activeElement as HTMLElement | null;
        wasOpenRef.current = true;
      }
      document.body.style.overflow = "hidden";

      // Move focus into the drawer
      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      } else {
        drawerRef.current?.focus();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          onCloseRef.current();
          return;
        }

        if (e.key === "Tab") {
          const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (!focusable || focusable.length === 0) {
            e.preventDefault();
            drawerRef.current?.focus();
            return;
          }

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first || !drawerRef.current?.contains(document.activeElement)) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last || !drawerRef.current?.contains(document.activeElement)) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && wasOpenRef.current) {
      wasOpenRef.current = false;
      document.body.style.overflow = "";
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === "function") {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (wasOpenRef.current) {
        document.body.style.overflow = "";
        if (previousFocusRef.current && typeof previousFocusRef.current.focus === "function") {
          previousFocusRef.current.focus();
        }
      }
    };
  }, []);

  if (!isOpen) return null;

  const sections = [
    { num: "01", name: "Monumental Hero & Story Beats", status: "Continuous GSAP Timeline" },
    { num: "02", name: "Living HTML5 3D Network Canvas", status: "Perspective Math & 80 Nodes" },
    { num: "03", name: "Reduced Motion Engine", status: "Accessible Non-Pinned Layout" },
    { num: "04", name: "People Constellation", status: "Categorized Roster & Modals" },
    { num: "05", name: "Events & Workshop Radar", status: "Curriculum Previews & Syllabi" },
    { num: "06", name: "4 Chapter Growth Pillars", status: "Workshops, Projects, Papers, Contests" },
    { num: "07", name: "Selected Student Software", status: "Curated Tools & Blueprints" },
    { num: "08", name: "Membership Intake Portal", status: "The 4 Verbs & Prototype Modal" },
    { num: "09", name: "Footer Directory", status: "Global ACM Resources" },
    { num: "10", name: "Senior Review & Spec Drawer", status: "Integrated Architecture Audit" },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md transition-opacity font-mono"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-label="Close review guide backdrop"
      />
      <div
        ref={drawerRef}
        tabIndex={-1}
        className="relative z-10 flex h-full w-full max-w-xl flex-col border-l border-cyan-500/30 bg-[#040a18]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl overflow-y-auto focus:outline-none"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-widest text-cyan-400">
              <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              SENIOR PRESENTATION GUIDE // ACM 2026
            </div>
            <h2 id="review-drawer-title" className="mt-1 text-xl font-bold tracking-tight text-white font-sans">
              Visual Product Preview Walkthrough
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/60 transition-colors cursor-pointer"
            aria-label="Close presentation guide"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6 text-xs text-slate-300 font-sans">
          {/* Section 1: Senior Presentation Thesis */}
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-300 font-bold">
              01 // How To Present This To ACM Seniors
            </h3>
            <p className="mt-2 text-slate-300 leading-relaxed font-light">
              This build is a <strong>complete visual product preview</strong> of the upcoming ACM Chapter website. It demonstrates exactly where every major chapter feature lives—events, calendar, members, projects, photos, learning resources, and contact pipelines—while rigorously avoiding any fake ACM facts or made-up statistics.
            </p>
          </div>

          {/* Section 2: Integrity & Claims Audit */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold mb-3">
              02 // Integrity & Content Accuracy Breakdown
            </h3>
            <div className="space-y-3 font-mono text-[11px]">
              {/* Category A: Genuine External ACM Links */}
              <div className="rounded border border-emerald-500/30 bg-[#02120b] p-3.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <span>✓</span>
                  <span>GENUINE EXTERNAL ACM LINKS:</span>
                </div>
                <p className="mt-1.5 text-slate-300 font-sans text-xs leading-relaxed">
                  Official outbound links in the footer connecting to ACM Global (<code className="text-emerald-300">acm.org</code>), the ACM Digital Library (<code className="text-emerald-300">dl.acm.org</code>), the Student Chapters Directory, and the ACM Code of Ethics are authentic, legitimate external references to official ACM headquarters services.
                </p>
              </div>

              {/* Category B: Sample / Demo Content */}
              <div className="rounded border border-amber-500/30 bg-[#140d04] p-3.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <span>✦</span>
                  <span>SAMPLE / DEMO CONTENT (ILLUSTRATIVE):</span>
                </div>
                <p className="mt-1.5 text-slate-300 font-sans text-xs leading-relaxed">
                  Event dates, session syllabi, speaker roles, member profiles, and student software briefs are sample data created to illustrate layout hierarchy and presentation formatting until ratified by the incoming 2026 Executive Committee.
                </p>
              </div>

              {/* Category C: Prototype Interactions */}
              <div className="rounded border border-cyan-500/30 bg-[#030c1e] p-3.5">
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <span>⚙</span>
                  <span>PROTOTYPE INTERACTIONS (NO BACKEND):</span>
                </div>
                <p className="mt-1.5 text-slate-300 font-sans text-xs leading-relaxed">
                  The event modal registration placeholder, the membership intake form in the Join section, role filters, and modal dialogues are functional client-side UI prototypes. They are not connected to a live production database, ticketing provider, or webhook.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Feature Matrix */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold mb-3">
              03 // Implemented Feature Matrix
            </h3>
            <div className="divide-y divide-slate-800 rounded-xl border border-slate-800 bg-[#030714] font-mono text-[11px]">
              {sections.map((s) => (
                <div key={s.num} className="p-2.5 flex items-center justify-between">
                  <span className="text-white font-semibold">
                    {s.num}. {s.name}
                  </span>
                  <span className="text-cyan-400 text-[10px]">{s.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Phase 2 Next Steps */}
          <div className="rounded-xl border border-slate-800 bg-[#02050f] p-4 font-mono text-xs">
            <span className="text-cyan-300 font-bold block mb-1">
              04 // PHASE 2 INTEGRATION ROADMAP
            </span>
            <ul className="space-y-1.5 text-slate-400 text-[11px] font-sans">
              <li>• Connect Google Calendar / Devfolio API to the Interactive Calendar.</li>
              <li>• Populate official member photos and verified social links.</li>
              <li>• Embed student chapter research preprints in the Learning Repository.</li>
              <li>• Bind the Join Form to the official chapter registration database.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-cyan-500/20 pt-4 flex justify-between items-center text-xs font-mono text-slate-400">
          <span>ACM FACE // PROTOTYPE EXPERIENCE</span>
          <button
            onClick={onClose}
            className="rounded bg-cyan-500/20 px-4 py-2 text-cyan-300 hover:bg-cyan-500/30 transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
