import { Request, Response } from "express";
import { UserTrouserMeasurementRepo } from "../../../repository/user/Measurements/UserTrouserMeasurementRepo";

class UserTrouserMeasurementController {

  //body
  async bodyMeasurementCreate(req: Request, res: Response) {
    try {
      await new UserTrouserMeasurementRepo().bodyMeasurementCreate(req.body);
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
      const status = await new UserTrouserMeasurementRepo().bodyMeasurementUpdate(model);
      if(status){ res.status(200).json({ status: true, message: "User Measurement update successfully!", data: null });}
      else{ res.status(200).json({ status: false, message: "Failed to update!", data: null }); }
      
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async bodyMeasurementDelete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const status = await new UserTrouserMeasurementRepo().bodyMeasurementDelete(id);
      if(status){ res.status(200).json({ status: true, message: "User Measurement delete successfully!", data: null });}
      else{ res.status(200).json({ status: false, message: "Failed to delete!", data: null }); }
 
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async bodyMeasurementGetById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      
      const data = await new UserTrouserMeasurementRepo().bodyMeasurementGetById(id);
      res.status(200).json({
        status: data ? true : false,
        message: data ? "successfully!" : "Data Not Found!",
        data: data,
      });
      
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }


  //standerd
  async standardSizecreate(req: Request, res: Response) {
    try {
      await new UserTrouserMeasurementRepo().standardSizecreate(req.body);
      res.status(200).json({
        status: true,
        message: "User Measurement creation successfully!",
        data: null,
      });
      
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async standardSizeUpdate(req: Request, res: Response) {
    try {
      const model = req.body;
      model.id = parseInt(req.params["id"]);;
      
      const status = await new UserTrouserMeasurementRepo().standardSizeUpdate(model);
      if(status){ res.status(200).json({ status: true, message: "User Measurement update successfully!", data: null });}
      else{ res.status(200).json({ status: false, message: "Failed to update!", data: null }); }
 
      
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async standardSizeGetById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const data = await new UserTrouserMeasurementRepo().standardSizeGetById(id);
      res.status(200).json({
        status: data ? true : false,
        message: data ? "successfully!" : "Data Not Found!",
        data: data,
      });
      
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async standardSizeDelete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      
      const status = await new UserTrouserMeasurementRepo().standardSizeDelete(id);
      if(status){ res.status(200).json({ status: true, message: "User Measurement delete successfully!", data: null });}
      else{ res.status(200).json({ status: false, message: "Failed to delete!", data: null }); }

    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  //shirt - copy fav
  async copyFavurementCreate(req: Request, res: Response) {
    try {
      await new UserTrouserMeasurementRepo().copyFavurementCreate(req.body);
      res.status(200).json({
        status: true,
        message: "User Measurement creation successfully!",
        data: null,
      });
      
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async copyFavUpdate(req: Request, res: Response) {
    try {
      const model = req.body;
      model.id = parseInt(req.params["id"]);;
      
      const status = await new UserTrouserMeasurementRepo().copyFavUpdate(model);
      if(status){ res.status(200).json({ status: true, message: "User Measurement update successfully!", data: null });}
      else{ res.status(200).json({ status: false, message: "Failed to update!", data: null }); }
      
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async copyFavGetById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const data = await new UserTrouserMeasurementRepo().copyFavGetById(id);
      res.status(200).json({
        status: data ? true : false,
        message: data ? "successfully!" : "Data Not Found!",
        data: data,
      });
      
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async copyFavDelete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const status = await new UserTrouserMeasurementRepo().copyFavDelete(id);
      if(status){ res.status(200).json({ status: true, message: "User Measurement delete successfully!", data: null });}
      else{ res.status(200).json({ status: false, message: "Failed to delete!", data: null }); }
 
      
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

}

export default new UserTrouserMeasurementController();
