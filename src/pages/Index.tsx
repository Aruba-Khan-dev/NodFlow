import { useState } from "react";
import { LogIn } from "lucide-react";
import LoginForm from "@/components/LoginForm";
import logo from "@/assets/nodflow_logo_clean.png";

type SelectedRole = "freelancer" | "client" | null;

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<SelectedRole>(null);

  return (
    <div className="min-h-screen flex flex-col bg-landing">
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">
          {selectedRole === null ? (
            <div className="flex flex-col items-center">

              {/* Logo + Site Name */}
              <div className="flex flex-col items-center gap-0 mb-6 animate-slide-down-fade">

                {/* Logo */}
                <img
                  src={logo}
                  alt="NodFlow logo"
                  className="h-28 md:h-32 w-auto object-contain"
                />

                {/* Site Name */}
                <span
                  className="font-display text-3xl md:text-4xl font-bold leading-none -mt-1"
                  style={{ color: "#2F3E46" }}
                >
                  NodFlow
                </span>

              </div>

              {/* Headline */}
              <div
                className="text-center mb-8 animate-fade-in-up"
                style={{
                  animationDelay: "0.5s",
                  animationFillMode: "both",
                  opacity: 0,
                }}
              >
                <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight whitespace-nowrap font-headline">

                  <span
                    className="block"
                    style={{ color: "#007A78" }}
                  >
                    Streamline Client Approvals
                  </span>

                  <span
                    className="block mt-2"
                    style={{ color: "#2F3E46" }}
                  >
                    Simplify Project Revisions
                  </span>

                </h1>
              </div>

              {/* Tagline */}
              <p
                className="text-center text-base md:text-lg mb-12 animate-fade-in-up font-bold whitespace-nowrap"
                style={{
                  animationDelay: "0.85s",
                  animationFillMode: "both",
                  opacity: 0,
                  color: "#6B7280",
                }}
              >
                A centralized portal for managing deliverables, collecting feedback, and finalizing approvals efficiently.
              </p>

              {/* Login Buttons */}
              <div
                className="flex flex-col gap-4 w-full max-w-md animate-scale-fade-up"
                style={{
                  animationDelay: "1.15s",
                  animationFillMode: "both",
                  opacity: 0,
                }}
              >

                {/* Client Button */}
                <button
                  onClick={() => setSelectedRole("client")}
                  className="group flex items-center gap-5 w-full p-5 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring shadow-card hover:shadow-card-hover hover:scale-[1.02]"
                  style={{ backgroundColor: "#1F6F7A" }} // lighter teal
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white">
                    <LogIn className="w-6 h-6 text-white" />
                  </div>

                  <div className="text-left text-white">
                    <span className="block font-display font-semibold text-base">
                      Login as Client
                    </span>
                    <span className="block text-sm opacity-80">
                      Review & approve deliverables
                    </span>
                  </div>
                </button>

                {/* Freelancer Button */}
                <button
                  onClick={() => setSelectedRole("freelancer")}
                  className="group flex items-center gap-5 w-full p-5 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring shadow-card hover:shadow-card-hover hover:scale-[1.02]"
                  style={{ backgroundColor: "#1F6F7A" }} // lighter teal
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white">
                    <LogIn className="w-6 h-6 text-white" />
                  </div>

                  <div className="text-left text-white">
                    <span className="block font-display font-semibold text-base">
                      Login as Freelancer
                    </span>
                    <span className="block text-sm opacity-80">
                      Manage projects & deliverables
                    </span>
                  </div>
                </button>

              </div>
            </div>
          ) : (
            <div className="bg-card rounded-2xl shadow-card p-8 md:p-10 border border-border/60">
              <LoginForm
                role={selectedRole}
                onBack={() => setSelectedRole(null)}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;