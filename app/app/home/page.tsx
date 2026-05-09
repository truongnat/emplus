import { PlaceholderPage } from "@/components/layout/placeholder-page";

export default function HomePage() {
  return (
    <PlaceholderPage
      eyebrow="Home"
      title="Love counter placeholder."
      description="The future home screen will show love duration, upcoming milestones, recent memories, and nudge state."
      primaryHref="/milestones"
      primaryLabel="Preview milestones"
    />
  );
}
