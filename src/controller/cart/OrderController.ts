import { Request, Response } from "express";
import { CustomProductRepo } from "../../repository/product/CustomProductRepo";
import { OrderRepo } from "../../repository/order/OrderRepo";

class OrderController {

    //order

    async checkout(req: Request, res: Response) {
        try {
            const result = await new OrderRepo().checkout(req.body);
            res.status(200).json({ status: true, message: "successfully!", data: result });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }

    async get(req: Request, res: Response) {
        try {
            const modal = await new OrderRepo().get();
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params["id"], 10);
            const modal = await new OrderRepo().getById(id);
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const modal = req.body;
            const user = await new OrderRepo().update(modal);
            res.status(200).json({
                status: user ? true : false,
                message: user ? "Successfully!" : "Data Not Found!",
                data: user ? modal : null,
            });
        } catch (err) { res.status(400).json({ status: false, message: "" + err, data: null, }); }
    }

    async updatePayment(req: Request, res: Response) {
        try {
            const modal = req.body;
            const user = await new OrderRepo().updatePayment(modal);
            res.status(200).json({
                status: user ? true : false,
                message: user ? "Successfully!" : "Data Not Found!",
                data: user ? modal : null,
            });
        } catch (err) { res.status(400).json({ status: false, message: "" + err, data: null, }); }
    }

    async updateStatus(req: Request, res: Response) {
        try {
            const modal = req.body;
            const user = await new OrderRepo().updateStatus(modal);
            res.status(200).json({
                status: user ? true : false,
                message: user ? "Successfully!" : "Data Not Found!",
                data: user ? modal : null,
            });
        } catch (err) { res.status(400).json({ status: false, message: "" + err, data: null, }); }
    }
    
    async delete(req: Request, res: Response) {
        try {
            let id = parseInt(req.params["id"]);
            const modal = await new OrderRepo().delete(id);

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


    async shopCheckout(req: Request, res: Response) {
        try {
            const result = await new OrderRepo().shopCheckout(req.body);
            res.status(200).json({ status: true, message: "successfully!", data: result });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }

    async setOff(req: Request, res: Response) {
        try {
            const result = await new OrderRepo().shopCheckout(req.body);
            res.status(200).json({ status: true, message: "successfully!", data: result });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }

    async getInvoiceByCartId(req: Request, res: Response) {
        try {
            const id = parseInt(req.params["id"], 10);
            const modal = await new OrderRepo().getInvoiceByCartId(id);
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }

    async getByInvId(req: Request, res: Response) {
        try {
            const id = parseInt(req.params["id"], 10);
            const modal = await new OrderRepo().getByInvId(id);
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }

    async getByInvNo(req: Request, res: Response) {
        try {
            const id = req.params["id"];
            const modal = await new OrderRepo().getByInvNo(id);
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
}

export default new OrderController();
