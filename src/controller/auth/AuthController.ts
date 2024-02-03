// AuthController.ts
import { NextFunction, Request, Response } from "express";
import { User } from "../../model/Customer/User";
import { UserRepo } from "../../repository/user/UserRepo";
import { number } from "zod";
import { generateId, generateSecret } from "../../utils/Utils";
import axios from "axios";
import { AuthRepo } from "../../repository/auth/AuthRepo";
import { Auth } from "../../model/Auth/Auth";
import jwt from "jsonwebtoken";

class AuthController {

  async create(req: Request, res: Response) {
    try {
      const { clientId, clientSecret } = req.body;
      
      if (clientId !== process.env.JWT_SC_KEY && clientSecret !== process.env.APP_DATA_HASH_SECRET) {
        return res.status(401).json({ message: "Unauthorized: Invalid client credentials" });
      }

      const cs = generateSecret()
      const id = generateId()
      const model = new Auth()
            model.clientid = id;
            model.clientsecret = cs
            model.clienturl =req.url
      
      console.log(model)

      await new AuthRepo().create(model);
      res.status(200).json({ status: true, message: "Auth User created successfully!", data: model });
        
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async generateToken(req: Request, res: Response) {
    try {
      const { clientId, clientSecret } = req.body;
      const result = await new AuthRepo().getById( clientId );
      if (result) {
        if (result.clientsecret.match(clientSecret)) {

          const expiresIn = parseInt(process.env.JWT_EXPIRESIN || "300")//5 * 60; // 5 minutes in seconds
          const token = jwt.sign({ clientId }, process.env.JWT_SC_KEY || "", { expiresIn });
          res.status(200).json({ status: true, message: "successfully!", data: {
            token : token,
            expiresIn : expiresIn
          }});
        } else {
          return res.status(403).json({ message: "Unauthorized: Invalid client credentials" });
        }
      } else {
        return res.status(401).json({ message: "Unauthorized: Invalid client credentials2" });
      }
    } catch (err) {
      res.status(400).json({ status: false, message: "" + err, data: null });
    }
  }

  async authenticateToken(req: any, res: any, next : any) {
    const token = req.headers["authorization"];
    const skey = process.env.JWT_SC_KEY || "";
    if (!token) {
        return res.status(400).json({ message: "Unauthorized: Token missing" });
    }

    jwt.verify(token, skey, (err : any, user : any) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        }
        req.user = user;
        next();
    });
}
}

export default new AuthController();
