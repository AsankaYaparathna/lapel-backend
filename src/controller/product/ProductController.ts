import { Request, Response } from "express";
import { CategoryType } from "../../model/Common/Category/CategoryType";
import { CustomProductRepo } from "../../repository/product/CustomProductRepo";

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
            const modal = req.body as CategoryType;
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
}

export default new ProductController();
