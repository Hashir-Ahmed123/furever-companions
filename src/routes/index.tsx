import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PawPrint, Heart, Stethoscope, Home as HomeIcon, ShieldCheck, Bone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Ticker } from "@/components/furever/Ticker";
import { useSession, ROLE_HOME, ROLE_LABEL, type UserRole } from "@/lib/session";
import { getCurrentUser, clearCurrentUser } from "@/lib/userData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FurEver Care — They Deserve Forever Love" },
      {
        name: "description",
        content:
          "Pick your role and explore pet profiles, feeding guides, adoption galleries, vet tools and pet care essentials.",
      },
      { property: "og:title", content: "FurEver Care — They Deserve Forever Love" },
      {
        property: "og:description",
        content: "A warm pet care platform for owners, veterinarians and shelter volunteers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const ROLES: { value: UserRole; label: string; blurb: string; icon: typeof PawPrint }[] = [
  { value: "owner", label: "Pet Owner", blurb: "Profiles, care guides & shopping", icon: Heart },
  { value: "vet", label: "Veterinarian", blurb: "Schedule & case studies", icon: Stethoscope },
  { value: "shelter", label: "Shelter Volunteer", blurb: "Adoptions, stories & events", icon: HomeIcon },
];

const HIGHLIGHTS = [
  { icon: PawPrint, title: "Pet-first care", text: "Guides written for real day-to-day routines." },
  { icon: ShieldCheck, title: "Vet approved", text: "Reviewed by practising veterinarians." },
  { icon: Bone, title: "Everyday essentials", text: "Food, toys, grooming and supplements." },
  { icon: Heart, title: "Adoption ready", text: "Meet rescues waiting for a forever home." },
];

function Landing() {
  const navigate = useNavigate();
  const { setUser, userName, role } = useSession();
  const [name, setName] = useState("");
  const [selectedRole, setRole] = useState<UserRole | "">("");
  const [error, setError] = useState("");
  const [existingUser, setExistingUser] = useState(false);

  // Check for existing user on mount
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setExistingUser(true);
      setName(currentUser.name);
      setRole(currentUser.role);
    }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Please tell us your name.");
    if (!selectedRole) return setError("Please choose a category to continue.");
    setError("");
    setUser(name.trim(), selectedRole);
    navigate({ to: ROLE_HOME[selectedRole] });
  };

  const handleContinue = () => {
    if (userName && role) {
      navigate({ to: ROLE_HOME[role] });
    }
  };

  const handleStartFresh = () => {
    clearCurrentUser();
    setExistingUser(false);
    setName("");
    setRole("");
  };

  return (
    <div className="min-h-screen">
      <Ticker />
      <div>
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
          <div className="page-enter space-y-8">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur-sm px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary shadow-sm">
                <PawPrint className="h-4 w-4" aria-hidden /> 100% pet-loving care
              </span>
              <div className="flex items-center gap-4">
                <span className="grid h-16 w-16 place-items-center rounded-3xl bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
                  <PawPrint className="h-8 w-8" aria-hidden />
                </span>
                <p className="font-display text-3xl font-extrabold tracking-tight text-plum">
                  FurEver Care
                </p>
              </div>
              <h1 className="font-display text-5xl font-extrabold leading-[1.1] text-plum sm:text-6xl lg:text-7xl">
                Happy pets.
                <br />
                Healthy homes.
                <br />
                <span className="text-primary">They deserve forever love.</span>
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
                One warm little place for pet owners, veterinarians and shelter volunteers — care
                guides, adoption stories, vet schedules and everyday essentials.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {HIGHLIGHTS.map((h) => (
                <div
                  key={h.title}
                  className="card-lift flex items-start gap-4 rounded-2xl border border-border bg-card/90 backdrop-blur-sm p-5 shadow-sm"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sage text-sage-foreground shadow-sm">
                    <h.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-base font-bold text-plum">{h.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{h.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={submit}
            className="page-enter rounded-4xl border border-border bg-card/95 backdrop-blur-sm p-8 shadow-[var(--shadow-soft)] sm:p-10"
          >
            {existingUser ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-display text-3xl font-extrabold text-plum">Welcome back!</h2>
                  <p className="text-base text-muted-foreground">
                    We found your previous session as <strong className="text-plum">{name}</strong> ({ROLE_LABEL[selectedRole as UserRole] || selectedRole}).
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button type="button" size="lg" onClick={handleContinue} className="flex-1 h-14 rounded-2xl text-base font-semibold">
                    Continue where you left off
                  </Button>
                  <Button type="button" variant="outline" size="lg" onClick={handleStartFresh} className="flex-1 h-14 rounded-2xl text-base font-semibold">
                    Start fresh
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <h2 className="font-display text-3xl font-extrabold text-plum">Let&apos;s get started</h2>
                  <p className="text-base text-muted-foreground">
                    Tell us who you are so we can tailor your dashboard.
                  </p>
                </div>

                <div className="mt-8 space-y-3">
                  <Label htmlFor="name" className="text-base font-semibold">Your name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Amelia Rivers"
                    className="h-14 rounded-2xl text-base"
                  />
                </div>

                <div className="mt-8 space-y-4">
                  <Label className="text-base font-semibold">Choose your category</Label>
                  <RadioGroup
                    value={selectedRole}
                    onValueChange={(v) => setRole(v as UserRole)}
                    className="gap-4"
                  >
                    {ROLES.map((r) => (
                      <Label
                        key={r.value}
                        htmlFor={r.value}
                        className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition-all ${
                          selectedRole === r.value
                            ? "border-primary bg-blush/70 shadow-md"
                            : "border-border bg-card/50 hover:bg-muted hover:border-border/80"
                        }`}
                      >
                        <RadioGroupItem value={r.value} id={r.value} className="sr-only" />
                        <span className={`grid h-12 w-12 place-items-center rounded-xl transition-colors ${
                          selectedRole === r.value ? "bg-primary text-primary-foreground" : "bg-sky text-sky-foreground"
                        }`}>
                          <r.icon className="h-6 w-6" aria-hidden />
                        </span>
                        <span>
                          <span className="block font-display text-base font-bold text-plum">
                            {r.label}
                          </span>
                          <span className="block text-sm text-muted-foreground">{r.blurb}</span>
                        </span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                {error && (
                  <p role="alert" className="mt-6 text-sm font-semibold text-destructive">
                    {error}
                  </p>
                )}

                <Button type="submit" size="lg" className="mt-8 h-14 w-full rounded-2xl text-base font-semibold">
                  Enter FurEver Care
                </Button>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Your data is saved locally in your browser.
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
