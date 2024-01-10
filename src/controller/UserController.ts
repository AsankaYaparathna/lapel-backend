// UserController.ts
import { Request, Response } from "express";
import { User } from "../model/User";
import { UserRepo } from "../repository/UserRepo";
import { number } from "zod";
import { generateOTP } from "../utils/Utils";
import axios from "axios";


class UserController {
  async create(req: Request, res: Response) {
    try {
      const SMS_API_BASE_URL = process.env.SMS_API_BASE_URL || "";
      const SMS_API_TOKEN = process.env.SMS_API_TOKEN || "";
      const SMS_OTP_EXP_S = process.env.SMS_OTP_EXP_S || "120";
      const mobileNumber = req.body.mobileNumber;

      const existUser = await new UserRepo().getByMobileCheck(mobileNumber);
      if (!existUser || existUser !== null) {
        const otpCode = generateOTP();
        const response = await axios.post(
          `${SMS_API_BASE_URL}/sms/send`,
          {
            recipient: mobileNumber,
            sender_id: "Lapel",
            message: `Your OTP is ${otpCode}. Do not share this code.`,
          },
          {
            headers: {
              Authorization: `Bearer ${SMS_API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status) {
          const model = new User();
          model.fullName = req.body.fullName;
          model.mobileNumber = req.body.mobileNumber;
          model.email = req.body.email;
          model.password = req.body.password;
          model.otp = otpCode;
          model.isMobileVerified = false;

          await new UserRepo().create(model);

          res
            .status(200)
            .json({
              status: true,
              message: "User created successfully! | OTP Send",
              data: User,
            });
        } else {
          res
            .status(200)
            .json({
              status: false,
              message: "Failed to send OTP!",
              data: null,
            });
        }
      }
      else{
        res
            .status(200)
            .json({
              status: false,
              message: "Failed to create User!| User with this mobile number already exists!",
              data: null,
            });
      }
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async resendOtp(req: Request, res: Response) {
    try {
      const SMS_API_BASE_URL = process.env.SMS_API_BASE_URL || "";
      const SMS_API_TOKEN = process.env.SMS_API_TOKEN || "";
      const SMS_OTP_EXP_S = process.env.SMS_OTP_EXP_S || "120";
      const mobileNumber = req.body.mobileNumber;

      const existUser = await new UserRepo().getByMobileCheck(mobileNumber);
      if (existUser && !existUser.isMobileVerified) {
        const otpCode = generateOTP();
        const response = await axios.post(
          `${SMS_API_BASE_URL}/sms/send`,
          {
            recipient: mobileNumber,
            sender_id: "Lapel",
            message: `Your OTP is ${otpCode}. Do not share this code.`,
          },
          {
            headers: {
              Authorization: `Bearer ${SMS_API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status) {
          const model = new User();
          model.mobileNumber = req.body.mobileNumber;
          model.otp = otpCode;

          await new UserRepo().updateOtp(model);

          res
            .status(200)
            .json({
              status: true,
              message: "OTP code is resend",
              data: User,
            });
        } else {
          res
            .status(200)
            .json({
              status: false,
              message: "Failed to send OTP!",
              data: null,
            });
        }
      }
      else{
        res
            .status(200)
            .json({
              status: false,
              message: "Otp code is already verifyied",
              data: null,
            });
      }
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async verifyMobile(req: Request, res: Response) {
    try {
      const result = await new UserRepo().getOtpByUserMobile(
        req.body.mobileNumber
      );
      if (result) {
        const otpVerificationResult = result.otp.toString().match(req.body.otp);
        if (otpVerificationResult) {
          await new UserRepo().updateMobileVerificationStatus(result.id, true);
          res
            .status(200)
            .json({
              status: true,
              message: "Mobile number verified successfully!",
              data: null,
            });
        } else {
          res
            .status(200)
            .json({
              status: false,
              message: "Failed to verify OTP!",
              data: null,
            });
        }
      } else {
        res
          .status(200)
          .json({
            status: false,
            message: "No OTP found for the given User!",
            data: null,
          });
      }
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await new UserRepo().login( req.body.mobileNumber, req.body.password );
      if (result) {
        res
          .status(200)
          .json({
            status: true,
            message: "Login successfully!",
            data: req.body.mobileNumber,
          });
      } else {
        res
          .status(200)
          .json({ status: false, message: "Login Failed!", data: null });
      }
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const modal = new User();
      modal.fullName = req.body.fullName;
      modal.mobileNumber = req.body.mobileNumber;
      modal.email = req.body.email;

      await new UserRepo().update(modal);

      res.status(200).json({
        status: true,
        message: "Successfuly!",
        data: modal,
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: "" + err,
        data: null,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      let mid = parseInt(req.params["id"]);
      await new UserRepo().delete(mid);

      res.status(200).json({
        status: true,
        message: "Successfuly!",
        data: mid,
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: "" + err,
        data: null,
      });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const modal = await new UserRepo().get();

      res.status(200).json({
        status: true,
        message: "Successfuly!",
        data: modal,
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: "" + err,
        data: null,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      let mid = parseInt(req.params["id"]);
      const modal = await new UserRepo().getById(mid);

      res.status(200).json({
        status: true,
        message: "Successfuly!",
        data: modal,
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: "" + err,
        data: null,
      });
    }
  }

  async getByMobile(req: Request, res: Response) {
    try {
      let mobile = req.params["mobile"];
      const modal = await new UserRepo().getByMobile(mobile);

      res.status(200).json({
        status: true,
        message: "Successfuly!",
        data: modal,
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: "" + err,
        data: null,
      });
    }
  }
}

export default new UserController();
