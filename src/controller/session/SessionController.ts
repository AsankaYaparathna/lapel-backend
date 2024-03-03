import { Request, Response } from "express";
import { SessionRepo } from "../../repository/session/SessionRepo";

class SessionController {

  async startSession(req: Request, res: Response) {
    try {
      const result = await new SessionRepo().startSession( req.body );
      if (result[0]) {
        res.status(200).json({
          status: true,
          message: "Successfully!",
          data: result,
        });
      } else {
        res .status(400)
          .json({ status: false, message: "Cart data is not found", data: null });
      }
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

}

export default new SessionController();
