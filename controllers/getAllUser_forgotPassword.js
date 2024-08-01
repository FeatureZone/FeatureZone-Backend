import { UserModel } from "../models/user_model.js";
import nodemailer from 'nodemailer';
import crypto from "crypto";




export const getAllUsers = async(req, res)=>{
    try {
        const email = req.query.email?.toLowerCase();
    const username = req.query.email?.toLowerCase();

    const filter ={};
    if(email) {
        filter.email= email;
    }
    if(username) {
        filter.username = username;
    }

    const users = await UserModel.find(filter);
    return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json({ message: 'internal server error', error: error.message });
    }

}

// Generate a 6-digit OTP
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
};

export const sendOtpForPasswordReset = async (req, res) => {
    const email = req.body.email?.toLowerCase();

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate an OTP
        const otp = generateOtp();
        const otpExpiration = Date.now() + 300000; // OTP valid for 5 minutes

        // Save the OTP and expiration to the user record
        user.otp = otp;
        user.otpExpires = otpExpiration;
        await user.save();

        // Send the OTP via email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            to: user.email,
            from: 'otp@yourdomain.com',
            subject: 'Your OTP Code for Password Reset',
            text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export const verifyOtpAndResetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if OTP is valid
        if (user.otp !== otp || Date.now() > user.otpExpires) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password and clear OTP fields
        user.password = hashedPassword;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        return res.status(200).json({ message: "Password has been reset successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

