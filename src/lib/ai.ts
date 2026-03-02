import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function getWellnessGuidance(
  archetype: string | null,
  meditationMinutes: number,
  streak: number,
  userMessage: string
): Promise<string> {
  const systemPrompt = `You are the Alma Retreat AI Wellness Guide — a warm, knowledgeable, and compassionate wellness advisor for a luxury yoga and pilates retreat in Mallorca, Spain.

Your role is to provide personalized guidance on:
- Yoga sequences and pose recommendations
- Nutrition tips (plant-based, whole food focused)
- Mindfulness and meditation practices
- Breathwork techniques
- Retreat preparation advice

User's wellness archetype: ${archetype || 'Not yet determined'}
Total meditation minutes: ${meditationMinutes}
Current practice streak: ${streak} days

Be warm but concise. Use short paragraphs. When suggesting yoga sequences, list 4-6 poses. When giving nutrition tips, be specific with ingredients. Always tie recommendations back to the user's archetype when available. Keep responses under 300 words.`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  });

  const textBlock = response.content.find((block) => block.type === 'text');
  return textBlock ? textBlock.text : 'I am here to guide you on your wellness journey. How can I help?';
}
