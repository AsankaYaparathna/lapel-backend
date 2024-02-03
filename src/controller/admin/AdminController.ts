import { Request, Response } from "express";
import axios from "axios";
import { UserRepo } from "../../repository/user/UserRepo";
import { AdminRepo } from "../../repository/admin/AdminRepo";
import { Admin } from "../../model/Admin/Admin";

class AdminController {

  async login(req: Request, res: Response) {
    try {
      const result = await new AdminRepo().login(
        req.body.userName,
        req.body.password
      );
      if (result) {
        res.status(200).json({
          status: true,
          message: "Login successfully!",
          data: req.body.userName,
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

  async create(req: Request, res: Response) {
    try {
      const result = await new AdminRepo().create(req.body as Admin)
      if (result) {
        res.status(200).json({
          status: true,
          message: "Admin Cration successfully!",
          data: req.body.userName,
        });
      } else {
        res
          .status(200)
          .json({ status: false, message: "Admin Creation Failed!", data: null });
      }
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }
}

export default new AdminController();
