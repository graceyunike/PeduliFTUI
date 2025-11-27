// Sentiment Analysis Service using OpenRouter API
// Note: fetch is built-in in Node.js 18+

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

/**
 * Analyze sentiment of a comment
 * Returns: { sentiment: 'trusted' | 'untrusted', score: number (0-1), reasoning: string }
 */
export const analyzeSentiment = async (commentText) => {
    try {
        const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
        if (!OPENROUTER_API_KEY) {
            throw new Error('OPENROUTER_API_KEY not configured');
        }

        console.log('📤 Calling OpenRouter API for sentiment analysis...');
        const systemPrompt = `You are a sentiment analyzer for a donation platform. 
Analyze the given comment and classify it as either "trusted" (positive or neutral) or "untrusted" (negative).

Return ONLY a JSON object with this exact format:
{
  "sentiment": "trusted" or "untrusted",
  "score": number between 0 and 1,
  "reasoning": "brief explanation"
}

Guidelines:
- "trusted": Positive feedback, appreciation, support, neutral observations about the platform
- "untrusted": Complaints, negative feedback, scam accusations, distrust, concerns
- Score closer to 1.0 = more confident in the classification`;

        const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:5173',
                'X-Title': 'PeduliFTUI Sentiment Analysis'
            },
            body: JSON.stringify({
                model: 'openai/gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: `Analyze this comment: "${commentText}"`
                    }
                ],
                temperature: 0.3,
                max_tokens: 200
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('❌ OpenRouter API error:', error);
            throw new Error(`OpenRouter API error: ${response.status} - ${JSON.stringify(error)}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        console.log('📥 OpenRouter response:', content);

        // Parse JSON response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Failed to parse sentiment response');
        }

        const result = JSON.parse(jsonMatch[0]);
        return {
            sentiment: result.sentiment,
            score: result.score,
            reasoning: result.reasoning
        };
    } catch (error) {
        console.error('❌ Sentiment analysis error:', error.message);
        throw error;
    }
};

/**
 * Calculate trust percentage from comments
 * Returns: { trustedCount, untrustedCount, trustPercentage, totalComments }
 */
export const calculateTrustPercentage = async (comments) => {
    try {
        if (!comments || comments.length === 0) {
            return {
                trustedCount: 0,
                untrustedCount: 0,
                trustPercentage: 0,
                totalComments: 0
            };
        }

        let trustedCount = 0;
        let untrustedCount = 0;

        for (const comment of comments) {
            if (comment.sentiment === 'trusted') {
                trustedCount++;
            } else if (comment.sentiment === 'untrusted') {
                untrustedCount++;
            }
        }

        const totalComments = trustedCount + untrustedCount;
        const trustPercentage = totalComments > 0 ? Math.round((trustedCount / totalComments) * 100) : 0;

        return {
            trustedCount,
            untrustedCount,
            trustPercentage,
            totalComments
        };
    } catch (error) {
        console.error('Trust calculation error:', error);
        throw error;
    }
};
