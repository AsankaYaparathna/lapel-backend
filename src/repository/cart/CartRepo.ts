import { Image } from "../../model/Common/Images";
import { CustomProduct } from "../../model/Product/Custom Product/CustomProduct";
import { CstomProductPackages } from "../../model/Product/Packages/CstomProductPackages";
import { PackageImages } from "../../model/Product/Packages/PackageImages";
import { PackageProfImages } from "../../model/Product/Packages/PackageProfImages";
import { PackageElement } from "../../model/Product/Packages/PackageElement";
import { MeasurementPackage } from "../../model/Product/Packages/MeasurementPackage";
import { Cart } from "../../model/Cart/Cart";

interface ICartRepo {
  create(model: any): Promise<void>;
  update(model: any): Promise<any>;
  delete(id: number): Promise<any>;
  getById(id: number): Promise<any>;
  get(): Promise<any>;
}

export class CartRepo implements ICartRepo {
  async create(model: any): Promise<void> {
    try {
      const result = await Cart.findOne({ where: { name: model.name }, });
      if (result) {
        throw new Error(
          "Failed to add Cart! Cart with this name already exists!"
        );
      }


      const newCreatedModel = await Cart.create({
        customerId: model.title,
        packageId: model.title,
        customProdId: model.title,
        noOfItems: model.noOfItems,
        subTotal: model.subTotal,
        shippingCost: model.shippingCost,
        totalAmmount: model.totalAmmount,
        name: model.name,
        measurement: model.measurement,
        note: model.note,
        noteImageUrl: model.noteImageUrl,
        status: model.status,
        styleList: model.styleList,
      });

      if (newCreatedModel) {
        const imgList = model.images as Image[];
        if(imgList){
          imgList.forEach(async (element) => {
            const img = await Image.create({
              imageName: element.imageName,
              imageData: element.imageData,
              imageURL: element.imageURL,
              imagelocation: element.imagelocation,
              imageDescription: element.imageDescription,
            });
  
            const modelImages = await PackageImages.create({
              packageId: newCreatedModel.id,
              imageId: img.id,
            });
          });
        }

        const imgList2 = model.professionalImages as Image[];
        if(imgList2){
          imgList2.forEach(async (element) => {
            const img = await Image.create({
              imageName: element.imageName,
              imageData: element.imageData,
              imageURL: element.imageURL,
              imagelocation: element.imagelocation,
              imageDescription: element.imageDescription,
            });
  
            const modelImages = await PackageProfImages.create({
              packageId: newCreatedModel.id,
              imageId: img.id,
            });
          });
        }

        const pkgElement = model.elements as PackageElement[];
        if(pkgElement){
          pkgElement.forEach(async (element) => {
            const newPkgElement = await PackageElement.create({
              packageId: newCreatedModel.id,
              optionId: element.optionId,
              frontViewOrder : element.frontViewOrder,
              backViewOrder : element.backViewOrder
            });
          });
        }

        const pkgMeasurement = model.measurementPackage as MeasurementPackage[];
        if(pkgMeasurement){
          pkgMeasurement.forEach(async (element) => {
            const newPkgMea = await MeasurementPackage.create({
              packageId: newCreatedModel.id,
              optionId: element.optionId
            });
          });
        }
      }
    } catch (err: any) {
      throw new Error("Failed to create Custom Product Package! | " + err.message);
    }
  }

  async update(model: any): Promise<any> {
    try {
      const newModel = await CstomProductPackages.findOne({ where: { id: model.id }, });
      if (!newModel) { return false; } 
      else {
        newModel.title = model.title;
        newModel.description = model.description;
        newModel.productionTime = model.productionTime;
        newModel.price = model.price;
        newModel.listingPriority = model.listingPriority;
        newModel.isLive = model.isLive;
        newModel.isActive = true;
        newModel.isActive = true;
        await newModel.save();

        const icon = await Image.findOne({ where: { id: newModel.icon } });
        if(icon){
          icon.imageName = model.icon.imageName;
          icon.imageData = model.icon.imageData;
          icon.imageURL = model.icon.imageURL;
          icon.imagelocation = model.icon.imagelocation;
          icon.imageDescription = model.icon.imageDescription;
        }

        const imgListdata = await PackageImages.findAll({ where: { packageId: model.id }, });
        await PackageImages.destroy({ where: { packageId: model.id }});
        if(imgListdata){
          await imgListdata.forEach(async (element) => {
            await Image.destroy({ where: { id: element.imageId }});
          });
        }
        const imgList = model.images as Image[];
          if(imgList){
            imgList.forEach(async (element) => {
              const img = await Image.create({
                imageName: element.imageName,
                imageData: element.imageData,
                imageURL: element.imageURL,
                imagelocation: element.imagelocation,
                imageDescription: element.imageDescription,
              });
    
              const modelImages = await PackageImages.create({
                packageId: model.id,
                imageId: img.id,
              });
            });
        }

        const imgListdataProf = await PackageProfImages.findAll({ where: { packageId: model.id }, });
        await PackageProfImages.destroy({ where: { packageId: model.id }});
        if(imgListdataProf){
          await imgListdataProf.forEach(async (element) => {
            await Image.destroy({ where: { id: element.imageId }});
          });
        }
        const imgList2 = model.professionalImages as Image[];
        if(imgList2){
          imgList2.forEach(async (element) => {
            const img = await Image.create({
              imageName: element.imageName,
              imageData: element.imageData,
              imageURL: element.imageURL,
              imagelocation: element.imagelocation,
              imageDescription: element.imageDescription,
            });
  
            const modelImages = await PackageProfImages.create({
              packageId: model.id,
              imageId: img.id,
            });
          });
        }

        await PackageElement.destroy({ where: { packageId: model.id }});
        const pkgElement = model.elements as PackageElement[];
        if(pkgElement){
          pkgElement.forEach(async (element) => {
            const newPkgElement = await PackageElement.create({
              packageId: model.id,
              optionId: element.optionId,
              frontViewOrder : element.frontViewOrder,
              backViewOrder : element.backViewOrder
            });
          });
        }

        await MeasurementPackage.destroy({ where: { packageId: model.id }});
        const pkgMeasurement = model.measurementPackage as MeasurementPackage[];
        if(pkgMeasurement){
          pkgMeasurement.forEach(async (element) => {
            const newPkgMea = await MeasurementPackage.create({
              packageId: model.id,
              optionId: element.optionId
            });
          });
        }

      }
      return true;
    } catch (err: any) {
      throw new Error("Failed to update Custom Product Packages! | " + err.message);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const customProduct = await CustomProduct.findAll({ where: { id: id } });
      const newModel = await CstomProductPackages.findOne({ where: { id: id }, });
      
      if (!newModel ) {
        throw new Error("Data not found!");
      }

      await CstomProductPackages.destroy({ where: { id: id } });
      await Image.destroy({ where: { id: newModel.icon } });
 

      const imgListdata = await PackageImages.findAll({ where: { packageId: id }, });
      await PackageImages.destroy({ where: { packageId: id }});
      if(imgListdata){
        await imgListdata.forEach(async (element) => {
          await Image.destroy({ where: { id: element.imageId }});
        });
      }
    
      const imgListdataProf = await PackageProfImages.findAll({ where: { packageId: id }, });
      await PackageProfImages.destroy({ where: { packageId: id }});
      if(imgListdataProf){
        await imgListdataProf.forEach(async (element) => {
          await Image.destroy({ where: { id: element.imageId }});
        });
      }
    
      await PackageElement.destroy({ where: { packageId: id }});
      await MeasurementPackage.destroy({ where: { packageId: id }});

      return  true;
    } catch (err: any) {
      throw new Error("Failed to delete Custom Product Package! | " + err.message);
    }
  }

  async getById(id: number): Promise<any> {
    try {

      interface newCustomProductPackages {
        id: number;
        title: string;
        description: string;
        elements : PackageElement[];
        measurementPackage : MeasurementPackage[];
        productionTime: string;
        price: number;
        listingPriority: number;
        isLive: boolean;
        icon: Image;
        images : Image[];
        professionalImages : Image[];
        isActive: boolean;
      }
      
      const tempCuProduct: newCustomProductPackages[] = [];
      const customProductPkg = await CstomProductPackages.findAll({ where: { id: id }});
      if (!customProductPkg || customProductPkg.length === 0) {
        throw new Error("Data not found!");
      }

      await Promise.all(
        customProductPkg.map(async (element) => {
          const pkgElement = await PackageElement.findAll({ where: { packageId: element.id }});
          const pkgMeasurement = await MeasurementPackage.findAll({ where: { packageId: element.id }});
          const icon = await Image.findOne({ where: { id: element.icon } });
          
          const pkgImages: Image[] = [];
          const pkgImgList = await PackageImages.findAll({where: { packageId: element.id },});
          await Promise.all(pkgImgList.map(async (elementPkgImg) => {
            const img = await Image.findOne({ where: { id: elementPkgImg.imageId }, });
            if(img){
              pkgImages.push(img);
            }
          }));

          const pkgProfImages: Image[] = [];
          const pkgImgList2 = await PackageProfImages.findAll({where: { packageId: element.id },});
          await Promise.all(pkgImgList2.map(async (elementPkgImg) => {
            const img = await Image.findOne({ where: { id: elementPkgImg.imageId }, });
            if(img){
              pkgProfImages.push(img);
            }
          }));

          const temp : newCustomProductPackages = {
            id: element.id,
            title: element.title,
            description: element.description,
            elements : pkgElement,
            measurementPackage : pkgMeasurement,
            productionTime: element.productionTime,
            price: element.price,
            listingPriority: element.listingPriority,
            isLive: element.isLive,
            icon: icon ? icon : new Image,
            images : pkgImages,
            professionalImages : pkgProfImages,
            isActive: element.isActive
          };
          
          tempCuProduct.push(temp);
        })
      );

      
      return await tempCuProduct;
    
    } catch (err: any) {
      throw new Error("Failed to get Custom Product Package! | " + err.message);
    }
  }

  async get(): Promise<any[]> {
    try {
      interface newCustomProductPackages {
        id: number;
        title: string;
        description: string;
        elements : PackageElement[];
        measurementPackage : MeasurementPackage[];
        productionTime: string;
        price: number;
        listingPriority: number;
        isLive: boolean;
        icon: Image;
        images : Image[];
        professionalImages : Image[];
        isActive: boolean;
      }

      const tempCuProduct: newCustomProductPackages[] = [];
      const customProductPkg = await CstomProductPackages.findAll();
      if (!customProductPkg || customProductPkg.length === 0) { throw new Error("Data not found!"); }

      await Promise.all(
        customProductPkg.map(async (element) => {
          const pkgElement = await PackageElement.findAll({ where: { packageId: element.id }});
          const pkgMeasurement = await MeasurementPackage.findAll({ where: { packageId: element.id }});
          const icon = await Image.findOne({ where: { id: element.icon } });
          
          const pkgImages: Image[] = [];
          const pkgImgList = await PackageImages.findAll({where: { packageId: element.id },});
          await Promise.all(pkgImgList.map(async (elementPkgImg) => {
            const img = await Image.findOne({ where: { id: elementPkgImg.imageId }, });
            if(img){
              pkgImages.push(img);
            }
          }));

          const pkgProfImages: Image[] = [];
          const pkgImgList2 = await PackageProfImages.findAll({where: { packageId: element.id },});
          await Promise.all(pkgImgList2.map(async (elementPkgImg) => {
            const img = await Image.findOne({ where: { id: elementPkgImg.imageId }, });
            if(img){
              pkgProfImages.push(img);
            }
          }));

          const temp : newCustomProductPackages = {
            id: element.id,
            title: element.title,
            description: element.description,
            elements : pkgElement,
            measurementPackage : pkgMeasurement,
            productionTime: element.productionTime,
            price: element.price,
            listingPriority: element.listingPriority,
            isLive: element.isLive,
            icon: icon ? icon : new Image,
            images : pkgImages,
            professionalImages : pkgProfImages,
            isActive: element.isActive
          };
          
          tempCuProduct.push(temp);
        })
      );
      return await tempCuProduct;
    } catch (err: any) {
      throw new Error("Failed to get Custom Product! | " + err.message);
    }
  }

}
