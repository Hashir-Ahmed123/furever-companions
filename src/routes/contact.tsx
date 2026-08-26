import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { AppShell, PageHeader } from "@/components/furever/AppShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — FurEver Care" },
      { name: "description", content: "Get in touch with the FurEver Care team for questions, support, or partnerships." },
      { property: "og:title", content: "Contact Us — FurEver Care" },
      { property: "og:description", content: "We're here to help you and your pets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact us"
        subtitle="Have questions about FurEver Care? We'd love to hear from you."
      />
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="card-lift rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-bold text-plum">Our team</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                FurEver Care is built by pet lovers for pet lovers. Our team includes veterinarians,
                shelter volunteers, and dedicated developers who believe every pet deserves forever love.
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
                    <p className="text-sm text-muted-foreground">hello@furevercare.pk</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky text-sky-foreground">
                    <Phone className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-plum">Phone</p>
                    <p className="text-sm text-muted-foreground">+92-42-111-FUREVER</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky text-sky-foreground">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-plum">Head office</p>
                    <p className="text-sm text-muted-foreground">
                      123 Pet Care Lane, Gulberg III<br />
                      Lahore, Punjab 54000<br />
                      Pakistan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-lift overflow-hidden rounded-3xl border border-border bg-card">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.5575686745!2d74.3985!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc20befa5c6e5e9a!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="FurEver Care Location"
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
