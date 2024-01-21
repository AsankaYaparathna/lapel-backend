import { Request, Response } from "express";
import { CategoryType } from "../../model/Common/Category/CategoryType";
import { Category } from "../../model/Common/Category/Category";
import { MaterialRepo } from "../../repository/material/MaterialRepo";
import { FabricRepo } from "../../repository/material/FabricRepo";

class MaterialController {
    
    //Fabric
    async createFabric(req: Request, res: Response) {
        try {
            await new FabricRepo().create(req.body);
            res.status(200).json({ status: true, message: "successfully!", data: null });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getFabric(req: Request, res: Response) {
        try {
            const modal = await new FabricRepo().get();
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getFabricById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params["id"], 10);
            const modal = await new FabricRepo().getById(id);
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async updateFabric(req: Request, res: Response) {
        try {
            const modal = req.body as CategoryType;
            modal.id = parseInt(req.params["id"], 10);
            const user = await new FabricRepo().update(modal);
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
    async deleteFabric(req: Request, res: Response) {
        try {
            let id = parseInt(req.params["id"]);
            const modal = await new FabricRepo().delete(id);

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

    //Row Material
    async createRowMaterial(req: Request, res: Response) {
        try {
            await new MaterialRepo().create(req.body);
            res.status(200).json({ status: true, message: "successfully!", data: null });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getRowMaterial(req: Request, res: Response) {
        try {
            const modal = await new MaterialRepo().get();
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getRowMaterialById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params["id"], 10);
            const modal = await new MaterialRepo().getById(id);
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async updateRowMaterial(req: Request, res: Response) {
        try {
            const modal = req.body;
            modal.id = parseInt(req.params["id"], 10);
            const user = await new MaterialRepo().update(modal);
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
    async deleteRowMaterial(req: Request, res: Response) {
        try {
            let id = parseInt(req.params["id"]);
            const modal = await new MaterialRepo().delete(id);

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

}

export default new MaterialController();
