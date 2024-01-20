import { Request, Response } from "express";
import axios from "axios";
import { ShowroomRepo } from "../../repository/wearhouse/ShowroomRepo";
import { Showroom } from "../../model/Warehouse/Showroom/Showroom";

class UserController {
    async create(req: Request, res: Response) {
        try {
          await new ShowroomRepo().create(req.body);
          res.status(200).json({
            status: true,
            message: "successfully!",
            data: null,
          });
        } catch (err) {
          res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
  
    async update(req: Request, res: Response) {
      try {
        const modal = req.body;
        modal.id = parseInt(req.params["id"], 10);
        const user = await new ShowroomRepo().update(modal);
        res.status(200).json({
          status: user ? true : false,
          message: user ? "Successfully!" : "Data Not Found!",
          data: user ? modal : null,
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
        let id = parseInt(req.params["id"]);
        const modal = await new ShowroomRepo().delete(id);
  
        res.status(200).json({
          status: modal ? true : false,
          message: modal ? "Successfully!" : "Data Not Found!",
          data: modal ? id : null,
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
        const modal = await new ShowroomRepo().get();
  
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
        const modal = await new ShowroomRepo().getById(mid);
  
        res.status(200).json({
          status: modal ? true : false,
          message: modal ? "Successfully!" : "Data Not Found!",
          data: modal ? modal : null,
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
