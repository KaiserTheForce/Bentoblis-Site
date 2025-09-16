// app/api/order/route.ts
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const order = await req.json();

    // Sécurité minimale & champs requis
    if (
      !order?.customerName ||
      !order?.customerPhone ||
      !order?.date ||
      !order?.time ||
      !order?.shape ||
      !order?.genoise ||
      !order?.creme ||
      !order?.quantity
    ) {
      return Response.json(
        { message: "Champs manquants." },
        { status: 400 }
      );
    }

    // Transport SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    // Email à la pâtissière
    const adminTo = process.env.ORDER_TO!; // ex: bento.bliss91@gmail.com

    const subject = `🍰 Nouvelle commande — ${order.customerName} (${order.date} ${order.time})`;
    const html = renderHtml(order);

    await transporter.sendMail({
      from: `Bento Bliss <${process.env.SMTP_FROM!}>`,
      to: adminTo,
      subject,
      html,
    });

    // Accusé de réception au client
    if (order.customerEmail) {
      await transporter.sendMail({
        from: `Bento Bliss <${process.env.SMTP_FROM!}>`,
        to: order.customerEmail,
        subject: "✅ Nous avons bien reçu votre commande",
        html: renderClientHtml(order),
      });
    }

    return Response.json({ ok: true });
  } catch (e: any) {
    console.error("Order error", e);
    return Response.json(
      { message: e.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}

// -- Templates simples & lisibles

function row(k: string, v: string) {
  return `<tr><td style="padding:4px 8px;color:#6b7280;">${k}</td><td style="padding:4px 8px;"><b>${v}</b></td></tr>`;
}

function renderHtml(o: any) {
  const rec =
    o.reception === "retrait"
      ? "retrait"
      : o.reception === "livraison91"
      ? "livraison (91)"
      : "livraison (hors 91)";

  return `
  <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto;">
    <h2>🍰 Nouvelle commande</h2>
    <table style="border-collapse:collapse;border:1px solid #eee">
      ${row("Nom", o.customerName)}
      ${row("Téléphone", o.customerPhone)}
      ${row("Email", o.customerEmail || "—")}
      ${row("Forme", o.shape)}
      ${row("Génoise", o.genoise)}
      ${row("Crème", o.creme)}
      ${row("Toppings", o.toppings?.length ? o.toppings.join(", ") : "—")}
      ${row("Couleur", o.color)}
      ${row("Inscription", o.inscription || "—")}
      ${row("Couleur insc.", o.inscriptionColor)}
      ${row("Quantité", String(o.quantity))}
      ${row("Réception", rec)}
      ${row("Adresse", o.address || "—")}
      ${row("Date/Heure", `${o.date} • ${o.time}`)}
      ${row("Allergies", o.allergies || "—")}
      ${row("Notes", o.notes || "—")}
    </table>
    <p style="margin-top:12px">
      Sous-total: <b>${fmt(o.subtotal)}</b><br/>
      Urgence: <b>${fmt(o.urgencyFee)}</b><br/>
      Livraison: <b>${fmt(o.deliveryFee)}</b><br/>
      Total: <b>${fmt(o.total)}</b><br/>
      Paiement: <b>${o.payment === "acompte" ? "Acompte (5€ / bento)" : "Total"}</b>
    </p>
  </div>`;
}

function renderClientHtml(o: any) {
  return `
  <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto;">
    <h2>Merci ${o.customerName} 🙏</h2>
    <p>Nous avons bien reçu votre commande Bento Bliss. Voici votre récapitulatif :</p>
    ${renderHtml(o)}
    <p>Nous vous contactons rapidement pour confirmer l’heure exacte.</p>
  </div>`;
}

function fmt(n: number) {
  return `${n.toFixed(2).replace(".", ",")} €`;
}
