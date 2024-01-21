import { Request, Response } from "express";
import { Color } from "../../model/Common/Color";
import { CommonRepo } from "../../repository/common/CommonRepo";
import { Pattern } from "../../model/Common/Pattern";
import { Characteristics } from "../../model/Common/Characteristic";
import { Image } from "../../model/Common/Images";
import { Opacity } from "../../model/Common/Opacity";
import { Series } from "../../model/Common/Series";
import { UnitType } from "../../model/Common/UnitType";
import { CategoryType } from "../../model/Common/Category/CategoryType";
import { Category } from "../../model/Common/Category/Category";
import { SubCategory } from "../../model/Common/Category/SubCategory";
import { Material } from "../../model/Common/Material";
import { Weight } from "../../model/Common/Weight";
import { Supplier } from "../../model/Metirial/Supplier/Supplier";

class CommonController {
    //Color
    async createColor(req: Request, res: Response) {
        try {
            await new CommonRepo().createColor(req.body as Color);
            res.status(200).json({ status: true, message: "successfully!", data: null });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getColor(req: Request, res: Response) {
        try {
            const modal = await new CommonRepo().getColor();
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    
    //Pattern
    async createPattern(req: Request, res: Response) {
        try {
            await new CommonRepo().createPattern(req.body as Pattern);
            res.status(200).json({ status: true, message: "successfully!", data: null });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getPattern(req: Request, res: Response) {
        try {
            const modal = await new CommonRepo().getPattern();
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }

    //Material
    async createMaterial(req: Request, res: Response) {
        try {
            await new CommonRepo().createMaterial(req.body as Material);
            res.status(200).json({ status: true, message: "successfully!", data: null });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getMaterial(req: Request, res: Response) {
        try {
            const modal = await new CommonRepo().getMaterial();
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }

    //Characteristic
    async createCharacteristics(req: Request, res: Response) {
        try {
            await new CommonRepo().createCharacteristics(req.body as Characteristics);
            res.status(200).json({ status: true, message: "successfully!", data: null });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getCharacteristics(req: Request, res: Response) {
        try {
            const modal = await new CommonRepo().getCharacteristics();
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }

    //Image
    async createImage(req: Request, res: Response) {
        try {
            await new CommonRepo().createCharacteristics(req.body as Characteristics);
            res.status(200).json({ status: true, message: "successfully!", data: null });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getImageById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params["id"], 10);
            const modal = await new CommonRepo().getImageById(id);
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async updateImage(req: Request, res: Response) {
        try {
            const modal = req.body as Image;
            modal.id = parseInt(req.params["id"], 10);
            const user = await new CommonRepo().updateImage(modal);
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
    async deleteImage(req: Request, res: Response) {
        try {
            let id = parseInt(req.params["id"]);
            const modal = await new CommonRepo().deleteImage(id);

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

    //Opacity
    async createOpacity(req: Request, res: Response) {
        try {
            await new CommonRepo().createOpacity(req.body as Opacity);
            res.status(200).json({ status: true, message: "successfully!", data: null });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getOpacity(req: Request, res: Response) {
        try {
            const modal = await new CommonRepo().getOpacity();
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }

    //Series
    async createSeries(req: Request, res: Response) {
        try {
            await new CommonRepo().createSeries(req.body as Series);
            res.status(200).json({ status: true, message: "successfully!", data: null });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getSeries(req: Request, res: Response) {
        try {
            const modal = await new CommonRepo().getSeries();
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    
    //Unit Type
    async createUnitType(req: Request, res: Response) {
        try {
            await new CommonRepo().createUnitType(req.body as UnitType);
            res.status(200).json({ status: true, message: "successfully!", data: null });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getUnitType(req: Request, res: Response) {
        try {
            const modal = await new CommonRepo().getUnitType();
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }

    //Weight
    async createWeight(req: Request, res: Response) {
        try {
            await new CommonRepo().createWeight(req.body as Weight);
            res.status(200).json({ status: true, message: "successfully!", data: null });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getWeight(req: Request, res: Response) {
        try {
            const modal = await new CommonRepo().getWeight();
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }

    //Supplier
    async createSupplier(req: Request, res: Response) {
        try {
            await new CommonRepo().createSupplier(req.body as Supplier);
            res.status(200).json({ status: true, message: "successfully!", data: null });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getSupplier(req: Request, res: Response) {
        try {
            const modal = await new CommonRepo().getSupplier();
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    
    
    //Category Type
    async createCategoryType(req: Request, res: Response) {
        try {
            await new CommonRepo().createCategoryType(req.body as CategoryType);
            res.status(200).json({ status: true, message: "successfully!", data: null });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getCategoryType(req: Request, res: Response) {
        try {
            const modal = await new CommonRepo().getCategoryType();
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getCategoryTypeById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params["id"], 10);
            const modal = await new CommonRepo().getCategoryTypeById(id);
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async updateCategoryType(req: Request, res: Response) {
        try {
            const modal = req.body as CategoryType;
            modal.id = parseInt(req.params["id"], 10);
            const user = await new CommonRepo().updateCategoryType(modal);
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
    async deleteCategoryType(req: Request, res: Response) {
        try {
            let id = parseInt(req.params["id"]);
            const modal = await new CommonRepo().deleteCategoryType(id);

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

    //Category
    async createCategory(req: Request, res: Response) {
        try {
            await new CommonRepo().createCategory(req.body as Category);
            res.status(200).json({ status: true, message: "successfully!", data: null });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getCategory(req: Request, res: Response) {
        try {
            const modal = await new CommonRepo().getCategory();
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getCategoryById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params["id"], 10);
            const modal = await new CommonRepo().getCategoryById(id);
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async updateCategory(req: Request, res: Response) {
        try {
            const modal = req.body as Category;
            modal.id = parseInt(req.params["id"], 10);
            const user = await new CommonRepo().updateCategory(modal);
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
    async deleteCategory(req: Request, res: Response) {
        try {
            let id = parseInt(req.params["id"]);
            const modal = await new CommonRepo().deleteCategory(id);

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

     //Sub Category
     async createSubCategory(req: Request, res: Response) {
        try {
            await new CommonRepo().createSubCategory(req.body as SubCategory);
            res.status(200).json({ status: true, message: "successfully!", data: null });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getSubCategory(req: Request, res: Response) {
        try {
            const modal = await new CommonRepo().getSubCategory();
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async getSubCategoryById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params["id"], 10);
            const modal = await new CommonRepo().getSubCategoryById(id);
            res.status(200).json({ status: true, message: "Successfully!", data: modal });
        } catch (err) {
            res.status(400).json({ status: false, message: "" + err, data: null });
        }
    }
    async updateSubCategory(req: Request, res: Response) {
        try {
            const modal = req.body as SubCategory;
            modal.id = parseInt(req.params["id"], 10);
            const user = await new CommonRepo().updateSubCategory(modal);
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
    async deleteSubCategory(req: Request, res: Response) {
        try {
            let id = parseInt(req.params["id"]);
            const modal = await new CommonRepo().deleteSubCategory(id);

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

export default new CommonController();
