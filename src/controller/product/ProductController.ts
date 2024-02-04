import { Request, Response } from "express";
import { CategoryType } from "../../model/Common/Category/CategoryType";
import { CustomProductRepo } from "../../repository/product/CustomProductRepo";
import { PackageRepo } from "../../repository/product/PackageRepo";

class ProductController {
    
    //Custom Product
    async createCustomProduct(req: Request, res: Response) {
        try {
            await new CustomProductRepo().create(req.body);
            res.status(200).json({ status: true, message: "successfully!", data: null });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getCustomProduct(req: Request, res: Response) {
        try {
            const modal = await new CustomProductRepo().get();
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getCustomProductById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params["id"], 10);
            const modal = await new CustomProductRepo().getById(id);
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async updateCustomProduct(req: Request, res: Response) {
        try {
            const modal = req.body;
            modal.id = parseInt(req.params["id"], 10);
            const user = await new CustomProductRepo().update(modal);
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
    async deleteCustomProduct(req: Request, res: Response) {
        try {
            let id = parseInt(req.params["id"]);
            const modal = await new CustomProductRepo().delete(id);

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
    async getSubOptionById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params["id"], 10);
            const modal = await new CustomProductRepo().getSubOptionById(id);
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }

    //packages
    async createPackage(req: Request, res: Response) {
        try {
            await new PackageRepo().create(req.body);
            res.status(200).json({ status: true, message: "successfully!", data: null });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getPackage(req: Request, res: Response) {
        try {
            const modal = await new PackageRepo().get();
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getPackageById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params["id"], 10);
            const modal = await new PackageRepo().getById(id);
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async updatePackage(req: Request, res: Response) {
        try {
            const modal = req.body;
            modal.id = parseInt(req.params["id"], 10);
            const user = await new PackageRepo().update(modal);
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
    async deletePackage(req: Request, res: Response) {
        try {
            let id = parseInt(req.params["id"]);
            const modal = await new PackageRepo().delete(id);

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

export default new ProductController();
