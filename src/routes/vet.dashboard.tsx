import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, Calendar, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { AppShell, PageHeader } from "@/components/furever/AppShell";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/session";
import { useJsonData, type CaseStudy } from "@/lib/useJsonData";

export const Route = createFileRoute("/vet/dashboard")({
  head: () => ({
    meta: [
      { title: "Veterinarian Dashboard — FurEver Care" },
      { name: "description", content: "View your vet profile, time slots, and case studies." },
      { property: "og:title", content: "Veterinarian Dashboard — FurEver Care" },
      { property: "og:description", content: "Manage your veterinary practice profile and cases." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VetDashboard,
});

const TIME_SLOTS = [
  { day: "Monday", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
  { day: "Tuesday", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
  { day: "Wednesday", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
  { day: "Thursday", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
  { day: "Friday", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
  { day: "Saturday", slots: ["10:00", "11:00", "12:00"] },
  { day: "Sunday", slots: [] },
];

function VetDashboard() {
  const { vet, userName } = useSession();
  const { data: caseStudies } = useJsonData<CaseStudy>("caseStudies.json");
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  if (!vet) {
    return (
      <AppShell>
        <PageHeader title="No profile yet" subtitle="Complete your intake form first." />
        <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
          <Button asChild size="lg" className="rounded-2xl">
            <a href="/vet/intake">Create vet profile</a>
          </Button>
        </div>
      </AppShell>
    );
  }

  const toggleCase = (id: string) => {
    setExpandedCase(expandedCase === id ? null : id);
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Veterinarian"
        title={`${vet.name}'s dashboard`}
        subtitle="Manage your profile, view time slots, and review case studies."
      />
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="card-lift rounded-3xl border border-border bg-card p-6">
              <div className="flex items-center gap-4">
                {vet.photo ? (
                  <img
                    src={vet.photo}
                    alt={vet.name}
                    className="h-20 w-20 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="grid h-20 w-20 place-items-center rounded-2xl bg-sage text-sage-foreground">
                    <span className="text-2xl font-bold">{vet.name.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <h2 className="font-display text-xl font-bold text-plum">{vet.name}</h2>
                  <p className="text-sm text-muted-foreground">{vet.specialization}</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" aria-hidden />
                  <span className="text-muted-foreground">{vet.contact}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" aria-hidden />
                  <span className="text-muted-foreground">vet@furevercare.pk</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="card-lift rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-bold text-plum">Weekly time slots</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                View-only schedule. Booked slots are marked in red.
              </p>
              <div className="mt-4 space-y-3">
                {TIME_SLOTS.map((day) => (
                  <div key={day.day}>
                    <div className="flex items-center gap-2 text-sm font-semibold text-plum">
                      <Calendar className="h-4 w-4" aria-hidden />
                      {day.day}
                    </div>
                    {day.slots.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {day.slots.map((slot, i) => {
                          const isBooked = i % 3 === 0;
                          return (
                            <span
                              key={slot}
                              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                                isBooked
                                  ? "bg-destructive/10 text-destructive"
                                  : "bg-sage text-sage-foreground"
                              }`}
                            >
                              <Clock className="h-3 w-3" aria-hidden />
                              {slot}
                              {isBooked && " (Booked)"}
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="mt-2 text-xs text-muted-foreground">Closed</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-display text-2xl font-bold text-plum">Case studies</h3>
          <p className="mt-2 text-muted-foreground">
            Sample medical histories for reference and learning.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {(caseStudies ?? []).map((cs) => (
              <article
                key={cs.id}
                className="card-lift rounded-3xl border border-border bg-card p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-display text-lg font-bold text-plum">{cs.petName}</h4>
                    <p className="text-sm text-muted-foreground">{cs.species} • {cs.condition}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleCase(cs.id)}
                    aria-label={expandedCase === cs.id ? "Collapse" : "Expand"}
                  >
                    {expandedCase === cs.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                {expandedCase === cs.id && (
                  <div className="mt-4 space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-plum">Summary</p>
                      <p className="text-muted-foreground">{cs.summary}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-plum">Treatment</p>
                      <p className="text-muted-foreground">{cs.treatment}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-plum">Outcome</p>
                      <p className="text-muted-foreground">{cs.outcome}</p>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
