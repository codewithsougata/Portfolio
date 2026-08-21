import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import { projects_list } from "../assets/assets";
import { ExternalLink, Github } from "lucide-react";

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const Projects = () => {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <section
      id="projects"
      className="section-container relative w-full py-12 md:py-16"
      style={{ maxWidth: "960px", margin: "0 auto" }}
    >
      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: 32 }}
      >
        <p
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--cyan)",
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          What I've Built
        </p>

        <h2
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
            fontWeight: 800,
            color: "var(--text)",
            marginBottom: 10,
            lineHeight: 1.15,
          }}
        >
          Featured <span style={{ color: "var(--text)" }}>Projects</span>
        </h2>

        <div
          style={{
            width: 50,
            height: 3,
            background: "var(--cyan)",
            margin: "0 auto",
            borderRadius: 2,
          }}
        />
      </motion.div>

      {/* ── Overlay Backdrop ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm h-full w-full z-50"
          />
        )}
      </AnimatePresence>

      {/* ── Expanded Card Modal ── */}
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-50 p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 md:top-6 md:right-6 items-center justify-center bg-white rounded-full h-8 w-8 shadow-2xl z-[60] cursor-pointer hover:scale-110 transition-transform"
              onClick={() => setActive(null)}
              aria-label="Close modal"
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[460px] h-full md:h-fit md:max-h-[88vh] flex flex-col dark:bg-neutral-950 bg-white dark:border-white/10 border-neutral-200 rounded-3xl overflow-hidden shadow-2xl"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-44 md:h-52 rounded-tr-2xl rounded-tl-2xl object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4 md:p-5 pb-2">
                  <div className="pr-3">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold dark:text-white text-neutral-900 text-base md:text-lg leading-tight"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.title}-${id}`}
                      className="dark:text-neutral-400 text-neutral-600 text-xs md:text-sm mt-0.5"
                    >
                      {active.name || active.techStack.join(" • ")}
                    </motion.p>
                  </div>

                  {active.live && active.live !== "#" ? (
                    <motion.a
                      layoutId={`button-${active.title}-${id}`}
                      href={active.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-xs md:text-sm rounded-full font-bold dark:bg-white dark:text-black bg-neutral-900 text-white hover:opacity-90 transition-colors shrink-0 flex items-center gap-1.5"
                    >
                      Live <ExternalLink size={12} />
                    </motion.a>
                  ) : active.github ? (
                    <motion.a
                      layoutId={`button-${active.title}-${id}`}
                      href={active.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-xs md:text-sm rounded-full font-bold dark:bg-white dark:text-black bg-neutral-900 text-white hover:opacity-90 transition-colors shrink-0 flex items-center gap-1.5"
                    >
                      Code <Github size={12} />
                    </motion.a>
                  ) : (
                    <motion.button
                      layoutId={`button-${active.title}-${id}`}
                      className="px-4 py-2 text-xs md:text-sm rounded-full font-bold dark:bg-white dark:text-black bg-neutral-900 text-white shrink-0"
                    >
                      View
                    </motion.button>
                  )}
                </div>

                {/* Extended Details Content */}
                <div className="pt-2 px-4 md:px-5 pb-5">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="dark:text-neutral-300 text-neutral-700 text-xs md:text-sm flex flex-col gap-3.5"
                  >
                    <p className="leading-relaxed dark:text-neutral-300/90 text-neutral-600">
                      {active.description}
                    </p>

                    {/* Tech stack badges */}
                    <div>
                      <span className="text-[11px] font-semibold dark:text-neutral-400 text-neutral-500 uppercase tracking-wider block mb-1.5">
                        Technologies Used
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {active.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-[11px] font-medium rounded-md dark:bg-white/5 bg-black/5 dark:border-white/10 border-black/10 dark:text-neutral-200 text-neutral-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons footer */}
                    <div className="flex gap-2.5 pt-1.5">
                      {active.live && active.live !== "#" && (
                        <a
                          href={active.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl bg-cyan-500 text-white font-semibold text-xs hover:bg-cyan-600 transition-colors"
                        >
                          <ExternalLink size={13} /> View Live App
                        </a>
                      )}
                      {active.github && (
                        <a
                          href={active.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl dark:bg-white/10 bg-black/5 dark:border-white/15 border-black/10 dark:text-white text-neutral-800 font-semibold text-xs hover:bg-black/10 dark:hover:bg-white/15 transition-colors"
                        >
                          <Github size={13} /> Source Code
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* ── Standard List of Expandable Cards matching 960px width ── */}
      <ul className="w-full max-w-[960px] mx-auto flex flex-col gap-2.5 px-3 md:px-4">
        {projects_list.map((card) => (
          <motion.li
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-3.5 md:p-4 flex flex-row justify-between items-center dark:hover:bg-neutral-800/50 hover:bg-neutral-200/50 rounded-2xl cursor-pointer transition-colors group"
          >
            <div className="flex gap-4 items-center min-w-0 pr-3">
              <motion.div layoutId={`image-${card.title}-${id}`} className="shrink-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-14 w-14 rounded-xl object-cover object-top shrink-0"
                />
              </motion.div>
              <div className="min-w-0">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-semibold dark:text-white text-neutral-900 text-base leading-snug truncate"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.title}-${id}`}
                  className="dark:text-neutral-400 text-neutral-600 text-sm mt-0.5 truncate"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-5 py-2 text-sm rounded-full font-bold dark:bg-white dark:text-black bg-neutral-900 text-white dark:hover:bg-neutral-200 hover:bg-neutral-800 shrink-0 transition-colors cursor-pointer"
            >
              View
            </motion.button>
          </motion.li>
        ))}
      </ul>

      {/* ── Footer count ── */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.3 }}
        style={{
          textAlign: "center",
          marginTop: 24,
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
        }}
      >
        {projects_list.length} Projects • Click to expand details
      </motion.p>
    </section>
  );
};

export default Projects;