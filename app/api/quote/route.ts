import { NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing.");

      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured yet.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const {
      fullName,
      businessName,
      phone,
      email,
      businessType,
      categories,
      quantity,
      deliveryLocation,
      requirements,
    } = body;

    if (!fullName || !phone || !businessType || !deliveryLocation) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const categoryList =
      Array.isArray(categories) && categories.length > 0
        ? categories.join(", ")
        : "Not specified";

    const { data, error } = await resend.emails.send({
      from: "KINGSIZE BEVERAGES <onboarding@resend.dev>",
      to: ["kingsleyvalerian6@gmail.com"],
      replyTo: email || undefined,
      subject: `New Wholesale Enquiry — ${
        businessName || fullName
      }`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#f5f7fa;padding:32px;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e5e7eb;">

            <div style="background:#071426;padding:28px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:26px;">
                New Wholesale Enquiry
              </h1>

              <p style="margin:8px 0 0;color:#94a3b8;">
                KINGSIZE BEVERAGES
              </p>
            </div>

            <div style="padding:32px;">

              <h2 style="font-size:18px;color:#071426;margin:0 0 16px;">
                Customer Details
              </h2>

              <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
                <tr>
                  <td style="padding:10px 0;color:#64748b;width:180px;">
                    Full name
                  </td>
                  <td style="padding:10px 0;color:#0f172a;font-weight:600;">
                    ${escapeHtml(fullName)}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#64748b;">
                    Business name
                  </td>
                  <td style="padding:10px 0;color:#0f172a;font-weight:600;">
                    ${escapeHtml(businessName || "Not provided")}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#64748b;">
                    Phone / WhatsApp
                  </td>
                  <td style="padding:10px 0;color:#0f172a;font-weight:600;">
                    ${escapeHtml(phone)}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#64748b;">
                    Email
                  </td>
                  <td style="padding:10px 0;color:#0f172a;">
                    ${escapeHtml(email || "Not provided")}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#64748b;">
                    Business type
                  </td>
                  <td style="padding:10px 0;color:#0f172a;font-weight:600;">
                    ${escapeHtml(businessType)}
                  </td>
                </tr>
              </table>

              <h2 style="font-size:18px;color:#071426;margin:0 0 16px;">
                Order Requirements
              </h2>

              <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
                <tr>
                  <td style="padding:10px 0;color:#64748b;width:180px;">
                    Categories
                  </td>
                  <td style="padding:10px 0;color:#0f172a;">
                    ${escapeHtml(categoryList)}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#64748b;">
                    Estimated quantity
                  </td>
                  <td style="padding:10px 0;color:#0f172a;">
                    ${escapeHtml(quantity || "Not specified")}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#64748b;">
                    Delivery location
                  </td>
                  <td style="padding:10px 0;color:#0f172a;">
                    ${escapeHtml(deliveryLocation)}
                  </td>
                </tr>
              </table>

              <h2 style="font-size:18px;color:#071426;margin:0 0 16px;">
                Additional Requirements
              </h2>

              <div style="background:#f8fafc;border-radius:12px;padding:18px;color:#334155;line-height:1.7;">
                ${escapeHtml(
                  requirements || "No additional requirements provided."
                ).replace(/\n/g, "<br />")}
              </div>

              <div style="margin-top:30px;padding-top:20px;border-top:1px solid #e5e7eb;">
                <p style="margin:0;color:#94a3b8;font-size:13px;">
                  This enquiry was submitted through the KINGSIZE BEVERAGES website.
                </p>
              </div>

            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          message:
            "We could not send your enquiry. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your wholesale enquiry has been sent successfully.",
      id: data?.id,
    });
  } catch (error) {
    console.error("Quote API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}