export function inspectRequest(input: string): {
  ok: boolean;
  steps: string[];
} {
  const steps: string[] = [];
  if (input.length > 4000)
    return { ok: false, steps: ["Request exceeds the 4,000 character limit."] };
  let value: unknown;
  try {
    value = JSON.parse(input);
    steps.push("JSON syntax is valid.");
  } catch {
    return {
      ok: false,
      steps: ["Could not parse JSON. Check quotes, commas and brackets."],
    };
  }
  if (!value || typeof value !== "object" || Array.isArray(value))
    return {
      ok: false,
      steps: [...steps, "The request must be a JSON object."],
    };
  for (const field of ["event", "source", "id"]) {
    if (
      typeof (value as Record<string, unknown>)[field] !== "string" ||
      !(value as Record<string, string>)[field].trim()
    )
      return {
        ok: false,
        steps: [...steps, `“${field}” must be a non-empty string.`],
      };
  }
  steps.push(
    "event, source and id are non-empty strings.",
    "Required field validation passed.",
  );
  return { ok: true, steps };
}
