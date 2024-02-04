import { Showroom } from "../../model/Warehouse/Showroom/Showroom";
import { ShowroomImages } from "../../model/Warehouse/Showroom/ShowroomImages";
import { Image } from "../../model/Common/Images";
import { CustomId } from "../../model/Common/CustomId";
import { RowMaterial } from "../../model/Metirial/RowMaterial/RowMaterial";
import { RowMaterialImages } from "../../model/Metirial/RowMaterial/RowMaterialImages";
import { RelatedRowMaterial } from "../../model/Metirial/RowMaterial/RelatedRowMaterial";
import { MaterialStock } from "../../model/Metirial/Stock/MaterialStock";
import { MainStock } from "../../model/Metirial/Stock/MainStock";
import { Cost } from "../../model/Metirial/Cost/Cost";
import { Supplier } from "../../model/Metirial/Supplier/Supplier";
import { Category } from "../../model/Common/Category/Category";
import { SubCategory } from "../../model/Common/Category/SubCategory";

interface IMaterialRepo {
  create(model: any): Promise<void>;
  update(model: any): Promise<any>;
  delete(id: number): Promise<any>;
  getById(id: number): Promise<any>;
  get(): Promise<any>;
}

export class MaterialRepo implements IMaterialRepo {
  async create(model: any): Promise<void> {
    try {
      const newCustomId = await CustomId.create({
        customId: model.customId,
        referanceTable: "Row Material",
      });

      if (!newCustomId) {
        throw new Error("This Custom Id is already exists! Try again");
      } else {
        const newQR = await Image.create({
          imageName: model.qr.imageName,
          imageData: model.qr.imageData,
          imageURL: model.qr.imageURL,
          imagelocation: model.qr.imagelocation,
          imageDescription: model.qr.imageDescription,
        });

        const createdModel = await RowMaterial.create({
          name: model.name,
          customId: newCustomId.customId,
          description: model.description,
          information: model.information,
          supplierId: model.supplierId,
          categoryId: model.categoryId,
          subCategoryId: model.subCategoryId,
          unitTypeId: model.unitTypeId,
          qr: newQR.id,
          levelOfSafty: model.levelOfSafty,
          discount: model.discount,
          stockAlert: model.stockAlert,
          featured: model.featured,
          live: model.live,
          stockMinus: model.stockMinus,
        });

        const imgList = model.imageList as Image[];
        if(imgList){
          imgList.forEach(async (element) => {
            const img = await Image.create({
              imageName: element.imageName,
              imageData: element.imageData,
              imageURL: element.imageURL,
              imagelocation: element.imagelocation,
              imageDescription: element.imageDescription,
            });
  
            const modelImages = await RowMaterialImages.create({
              rowMaterialId: createdModel.id,
              imageId: img.id,
            });
          });
        }

        const relatedRowMaterial = model.relatedFabric as RelatedRowMaterial[];
        if(relatedRowMaterial){
          relatedRowMaterial.forEach(async (element) => {
            const newRelatedFabric = await RelatedRowMaterial.create({
              fabricId: createdModel.id,
              relatedFabricId: element.rowMaterialId,
            });
          });
        }
        
        let totalStock = 0;
        const stocckList = model.stockData as MaterialStock[];
        if(stocckList){
          for (const element of stocckList) {
            const newStock = await MaterialStock.create({
              customId: newCustomId.customId,
              wearhouseId: element.wearhouseId,
              showroomId: element.showroomId,
              value: element.value,
            });
        
            totalStock = totalStock + element.value;
          }
          console.log(totalStock);
          const mainStock = await MainStock.create({
            customId: newCustomId.customId,
            mainStock: totalStock,
            liveStock: totalStock,
            pendingStock: 0,
            usedStock: 0,
            totalStock: totalStock,
          });
        }
        
        const costData = model.cost as Cost;
        if(costData){
          const newCost = await Cost.create({
            customId: newCustomId.customId,
            totalUnit: costData.totalUnit,
            unitCost: costData.unitCost,
            totalCost: costData.totalCost,
          });
        }

      }
    } catch (err: any) {
      const result = await RowMaterial.findOne({ where: { name: model.name } });

      if (result) {
        throw new Error(
          "Failed to create Fabric! Fabric with this name already exists!"
        );
      }
      throw new Error("Failed to create Fabric! | " + err.message);
    }
  }

  async update(model: any): Promise<any> {
    try {
      const result = await RowMaterial.findOne({ where: { id: model.id } });
      if (!result) {
        return false;
      }
      else{
        result.name = model.name;
        result.description = model.description;
        result.information = model.information;
        result.supplierId = model.supplierId;
        result.categoryId = model.categoryId;
        result.subCategoryId = model.subCategoryId;
        result.unitTypeId = model.unitTypeId;
        result.levelOfSafty = model.levelOfSafty;
        result.stockAlert = model.stockAlert;
        result.featured = model.featured;
        result.live = model.live;
        result.stockMinus = model.stockMinus;
        await result.save();
      }

      const qr = await Image.findOne({ where: { id: result.qr } });
      if (qr) {
        qr.imageName = model.qr.imageName;
        qr.imageData = model.qr.imageData;
        qr.imageURL = model.qr.imageURL;
        qr.imagelocation = model.qr.imagelocation;
        qr.imageDescription = model.qr.imageDescription;
        await qr.save();
      }

      const wimgList = (await RowMaterialImages.findAll({ where: { fabricId: model.id }, })) as RowMaterialImages[];

      await Promise.all(
        wimgList.map(async (imgElement) => {
          await Image.destroy({ where: { id: imgElement.imageId } });
        })
      );

      await RowMaterialImages.destroy({ where: { fabricId: model.id } });

      const imgList = model.imageList as Image[];
      imgList.forEach(async (element) => {
        const img = await Image.create({
          imageName: element.imageName,
          imageData: element.imageData,
          imageURL: element.imageURL,
          imagelocation: element.imagelocation,
          imageDescription: element.imageDescription,
        });

        const modelImages = await RowMaterialImages.create({
          row: model.id,
          imageId: img.id,
        });
      });

      await RelatedRowMaterial.destroy({ where: { fabricId: model.id } })
      const relatedFabList = model.relatedFabric as RelatedRowMaterial[];
      relatedFabList.forEach(async (element) => {
        const newRelatedFabric = await RelatedRowMaterial.create({
          fabricId: model.id,
          rowMaterialId: element.rowMaterialId,
        });
      });
      
      return true;
    } catch (err: any) {
      throw new Error("Failed to update Fabric! | " + err.message);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const result = await Showroom.findAll({ where: { id: id } });
      if (!result || result.length === 0) {
        throw new Error("Data not found!");
      }

      await Promise.all(
        result.map(async (element) => {
          const wimgList = (await ShowroomImages.findAll({
            where: { showroomId: element.id },
          })) as ShowroomImages[];

          await Promise.all(
            wimgList.map(async (imgElement) => {
              await Image.destroy({ where: { id: imgElement.imageId } });
            })
          );
          await ShowroomImages.destroy({ where: { showroomId: element.id } });
        })
      );

      await Showroom.destroy({ where: { id: id } });
      return true;
    } catch (err: any) {
      throw new Error("Failed to delete Showroom! | " + err.message);
    }
  }

  async getById(id: number): Promise<any> {
    try {
      const result = await RowMaterial.findAll({ where: { id: id } });
      if (!result || result.length === 0) {
        throw new Error("Data not found!");
      }
      const Wlist: {
        id: number;
        name: string;
        customId: string;
        description: string;
        information: string;
        stockData: MaterialStock[];
        supplierId: Supplier;
        categoryId: Category;
        subCategoryId: SubCategory;
        unitTypeId: number;
        qr: Image;
        imageList: Image[];
        relatedRowMaterial: RelatedRowMaterial[];
        discount: { status : boolean, fixedValue: string, fixedRate : string};
        levelOfSafty: { status : boolean, value : string };
        stockAlert: { status : boolean, value : string };
        featured: boolean;
        live: boolean;
        stockMinus: { status : boolean, value : string };
        cost: Cost;
      }[] = [];
      
      await Promise.all(
        result.map(async (element) => {
          const stocData = (await MaterialStock.findAll({ where: { customId: element.customId }})) as MaterialStock[];
          const qrData = (await Image.findOne({ where: { id: element.qr }})) as Image;
          const wimgList = (await RowMaterialImages.findAll({ where: { rowMaterialId: element.id }})) as RowMaterialImages[];
          let imgList: Image[] = [];
          await Promise.all(
            wimgList.map(async (imgElement) => {
              const img = (await Image.findOne({where: { id: imgElement.imageId }})) as Image;
              imgList.push(img);
            })
          );
          const relatedRowMat = (await RelatedRowMaterial.findAll({ where: { rowMaterialId: element.id }})) as RelatedRowMaterial[];
          const costData = (await Cost.findOne({ where: { customId: element.customId }})) as Cost;
          const supplierData = (await Supplier.findOne({ where: { id: element.supplierId }})) as Supplier;
          const categoryData = (await Category.findOne({ where: { id: element.supplierId }})) as Category;
          const subCategoryData = (await SubCategory.findOne({ where: { id: element.supplierId }})) as SubCategory;

          const tempModel = {
            id: element.id,
            name: element.name,
            customId: element.customId,
            description: element.description,
            information: element.information,
            stockData: stocData,
            categoryId:categoryData,
            subCategoryId: subCategoryData,
            unitTypeId:element.unitTypeId,
            qr: qrData,
            imageList: imgList,
            relatedRowMaterial: relatedRowMat,
            levelOfSafty: element.levelOfSafty,
            discount:element.discount,
            stockAlert: element.stockAlert,
            featured: element.featured,
            live: element.live,
            stockMinus: element.stockMinus,
            supplierId: supplierData,
            cost: costData,
          };

          Wlist.push(tempModel);
        })
      );

      return Wlist;
    } catch (err: any) {
      throw new Error("Failed to get Fabric! | " + err.message);
    }
  }

  async get(): Promise<any[]> {
    try {
      const result = await RowMaterial.findAll();
      if (!result || result.length === 0) {
        throw new Error("Data not found!");
      }
      const Wlist: {
        id: number;
        name: string;
        customId: string;
        description: string;
        information: string;
        stockData: MaterialStock[];
        supplierId: Supplier;
        categoryId: Category;
        subCategoryId: SubCategory;
        unitTypeId: number;
        qr: Image;
        imageList: Image[];
        relatedRowMaterial: RelatedRowMaterial[];
        discount: { status : boolean, fixedValue: string, fixedRate : string};
        levelOfSafty: { status : boolean, value : string };
        stockAlert: { status : boolean, value : string };
        featured: boolean;
        live: boolean;
        stockMinus: { status : boolean, value : string };
        cost: Cost;
      }[] = [];
      
      await Promise.all(
        result.map(async (element) => {
          const stocData = (await MaterialStock.findAll({ where: { customId: element.customId }})) as MaterialStock[];
          const qrData = (await Image.findOne({ where: { id: element.qr }})) as Image;
          const wimgList = (await RowMaterialImages.findAll({ where: { rowMaterialId: element.id }})) as RowMaterialImages[];
          let imgList: Image[] = [];
          await Promise.all(
            wimgList.map(async (imgElement) => {
              const img = (await Image.findOne({where: { id: imgElement.imageId }})) as Image;
              imgList.push(img);
            })
          );
          const relatedRowMat = (await RelatedRowMaterial.findAll({ where: { rowMaterialId: element.id }})) as RelatedRowMaterial[];
          const costData = (await Cost.findOne({ where: { customId: element.customId }})) as Cost;
          const supplierData = (await Supplier.findOne({ where: { id: element.supplierId }})) as Supplier;
          const categoryData = (await Category.findOne({ where: { id: element.supplierId }})) as Category;
          const subCategoryData = (await SubCategory.findOne({ where: { id: element.supplierId }})) as SubCategory;

          const tempModel = {
            id: element.id,
            name: element.name,
            customId: element.customId,
            description: element.description,
            information: element.information,
            stockData: stocData,
            categoryId:categoryData,
            subCategoryId: subCategoryData,
            unitTypeId:element.unitTypeId,
            qr: qrData,
            imageList: imgList,
            relatedRowMaterial: relatedRowMat,
            levelOfSafty: element.levelOfSafty,
            discount:element.discount,
            stockAlert: element.stockAlert,
            featured: element.featured,
            live: element.live,
            stockMinus: element.stockMinus,
            supplierId: supplierData,
            cost: costData,
          };

          Wlist.push(tempModel);
        })
      );

      return Wlist;
    } catch (err: any) {
      throw new Error("Failed to get Fabric! | " + err.message);
    }
  }
}
