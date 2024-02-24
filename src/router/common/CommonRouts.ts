import AuthController from "../../controller/auth/AuthController";
import CommonController from "../../controller/common/CommonController";
import BaseRoutes from "../base/BaseRouter";
import multer from 'multer';


class CommonRouts extends BaseRoutes{
    public routes(): void {
        // Public routes
       
        // Protected routes
        //Auth
        this.router.use(AuthController.authenticateToken);;

        //Color
        this.router.post("/color/create/", CommonController.createColor);
        this.router.get("/color/get/", CommonController.getColor);

        //Pattern
        this.router.post("/pattern/create/", CommonController.createPattern);
        this.router.get("/pattern/get/", CommonController.getPattern);

        //Material
        this.router.post("/material/create/", CommonController.createMaterial);
        this.router.get("/material/get/", CommonController.getMaterial);
        
        //Characteristic
        this.router.post("/characteristic/create/", CommonController.createCharacteristics);
        this.router.get("/characteristic/get/", CommonController.getCharacteristics);
        
        //Image
        this.router.post("/image/create/", CommonController.createImage);
        this.router.get("/image/get/:id", CommonController.getImageById);
        this.router.patch("/image/update/:id", CommonController.updateImage);
        this.router.delete("/image/delete/:id", CommonController.deleteImage);
        const upload = multer({ dest: "uploads/" });
        this.router.post("/image/upload/", upload.single("image"), CommonController.uploadImage);

        //Opacity
        this.router.post("/opacity/create/", CommonController.createOpacity);
        this.router.get("/opacity/get/", CommonController.getOpacity);

        //Series
        this.router.post("/series/create/", CommonController.createSeries);
        this.router.get("/series/get/", CommonController.getSeries);

        //Unit Type
        this.router.post("/unittype/create/", CommonController.createUnitType);
        this.router.get("/unittype/get/", CommonController.getUnitType);

        
        //Weight
        this.router.post("/weight/create/", CommonController.createWeight);
        this.router.get("/weight/get/", CommonController.getWeight);

        //Supplier
        this.router.post("/supplier/create/", CommonController.createSupplier);
        this.router.get("/supplier/get/", CommonController.getSupplier);

        //Category Type
        this.router.post("/categorytype/create/", CommonController.createCategoryType);
        this.router.get("/categorytype/get/", CommonController.getCategoryType);
        this.router.get("/categorytype/getById/:id", CommonController.getCategoryTypeById);
        this.router.patch("/categorytype/update/:id", CommonController.updateCategoryType);
        this.router.delete("/categorytype/delete/:id", CommonController.deleteCategoryType);

        //Category
        this.router.post("/category/create/", CommonController.createCategory);
        this.router.get("/category/get/", CommonController.getCategory);
        this.router.get("/category/getById/:id", CommonController.getCategoryById);
        this.router.get("/category/getByCategoryTypeId/:id", CommonController.getByCategoryTypeId);
        this.router.patch("/category/update/:id", CommonController.updateCategory);
        this.router.delete("/category/delete/:id", CommonController.deleteCategory);

        //sub Category
        this.router.post("/subcategory/create/", CommonController.createSubCategory);
        this.router.get("/subcategory/get/", CommonController.getSubCategory);
        this.router.get("/subcategory/getById/:id", CommonController.getSubCategoryById);
        this.router.patch("/subcategory/update/:id", CommonController.updateSubCategory);
        this.router.delete("/subcategory/delete/:id", CommonController.deleteSubCategory);
    }
}

export default new CommonRouts().router

