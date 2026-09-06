import type { ReactNode } from 'react'

interface MainLayoutProps {
  sidebar: ReactNode
  visualization: ReactNode
  output: ReactNode
}

export function MainLayout({ sidebar, visualization, output }: MainLayoutProps) {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar - 320px */}
      <aside className="w-80 border-r border-border bg-card overflow-y-auto shrink-0">
        <div className="p-3 space-y-1">
          {sidebar}
        </div>
      </aside>

      {/* Visualization - flex grow */}
      <main className="flex-1 overflow-auto bg-background p-4 flex items-center justify-center">
        {visualization}
      </main>

      {/* Output - 400px */}
      <aside className="w-[400px] border-l border-border bg-card overflow-y-auto shrink-0">
        {output}
      </aside>
    </div>
  )
}
