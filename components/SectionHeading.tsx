/**
 * Section header: blue eyebrow pill, centred tight-tracked heading, one muted
 * sentence. Repeated on every section, so it lives here rather than being
 * re-typed six times.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: string
  lead?: string
}) {
  return (
    <div className="relative z-2 mx-auto max-w-screen-md px-4 text-center">
      <span className="mx-auto inline-flex h-8 w-fit items-center justify-center rounded-full bg-brand-solid px-4">
        <span className="text-sm font-medium tracking-tight text-white">
          {eyebrow}
        </span>
      </span>

      <h2 className="mt-6 text-balance text-neutral-900">{title}</h2>

      {lead && (
        <p className="mt-4 text-neutral-600 md:text-xl">{lead}</p>
      )}
    </div>
  )
}
