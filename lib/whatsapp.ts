// /lib/whatsapp.ts
export type OrderPayload = {
    shape: string;
    genoise: string;
    cream: string;
    toppings: string[];
    qty: number;
    reception: "retrait" | "livraison";
    date: string;
    time: string;
    inscription: string;
    inscriptionColor: string;
    allergies: string;
    subtotal: number;
    rushFee: number;
    payNow: number;
    payLater: number;
  };
  
  // numéro de destination en E.164 (WhatsApp)
  const SHOP_PHONE_E164 = "33749075579"; // 07 49 07 55 79
  
  export function makeWhatsAppUrl(p: OrderPayload) {
    const toppings = p.toppings.length ? p.toppings.join(", ") : "—";
    const dateHeure =
      p.date && p.time ? `${p.date} ${p.time}` : p.date || p.time || "—";
  
    const lines = [
      "Nouvelle commande — Bento Bliss",
      "",
      "Client",
      "(à compléter dans WhatsApp)",
      "",
      "Détails",
      `Forme : ${p.shape}`,
      `Génoise : ${p.genoise}`,
      `Crème : ${p.cream}`,
      `Toppings : ${toppings}`,
      `Quantité : ${p.qty}`,
      `Réception : ${p.reception}`,
      `Date/Heure : ${dateHeure}`,
      "",
      "Personnalisation",
      `Inscription : ${p.inscription || "—"}`,
      `Couleur inscription : ${p.inscriptionColor || "—"}`,
      "",
      "Allergies / précisions",
      p.allergies || "—",
      "",
      "Prix",
      `Sous-total : ${p.subtotal.toFixed(2)} €`,
      `Total : ${ (p.subtotal + p.rushFee).toFixed(2)} €`,
      `À régler maintenant : ${p.payNow.toFixed(2)} € (Acompte 5€/bento)`,
      `À la remise : ${p.payLater.toFixed(2)} €`,
    ];
  
    const text = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${SHOP_PHONE_E164}?text=${text}`;
  }
  