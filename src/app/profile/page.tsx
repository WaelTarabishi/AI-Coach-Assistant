"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AppleIcon,
  CalendarIcon,
  DumbbellIcon,
  ZapIcon,
  ActivityIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CornerElements from "@/components/corner-elements";
import ProfileHeader from "@/components/profile-header";
import NoFitnessPlan from "@/components/no-fitness-plan";

const ProfilePage = () => {
  const { user } = useUser();
  const userId = user?.id as string;

  const allPlans = useQuery(api.plans.getUserPlans, { userId });
  const [selectedPlanId, setSelectedPlanId] = useState<null | string>(null);
  const [glitchEffect, setGlitchEffect] = useState(false);

  const activePlan = allPlans?.find((plan) => plan.isActive);

  const currentPlan = selectedPlanId
    ? allPlans?.find((plan) => plan._id === selectedPlanId)
    : activePlan;

  // Glitch effect on load
  useEffect(() => {
    setGlitchEffect(true);
    const timer = setTimeout(() => setGlitchEffect(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedPlanId]);

  return (
    <section className="relative z-10 pt-12 pb-32 flex-grow container mx-auto px-4 bg-gradient-to-b from-black/50 to-black/80 min-h-screen">
      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(18,16,16,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(18,16,16,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Neon glow effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-primary to-purple-600 opacity-70 shadow-[0_0_15px_5px_rgba(6,182,212,0.5)]"></div>

      <div
        className={`relative z-10 transition-all duration-500 ${glitchEffect ? "opacity-90 blur-sm" : "opacity-100"}`}>
        <ProfileHeader user={user} />

        {allPlans && allPlans?.length > 0 ? (
          <div className="space-y-8">
            {/* PLAN SELECTOR */}
            <div className="relative backdrop-blur-md border border-cyan-500/30 p-6 rounded-md shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <CornerElements />
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold tracking-tight flex items-center">
                  <ZapIcon className="h-5 w-5 mr-2 text-cyan-400" />
                  <span className="text-cyan-400 font-mono">NEURO</span>{" "}
                  <span className="text-foreground font-mono">
                    FITNESS_MATRIX
                  </span>
                </h2>
                <div className="font-mono text-xs text-cyan-300 bg-cyan-900/30 px-3 py-1 rounded-full border border-cyan-500/30">
                  <span className="animate-pulse mr-1">⦿</span>
                  PLANS: {allPlans.length}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {allPlans.map((plan) => (
                  <Button
                    key={plan._id}
                    onClick={() => setSelectedPlanId(plan._id)}
                    className={`text-foreground border font-mono transition-all duration-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)] ${
                      selectedPlanId === plan._id
                        ? "bg-cyan-900/50 text-cyan-300 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                        : "bg-black/50 border-cyan-800/50 hover:border-cyan-400"
                    }`}>
                    <span className="mr-2 text-xs opacity-70">[</span>
                    {plan.name}
                    <span className="ml-2 text-xs opacity-70">]</span>
                    {plan.isActive && (
                      <span className="ml-2 bg-green-900/30 text-green-400 text-xs px-2 py-0.5 rounded border border-green-500/30">
                        ACTIVE
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* PLAN DETAILS */}
            {currentPlan && (
              <div className="relative backdrop-blur-md border border-cyan-500/30 rounded-lg p-6 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <CornerElements />

                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-8 rounded-sm bg-cyan-400 animate-pulse"></div>
                  <h3 className="text-lg font-bold font-mono">
                    PLAN_ID:{" "}
                    <span className="text-cyan-400">{currentPlan.name}</span>
                  </h3>
                </div>

                <Tabs defaultValue="workout" className="w-full">
                  <TabsList className="mb-6 w-full grid grid-cols-2 h-14 bg-black/60 border border-cyan-800/50 rounded-md overflow-hidden">
                    <TabsTrigger
                      value="workout"
                      className="data-[state=active]:bg-cyan-900/30 data-[state=active]:text-cyan-300 font-mono  border-r border-cyan-800/50">
                      <DumbbellIcon className="mr-2 size-4" />
                      WORKOUT_MATRIX
                    </TabsTrigger>

                    <TabsTrigger
                      value="diet"
                      className="data-[state=active]:bg-cyan-900/30 data-[state=active]:text-cyan-300 font-mono py-3">
                      <AppleIcon className="mr-2 h-4 w-4" />
                      NUTRITION_PROTOCOL
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="workout"
                    className="border border-cyan-800/30 rounded-lg p-4 bg-black/40">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4 bg-cyan-900/20 p-3 rounded border border-cyan-800/30">
                        <CalendarIcon className="h-4 w-4 text-cyan-400" />
                        <span className="font-mono text-sm text-cyan-300">
                          SCHEDULE_SYNC:{" "}
                          {currentPlan.workoutPlan.schedule.join(" | ")}
                        </span>
                      </div>

                      <Accordion type="multiple" className="space-y-4">
                        {currentPlan.workoutPlan.exercises.map(
                          (exerciseDay, index) => (
                            <AccordionItem
                              key={index}
                              value={exerciseDay.day}
                              className="border border-cyan-800/30 rounded-lg overflow-hidden bg-gradient-to-r from-black/80 to-cyan-950/20">
                              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-cyan-900/20 font-mono">
                                <div className="flex justify-between w-full items-center">
                                  <span className="text-cyan-400 flex items-center">
                                    <ActivityIcon className="h-4 w-4 mr-2" />
                                    {exerciseDay.day}
                                  </span>
                                  <div className="text-xs text-cyan-300 bg-cyan-900/30 px-2 py-1 rounded-full border border-cyan-800/30">
                                    {exerciseDay.routines.length} MODULES
                                  </div>
                                </div>
                              </AccordionTrigger>

                              <AccordionContent className="pb-4 px-4 bg-black/40">
                                <div className="space-y-3 mt-2">
                                  {exerciseDay.routines.map(
                                    (routine, routineIndex) => (
                                      <div
                                        key={routineIndex}
                                        className="border border-cyan-800/30 rounded p-3 bg-gradient-to-r from-black/60 to-cyan-950/10 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all duration-300">
                                        <div className="flex justify-between items-start mb-2">
                                          <h4 className="font-semibold text-cyan-100 font-mono flex items-center">
                                            <span className="text-xs text-cyan-400 mr-2">
                                              [
                                              {String(
                                                routineIndex + 1
                                              ).padStart(2, "0")}
                                              ]
                                            </span>
                                            {routine.name}
                                          </h4>
                                          <div className="flex items-center gap-2">
                                            <div className="px-2 py-1 rounded bg-cyan-900/30 text-cyan-300 text-xs font-mono border border-cyan-800/30">
                                              {routine.sets}×
                                            </div>
                                            <div className="px-2 py-1 rounded bg-purple-900/30 text-purple-300 text-xs font-mono border border-purple-800/30">
                                              {routine.reps}ᴿ
                                            </div>
                                          </div>
                                        </div>
                                        {routine.description && (
                                          <p className="text-sm text-cyan-300/70 mt-1 font-mono pl-4 border-l border-cyan-800/30">
                                            {routine.description}
                                          </p>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          )
                        )}
                      </Accordion>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="diet"
                    className="border border-cyan-800/30 rounded-lg p-4 bg-black/40">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center mb-4 bg-cyan-900/20 p-3 rounded border border-cyan-800/30">
                        <span className="font-mono text-sm text-cyan-300 flex items-center">
                          {/* <ChipIcon className="h-4 w-4 mr-2" /> */}
                          METABOLIC_CALIBRATION
                        </span>
                        <div className="font-mono text-xl text-cyan-400 bg-cyan-900/30 px-3 py-1 rounded border border-cyan-800/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                          {currentPlan.dietPlan.dailyCalories}{" "}
                          <span className="text-xs">KCAL</span>
                        </div>
                      </div>

                      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-800/50 to-transparent my-6"></div>

                      <div className="space-y-4">
                        {currentPlan.dietPlan.meals.map((meal, index) => (
                          <div
                            key={index}
                            className="border border-cyan-800/30 rounded-lg overflow-hidden p-4 bg-gradient-to-r from-black/60 to-cyan-950/10 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all duration-300">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-2 h-6 rounded-sm bg-cyan-400"></div>
                              <h4 className="font-mono text-cyan-400">
                                {meal.name}
                              </h4>
                              <div className="text-xs text-cyan-300 bg-cyan-900/30 px-2 py-1 rounded-full border border-cyan-800/30 ml-auto">
                                INTAKE_{index + 1}
                              </div>
                            </div>
                            <ul className="space-y-2 pl-4 border-l border-cyan-800/30">
                              {meal.foods.map((food, foodIndex) => (
                                <li
                                  key={foodIndex}
                                  className="flex items-center gap-2 text-sm text-cyan-300/70 font-mono">
                                  <span className="text-xs text-cyan-400">
                                    {String(foodIndex + 1).padStart(2, "0")}
                                  </span>
                                  {food}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-8 animate-pulse">
            <NoFitnessPlan />
          </div>
        )}
      </div>

      {/* Floating cyberpunk elements */}
      <div className="fixed bottom-10 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-600/10 blur-xl"></div>
      <div className="fixed top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-600/10 blur-xl"></div>
    </section>
  );
};

export default ProfilePage;
