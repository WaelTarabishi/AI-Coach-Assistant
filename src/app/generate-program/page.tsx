"use client";
import { Button } from "@/components/ui/button";
import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const page = () => {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [callEnded, setCallEnded] = useState(false);
  useEffect(() => {
    const originalError = console.error;
    // override console.error to ignore "Meeting has ended" errors
    console.error = function (msg, ...args) {
      if (
        msg &&
        (msg.includes("Meeting has ended") ||
          (args[0] && args[0].toString().includes("Meeting has ended")))
      ) {
        console.log("Ignoring known error: Meeting has ended");
        return; // don't pass to original handler
      }

      // pass all other errors to the original handler
      return originalError.call(console, msg, ...args);
    };

    // restore original handler on unmount
    return () => {
      console.error = originalError;
    };
  }, []);

  const { user } = useUser();
  const router = useRouter();

  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (callEnded) {
      const redirectTimer = setTimeout(() => {
        router.push("/profile");
      }, 1500);
      return () => clearTimeout(redirectTimer); // Properly clear the timeout
    }
  }, [callEnded, router]);

  clearTimeout; // setup event listeners for vapi
  useEffect(() => {
    const handleCallStart = () => {
      console.log("Call started");
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    };

    const handleCallEnd = () => {
      console.log("Call ended");
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
    };

    const handleSpeechStart = () => {
      console.log("AI started Speaking");
      setIsSpeaking(true);
    };

    const handleSpeechEnd = () => {
      console.log("AI stopped Speaking");
      setIsSpeaking(false);
    };
    const handleMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { content: message.transcript, role: message.role };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const handleError = (error: any) => {
      console.log("Vapi Error", error);
      setConnecting(false);
      setCallActive(false);
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError);

    // cleanup event listeners on unmount
    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
    };
  }, []);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const toggleCall = async () => {
    if (callActive) vapi.stop();
    else {
      try {
        setConnecting(true);
        setMessages([]);
        setCallEnded(false);

        const fullName = user?.firstName
          ? `${user.firstName} ${user.lastName || ""}`.trim()
          : "There";

        const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;

        if (!workflowId) {
          console.error("Missing VAPI workflow ID environment variable");
          setConnecting(false);
          // Add user-facing error message here
          return;
        }

        await vapi.start(workflowId, {
          variableValues: {
            full_name: fullName,
            user_id: user?.id,
          },
        });
      } catch (error) {
        console.log("Failed to start call", error);
        setConnecting(false);
        setErrorMessage("Failed to start call. Please try again later.");

        // Auto-clear error after 5 seconds
        setTimeout(() => setErrorMessage(null), 5000);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden pb-6 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent opacity-70"></div>
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "12s" }}></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 h-full max-w-5xl relative z-10">
        {/* Title with enhanced styling */}
        <div className="text-center mb-12 mt-8">
          <div className="inline-block mb-3 px-4 py-1 bg-primary/10 rounded-full shadow-sm shadow-primary/20 backdrop-blur-sm border border-primary/20 animate-fadeIn">
            <span className="text-sm font-medium text-primary">
              AI-Powered Fitness
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight relative perspective-1000">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 via-purple-500/5 to-secondary/5 blur-xl rounded-3xl opacity-70"></div>

            <span className="relative inline-block mr-2 md:mr-4">
              <span className="absolute -inset-1 bg-primary/5 blur-sm rounded-lg"></span>
              <span className="relative text-foreground">Generate</span>
            </span>

            <span className="relative inline-block mr-2 md:mr-4">
              <span className="absolute -inset-1 bg-secondary/5 blur-sm rounded-lg"></span>
              <span className="relative text-foreground">Your</span>
            </span>

            <span className="block mt-2 md:mt-4">
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-secondary/20 blur-md rounded-lg"></span>
                <span
                  className="relative text-transparent uppercase bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-secondary 
                      animate-gradient-x font-extrabold tracking-wider drop-shadow-sm">
                  Fitness Program
                </span>
              </span>
              {/* <span className="inline-block w-3 h-12 ml-2 bg-primary/80 animate-blink rounded"></span> */}
            </span>
          </h1>

          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg leading-relaxed animate-fadeIn opacity-90">
            Have a voice conversation with our AI assistant to create your
            personalized plan tailored to your goals and fitness level
          </p>
        </div>

        {/* VIDEO CALL AREA - Enhanced with shadows and animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* AI ASSISTANT CARD - Futuristic Design */}
          <div className="group relative h-[160px] rounded-2xl overflow-hidden border border-primary/10 bg-black/5 backdrop-blur-md hover:scale-[1.02] transition-all duration-300">
            {/* Animated background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
            <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/30 via-transparent to-secondary/30 opacity-70 rounded-2xl z-0"></div>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-primary/80 via-purple-500/80 to-secondary/80"></div>

            {/* Glowing orb in corner */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/20 rounded-full blur-2xl opacity-80"></div>

            {/* Content container */}
            <div className="relative z-10 flex items-center h-full p-4">
              {/* Left side - AI Avatar with glow */}
              <div className="relative flex-shrink-0">
                <div
                  className={`absolute -inset-1 rounded-full blur-md bg-gradient-to-r from-primary/40 to-secondary/40 ${isSpeaking ? "animate-pulse" : ""}`}></div>
                <div className="relative size-20 rounded-full border border-primary/20 overflow-hidden">
                  <img
                    src="/ai-avatar.png"
                    alt="AI Assistant"
                    className="w-full h-full object-cover"
                  />

                  {/* Voice wave overlay when speaking */}
                  {isSpeaking && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="flex space-x-1 h-8">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-white/80 rounded-full animate-sound-wave"
                            style={{
                              animationDelay: `${i * 0.15}s`,
                              height: `${Math.random() * 100}%`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right side - AI Info with modern typography */}
              <div className="ml-4 flex-1">
                <div className="flex items-center">
                  <h2 className="text-lg font-bold bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                    CodeFlex AI
                  </h2>
                  <div
                    className={`ml-2 size-2 rounded-full ${isSpeaking ? "bg-primary animate-pulse" : "bg-primary/40"}`}></div>
                </div>

                <div className="flex items-center mt-1">
                  <span className="text-xs font-medium text-foreground/70">
                    Fitness & Diet Coach
                  </span>
                  <span className="mx-2 text-foreground/30">•</span>
                  <span className="text-xs font-medium text-foreground/70">
                    {isSpeaking
                      ? "Speaking"
                      : callActive
                        ? "Listening"
                        : "Ready"}
                  </span>
                </div>

                {/* Status bar */}
                <div className="mt-3 w-full bg-black/10 h-1 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${isSpeaking ? "bg-primary" : callActive ? "bg-green-500" : "bg-foreground/20"} 
                      ${isSpeaking || callActive ? "animate-pulse" : ""}`}
                    style={{
                      width: isSpeaking ? "70%" : callActive ? "40%" : "10%",
                    }}></div>
                </div>

                {/* Tech details */}
                <div className="mt-3 flex items-center text-[10px] text-foreground/50 font-mono">
                  <div className="flex items-center">
                    <div className="size-1.5 rounded-full bg-primary/60 mr-1"></div>
                    <span>AI ACTIVE</span>
                  </div>
                  <span className="mx-2">|</span>
                  <div className="flex items-center">
                    <div className="size-1.5 rounded-full bg-green-500/60 mr-1"></div>
                    <span>VOICE READY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* USER CARD - Futuristic Design */}
          <div className="group relative h-[160px] rounded-2xl overflow-hidden border border-secondary/10 bg-black/5 backdrop-blur-md hover:scale-[1.02] transition-all duration-300">
            {/* Animated background effects */}
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 to-primary/5"></div>
            <div className="absolute -inset-[1px] bg-gradient-to-r from-secondary/30 via-transparent to-primary/30 opacity-70 rounded-2xl z-0"></div>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-secondary/80 via-purple-500/80 to-primary/80"></div>

            {/* Glowing orb in corner */}
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-secondary/20 rounded-full blur-2xl opacity-80"></div>

            {/* Content container */}
            <div className="relative z-10 flex items-center h-full p-4">
              {/* Left side - User Avatar with glow */}
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 rounded-full blur-md bg-gradient-to-r from-secondary/40 to-primary/40"></div>
                <div className="relative size-20 rounded-full border border-secondary/20 overflow-hidden">
                  <img
                    src={user?.imageUrl || "/default-avatar.png"}
                    alt="User"
                    className="w-full h-full object-cover"
                  />

                  {/* Active indicator when call is active */}
                  {callActive && (
                    <div className="absolute bottom-0 right-0 size-4 rounded-full bg-green-500 border-2 border-black/20"></div>
                  )}
                </div>
              </div>

              {/* Right side - User Info with modern typography */}
              <div className="ml-4 flex-1">
                <div className="flex items-center">
                  <h2 className="text-lg font-bold bg-gradient-to-r from-secondary via-purple-500 to-primary bg-clip-text text-transparent">
                    You
                  </h2>
                  <div
                    className={`ml-2 size-2 rounded-full ${callActive ? "bg-green-500 animate-pulse" : "bg-secondary/40"}`}></div>
                </div>

                <div className="flex items-center mt-1">
                  <span className="text-xs font-medium text-foreground/70">
                    {user
                      ? (user.firstName + " " + (user.lastName || "")).trim()
                      : "Guest"}
                  </span>
                  <span className="mx-2 text-foreground/30">•</span>
                  <span className="text-xs font-medium text-foreground/70">
                    {callActive ? "Connected" : "Ready"}
                  </span>
                </div>

                {/* Status bar */}
                <div className="mt-3 w-full bg-black/10 h-1 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${callActive ? "bg-green-500" : "bg-foreground/20"} ${callActive ? "animate-pulse" : ""}`}
                    style={{ width: callActive ? "60%" : "10%" }}></div>
                </div>

                {/* Tech details */}
                <div className="mt-3 flex items-center text-[10px] text-foreground/50 font-mono">
                  <div className="flex items-center">
                    <div className="size-1.5 rounded-full bg-secondary/60 mr-1"></div>
                    <span>USER READY</span>
                  </div>
                  <span className="mx-2">|</span>
                  <div className="flex items-center">
                    <div
                      className={`size-1.5 rounded-full ${callActive ? "bg-green-500/60" : "bg-foreground/30"} mr-1`}></div>
                    <span>{callActive ? "MIC ACTIVE" : "MIC READY"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MESSAGE CONTAINER - Enhanced */}
        {messages.length > 0 && (
          <div
            ref={messageContainerRef}
            className="w-full bg-card/80 backdrop-blur-md border border-border rounded-2xl p-6 mb-12 h-80 overflow-y-auto transition-all duration-300 scroll-smooth shadow-xl">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message-item animate-fadeIn p-4 rounded-xl ${
                    msg.role === "assistant"
                      ? "bg-primary/5 border-l-3 border-primary shadow-sm shadow-primary/5"
                      : "bg-secondary/5 border-l-3 border-secondary shadow-sm shadow-secondary/5"
                  } transform transition-all duration-300 hover:translate-x-1 hover:shadow-md`}>
                  <div className="font-semibold text-xs text-muted-foreground mb-2 flex items-center gap-2">
                    {msg.role === "assistant" ? (
                      <>
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shadow-sm">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                        </div>
                        <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent font-medium">
                          CodeFlex AI:
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center shadow-sm">
                          <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                        </div>
                        <span className="bg-gradient-to-r from-secondary to-purple-500 bg-clip-text text-transparent font-medium">
                          You:
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-foreground pl-7 leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              ))}

              {callEnded && (
                <div className="message-item animate-fadeIn p-4 rounded-xl bg-green-500/10 border-l-3 border-green-500 shadow-sm shadow-green-500/10 transform transition-all duration-300 hover:translate-x-1 hover:shadow-md">
                  <div className="font-semibold text-xs mb-2 flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shadow-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent font-medium">
                      System:
                    </span>
                  </div>
                  <p className="text-foreground pl-7 leading-relaxed">
                    Your fitness program has been created! Redirecting to your
                    profile...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CALL CONTROLS - Enhanced */}
        <div className="w-full flex justify-center gap-4">
          <Button
            className={`w-48 h-12 text-xl rounded-full ${
              callActive
                ? "bg-destructive hover:bg-destructive/90"
                : callEnded
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            } text-white relative font-medium shadow-lg hover:shadow-xl transition-all duration-300`}
            onClick={toggleCall}
            disabled={connecting || callEnded}>
            {connecting && (
              <span className="absolute inset-0 rounded-full animate-ping bg-primary/50 opacity-75"></span>
            )}

            <span className="flex items-center justify-center gap-2">
              {callActive ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  End Call
                </>
              ) : connecting ? (
                <>
                  <svg
                    className="animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                  </svg>
                  Connecting...
                </>
              ) : callEnded ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                  View Profile
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M8 5.14v14l11-7-11-7z"></path>
                  </svg>
                  Start Call
                </>
              )}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
