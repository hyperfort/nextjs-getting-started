import { Label, Spinner } from "flowbite-react";

export function Loading({ label }) {
  return (
    <article className="block text-center">
      <section className="mb-2">
        <Spinner size="xl" color="success" />
      </section>
      <section className="mb-2">
        <Label className="text-lg">{label}</Label>
      </section>
    </article>
  );
}
