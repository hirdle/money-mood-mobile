
import { ReactNode } from 'react';

export default function PagePlaceholder({ title, icon, description }: { title: string, icon?: ReactNode, description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center p-8 space-y-4">
      {icon && <div className="text-4xl">{icon}</div>}
      <h2 className="text-2xl font-semibold">{title}</h2>
      {description && <p className="text-muted-foreground text-base">{description}</p>}
      <span className="opacity-40 select-none mt-6">В разработке</span>
    </div>
  )
}
