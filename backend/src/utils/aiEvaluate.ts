import { model } from "../services/gemini";

export async function aiEvaluate(submissions: any[]) {
  try {
    const prompt = `
            You are an expert interview evaluator. Evaluate the candidate's answers.

            Return your ENTIRE RESPONSE strictly in valid JSON ONLY.
            Do NOT include explanation outside JSON.
            Do NOT include markdown.  
            Do NOT include text before or after JSON.

            Evaluation criteria:
            1. Structure (25%)
            - Clear beginning/middle/end
            - Logical flow
            - STAR method (for behavioral)

            2. Content (35%)
            - Specific examples
            - Quantifiable results
            - Relevant to question
            - Depth of explanation

            3. Communication (20%)
            - Clarity
            - Conciseness
            - Professional tone

            4. Technical accuracy (20%) — for technical questions
            - Correct concepts
            - Demonstrates understanding

            Here are the candidate's submissions:

            ${submissions
              .map(
                (s, i) => `
            Question ${i + 1} (${s.type}):
            ${s.question}

            Answer:
            ${s.answer}
            `
              )
              .join("\n")}

           
           Your JSON output MUST follow this structure:
            {
            "overallScore": number,
            "criteria": {
                "structure": number,
                "content": number,
                "communication": number,
                "technical": number
            },
            "strengths": string[],
            "improvements": string[],
            "improvedAnswer": string
            }
    `;
    const result = await model.generateContent(prompt);
    let aiResponse = result.response.text().trim();
    aiResponse = aiResponse
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // 2️⃣ Sometimes Gemini adds trailing commas — remove them safely
    aiResponse = aiResponse.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");

    // 3️⃣ Validate JSON
    const parsed = JSON.parse(aiResponse);
    return parsed;
  } catch (error) {
    console.error("AI Error Evaluating Submissions: ", error);
    throw error;
  }
}
