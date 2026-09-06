import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { grundlagenTopics } from '@/data/grundlagen'
import { X } from 'lucide-react'

interface GrundlagenPageProps {
  onClose: () => void
}

export function GrundlagenPage({ onClose }: GrundlagenPageProps) {
  const { i18n } = useTranslation()
  const lang = i18n.language

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {lang === 'de' ? 'Grundlagen der Bauphysik' : 'Building Physics Fundamentals'}
          </h1>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-accent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <Accordion type="multiple" defaultValue={grundlagenTopics.map((t) => t.id)}>
          {grundlagenTopics.map((topic) => (
            <AccordionItem key={topic.id} value={topic.id}>
              <AccordionTrigger className="text-base font-semibold">
                {lang === 'de' ? topic.titleDe : topic.titleEn}
              </AccordionTrigger>
              <AccordionContent>
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {lang === 'de' ? topic.contentDe : topic.contentEn}
                  </ReactMarkdown>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
