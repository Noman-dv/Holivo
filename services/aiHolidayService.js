// AI Holiday helper service
// Uses mock data for this phase and is wired to support future OpenAI integration.

import aiHolidaysData from '../mock/aiHolidays.json'
import { USE_MOCK_DATA, getApiUrl, API_ENDPOINTS } from '../lib/apiConfig'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

/**
 * Generate AI-style holiday suggestions from a natural language brief.
 * For now this returns mock data only; in a later phase we can plug in
 * OpenAI and partner search APIs.
 *
 * @param {Object} params
 * @param {string} params.prompt - User holiday brief
 * @param {number} [params.maxBudget] - Optional budget per person
 * @returns {Promise<Array>} Array of AI-matched holiday suggestions
 */
export const generateAiHoliday = async ({ prompt, maxBudget } = {}) => {
  try {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 600))

      let results = aiHolidaysData.aiHolidays

      if (maxBudget) {
        results = results.filter((holiday) => holiday.estimatedBudget <= maxBudget)
      }

      // In a real implementation, we would use the prompt and search context
      // to tune results. For now we simply return enriched mock data.
      return results.map((holiday) => ({
        ...holiday,
        score: 92, // Static mock score to communicate "AI match" visually
        originalPrompt: prompt,
      }))
    }

    // Real API integration placeholder
    const response = await fetch(getApiUrl(API_ENDPOINTS.AI_HOLIDAY.GENERATE), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(OPENAI_API_KEY ? { Authorization: `Bearer ${OPENAI_API_KEY}` } : {}),
      },
      body: JSON.stringify({ prompt, maxBudget }),
    })

    if (!response.ok) {
      throw new Error(`Failed to generate AI holiday: ${response.statusText}`)
    }

    const data = await response.json()
    return data.aiHolidays || data
  } catch (error) {
    console.error('Error generating AI holiday suggestions:', error)
    throw error
  }
}


