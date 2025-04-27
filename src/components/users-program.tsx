import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronRight,
  Dumbbell,
  Sparkles,
  Users,
  Clock,
  AppleIcon,
  ShieldIcon,
  Zap,
  Award,
  TrendingUp,
} from "lucide-react";
import { USER_PROGRAMS } from "@/constant";

const UserPrograms = () => {
  return (
    <div className="w-full pb-24 pt-16 relative bg-gradient-to-b from-background to-background/70">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        {/* HEADER- PROGRAM GALLERY */}
        <div className="bg-card/90 backdrop-blur-md border border-border rounded-xl overflow-hidden mb-20 shadow-lg transform hover:shadow-xl transition-all duration-300">
          {/* HEADER BAR */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/80">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
              <span className="text-sm text-primary font-semibold tracking-wide">
                PROGRAM GALLERY
              </span>
            </div>
            <div className="text-sm text-muted-foreground bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Featured Plans
            </div>
          </div>

          {/* HEADER CONTENT */}
          <div className="p-10 text-center relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-70"></div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 relative">
              <span className="text-foreground">AI-Generated </span>
              <span className="text-primary relative">
                Programs
                <span className="absolute -top-6 -right-6 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full border border-primary/30">
                  PREMIUM
                </span>
              </span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Explore personalized fitness plans our AI assistant has created
              for other users, tailored to their unique goals and abilities
            </p>

            {/* STATS */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-12 font-mono">
              <div className="flex flex-col items-center group">
                <div className="relative">
                  <p className="text-4xl text-primary font-bold group-hover:scale-110 transition-transform">
                    500+
                  </p>
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping"></span>
                </div>
                <p className="text-sm text-muted-foreground uppercase tracking-widest mt-2 font-semibold">
                  PROGRAMS
                </p>
              </div>
              <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-border to-transparent"></div>
              <div className="flex flex-col items-center group">
                <p className="text-4xl text-primary font-bold flex items-center group-hover:scale-110 transition-transform">
                  3<span className="text-xl">min</span>
                </p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest mt-2 font-semibold">
                  CREATION TIME
                </p>
              </div>
              <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-border to-transparent"></div>
              <div className="flex flex-col items-center group">
                <p className="text-4xl text-primary font-bold group-hover:scale-110 transition-transform">
                  100%
                </p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest mt-2 font-semibold">
                  PERSONALIZED
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section title */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-primary rounded-full"></div>
            <h3 className="text-2xl font-bold">Featured User Programs</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span>Trending this week</span>
          </div>
        </div>

        {/* Program cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {USER_PROGRAMS.map((program) => (
            <Card
              key={program.id}
              className="bg-card/90 backdrop-blur-md border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 group">
              {/* Card header with user info */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary group-hover:animate-pulse"></div>
                  <span className="text-sm text-primary font-mono">
                    USER.{program.id}
                  </span>
                </div>
                <div className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {program.fitness_level.toUpperCase()}
                </div>
              </div>

              <CardHeader className="pt-6 px-5">
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors shadow-md">
                    <img
                      src={program.profilePic}
                      alt={`${program.first_name}`}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-foreground flex items-center gap-2">
                      {program.first_name}
                      <span className="text-primary font-mono">.exe</span>
                      {program.fitness_level === "advanced" && (
                        <Award className="h-4 w-4 text-primary ml-1" />
                      )}
                    </CardTitle>
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <Users className="h-4 w-4" />
                      <span className="font-medium">{program.age}y</span> •
                      <span className="font-medium">
                        {program.workout_days}d/week
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <div className="px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/20 text-sm text-primary flex items-center gap-2 font-medium">
                    <Sparkles className="h-4 w-4" />
                    {program.fitness_goal}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2 bg-background/50 px-2 py-1 rounded-md">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-mono">v3.5</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-5">
                {/* Program details */}
                <div className="space-y-5 pt-2">
                  <div className="flex items-start gap-3 group/item hover:bg-primary/5 p-2 rounded-lg transition-colors">
                    <div className="p-2.5 rounded-md bg-primary/10 text-primary mt-0.5 group-hover/item:bg-primary/20 transition-colors">
                      <Dumbbell className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-foreground">
                          {program.workout_plan.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {program.equipment_access}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group/item hover:bg-secondary/5 p-2 rounded-lg transition-colors">
                    <div className="p-2.5 rounded-md bg-secondary/10 text-secondary mt-0.5 group-hover/item:bg-secondary/20 transition-colors">
                      <AppleIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-foreground">
                          {program.diet_plan.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        System optimized nutrition
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group/item hover:bg-primary/5 p-2 rounded-lg transition-colors">
                    <div className="p-2.5 rounded-md bg-primary/10 text-primary mt-0.5 group-hover/item:bg-primary/20 transition-colors">
                      <ShieldIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-foreground">
                          AI Safety Protocols
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Protection systems enabled
                      </p>
                    </div>
                  </div>
                </div>

                {/* Program description */}
                <div className="mt-6 pt-5 border-t border-border">
                  <div className="text-sm text-muted-foreground bg-background/50 p-3 rounded-lg font-mono">
                    <span className="text-primary font-bold">&gt; </span>
                    {program.workout_plan.description.substring(0, 120)}
                    <span className="text-primary animate-pulse">_</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-5 py-5 border-t border-border">
                <Link href={`/programs/${program.id}`} className="w-full">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 group/btn relative overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View Program Details
                      <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA section */}
        <div className="mt-20 text-center bg-card/80 backdrop-blur-md border border-border rounded-xl p-10 relative overflow-hidden">
          {/* Background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>

          <h3 className="text-3xl font-bold mb-6 relative inline-block">
            Ready for Your <span className="text-primary">Custom Program?</span>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping"></div>
          </h3>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Our AI will analyze your goals, fitness level, and preferences to
            create a personalized program just for you in minutes.
          </p>

          <Link href="/generate-program">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-7 text-lg font-medium rounded-xl relative group overflow-hidden">
              <span className="relative z-10 flex items-center">
                Generate Your Program
                <Zap className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            </Button>
          </Link>
          <p className="text-muted-foreground mt-4">
            Join 500+ users with AI-customized fitness programs
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPrograms;
