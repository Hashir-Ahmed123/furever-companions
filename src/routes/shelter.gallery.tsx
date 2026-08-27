import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { AppShell, PageHeader } from "@/components/furever/AppShell";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useJsonData, type ShelterPet } from "@/lib/useJsonData";

export const Route = createFileRoute("/shelter/gallery")({
  head: () => ({
    meta: [
      { title: "Adoption Gallery — FurEver Care" },
      { name: "description", content: "Meet dogs, cats, and rabbits waiting for their forever homes.'}" },
      { property: "og:title", content: "Adoption Gallery — FurEver Care" },
      { property: "og:description", content: "Find your new best friend among our adoptable pets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShelterGallery,
});

const FILTERS = ["All", "Dog", "Cat", "Rabbit"];

function ShelterGallery() {
  const { data, isLoading } = useJsonData<ShelterPet>("shelterPets.json");
  const [filter, setFilter] = useState("All");

  const pets = useMemo(() => {
    if (!data) return [];
    if (filter === "All") return data;
    return data.filter((pet) => pet.type === filter);
  }, [data, filter]);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Shelter Volunteer"
        title="Adoption gallery"
        subtitle="These loving companions are waiting for their forever homes."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="flex flex-wrap gap-3">
          {FILTERS.map((f) => (
            <Button
              key={f}
              type="button"
              size="lg"
              variant={filter === f ? "default" : "outline"}
              className="rounded-full px-6"
              onClick={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-3xl" />
            ))}
          </div>
        ) : pets.length === 0 ? (
          <p className="mt-12 text-center text-lg text-muted-foreground">
            No pets match the selected filter.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pets.map((pet) => (
              <article
                key={pet.id}
                className="card-lift flex flex-col overflow-hidden rounded-3xl border border-border bg-card/95 backdrop-blur-sm shadow-sm"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-plum">{pet.name}</h3>
                      <p className="text-sm text-muted-foreground">{pet.breed}</p>
                    </div>
                    <span className="rounded-full bg-sage px-3 py-1.5 text-xs font-bold text-sage-foreground shadow-sm">
                      {pet.type}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-muted-foreground">{pet.age}</p>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">{pet.description}</p>
                  <Button
                    size="lg"
                    className="mt-5 w-full rounded-full"
                    onClick={() => alert("Contact the shelter to learn more about " + pet.name)}
                  >
                    <Heart className="mr-2 h-4 w-4" /> Adopt me
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
