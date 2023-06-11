const { Users } = require("../models");
const { sign } = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const keysecret = process.env.SECRET;

const logIn = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(404).json({
        success: 0,
        message: "User Not Found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.user_password,
      user.user_password
    );

    if (isPasswordValid) {
      user.user_password = undefined;
      // Generate token
      const token = sign({ result: user }, "pos@1234", {
        expiresIn: "3h",
      });
      // Respond with token and user data
      return res.status(200).json({
        success: 1,
        token: token,
        results: user,
      });
    } else {
      return res.status(401).json({
        success: 0,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

const register = async (req, res) => {
  try {
    const { full_name, address, email, mobile_no, user_password } = req.body;
    let { user_role } = req.body;
    if (
      user_role !== "cashier" &&
      user_role !== "storekeeper" &&
      user_role !== "admin"
    ) {
      return res.status(400).json({ error: "Invalid user role" });
    }
    // Encrypt the password
    const encryptedPassword = await bcrypt.hash(user_password, 10);

    // Create the user in the database
    const user = await Users.create({
      full_name,
      address,
      email,
      mobile_no,
      user_role,
      user_password: encryptedPassword, // Store the encrypted password
    });

    sendEmail(email, user_password, user.id);
    console.log(user.id);
    // Pass the user ID to sendEmail function
    return res
      .status(200)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

const sendEmail = async (toEmail, password, userId) => {
  try {
    // Generate a token for password reset link
    const token = jwt.sign({ userId }, process.env.SECRET, {
      expiresIn: "1d",
    });

    // Construct the reset password link
    const resetPasswordLink = `http://localhost:3000/ResetPassword/${userId}/${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "codesfirstecom@gmail.com",
        pass: "itghzohhnwnnscrs",
      },
    });

    const mailOptions = {
      from: "codesfirstecom@gmail.com",
      to: toEmail,
      subject: "Account Created",
      text: `Your account has been created.
      Email: ${toEmail}
      Password: ${password}
      Reset Password Link: ${resetPasswordLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        // Handle the error here, such as logging it or returning an error response
      } else {
        console.log("Email sent:", info.response);
        // Handle the success case here, such as logging it or returning a success response
      }
    });
  } catch (error) {
    console.log("Error sending email:", error);
    // Handle the error here, such as logging it or returning an error response
  }
};
const resetPassword = async (req, res) => {
  console.log(id, token);
  try {
    const validUser = await User.findOne({ _id: id, verifyToken: token });
    const verifyToken = jwt.verify(token, process.env.SECRET);
    if (validUser && verifyToken._id) {
      const hashedPassword = await bcrypt.hash(password, 12);
      validUser.password = hashedPassword;
      await validUser.save();
      res.status(200).json({
        message: "Password updated successfully",
        hashedPassword: hashedPassword,
      });
    } else {
      res.status(401).json({ message: "Invalid user or token" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = { logIn, register, sendEmail, resetPassword };
