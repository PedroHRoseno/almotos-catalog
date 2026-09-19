export const COMPANY = {
  tradeName: "AL Motos",
  legalName: "ROSENO E SILVA COMERCIO DE VEICULOS LTDA",
  cnpj: "68.967.245/0001-26",
  street: "R Visconde de Inhauma, 725",
  neighborhood: "Mauricio de Nassau",
  city: "Caruaru - PE",
  cep: "55.012-010",
  email: "ALMOTOSCARUARU@GMAIL.COM",
  phone: "(81) 92141-6069",
} as const;

/** tel: da ficha. O botão WhatsApp do catálogo usa NEXT_PUBLIC_WHATSAPP_URL. */

export const COMPANY_LINKS = {
  email: `mailto:${COMPANY.email.toLowerCase()}`,
  phone: "tel:+5581921416069",
  maps: "https://maps.app.goo.gl/xWMXn8PEC9ZRkjkHA",
} as const;
