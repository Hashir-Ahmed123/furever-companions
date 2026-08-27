import { createFileRoute } from "@tanstack/react-router";
import { Heart, Users, Target, Award } from "lucide-react";
import { AppShell, PageHeader } from "@/components/furever/AppShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — FurEver Care" },
      { name: "description", content: "Learn about the FurEver Care team, our mission, and our commitment to pet welfare." },
      { property: "og:title", content: "About Us — FurEver Care" },
      { property: "og:description", content: "They deserve forever love — and we're here to help." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Our story"
        title="About FurEver Care"
        subtitle="A warm platform built by pet lovers, for pet lovers."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <div className="card-lift rounded-3xl border border-border bg-card/95 backdrop-blur-sm p-10 shadow-sm">
            <h2 className="font-display text-3xl font-bold text-plum">Our mission</h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              FurEver Care was born from a simple belief: every pet deserves forever love. We're building
              a digital home where pet owners, veterinarians, and shelter volunteers can connect, share
              knowledge, and work together to improve the lives of companion animals across Pakistan.
            </p>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Whether you're a new puppy parent looking for feeding guidance, a veterinarian tracking
              case studies, or a shelter volunteer finding homes for rescues — this platform is designed
              for you.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Heart,
                title: "Pet-first approach",
                text: "Every feature is designed with your pet's wellbeing at the center.",
              },
              {
                icon: Users,
                title: "Community driven",
                text: "Built by veterinarians, shelter volunteers, and dedicated pet lovers.",
              },
              {
                icon: Target,
                title: "Accessible care",
                text: "Free resources and guidance for pet owners across Pakistan.",
              },
              {
                icon: Award,
                title: "Trusted content",
                text: "All care guides reviewed by practicing veterinary professionals.",
              },
            ].map((item) => (
              <div key={item.title} className="card-lift rounded-3xl border border-border bg-card/95 backdrop-blur-sm p-7 shadow-sm">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sage text-sage-foreground shadow-sm">
                  <item.icon className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-plum">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 card-lift rounded-3xl border border-border bg-card/95 backdrop-blur-sm p-10 shadow-sm">
            <h2 className="font-display text-3xl font-bold text-plum">Our team</h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              FurEver Care is a collaborative project bringing together expertise from multiple domains:
            </p>
            <ul className="mt-6 space-y-4 text-muted-foreground">
              <li className="flex items-start gap-4">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary shadow-sm" />
                <span className="text-base leading-relaxed"><strong className="text-plum">Veterinarians</strong> — ensuring all medical content is accurate and practical</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary shadow-sm" />
                <span className="text-base leading-relaxed"><strong className="text-plum">Shelter volunteers</strong> — bringing real-world adoption and rescue experience</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary shadow-sm" />
                <span className="text-base leading-relaxed"><strong className="text-plum">Pet behaviorists</strong> — contributing training and care guidance</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary shadow-sm" />
                <span className="text-base leading-relaxed"><strong className="text-plum">Developers & designers</strong> — building a warm, accessible digital experience</span>
              </li>
            </ul>
            <p className="mt-8 text-base text-muted-foreground leading-relaxed">
              Together, we're working toward a future where every pet has access to the care, knowledge,
              and love they deserve.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
