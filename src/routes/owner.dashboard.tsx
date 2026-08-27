import { createFileRoute, Link } from "@tanstack/react-router";
import { PawPrint, Utensils, Scissors, HeartPulse, GraduationCap } from "lucide-react";
import { AppShell, PageHeader } from "@/components/furever/AppShell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/owner/dashboard")({
  head: () => ({
    meta: [
      { title: "Pet Care Dashboard — FurEver Care" },
      { name: "description", content: "Pet profile, feeding charts, grooming videos, health and training tips in one dashboard." },
      { property: "og:title", content: "Pet Care Dashboard — FurEver Care" },
      { property: "og:description", content: "Everything your pet needs, organised in one warm dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OwnerDashboard,
});

const FEEDING = [
  { stage: "Puppy (2–6 months)", meals: "4 meals/day", portion: "180 g", note: "High-protein puppy formula" },
  { stage: "Adult dog", meals: "2 meals/day", portion: "320 g", note: "Balanced adult kibble + water" },
  { stage: "Kitten (2–6 months)", meals: "4 meals/day", portion: "70 g", note: "Kitten wet + dry mix" },
  { stage: "Adult cat", meals: "2–3 meals/day", portion: "110 g", note: "Wet food for hydration" },
];

const GROOMING = [
  { title: "Brushing basics", id: "9ePo4CJkdcE" },
  { title: "Bathing your pet safely", id: "zoBihcd61iY" },
  { title: "Nail & paw trimming", id: "CgDmT6akVRQ" },
];

const HEALTH = [
  {
    title: "Oral & dental care",
    text: "Brush 3–4 times a week with pet-safe toothpaste. Watch for red gums or bad breath.",
    audio: "./audio/oral-dental-care.mp3",
  },
  {
    title: "Weight management",
    text: "Weigh monthly. Swap treats for extra play; obesity shortens lifespan by up to 2 years.",
    audio: "./audio/weight-management.mp3",
  },
  {
    title: "Common conditions",
    text: "Ear infections, fleas, arthritis and allergies — book a vet check if symptoms last 48 hours.",
    audio: "/audio/common-conditions.mp3",
  },
];

const TRAINING = [
  { title: "Basic commands", text: "Sit, stay, come. Three 5-minute sessions daily beat one long one." },
  { title: "Potty training", text: "Take out after meals, naps and play. Reward within 3 seconds of success." },
  { title: "Leash manners", text: "Stop walking when the leash tightens; resume when it slackens." },
];

function OwnerDashboard() {
  const { pet, userName } = useSession();

  if (!pet) {
    return (
      <AppShell>
        <PageHeader title="No pet profile yet" subtitle="Add your pet first to unlock the dashboard." />
        <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
          <Button asChild size="lg" className="rounded-2xl">
            <Link to="/owner/intake">Add your pet</Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow={userName ? `${userName}'s pet` : "Pet Owner"}
        title={`${pet.name}'s care dashboard`}
        subtitle="Feeding, grooming, health and training — tailored to your companion."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <Tabs defaultValue="profile">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 rounded-2xl bg-cream/80 backdrop-blur-sm p-2.5">
            <TabsTrigger value="profile" className="rounded-xl px-4 py-2.5"><PawPrint className="mr-2 h-4 w-4" />Profile</TabsTrigger>
            <TabsTrigger value="feeding" className="rounded-xl px-4 py-2.5"><Utensils className="mr-2 h-4 w-4" />Feeding</TabsTrigger>
            <TabsTrigger value="grooming" className="rounded-xl px-4 py-2.5"><Scissors className="mr-2 h-4 w-4" />Grooming</TabsTrigger>
            <TabsTrigger value="health" className="rounded-xl px-4 py-2.5"><HeartPulse className="mr-2 h-4 w-4" />Health</TabsTrigger>
            <TabsTrigger value="training" className="rounded-xl px-4 py-2.5"><GraduationCap className="mr-2 h-4 w-4" />Training</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-8">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Name", pet.name],
                ["Species", pet.species],
                ["Breed", pet.breed],
                ["Age", pet.age],
                ["Gender", pet.gender],
                ["Vaccination", pet.vaccination],
                ["Weight", "12.4 kg (sample)"],
                ["Colour", "Golden cream (sample)"],
                ["Microchip ID", "985-1410-0032-771 (sample)"],
              ].map(([k, v]) => (
                <div key={k} className="card-lift rounded-3xl border border-border bg-card/95 backdrop-blur-sm p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">{k}</p>
                  <p className="mt-2 font-display text-xl font-bold text-plum">{v}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="feeding" className="mt-8 space-y-8">
            <div className="overflow-hidden rounded-3xl border border-border bg-card/95 backdrop-blur-sm shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-plum">Life stage</TableHead>
                    <TableHead className="font-semibold text-plum">Meals</TableHead>
                    <TableHead className="font-semibold text-plum">Daily portion</TableHead>
                    <TableHead className="font-semibold text-plum">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {FEEDING.map((f) => (
                    <TableRow key={f.stage}>
                      <TableCell className="font-semibold text-plum">{f.stage}</TableCell>
                      <TableCell>{f.meals}</TableCell>
                      <TableCell>{f.portion}</TableCell>
                      <TableCell className="text-muted-foreground">{f.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="rounded-3xl border border-border bg-card/95 backdrop-blur-sm p-8 shadow-sm">
              <h3 className="font-display text-xl font-bold text-plum">Daily portion comparison</h3>
              <div className="mt-6 space-y-5">
                {FEEDING.map((f) => {
                  const grams = parseInt(f.portion, 10);
                  return (
                    <div key={f.stage}>
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-plum">{f.stage}</span>
                        <span className="text-muted-foreground">{f.portion}</span>
                      </div>
                      <div className="mt-2 h-4 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${(grams / 320) * 100}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="grooming" className="mt-8">
            <div className="grid gap-6 md:grid-cols-3">
              {GROOMING.map((g) => (
                <div key={g.id} className="card-lift overflow-hidden rounded-3xl border border-border bg-card/95 backdrop-blur-sm shadow-sm">
                  <div className="aspect-video">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${g.id}`}
                      title={g.title}
                      loading="lazy"
                      allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="p-5 font-display text-lg font-bold text-plum">{g.title}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="health" className="mt-8">
            <div className="grid gap-6 md:grid-cols-3">
              {HEALTH.map((h) => (
                <article key={h.title} className="card-lift rounded-3xl border border-border bg-card/95 backdrop-blur-sm p-7 shadow-sm">
                  <h3 className="font-display text-xl font-bold text-plum">{h.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{h.text}</p>
                  <audio controls className="mt-5 w-full" preload="none">
                    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
                  </audio>
                </article>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="training" className="mt-8">
            <div className="grid gap-6 md:grid-cols-3">
              {TRAINING.map((t) => (
                <article key={t.title} className="card-lift rounded-3xl border border-border bg-card/95 backdrop-blur-sm p-7 shadow-sm">
                  <h3 className="font-display text-xl font-bold text-plum">{t.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.text}</p>
                  <audio controls className="mt-5 w-full" preload="none">
                    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" type="audio/mpeg" />
                  </audio>
                </article>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
