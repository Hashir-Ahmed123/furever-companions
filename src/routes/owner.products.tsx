import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/furever/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useJsonData, type Product } from "@/lib/useJsonData";

export const Route = createFileRoute("/owner/products")({
  head: () => ({
    meta: [
      { title: "Pet Product Shop — FurEver Care" },
      { name: "description", content: "Browse food, toys, grooming essentials, bedding and supplements for your pet." },
      { property: "og:title", content: "Pet Product Shop — FurEver Care" },
      { property: "og:description", content: "Search, filter and sort curated pet care products." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Products,
});

type Sort = "name" | "price-asc" | "price-desc";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&q=80";

const rupees = (value: number) => `Rs ${value.toLocaleString("en-PK")}`;

function Products() {
  const { data, isLoading } = useJsonData<Product>("products.json");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<Sort>("name");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set((data ?? []).map((p) => p.category)))],
    [data],
  );

  const items = useMemo(() => {
    let list = (data ?? []).filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(query.trim().toLowerCase()),
    );
    list = [...list].sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name) : sort === "price-asc" ? a.price - b.price : b.price - a.price,
    );
    return list;
  }, [data, query, category, sort]);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Shop"
        title="Everyday pet essentials"
        subtitle="Curated food, toys, grooming kit, bedding and supplements. Checkout is demo-only."
      />
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              aria-label="Search products"
              className="h-11 rounded-xl pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Button
                key={c}
                type="button"
                size="sm"
                variant={category === c ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setCategory(c)}
              >
                {c}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {([
              ["name", "Name A–Z"],
              ["price-asc", "Price ↑"],
              ["price-desc", "Price ↓"],
            ] as [Sort, string][]).map(([v, label]) => (
              <Button
                key={v}
                type="button"
                size="sm"
                variant={sort === v ? "secondary" : "ghost"}
                className="rounded-full"
                onClick={() => setSort(v)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-3xl" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="mt-10 text-center text-muted-foreground">No products match your search.</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => (
              <article key={p.id} className="card-lift flex flex-col overflow-hidden rounded-3xl border border-border bg-card">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-44 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
                <div className="flex flex-1 flex-col p-5">
                  <span className="w-fit rounded-full bg-sage px-2.5 py-0.5 text-[11px] font-bold text-sage-foreground">
                    {p.category}
                  </span>
                  <h3 className="mt-2 font-display text-base font-bold text-plum">{p.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-lg font-extrabold text-primary">
                      {rupees(p.price)}
                    </span>
                    <Button
                      size="sm"
                      className="rounded-full"
                      onClick={() => toast.success("Checkout coming soon!", { description: p.name })}
                    >
                      <ShoppingBag className="mr-1.5 h-4 w-4" /> Buy now
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
