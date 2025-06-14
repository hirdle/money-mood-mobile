
type Props = {
  title: string;
  subtitle?: string;
};

export default function SocialPlaceholder({ title, subtitle }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center py-12 space-y-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      )}
      <span className="opacity-40 select-none mt-6">В разработке</span>
    </div>
  )
}
