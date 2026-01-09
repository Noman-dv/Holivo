'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from './Button'
import { useStore } from '../store/useStore'

/**
 * Lightweight AI holiday helper input used on the homepage.
 * Stores the brief in global state and redirects to the full AI page.
 */
export default function AiHolidayPrompt() {
  const router = useRouter()
  const { filters, setAiBrief } = useStore()
  const [prompt, setPrompt] = useState(filters.aiBrief || '')

  const examplePrompts = [
    '3-day budget trip from Lahore under £150 for two people',
    'Anywhere warm in March for under £350',
    'Romantic weekend beach break within 3 hours flight',
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!prompt.trim()) return
    setAiBrief(prompt.trim())
    router.push('/ai-holiday')
  }

  const handleExampleClick = (text) => {
    setPrompt(text)
    setAiBrief(text)
    router.push('/ai-holiday')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        rows={2}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Example: 4-night family trip from Lahore in January, near the beach, under £300 per person."
        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm resize-vertical"
      />
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <Button
          type="submit"
          variant="primary"
          size="sm"
          className="w-full sm:w-auto"
          disabled={!prompt.trim()}
        >
          Describe my holiday
        </Button>
        <p className="text-[11px] text-slate-500 sm:flex-1">
          We&apos;re in beta. Results combine AI matching with live partner prices.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {examplePrompts.map((text) => (
          <button
            key={text}
            type="button"
            onClick={() => handleExampleClick(text)}
            className="text-[11px] px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
          >
            {text}
          </button>
        ))}
      </div>
    </form>
  )
}


