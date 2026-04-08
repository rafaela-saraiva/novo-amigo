export function normalizeWhatsAppNumber(raw: string): string {
  const digitsOnly = String(raw || "").replace(/\D/g, "");
  const trimmed = digitsOnly.replace(/^0+/, "");

  if (!trimmed) return "";

  // Brasil: se vier com 11 dígitos (DDD + 9 dígitos), prefixa 55
  if (trimmed.length === 11) return `55${trimmed}`;

  return trimmed;
}

export function toWhatsAppLink(raw: string): string | null {
  const normalized = normalizeWhatsAppNumber(raw);
  if (!normalized) return null;
  return `https://wa.me/${normalized}`;
}

