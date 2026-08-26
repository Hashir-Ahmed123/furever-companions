import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/furever/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/vet/intake")({
  head: () => ({
    meta: [
      { title: "Veterinarian Profile — FurEver Care" },
      { name: "description", content: "Create your veterinarian profile with specialization and contact information." },
      { property: "og:title", content: "Veterinarian Profile — FurEver Care" },
      { property: "og:description", content: "Join our network of veterinary professionals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VetIntake,
});

const SPECIALIZATIONS = [
  "General Practice",
  "Surgery",
  "Dermatology",
  "Dentistry",
  "Emergency & Critical Care",
  "Exotic & Small Mammals",
  "Ophthalmology",
  "Cardiology",
  "Neurology",
  "Oncology",
];

function VetIntake() {
  const navigate = useNavigate();
  const { setVet } = useSession();
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    contact: "",
    photo: null as string | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((f) => ({ ...f, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Required";
    if (!form.specialization) next.specialization = "Required";
    if (!form.contact.trim()) next.contact = "Required";
    setErrors(next);
    if (Object.keys(next).length) return;
    
    setVet(form);
    toast.success("Profile created successfully!");
    navigate({ to: "/vet/dashboard" });
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Veterinarian"
        title="Create your profile"
        subtitle="Tell us about your practice and specialization to access vet-specific tools."
      />
      <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
        <form
          onSubmit={submit}
          className="grid gap-5 rounded-4xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Dr. Sarah Ahmed"
              className="h-11 rounded-xl"
            />
            {errors.name && <p className="text-xs font-semibold text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization</Label>
            <Select value={form.specialization} onValueChange={(v) => set("specialization", v)}>
              <SelectTrigger className="h-11 w-full rounded-xl">
                <SelectValue placeholder="Choose your specialization" />
              </SelectTrigger>
              <SelectContent>
                {SPECIALIZATIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.specialization && <p className="text-xs font-semibold text-destructive">{errors.specialization}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact number</Label>
            <Input
              id="contact"
              value={form.contact}
              onChange={(e) => set("contact", e.target.value)}
              placeholder="+92-300-1234567"
              className="h-11 rounded-xl"
            />
            {errors.contact && <p className="text-xs font-semibold text-destructive">{errors.contact}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">Profile photo (optional)</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="h-11 rounded-xl"
            />
            {form.photo && (
              <img
                src={form.photo}
                alt="Preview"
                className="mt-2 h-32 w-32 rounded-2xl object-cover"
              />
            )}
          </div>

          <Button type="submit" size="lg" className="h-12 w-full rounded-2xl">
            Create vet profile
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            This is a demo — no data is actually stored.
          </p>
        </form>
      </div>
    </AppShell>
  );
}
