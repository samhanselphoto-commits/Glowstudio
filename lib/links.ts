import type { AspectRatio, ModelName } from "./types";

/**
 * Build a /studio URL that pre-fills the prompt, model, and aspect
 * from Community / Library "Re-use prompt" buttons.
 */
export function reuseHref(input: {
  prompt: string;
  model?: ModelName;
  aspect?: AspectRatio;
}): string {
  const params = new URLSearchParams();
  if (input.prompt) params.set("prompt", input.prompt);
  if (input.model) params.set("model", input.model);
  if (input.aspect) params.set("aspect", input.aspect);
  const qs = params.toString();
  return qs ? `/studio?${qs}` : "/studio";
}
