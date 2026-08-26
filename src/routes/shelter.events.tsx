import { createFileRoute } from "@tanstack/react-router";
import { Calendar, MapPin, Clock } from "lucide-react";
import { AppShell, PageHeader } from "@/components/furever/AppShell";
import { Skeleton } from "@/components/ui/skeleton";
import { useJsonData, type ShelterEvent } from "@/lib/useJsonData";

export const Route = createFileRoute("/shelter/events")({
  head: () => ({
    meta: [
      { title: "Events — FurEver Care" },
      { name: "description", content: "Upcoming adoption drives, vaccination camps, and pet care events." },
      { property: "og:title", content: "Events — FurEver Care" },
      { property: "og:description", content: "Join us for pet adoption drives and care events." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Events,
});

function Events() {
  const { data, isLoading } = useJsonData<ShelterEvent>("events.json");

  return (
    <AppShell>
      <PageHeader
        eyebrow="Shelter Volunteer"
        title="Upcoming events"
        subtitle="Adoption drives, vaccination camps, and community gatherings."
      />
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        {isLoading ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {(data ?? []).map((event) => (
              <article
                key={event.id}
                className="card-lift rounded-3xl border border-border bg-card p-6"
              >
                <h3 className="font-display text-lg font-bold text-plum">{event.title}</h3>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" aria-hidden />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" aria-hidden />
                    {event.location}
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{event.description}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
