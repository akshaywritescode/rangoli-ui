import Link from "next/link";
import { notFound } from "next/navigation";
import { components } from "@/lib/components";
import { ComponentPreview } from "@/components/ComponentPreview";
import { ComponentTabs } from "@/components/ComponentTabs";

interface ComponentPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return components.map((component) => ({
    id: component.id,
  }));
}

export async function generateMetadata({ params }: ComponentPageProps) {
  const { id } = await params;
  const component = components.find((c) => c.id === id);

  if (!component) {
    return {
      title: "Component Not Found",
    };
  }

  return {
    title: `${component.name} - Rangoli`,
    description: component.description,
  };
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { id } = await params;
  const component = components.find((c) => c.id === id);

  if (!component) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-12 group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Components
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight font-space-grotesk">
            <span className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
              {component.name}
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-zinc-400 font-inter leading-relaxed max-w-3xl">
            {component.description}
          </p>
        </div>

        {/* Tabs */}
        <ComponentTabs component={component} />
      </div>
    </div>
  );
}
