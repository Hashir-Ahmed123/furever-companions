import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { AppShell, PageHeader } from "@/components/furever/AppShell";

export const Route = createFileRoute("/shelter/contact")({
  head: () => ({
    meta: [
      { title: "Shelter Contact — FurEver Care" },
      { name: "description", content: "Contact the FurEver Shelter for adoption inquiries and volunteer opportunities." },
      { property: "og:title", content: "Shelter Contact — FurEver Care" },
      { property: "og:description", content: "Get in touch with our shelter team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShelterContact,
});

function ShelterContact() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Shelter Volunteer"
        title="Shelter contact"
        subtitle="Reach out for adoption inquiries, volunteering, or partnership opportunities."
      />
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="card-lift rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-bold text-plum">About our shelter</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                FurEver Shelter provides a safe haven for rescued pets across Pakistan. Our team of
                dedicated volunteers works tirelessly to rehabilitate, vaccinate, and find loving
                forever homes for dogs, cats, and rabbits in need.
              </p>
            </div>

            <div className="card-lift rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-bold text-plum">Contact information</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky text-sky-foreground">
                    <Mail className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-plum">Email</p>
                    <p className="text-sm text-muted-foreground">shelter@furevercare.pk</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky text-sky-foreground">
                    <Phone className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-plum">Phone</p>
                    <p className="text-sm text-muted-foreground">+92-42-111-SHELTER</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky text-sky-foreground">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-plum">Shelter location</p>
                    <p className="text-sm text-muted-foreground">
                      45 Rescue Road, DHA Phase 5<br />
                      Karachi, Sindh 75500<br />
                      Pakistan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-lift rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-bold text-plum">Visiting hours</h3>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p><strong>Monday - Friday:</strong> 10:00 - 18:00</p>
                <p><strong>Saturday:</strong> 10:00 - 16:00</p>
                <p><strong>Sunday:</strong> Closed for staff rest</p>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Please call ahead to schedule adoption visits.
              </p>
            </div>
          </div>

          <div className="card-lift overflow-hidden rounded-3xl border border-border bg-card">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.1234!2d67.0011!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDUxJzM4LjUiTiA2N8KwMDAnMDMuOSJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="FurEver Shelter Location"
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
