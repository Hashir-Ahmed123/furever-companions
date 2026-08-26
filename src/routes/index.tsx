import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PawPrint, Heart, Stethoscope, Home as HomeIcon, ShieldCheck, Bone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Ticker } from "@/components/furever/Ticker";
import { useSession, ROLE_HOME, type UserRole } from "@/lib/session";

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
  const { setUser } = useSession();
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Please tell us your name.");
    if (!role) return setError("Please choose a category to continue.");
    setError("");
    setUser(name.trim(), role);
    navigate({ to: ROLE_HOME[role] });
  };

  return (
    <div className="min-h-screen">
      <Ticker />
      <div className="paw-pattern">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-20">
          <div className="page-enter">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <PawPrint className="h-4 w-4" aria-hidden /> 100% pet-loving care
            </span>
            <div className="mt-6 flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-3xl bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
                <PawPrint className="h-7 w-7" aria-hidden />
              </span>
              <p className="font-display text-2xl font-extrabold tracking-tight text-plum">
                FurEver Care
              </p>
            </div>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] text-plum sm:text-6xl">
              Happy pets.
              <br />
              Healthy homes.
              <br />
              <span className="text-primary">They deserve forever love.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              One warm little place for pet owners, veterinarians and shelter volunteers — care
              guides, adoption stories, vet schedules and everyday essentials.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {HIGHLIGHTS.map((h) => (
                <div
                  key={h.title}
                  className="card-lift flex items-start gap-3 rounded-2xl border border-border bg-card/80 p-4"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sage text-sage-foreground">
                    <h.icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-plum">{h.title}</p>
                    <p className="text-xs text-muted-foreground">{h.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={submit}
            className="page-enter rounded-4xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
          >
            <h2 className="font-display text-2xl font-extrabold text-plum">Let&apos;s get started</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell us who you are so we can tailor your dashboard.
            </p>

            <div className="mt-6 space-y-2">
              <Label htmlFor="name">Your name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Amelia Rivers"
                className="h-12 rounded-2xl"
              />
            </div>

            <div className="mt-6 space-y-3">
              <Label>Choose your category</Label>
              <RadioGroup
                value={role}
                onValueChange={(v) => setRole(v as UserRole)}
                className="gap-3"
              >
                {ROLES.map((r) => (
                  <Label
                    key={r.value}
                    htmlFor={r.value}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-colors ${
                      role === r.value
                        ? "border-primary bg-blush/60"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <RadioGroupItem value={r.value} id={r.value} />
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky text-sky-foreground">
                      <r.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-display text-sm font-bold text-plum">
                        {r.label}
                      </span>
                      <span className="block text-xs text-muted-foreground">{r.blurb}</span>
                    </span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {error && (
              <p role="alert" className="mt-4 text-sm font-semibold text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="mt-6 h-12 w-full rounded-2xl text-base">
              Enter FurEver Care
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Nothing is saved — this is a demo experience.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
