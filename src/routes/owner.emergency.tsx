import { createFileRoute } from "@tanstack/react-router";
import { Phone, Clock3, AlertTriangle } from "lucide-react";
import { AppShell, PageHeader } from "@/components/furever/AppShell";
import { Skeleton } from "@/components/ui/skeleton";
import { useJsonData, type EmergencyContact } from "@/lib/useJsonData";

export const Route = createFileRoute("/owner/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency & Vet Help — FurEver Care" },
      { name: "description", content: "24/7 emergency vet lines, poison control and rescue hotlines for urgent pet care." },
      { property: "og:title", content: "Emergency & Vet Help — FurEver Care" },
      { property: "og:description", content: "Who to call first when your pet needs urgent help." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Emergency,
});

const TONE: Record<string, string> = {
  critical: "border-destructive/40 bg-destructive/5",
  high: "border-primary/40 bg-blush/40",
  medium: "border-border bg-card",
};

function Emergency() {
  const { data, isLoading } = useJsonData<EmergencyContact>("emergencyContacts.json");

  return (
    <AppShell>
      <PageHeader
        eyebrow="Urgent care"
        title="Emergency & vet help"
        subtitle="Keep these numbers handy. In a crisis, call before you travel so the clinic can prepare."
      />
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="flex items-start gap-3 rounded-3xl border border-destructive/40 bg-destructive/5 p-5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden />
          <p className="text-sm">
            <strong>Breathing trouble, seizures, bloating, heavy bleeding or collapse</strong> are
            always emergencies — call immediately and keep your pet warm and still.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-44 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(data ?? []).map((c) => (
              <article key={c.id} className={`card-lift rounded-3xl border p-6 ${TONE[c.severity] ?? TONE["medium"]}`}>
                <span className="rounded-full bg-sky px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-sky-foreground">
                  {c.type}
                </span>
                <h2 className="mt-3 font-display text-lg font-bold text-plum">{c.name}</h2>
                <a href={`tel:${c.phone.replace(/[^+\d]/g, "")}`} className="mt-2 flex items-center gap-2 font-semibold text-primary">
                  <Phone className="h-4 w-4" aria-hidden /> {c.phone}
                </a>
                <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock3 className="h-4 w-4" aria-hidden /> {c.hours}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{c.note}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
