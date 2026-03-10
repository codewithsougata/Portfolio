import React from "react";
import { WebcamPixelGrid } from "./ui/webcam-pixel-grid";

export function WebcamPixelGridDemo() {
  return (
    <section className="section-container" style={{ paddingTop: 0, paddingBottom: 80 }}>
      <div className="section-box">
        <div className="glass-card" style={{ padding: '60px 40px', minHeight: 450, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Webcam pixel grid as a smaller background inside the box */}
          <div className="absolute inset-0 opacity-40">
            <WebcamPixelGrid
              gridCols={40}
              gridRows={30}
              maxElevation={30}
              motionSensitivity={0.3}
              elevationSmoothing={0.2}
              colorMode="webcam"
              backgroundColor="#030303"
              mirror={true}
              gapRatio={0.08}
              invertColors={false}
              darken={0.4}
              borderColor="#ffffff"
              borderOpacity={0.05}
              className="w-full h-full"
            />
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/60 pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10 text-center max-w-2xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface2)] px-4 py-1.5 text-sm text-[var(--text-dim)] backdrop-blur-sm">
              Available for new projects &rarr;
            </div>

            {/* Title */}
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-5xl">
              Let's create something <span className="text-cyan-400">amazing</span>.
            </h2>

            {/* Description */}
            <p className="mb-10 text-base text-[var(--text-dim)] sm:text-lg">
              Have a vision? I have the tools. Let's combine our skills to build the next big thing.
            </p>

            {/* Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#contact"
                className="btn-3d"
                style={{ padding: '12px 32px', fontSize: 16 }}
              >
                Start a Project
              </a>
              <a
                href="/resume.pdf"
                download
                className="btn-3d-secondary"
                style={{ padding: '12px 32px', fontSize: 16 }}
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
