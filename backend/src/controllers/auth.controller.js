import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";

export async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }]
  });

  if(isUserAlreadyExists) {
      return res.status(409).json({
          success: false,
          message: "User with this username or email already exists.",
          err: "User already exists."
      });
  }

  const user = await userModel.create({
      username,
      email,
      password
  });

  await sendEmail({
      to: user.email,
      subject: "Welcome to perplexity",
      html: `<div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0;">

      <div style="background:#1a1a1a;padding:36px 40px 28px;">
        <div style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">perplexity</div>
      </div>

      <div style="padding:40px;">
        <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#1a1a1a;letter-spacing:-0.5px;">Welcome aboard 👋</h1>
        <p style="margin:0 0 20px;font-size:15px;color:#444;line-height:1.7;">
          Your account is all set up and ready to go. We're glad you're here.
        </p>
        <p style="margin:0 0 32px;font-size:15px;color:#444;line-height:1.7;">
          Dive in, explore, and make the most of everything Perplexity has to offer. If you ever need help, our team is just an email away.
        </p>
        <a href="https://yourapp.com" style="display:inline-block;background:#1a1a1a;color:#ffffff;text-decoration:none;padding:13px 28px;border-radius:6px;font-size:14px;font-weight:600;letter-spacing:0.2px;">Get Started →</a>
      </div>

      <div style="padding:24px 40px;border-top:1px solid #f0f0f0;background:#fafafa;">
        <p style="margin:0;font-size:12px;color:#999;line-height:1.6;">
          You're receiving this because you created an account on Perplexity.<br>
          © 2024 Perplexity. All rights reserved.
        </p>
      </div>
  </div>`});

  // mongoose object => reguler object
  const userObj = user.toObject();
  delete userObj.password;

  res.status(201).json({
    success: true,
    message: "User registered",
    user: userObj
  });
}