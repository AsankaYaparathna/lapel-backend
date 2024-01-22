import { Request, Response } from "express";
import { User } from "../model/Customer/User";
import { UserRepo } from "../repository/UserRepo";
import { generateCustomerId, generateOTP } from "../utils/Utils";
import axios from "axios";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const {
        SMS_API_BASE_URL = "",
        SMS_API_TOKEN = "",
        SMS_OTP_EXP_S = "120",
      } = process.env;
      const { mobileNumber, fullName, email, password } = req.body;

      const userRepo = new UserRepo();
      const existUser = await userRepo.getByMobileCheck(mobileNumber);

      
      if (existUser) {
        return res.status(200).json({
          status: false,
          message:
            "Failed to create User!| User with this mobile number already exists!",
          data: null,
        });
      }

      const otpCode = generateOTP();
      const lastUser = await User.findOne({
        order: [['createdAt', 'DESC']], // Order by 'createdAt' column in descending order
      }) as User;
      const customerId = await  generateCustomerId(lastUser);
      
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${SMS_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      };

      const smsPayload = {
        recipient: mobileNumber,
        sender_id: "Lapel",
        message: `LAPEL\nCustomer Id : ${customerId}\nYour OTP is ${otpCode}\nDo not share this code.`,
      };

      const response = await axios.post(
        `${SMS_API_BASE_URL}/sms/send`,
        smsPayload,
        axiosConfig
      );

      if (response.status) {
        const model = new User();
        model.fullName = fullName;
        model.mobileNumber = mobileNumber;
        model.email = email;
        model.password = password;
        model.otp = otpCode;
        model.isMobileVerified = false;
        model.customerId = customerId;
        model.isActive = true;


        await userRepo.create(model);

        res.status(200).json({
          status: true,
          message: "User created successfully! | OTP Send",
          data: null,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Failed to send OTP!",
          data: null,
        });
      }
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async forgetPasswordOtpSend(req: Request, res: Response) {
    try {
      const { SMS_API_BASE_URL = "", SMS_API_TOKEN = "", SMS_OTP_EXP_S = "120", } = process.env;
      const { mobileNumber } = req.body;
      const userRepo = new UserRepo();
      const existUser = await userRepo.getByMobileCheck(mobileNumber);

      if (!existUser) {
        return res.status(200).json({
          status: false,
          message: "Failed!| User with this mobile number does not exists!",
          data: null,
        });
      }

      const otpCode = generateOTP();
      const axiosConfig = {
        headers: { Authorization: `Bearer ${SMS_API_TOKEN}`, "Content-Type": "application/json" }};

      const smsPayload = {
        recipient: mobileNumber,
        sender_id: "Lapel",
        message: `LAPEL\nCustomer Id : ${existUser.customerId}\nYour OTP is ${otpCode}\nDo not share this code.`,
      };

      const response = await axios.post(
        `${SMS_API_BASE_URL}/sms/send`,
        smsPayload,
        axiosConfig
      );

      if (response.status) {
        existUser.otp = otpCode;
        existUser.isMobileVerified = false;
        await existUser.save();

        res.status(200).json({
          status: true,
          message: "Forget Password successfully! | OTP Send",
          data: null,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Failed to send OTP!",
          data: null,
        });
      }
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async forgetPassword(req: Request, res: Response) {
    try {
      const { mobileNumber, password, otp } = req.body;

      const userRepo = new UserRepo();
      const existUser = await userRepo.getByMobileCheck(mobileNumber);

      
      if (!existUser) {
        return res.status(200).json({
          status: false,
          message:
            "Failed!| User with this mobile number does not exists!",
          data: null,
        });
      }
      
      const model = new User();
        model.mobileNumber = mobileNumber;
        model.password = password;
        model.otp = otp;


        await userRepo.forgetPassword(model);

        res.status(200).json({
          status: true,
          message: "Forget Password successfully!",
          data: null,
        });
     
      
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

          res.status(200).json({
            status: true,
            message: "OTP code is resend",
            data: User,
          });
        } else {
          res.status(200).json({
            status: false,
            message: "Failed to send OTP!",
            data: null,
          });
        }
      } else {
        res.status(200).json({
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
          res.status(200).json({
            status: true,
            message: "Mobile number verified successfully!",
            data: null,
          });
        } else {
          res.status(200).json({
            status: false,
            message: "Failed to verify OTP!",
            data: null,
          });
        }
      } else {
        res.status(200).json({
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
      const result = await new UserRepo().login(
        req.body.mobileNumber,
        req.body.password
      );
      if (result) {
        res.status(200).json({
          status: true,
          message: "Login successfully!",
          data: req.body.mobileNumber,
        });
      } else {
        res
          .status(200)
          .json({ status: false, message: "Login Failed! Password is incorrect", data: null });
      }
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const mobile = req.params["id"];
      const modal = new User();
      modal.fullName = req.body.fullName;
      modal.mobileNumber = mobile;
      modal.email = req.body.email;

      const user = await new UserRepo().update(modal);

      res.status(200).json({
        status: user? true : false,
        message: user? "Successfully!" : "Data Not Found!",
        data: user? modal : null,
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
      const modal = await new UserRepo().delete(mid);

      res.status(200).json({
        status: modal? true:false,
        message: modal? "Successfully!":"Data Not Found!",
        data: modal? mid:null,
      });

    } catch (err) {
      res.status(400).json({
        status: false,
        message: "" + err,
        data: null,
      });
    }
  }

  async deleteByMobile(req: Request, res: Response) {
    try {
      let mobile = req.params["id"];
      const user = await new UserRepo().getByMobileCheck(mobile);
      if(user){
        const modal = await new UserRepo().delete(user.id);

        res.status(200).json({
          status: modal? true:false,
          message: modal? "Successfully!":"Data Not Found!",
          data: modal? mobile : null,
        });
      }
      else{
        res.status(200).json({
          status: false,
          message: "Data Not Found!",
          data: mobile,
        });
      }
      

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
        message: "Successfully!",
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
        status: modal? true:false,
        message: modal? "Successfully!":"Data Not Found!",
        data: modal? modal:null,
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
      let mobile = req.params["id"];
      const modal = await new UserRepo().getByMobileCheck(mobile);

      res.status(200).json({
        status: modal? true:false,
        message: modal? "Successfully!":"Data Not Found!",
        data: modal? modal:null,
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
