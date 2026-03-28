import { useState } from "react";
import { User, Mail, Building2, Shield, Save } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";

const profileData = {
  freelancer: { name: "Alex Rivera", email: "alex@nodflow.io", organization: "Rivera Design Studio", role: "Freelancer" },
  client: { name: "Sarah Chen", email: "sarah@apexventures.com", organization: "Apex Ventures", role: "Client" },
};

const ProfilePage = ({ role }: { role: "freelancer" | "client" }) => {
  const data = profileData[role];
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [org, setOrg] = useState(data.organization);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);

  const handleSave = () => toast.success("Profile updated successfully");

  const fields = [
    { label: "Full Name", value: name, onChange: setName, icon: User },
    { label: "Email Address", value: email, onChange: setEmail, icon: Mail },
    { label: "Organization", value: org, onChange: setOrg, icon: Building2 },
  ];

  return (
    <DashboardLayout role={role}>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-brand">Profile</h1>

        {/* Avatar + Role */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-card flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-display font-bold text-xl shrink-0">
            {data.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <p className="font-display text-lg font-bold text-foreground">{name}</p>
            <div className="flex items-center gap-2 mt-1">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm text-muted-foreground capitalize">{data.role}</span>
            </div>
          </div>
        </div>

        {/* Info Fields */}
        <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-display text-sm font-bold text-brand">Personal Information</h2>
          </div>
          <div className="p-6 space-y-4">
            {fields.map((f) => (
              <div key={f.label}>
                <label className="text-sm font-medium text-foreground mb-1.5 block">{f.label}</label>
                <div className="relative">
                  <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    value={f.value}
                    onChange={(e) => f.onChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-display text-sm font-bold text-brand">Notification Settings</h2>
          </div>
          <div className="p-6 space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-foreground">Email Notifications</span>
              <button
                onClick={() => setEmailNotifs(!emailNotifs)}
                className={`w-10 h-6 rounded-full transition-colors relative ${emailNotifs ? "bg-primary" : "bg-muted"}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${emailNotifs ? "left-5" : "left-1"}`} />
              </button>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-foreground">Push Notifications</span>
              <button
                onClick={() => setPushNotifs(!pushNotifs)}
                className={`w-10 h-6 rounded-full transition-colors relative ${pushNotifs ? "bg-primary" : "bg-muted"}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${pushNotifs ? "left-5" : "left-1"}`} />
              </button>
            </label>
          </div>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand-light transition-all"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
