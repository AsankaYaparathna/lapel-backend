import { Request, Response } from "express";
import { UserFullBodyMeasurementRepo } from "../../../repository/user/Measurements/UserFullBodyMeasurementRepo";

class UserFullBodyMeasurementController {

  //body
  async bodyMeasurementCreate(req: Request, res: Response) {
    try {
      await new UserFullBodyMeasurementRepo().bodyMeasurementCreate(req.body);
      res.status(200).json({
        status: true,
        message: "User Measurement creation successfully!",
        data: null,
      });
      
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async bodyMeasurementUpdate(req: Request, res: Response) {
    try {
      const model = req.body;
      model.id = parseInt(req.params["id"]);;
      const status = await new UserFullBodyMeasurementRepo().bodyMeasurementUpdate(model);
      if(status){ res.status(200).json({ status: true, message: "User Measurement update successfully!", data: null });}
      else{ res.status(200).json({ status: false, message: "Failed to update!", data: null }); }
      
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async bodyMeasurementDelete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const status = await new UserFullBodyMeasurementRepo().bodyMeasurementDelete(id);
      if(status){ res.status(200).json({ status: true, message: "User Measurement delete successfully!", data: null });}
      else{ res.status(200).json({ status: false, message: "Failed to delete!", data: null }); }
 
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async bodyMeasurementGetById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const data = await new UserFullBodyMeasurementRepo().bodyMeasurementGetById(id);
      res.status(200).json({
        status: data ? true : false,
        message: data ? "successfully!" : "Data Not Found!",
        data: data,
      });
      
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

}

export default new UserFullBodyMeasurementController();
