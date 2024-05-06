import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "mail@reside.services",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "mail@reside.services",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
  });
};

export const sendWatchlistConfirmationEmail = async (
  email: string,
  listingAddress: string
) => {
  const cancelLink = `${domain}/roommates`;

  await resend.emails.send({
    from: "mail@reside.services",
    to: email,
    subject: "New listing added to roommate watchlist",
    html: `<p>You have been successfully added to the roommate watchlist for ${listingAddress}.<br/>Click <a href="${cancelLink}">here</a> if you wish to remove yourself from the watchlist.</p>`,
  });
};

export const sendRoommateInterestEmail = async (
  emails: string[],
  listingId: string,
  listingAddress: string
) => {
  const listingLink = `${domain}/listings/${listingId}`;
  const cancelLink = `${domain}/roommates`;

  await resend.emails.send({
    from: "mail@reside.services",
    to: [...emails],
    subject: "Someone else is interested in this listing",
    html: `<p>More than one individual is interested at <a href="${listingLink}">${listingAddress}</a>. In this email, you will see others attached to the email that are interested in the same listing. Feel free to start dicussing new roommate opportunities! Good luck!<br/>Click <a href="${cancelLink}">here</a> if you wish to remove yourself from the watchlist.</p>`,
  });
};
