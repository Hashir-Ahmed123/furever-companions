import { createFileRoute } from "@tanstack/react-router";
import { Heart, Calendar } from "lucide-react";
import { AppShell, PageHeader } from "@/components/furever/AppShell";
import { Skeleton } from "@/components/ui/skeleton";
import { useJsonData, type SuccessStory } from "@/lib/useJsonData";

export const Route = createFileRoute("/shelter/stories")({
  head: () => ({
    meta: [
      { title: "Success Stories — FurEver Care" },
      { name: "description", content: "Heartwarming adoption stories from our shelter community." },
      { property: "og:title", content: "Success Stories — FurEver Care" },
      { property: "og:description", content: "See how pets found their forever homes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SuccessStories,
});

function SuccessStories() {
  const { data, isLoading } = useJsonData<SuccessStory>("successStories.json");

  return (
    <AppShell>
      <PageHeader
        eyebrow="Shelter Volunteer"
        title="Success stories"
        subtitle="Heartwarming tales of pets who found their forever homes."
      />
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {(data ?? []).map((story) => (
              <article
                key={story.id}
                className="card-lift overflow-hidden rounded-3xl border border-border bg-card"
              >
                <img
                  src={story.image}
                  alt={story.petName}
                  loading="lazy"
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" aria-hidden />
                    <h3 className="font-display text-xl font-bold text-plum">{story.petName}</h3>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Adopted by {story.adopter} • {story.year}
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground">{story.story}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
