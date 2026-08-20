"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Users, Share2, FileSearch, TrendingUp } from "lucide-react";

const points = [
  {
    icon: Users,
    text: "Posting reaches people who are looking.",
  },
  {
    icon: Share2,
    text: "A network reaches people who are working.",
  },
  {
    icon: FileSearch,
    text: "If every resume looks the same, it may not be a talent shortage — it may be where you are looking.",
  },
];

function Stat92() {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const ctrl = animate(count, 92, { duration: 1.4 });
      return ctrl.stop;
    }
  }, [inView, count]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>%
    </span>
  );
}

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function FindTheRightPeople() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden pt-16 pb-20 lg:pt-20 lg:pb-28" style={{ background: "var(--color-bg)" }}>
        <div
          className="absolute inset-0 flex items-start justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="mt-10 text-[18vw] font-black leading-none tracking-tighter uppercase"
            style={{ color: "transparent", WebkitTextStroke: "1.5px #f0f0f0", fontFamily: "var(--font-heading)" }}
          >
            SEARCH
          </span>
        </div>

        <div className="relative z-[1] max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — text */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-sm font-semibold uppercase tracking-widest mb-5 flex items-center gap-2"
                style={{ color: "var(--color-red)" }}
              >
                <span className="inline-block w-6 h-0.5" style={{ background: "var(--color-red)" }} />
                Why the right person hasn&apos;t applied
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight mb-8"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
              >
                A <span style={{ color: "var(--color-red)" }}>$185K</span> seat.
                Posted 60 days.{" "}
                <span style={{ color: "var(--color-red)" }}>Still empty.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl font-semibold leading-snug mb-8"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
              >
                The superintendent you really want is{" "}
                <span style={{ color: "var(--color-red)" }}>not</span> on a job
                board.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:scale-105"
                  style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)", boxShadow: "0 4px 20px rgba(230,57,70,0.3)" }}
                >
                  Talk to Patrick
                  <ArrowRight size={15} />
                </a>
              </motion.div>
            </div>

            {/* Right — the campaign flyer itself */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, x: 30 }}
              animate={heroInView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div
                  className="absolute -top-6 -right-6 w-56 h-56 md:w-72 md:h-72 rounded-full"
                  style={{ background: "var(--color-red)", opacity: 0.1 }}
                />
                <div
                  className="relative w-72 sm:w-80 md:w-96 rounded-3xl overflow-hidden"
                  style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.2)" }}
                >
                  <Image
                    src="/find-the-right-people-flyer.png"
                    alt="A $185K seat. Posted 60 days. Still empty. The superintendent you really want is not on a job board."
                    width={1122}
                    height={1402}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Three points + stat */}
      <section className="py-16 lg:py-20" style={{ background: "var(--color-light)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
            <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
              {points.map((p, i) => (
                <FadeUp key={p.text} delay={i * 0.1} className="rounded-2xl p-5" >
                  <div
                    className="h-full rounded-2xl p-5"
                    style={{ background: "#fff", border: "1px solid var(--color-border)" }}
                  >
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
                      style={{ border: "1.5px solid var(--color-red)" }}
                    >
                      <p.icon size={18} style={{ color: "var(--color-red)" }} />
                    </div>
                    <p className="text-sm leading-relaxed font-medium" style={{ color: "var(--color-dark)" }}>
                      {p.text}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.3} className="rounded-2xl p-6 flex flex-col justify-center items-center text-center" >
              <div
                className="h-full w-full rounded-2xl p-6 flex flex-col items-center justify-center text-center"
                style={{ background: "var(--color-dark)" }}
              >
                <TrendingUp size={24} style={{ color: "var(--color-red)" }} />
                <div
                  className="mt-2 text-4xl md:text-5xl font-black"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-red)" }}
                >
                  <Stat92 />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  of contractors say they cannot fill open positions.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-20 lg:py-28" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-2xl mx-auto px-6">
          <FadeUp>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--color-dark)" }}>
              A position has been posted for 60 days and is still sitting
              open.
            </p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p className="text-lg font-semibold leading-relaxed mb-6" style={{ color: "var(--color-dark)" }}>
              There is a reason.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-gray)" }}>
              The superintendent you really want is probably not on a job
              board and is not applying to your posting.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-gray)" }}>
              He is on somebody else&apos;s project right now getting the job
              done. His phone is probably on silent, and he may not have
              updated his resume in years because he has never needed to.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p
              className="text-xl font-bold leading-snug mb-6 pl-5"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)", borderLeft: "3px solid var(--color-red)" }}
            >
              That is where companies get stuck.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-gray)" }}>
              Most companies are all looking at the same group of
              people—the candidates actively applying for jobs.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-gray)" }}>
              But after more than 40 years in recruiting, I can tell you that
              many of the best people I have ever placed were not looking
              for another job.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-gray)" }}>
              They took my call because they knew me, knew Metro Associates,
              were referred to me, or were willing to listen when the right
              opportunity came along.
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="text-base leading-relaxed mb-10" style={{ color: "var(--color-gray)" }}>
              That conversation would have never started from a job posting.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div
              className="rounded-2xl p-6 sm:p-8 mb-10 text-center"
              style={{ background: "var(--color-dark)" }}
            >
              <p
                className="text-xl sm:text-2xl font-bold leading-snug text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                A job posting reaches people who are looking.
              </p>
              <p
                className="mt-3 text-xl sm:text-2xl font-bold leading-snug"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-red)" }}
              >
                A real search reaches people who are working.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-gray)" }}>
              There is a big difference.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-gray)" }}>
              One waits to see who applies.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-base leading-relaxed mb-10" style={{ color: "var(--color-gray)" }}>
              The other goes out and finds the person you actually
              want—the superintendent, project manager, engineer, executive,
              or technical professional who is already successful and who
              other people would gladly work for again.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-gray)" }}>
              If you have had an important position posted for 30, 60, or 90
              days and the same type of resumes keep coming in, you may not
              have a talent shortage.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-base leading-relaxed mb-10" style={{ color: "var(--color-gray)" }}>
              You may simply be looking in the same place everybody else is
              looking.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p
              className="text-2xl sm:text-3xl font-black leading-tight mb-8"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
            >
              That is where a recruiter with a{" "}
              <span style={{ color: "var(--color-red)" }}>real network</span>{" "}
              makes the difference.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:scale-105"
              style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)", boxShadow: "0 4px 20px rgba(230,57,70,0.3)" }}
            >
              Talk to Patrick
              <ArrowRight size={15} />
            </a>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
