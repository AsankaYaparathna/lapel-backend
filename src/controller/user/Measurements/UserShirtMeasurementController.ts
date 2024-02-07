import { Request, Response } from "express";
import { UserShirtMeasurementRepo } from "../../../repository/user/Measurements/UserShirtMeasurementRepo";

class UserShirtMeasurementController {

  //shirt - body
  async bodyMeasurementCreate(req: Request, res: Response) {
    try {
      await new UserShirtMeasurementRepo().shirtBodyMeasurementCreate(req.body);
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
      const status = await new UserShirtMeasurementRepo().shirtBodyMeasurementUpdate(model);
      if(status){ res.status(200).json({ status: true, message: "User Measurement update successfully!", data: null });}
      else{ res.status(200).json({ status: false, message: "Failed to update!", data: null }); }
      
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async bodyMeasurementDelete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const status = await new UserShirtMeasurementRepo().shirtBodyMeasurementDelete(id);
      if(status){ res.status(200).json({ status: true, message: "User Measurement delete successfully!", data: null });}
      else{ res.status(200).json({ status: false, message: "Failed to delete!", data: null }); }
 
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async bodyMeasurementGetById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const data = await new UserShirtMeasurementRepo().getShirtBodyMeasurementById(id);
      res.status(200).json({
        status: data ? true : false,
        message: data ? "successfully!" : "Data Not Found!",
        data: data,
      });
      
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }


  //shirt - standerd
  async standardSizecreate(req: Request, res: Response) {
    try {
      await new UserShirtMeasurementRepo().shirtStanSizeMeasurementCreate(req.body);
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
      
      const status = await new UserShirtMeasurementRepo().updateShirtStandardSize(model);
      if(status){ res.status(200).json({ status: true, message: "User Measurement update successfully!", data: null });}
      else{ res.status(200).json({ status: false, message: "Failed to update!", data: null }); }
 
      
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async standardSizeGetById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const data = await new UserShirtMeasurementRepo().getShirtStandardSizeById(id);
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
      
      const status = await new UserShirtMeasurementRepo().standardSizeDelete(id);
      if(status){ res.status(200).json({ status: true, message: "User Measurement delete successfully!", data: null });}
      else{ res.status(200).json({ status: false, message: "Failed to delete!", data: null }); }

    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  //shirt - copy fav
  async copyFavurementCreate(req: Request, res: Response) {
    try {
      await new UserShirtMeasurementRepo().shirtCopyFavurementCreate(req.body);
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
      
      const status = await new UserShirtMeasurementRepo().updateShirtCopyFav(model);
      if(status){ res.status(200).json({ status: true, message: "User Measurement update successfully!", data: null });}
      else{ res.status(200).json({ status: false, message: "Failed to update!", data: null }); }
      
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async copyFavGetById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const data = await new UserShirtMeasurementRepo().getShirtCopyFavById(id);
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
      const status = await new UserShirtMeasurementRepo().deleteShirtCopyFav(id);
      if(status){ res.status(200).json({ status: true, message: "User Measurement delete successfully!", data: null });}
      else{ res.status(200).json({ status: false, message: "Failed to delete!", data: null }); }
 
      
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

}

export default new UserShirtMeasurementController();
