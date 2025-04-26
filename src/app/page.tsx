import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Dumbbell, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden px-4 md:px-[64px]">
      {/* Enhanced background effects with light sources */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--primary-rgb),0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(var(--secondary-rgb),0.15),transparent_50%)]"></div>

      {/* Light sources */}
      <div className="fixed -bottom-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-5 animate-pulse-slow"></div>
      <div
        className="fixed -top-20 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] -z-5 animate-pulse-slow"
        style={{ animationDelay: "1s" }}></div>

      <section className="relative z-10 py-12 md:py-14 flex-grow">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
            {/* CORNER DECORATION - Enhanced with glow */}
            <div className="absolute -top-10 left-0 w-40 h-40 border-l-2 border-t-2 border-primary/60 animate-pulse shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)]" />
            {/* <div className="absolute -bottom-10 right-0 w-40 h-40 border-r-2 border-b-2 border-primary/40 hidden md:block shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" /> */}

            {/* Floating particles with glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute size-1 md:size-2 rounded-full bg-primary/60 shadow-[0_0_5px_rgba(var(--primary-rgb),0.8)]"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: 0.4 + Math.random() * 0.6,
                    animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>

            {/* Enhanced light sources with more dramatic glow */}
            <div className="fixed -bottom-20 left-1/4 w-[40vw] h-[40vw] bg-primary/15 rounded-full blur-[120px] -z-5 animate-pulse-slow"></div>
            <div
              className="fixed -top-20 right-1/4 w-[35vw] h-[35vw] bg-secondary/15 rounded-full blur-[120px] -z-5 animate-pulse-slow"
              style={{ animationDelay: "1.5s" }}></div>

            {/* Additional accent light */}
            <div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vh] bg-primary/5 rounded-full blur-[150px] -z-5 animate-pulse-slow"
              style={{ animationDelay: "2.5s" }}></div>

            {/* LEFT SIDE CONTENT */}
            <div className="lg:col-span-7 space-y-8 relative ml-5 ">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <div className="overflow-hidden">
                  <span className="text-foreground inline-block animate-slide-up">
                    Transform
                  </span>
                </div>
                <div className="">
                  <span className="text-primary relative inline-block animate-slide-up animation-delay-200 drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]">
                    Your {/* <span className="glitch   " data-glitch="Body"> */}
                    Body
                    {/* </span> */}
                    <span className="absolute -right-8 top-0">
                      <Sparkles className="h-8 w-8 text-primary/60 animate-pulse" />
                    </span>
                  </span>
                </div>

                <div className="pt-2 overflow-hidden">
                  <span className="text-foreground inline-block animate-slide-up animation-delay-400">
                    With Advanced
                  </span>
                </div>
                <div className="pt-2 overflow-hidden">
                  {/* Apply the glitch effect to "AI" */}
                  <span className="text-foreground inline-block animate-slide-up animation-delay-600">
                    <span className="glitch-text" data-text="AI">
                      AI
                    </span>
                  </span>
                  <span className="text-primary relative inline-block animate-slide-up animation-delay-600 drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)] mb-6">
                    {" "}
                    Technology
                    <span className="absolute top-3 -right-8">
                      <Zap className="h-6 w-6 text-primary animate-bounce" />
                    </span>
                  </span>
                </div>
              </h1>

              {/* SEPARATOR LINE - Enhanced with glow */}
              <div className="h-px w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-70 relative shadow-[0_0_5px_rgba(var(--primary-rgb),0.8)]">
                <div className="absolute h-px w-1/3 bg-primary animate-pulse-slow left-0 top-0 shadow-[0_0_8px_rgba(var(--primary-rgb),1)]"></div>
              </div>

              <p className="text-xl text-muted-foreground md:w-2/3 animate-fade-in animation-delay-800">
                Talk to our AI assistant and get personalized diet plans and
                workout routines designed just for you
              </p>

              {/* STATS - Enhanced with glow on hover */}
              <div className="flex flex-wrap md:flex-nowrap items-center gap-6 md:gap-10 py-6 font-mono animate-fade-in animation-delay-1000">
                <div className="flex flex-col items-center md:items-start group">
                  <div className="text-2xl text-primary group-hover:scale-110 transition-transform group-hover:drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.8)]">
                    500+
                  </div>
                  <div className="text-xs uppercase tracking-wider">
                    ACTIVE USERS
                  </div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                <div className="flex flex-col items-center md:items-start group">
                  <div className="text-2xl text-primary group-hover:scale-110 transition-transform group-hover:drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.8)]">
                    3min
                  </div>
                  <div className="text-xs uppercase tracking-wider">
                    GENERATION
                  </div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                <div className="flex flex-col items-center md:items-start group">
                  <div className="text-2xl text-primary group-hover:scale-110 transition-transform group-hover:drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.8)]">
                    100%
                  </div>
                  <div className="text-xs uppercase tracking-wider">
                    PERSONALIZED
                  </div>
                </div>
              </div>

              {/* BUTTON - Enhanced with glow */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-fade-in animation-delay-1200">
                <Button
                  size="lg"
                  asChild
                  className="overflow-hidden bg-primary text-primary-foreground px-8 py-6 text-lg font-medium relative group shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] transition-shadow">
                  <Link
                    href={"/generate-program"}
                    className="flex items-center font-mono">
                    <span className="relative z-10 flex items-center">
                      <Dumbbell className="mr-2 size-5 transition-transform group-hover:rotate-12" />
                      Build Your Program
                      <ArrowRightIcon className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-6 text-lg font-medium hover:text-white hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] transition-shadow">
                  <Link href="/about" className="font-mono">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>

            {/* RIGHT SIDE CONTENT */}
            <div className="lg:col-span-5 relative animate-fade-in animation-delay-600">
              {/* CORNER PIECES - Enhanced with glow */}
              <div className="absolute -inset-4 pointer-events-none">
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/60 shadow-[0_0_10px_rgba(var(--primary-rgb),0.4)]" />
                <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-primary/60 shadow-[0_0_10px_rgba(var(--primary-rgb),0.4)]" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-primary/60 shadow-[0_0_10px_rgba(var(--primary-rgb),0.4)]" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/60 shadow-[0_0_10px_rgba(var(--primary-rgb),0.4)]" />
              </div>

              {/* IMAGE CONTAINER - Enhanced with stronger glow */}
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="relative overflow-hidden rounded-lg bg-cyber-black shadow-[0_0_25px_rgba(var(--primary-rgb),0.4)]">
                  {/* Animated glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-60 animate-gradient-shift"></div>

                  {/* Underlighting effect */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-primary/30 blur-[30px] rounded-full"></div>

                  <img
                    src="/hero-ai3.png"
                    alt="AI Fitness Coach"
                    className="size-full object-cover object-center relative z-10 transition-transform hover:scale-105 duration-700"
                  />

                  {/* SCAN LINE - Enhanced */}
                  <div className="absolute inset-0 z-20 bg-[linear-gradient(transparent_0%,transparent_calc(50%-1px),var(--cyber-glow-primary)_50%,transparent_calc(50%+1px),transparent_100%)] bg-[length:100%_8px] animate-scanline pointer-events-none" />

                  {/* DECORATIONS ON TOP THE IMAGE - Enhanced */}
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border border-primary/60 rounded-full animate-pulse-slow"></div>

                    {/* Targeting lines with animation */}
                    <div className="absolute top-1/2 left-0 w-1/4 h-px bg-primary/70 animate-extend-right"></div>
                    <div className="absolute top-1/2 right-0 w-1/4 h-px bg-primary/70 animate-extend-left"></div>
                    <div className="absolute top-0 left-1/2 h-1/4 w-px bg-primary/70 animate-extend-down"></div>
                    <div className="absolute bottom-0 left-1/2 h-1/4 w-px bg-primary/70 animate-extend-up"></div>

                    {/* Data points */}
                    <div className="absolute top-[20%] right-[20%] size-2 rounded-full bg-primary/80 animate-ping"></div>
                    <div
                      className="absolute bottom-[30%] left-[25%] size-2 rounded-full bg-secondary/80 animate-ping"
                      style={{ animationDelay: "1s" }}></div>
                  </div>

                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-background via-background/40 to-transparent"></div>

                  {/* Interactive data display */}
                  <div className="absolute bottom-4 left-4 right-4 z-30 bg-black/60 backdrop-blur-sm p-3 rounded border border-primary/40 font-mono text-xs opacity-80 hover:opacity-100 transition-opacity">
                    <div className="flex justify-between items-center">
                      <span className="text-primary">AI SYSTEM ACTIVE</span>
                      <span className="animate-pulse">●</span>
                    </div>
                    <div className="mt-1 text-[10px] text-muted-foreground">
                      ANALYZING FITNESS DATA • GENERATING PERSONALIZED PLANS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
