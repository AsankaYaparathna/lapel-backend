import MaterialController from "../../controller/material/MaterialController";
import BaseRoutes from "../base/BaseRouter";

class MaterialRouts extends BaseRoutes{
    public routes(): void {
        // Public routes
       
        // Protected routes
        //Auth
        //this.router.use(AuthController.authenticateToken);

        //Fabric
        this.router.post("/fabric/create/", MaterialController.createFabric);
        this.router.get("/fabric/get/", MaterialController.getFabric);
        this.router.get("/fabric/getById/:id", MaterialController.getFabricById);
        this.router.patch("/fabric/update/:id", MaterialController.updateFabric);
        this.router.delete("/fabric/delete/:id", MaterialController.deleteFabric);

        //Row Material
        this.router.post("/rowmaterial/create/", MaterialController.createRowMaterial);
        this.router.get("/rowmaterial/get/", MaterialController.getRowMaterial);
        this.router.get("/rowmaterial/getById/:id", MaterialController.getRowMaterialById);
        this.router.patch("/rowmaterial/update/:id", MaterialController.updateRowMaterial);
        this.router.delete("/rowmaterial/delete/:id", MaterialController.deleteRowMaterial);

    }
}

export default new MaterialRouts().router