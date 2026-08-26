import { useQuery } from "@tanstack/react-query";

export function useJsonData<T>(file: string) {
  return useQuery<T[]>({
    queryKey: ["json", file],
    queryFn: async () => {
      const res = await fetch(`/data/${file}`);
      if (!res.ok) throw new Error(`Could not load ${file}`);
      return (await res.json()) as T[];
    },
    staleTime: Infinity,
  });
}

export type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
};

export type ShelterPet = {
  id: string;
  name: string;
  type: string;
  age: string;
  breed: string;
  description: string;
  image: string;
};

export type Vet = {
  id: string;
  name: string;
  specialization: string;
  contact: string;
  image: string;
};

export type CaseStudy = {
  id: string;
  petName: string;
  species: string;
  condition: string;
  summary: string;
  treatment: string;
  outcome: string;
};

export type ShelterEvent = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
};

export type SuccessStory = {
  id: string;
  petName: string;
  adopter: string;
  year: string;
  story: string;
  image: string;
};

export type EmergencyContact = {
  id: string;
  name: string;
  type: string;
  phone: string;
  hours: string;
  note: string;
  severity: "critical" | "high" | "medium";
};
