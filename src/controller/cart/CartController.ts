import { Request, Response } from "express";
import { CustomProductRepo } from "../../repository/product/CustomProductRepo";
import { CartRepo } from "../../repository/cart/CartRepo";
class CartController {

    //packages
    async create(req: Request, res: Response) {
        try {
            await new CartRepo().create(req.body);
            res.status(200).json({ status: true, message: "successfully!", data: null });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async get(req: Request, res: Response) {
        try {
            const modal = await new CartRepo().get();
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params["id"], 10);
            const modal = await new CartRepo().getById(id);
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async update(req: Request, res: Response) {
        try {
            const modal = req.body;
            modal.id = parseInt(req.params["id"], 10);
            const user = await new CartRepo().update(modal);
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
            const modal = await new CartRepo().delete(id);

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

export default new CartController();
