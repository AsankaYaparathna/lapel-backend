import { Request, Response } from "express";
import { CustomProductRepo } from "../../repository/product/CustomProductRepo";
import { CartRepo } from "../../repository/cart/CartRepo";
class CartController {

    //cart
    async finish(req: Request, res: Response) {
        try {
            const result = await new CartRepo().finish(req.body);
            res.status(200).json({ status: true, message: "successfully!", data: result });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async add(req: Request, res: Response) {
        try {
            const modal = req.body;
            const user = await new CartRepo().add(modal);
            res.status(200).json({
                status: user ? true : false,
                message: user ? "Successfully!" : "Data Not Found!",
                data: user ? modal : null,
            });
        } catch (err) { res.status(400).json({ status: false, message: "" + err, data: null, }); }
    }
    async updateNoofitem(req: Request, res: Response) {
        try {
            const modal = req.body;
            const user = await new CartRepo().updateNoofitem(modal);
            res.status(200).json({
                status: user ? true : false,
                message: user ? "Successfully!" : "Data Not Found!",
                data: user ? modal : null,
            });
        } catch (err) { res.status(400).json({ status: false, message: "" + err, data: null, }); }
    }
    async get(req: Request, res: Response) {
        try {
            const modal = await new CartRepo().get();
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getCartByUserMobile(req: Request, res: Response) {
        try {
            const id = parseInt(req.params["id"], 10);
            const modal = await new CartRepo().getCartByUserMobile(id);
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getCartByUserId(req: Request, res: Response) {
        try {
            const id = parseInt(req.params["id"], 10);
            const modal = await new CartRepo().getCartByUserId(id);
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
