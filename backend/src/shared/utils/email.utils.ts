import nodemailer from 'nodemailer';
import { env } from '../../config/env';
import { logError, logInfo } from '../../config/logger';
import { APP_INFO } from '@yene/shared';

// ─── Email Options Interface ──────────────────────────────────────────────────
export interface IEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// ─── Create Transporter ───────────────────────────────────────────────────────
const createTransporter = () => {
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: env.NODE_ENV === 'production',
    },
  });
};

// ─── Base Email Template ──────────────────────────────────────────────────────
const baseTemplate = (content: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${APP_INFO.NAME}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5; color: #18181b; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #E85D04 0%, #F48C06 100%); padding: 32px 40px; text-align: center; }
    .header h1 { color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { color: rgba(255,255,255,0.85); font-size: 14px; margin-top: 4px; }
    .body { padding: 40px; }
    .body h2 { font-size: 22px; font-weight: 700; color: #18181b; margin-bottom: 16px; }
    .body p { font-size: 15px; line-height: 1.7; color: #52525b; margin-bottom: 16px; }
    .otp-box { background: #fff7ed; border: 2px dashed #E85D04; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0; }
    .otp-code { font-size: 42px; font-weight: 800; color: #E85D04; letter-spacing: 12px; font-family: 'Courier New', monospace; }
    .otp-expiry { font-size: 13px; color: #71717a; margin-top: 8px; }
    .btn { display: inline-block; background: linear-gradient(135deg, #E85D04 0%, #F48C06 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 15px; margin: 16px 0; }
    .divider { border: none; border-top: 1px solid #e4e4e7; margin: 24px 0; }
    .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 4px; font-size: 13px; color: #78350f; margin: 16px 0; }
    .footer { background: #f4f4f5; padding: 24px 40px; text-align: center; }
    .footer p { font-size: 12px; color: #71717a; line-height: 1.6; }
    .footer a { color: #E85D04; text-decoration: none; }
    .social-links { margin: 12px 0; }
    .social-links a { display: inline-block; margin: 0 8px; color: #E85D04; font-size: 12px; text-decoration: none; }
    .order-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f4f4f5; font-size: 14px; }
    .order-total { display: flex; justify-content: space-between; padding: 12px 0; font-weight: 700; font-size: 16px; color: #E85D04; }
    .status-badge { display: inline-block; background: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🍽️ ${APP_INFO.NAME}</h1>
      <p>${APP_INFO.TAGLINE}</p>
    </div>
    <div class="body">
      ${content}
    </div>
    <div class="footer">
      <div class="social-links">
        <a href="${APP_INFO.FACEBOOK_URL}">Facebook</a>
        <a href="${APP_INFO.INSTAGRAM_URL}">Instagram</a>
        <a href="${APP_INFO.TELEGRAM_URL}">Telegram</a>
      </div>
      <p>
        © ${new Date().getFullYear()} ${APP_INFO.NAME}. All rights reserved.<br/>
        <a href="${APP_INFO.WEBSITE}">${APP_INFO.WEBSITE}</a> |
        <a href="mailto:${APP_INFO.SUPPORT_EMAIL}">${APP_INFO.SUPPORT_EMAIL}</a>
      </p>
      <p style="margin-top: 8px;">
        If you did not request this email, please ignore it or
        <a href="mailto:${APP_INFO.SUPPORT_EMAIL}">contact support</a>.
      </p>
    </div>
  </div>
</body>
</html>
`;

// ─── Send Email ───────────────────────────────────────────────────────────────
export const sendEmail = async (options: IEmailOptions): Promise<void> => {
  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"${APP_INFO.NAME}" <${env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ''),
    });

    logInfo('Email sent successfully', {
      to: options.to,
      subject: options.subject,
    });
  } catch (error) {
    logError('Failed to send email', error);
    throw new Error(`Failed to send email: ${(error as Error).message}`);
  }
};

// ─── Send OTP Email ───────────────────────────────────────────────────────────
export const sendOtpEmail = async (
  to: string,
  firstName: string,
  otp: string,
  purpose: string,
): Promise<void> => {
  const purposeText =
    {
      email_verification: 'verify your email address',
      phone_verification: 'verify your phone number',
      password_reset: 'reset your password',
      two_factor_auth: 'complete your login',
    }[purpose] || 'complete your request';

  const content = `
    <h2>Hello, ${firstName}! 👋</h2>
    <p>You requested to ${purposeText}. Use the OTP code below to proceed.</p>
    <div class="otp-box">
      <div class="otp-code">${otp}</div>
      <div class="otp-expiry">⏱️ This code expires in 10 minutes</div>
    </div>
    <div class="warning">
      ⚠️ Never share this code with anyone. ${APP_INFO.NAME} will never ask for your OTP.
    </div>
    <p>If you did not request this code, please ignore this email and your account will remain secure.</p>
  `;

  await sendEmail({
    to,
    subject: `${otp} is your ${APP_INFO.NAME} verification code`,
    html: baseTemplate(content),
  });
};

// ─── Send Welcome Email ───────────────────────────────────────────────────────
export const sendWelcomeEmail = async (to: string, firstName: string): Promise<void> => {
  const content = `
    <h2>Welcome to ${APP_INFO.NAME}, ${firstName}! 🎉</h2>
    <p>We are thrilled to have you on board. ${APP_INFO.NAME} connects you with the best restaurants across Ethiopia for fast, reliable food delivery.</p>
    <p>Here is what you can do:</p>
    <ul style="padding-left: 20px; color: #52525b; line-height: 2;">
      <li>🍔 Browse hundreds of restaurants near you</li>
      <li>🛒 Order your favorite meals in seconds</li>
      <li>📍 Track your delivery in real-time</li>
      <li>💳 Pay with Telebirr, Chapa, CBE Birr or Cash</li>
      <li>⭐ Rate and review your experience</li>
    </ul>
    <br/>
    <a href="${env.FRONTEND_URL}" class="btn">Start Ordering Now</a>
    <hr class="divider" />
    <p>Need help? Contact us at <a href="mailto:${APP_INFO.SUPPORT_EMAIL}" style="color: #E85D04;">${APP_INFO.SUPPORT_EMAIL}</a> or call us at ${APP_INFO.SUPPORT_PHONE}.</p>
  `;

  await sendEmail({
    to,
    subject: `Welcome to ${APP_INFO.NAME} — Let's get you fed! 🍽️`,
    html: baseTemplate(content),
  });
};

// ─── Send Password Reset Email ────────────────────────────────────────────────
export const sendPasswordResetEmail = async (
  to: string,
  firstName: string,
  resetToken: string,
): Promise<void> => {
  const resetUrl = `${env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`;

  const content = `
    <h2>Reset Your Password 🔐</h2>
    <p>Hello ${firstName}, we received a request to reset your ${APP_INFO.NAME} account password.</p>
    <p>Click the button below to reset your password. This link expires in <strong>1 hour</strong>.</p>
    <a href="${resetUrl}" class="btn">Reset My Password</a>
    <hr class="divider" />
    <p>Or copy and paste this link into your browser:</p>
    <p style="word-break: break-all; font-size: 12px; color: #71717a;">${resetUrl}</p>
    <div class="warning">
      ⚠️ If you did not request a password reset, please ignore this email. Your password will not be changed.
    </div>
  `;

  await sendEmail({
    to,
    subject: `Reset your ${APP_INFO.NAME} password`,
    html: baseTemplate(content),
  });
};

// ─── Send Order Confirmation Email ────────────────────────────────────────────
export const sendOrderConfirmationEmail = async (
  to: string,
  firstName: string,
  orderDetails: {
    orderNumber: string;
    restaurantName: string;
    items: { name: string; quantity: number; price: number }[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    estimatedDeliveryTime: number;
    deliveryAddress: string;
  },
): Promise<void> => {
  const itemsHtml = orderDetails.items
    .map(
      (item) => `
      <div class="order-item">
        <span>${item.quantity}x ${item.name}</span>
        <span>${item.price * item.quantity} ETB</span>
      </div>
    `,
    )
    .join('');

  const content = `
    <h2>Order Confirmed! 🎊</h2>
    <p>Hello ${firstName}, your order has been placed successfully.</p>
    <p><strong>Order #${orderDetails.orderNumber}</strong> from <strong>${orderDetails.restaurantName}</strong></p>
    <hr class="divider" />
    ${itemsHtml}
    <div class="order-item">
      <span>Subtotal</span>
      <span>${orderDetails.subtotal} ETB</span>
    </div>
    <div class="order-item">
      <span>Delivery Fee</span>
      <span>${orderDetails.deliveryFee} ETB</span>
    </div>
    <div class="order-total">
      <span>Total</span>
      <span>${orderDetails.total} ETB</span>
    </div>
    <hr class="divider" />
    <p>📍 Delivering to: <strong>${orderDetails.deliveryAddress}</strong></p>
    <p>⏱️ Estimated delivery time: <strong>${orderDetails.estimatedDeliveryTime} minutes</strong></p>
    <br/>
    <a href="${env.FRONTEND_URL}/orders" class="btn">Track My Order</a>
  `;

  await sendEmail({
    to,
    subject: `Order #${orderDetails.orderNumber} confirmed — ${APP_INFO.NAME}`,
    html: baseTemplate(content),
  });
};

// ─── Send Order Delivered Email ───────────────────────────────────────────────
export const sendOrderDeliveredEmail = async (
  to: string,
  firstName: string,
  orderNumber: string,
): Promise<void> => {
  const content = `
    <h2>Your Order Has Been Delivered! 🎉</h2>
    <p>Hello ${firstName}, your order <strong>#${orderNumber}</strong> has been delivered successfully.</p>
    <p>We hope you enjoy your meal! Please take a moment to rate your experience.</p>
    <br/>
    <a href="${env.FRONTEND_URL}/orders" class="btn">Rate Your Order</a>
    <hr class="divider" />
    <p>Thank you for choosing ${APP_INFO.NAME}. We look forward to serving you again!</p>
  `;

  await sendEmail({
    to,
    subject: `Your order #${orderNumber} has been delivered — ${APP_INFO.NAME}`,
    html: baseTemplate(content),
  });
};

// ─── Send Order Cancelled Email ───────────────────────────────────────────────
export const sendOrderCancelledEmail = async (
  to: string,
  firstName: string,
  orderNumber: string,
  reason: string,
): Promise<void> => {
  const content = `
    <h2>Order Cancelled 😔</h2>
    <p>Hello ${firstName}, your order <strong>#${orderNumber}</strong> has been cancelled.</p>
    <p><strong>Reason:</strong> ${reason}</p>
    <p>If you paid online, your refund will be processed within 3-5 business days.</p>
    <br/>
    <a href="${env.FRONTEND_URL}/restaurants" class="btn">Order Again</a>
    <hr class="divider" />
    <p>We are sorry for the inconvenience. If you have any questions, please contact us at <a href="mailto:${APP_INFO.SUPPORT_EMAIL}" style="color: #E85D04;">${APP_INFO.SUPPORT_EMAIL}</a>.</p>
  `;

  await sendEmail({
    to,
    subject: `Order #${orderNumber} cancelled — ${APP_INFO.NAME}`,
    html: baseTemplate(content),
  });
};

// ─── Send Restaurant Approved Email ──────────────────────────────────────────
export const sendRestaurantApprovedEmail = async (
  to: string,
  ownerName: string,
  restaurantName: string,
): Promise<void> => {
  const content = `
    <h2>Your Restaurant Has Been Approved! 🎊</h2>
    <p>Hello ${ownerName}, congratulations! <strong>${restaurantName}</strong> has been verified and is now live on ${APP_INFO.NAME}.</p>
    <p>Customers can now find and order from your restaurant. Here is what to do next:</p>
    <ul style="padding-left: 20px; color: #52525b; line-height: 2;">
      <li>✅ Complete your restaurant profile</li>
      <li>🍽️ Add your menu items with photos</li>
      <li>⏰ Set your opening hours</li>
      <li>📦 Start accepting orders</li>
    </ul>
    <br/>
    <a href="${env.FRONTEND_URL}/restaurant/dashboard" class="btn">Go to Dashboard</a>
  `;

  await sendEmail({
    to,
    subject: `${restaurantName} is now live on ${APP_INFO.NAME}! 🎉`,
    html: baseTemplate(content),
  });
};

// ─── Send Restaurant Rejected Email ──────────────────────────────────────────
export const sendRestaurantRejectedEmail = async (
  to: string,
  ownerName: string,
  restaurantName: string,
  reason: string,
): Promise<void> => {
  const content = `
    <h2>Restaurant Application Update</h2>
    <p>Hello ${ownerName}, we have reviewed your application for <strong>${restaurantName}</strong>.</p>
    <p>Unfortunately, we are unable to approve your restaurant at this time.</p>
    <p><strong>Reason:</strong> ${reason}</p>
    <p>You are welcome to reapply after addressing the issues mentioned above. If you have questions, please contact our support team.</p>
    <br/>
    <a href="mailto:${APP_INFO.SUPPORT_EMAIL}" class="btn">Contact Support</a>
  `;

  await sendEmail({
    to,
    subject: `Update on your ${APP_INFO.NAME} restaurant application`,
    html: baseTemplate(content),
  });
};

// ─── Send Account Suspended Email ────────────────────────────────────────────
export const sendAccountSuspendedEmail = async (
  to: string,
  firstName: string,
  reason: string,
): Promise<void> => {
  const content = `
    <h2>Account Suspended</h2>
    <p>Hello ${firstName}, your ${APP_INFO.NAME} account has been suspended.</p>
    <p><strong>Reason:</strong> ${reason}</p>
    <p>If you believe this is a mistake, please contact our support team immediately.</p>
    <br/>
    <a href="mailto:${APP_INFO.SUPPORT_EMAIL}" class="btn">Contact Support</a>
  `;

  await sendEmail({
    to,
    subject: `Your ${APP_INFO.NAME} account has been suspended`,
    html: baseTemplate(content),
  });
};
