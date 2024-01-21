import { Showroom } from "../../model/Warehouse/Showroom/Showroom";
import { ShowroomImages } from "../../model/Warehouse/Showroom/ShowroomImages";
import { Image } from "../../model/Common/Images";
import { Fabric } from "../../model/Metirial/Fabric/Fabric";
import { CustomId } from "../../model/Common/CustomId";
import { FabricImages } from "../../model/Metirial/Fabric/FabricImages";
import { RelatedFabric } from "../../model/Metirial/Fabric/RelatedFabric";
import { MaterialStock } from "../../model/Metirial/Stock/MaterialStock";
import { MainStock } from "../../model/Metirial/Stock/MainStock";
import { Cost } from "../../model/Metirial/Cost/Cost";
import { FabricItem } from "../../model/Metirial/Fabric/FabricItem";
import { Supplier } from "../../model/Metirial/Supplier/Supplier";

interface IFabricRepo {
  create(model: any): Promise<void>;
  update(model: any): Promise<any>;
  delete(id: number): Promise<any>;
  getById(id: number): Promise<any>;
  get(): Promise<any>;
}

export class FabricRepo implements IFabricRepo {
  async create(model: any): Promise<void> {
    try {
      const newCustomId = await CustomId.create({
        customId: model.customId,
        referanceTable: "Fabric",
      });

      if (!newCustomId) {
        throw new Error("This Custom Id is already exists! Try again");
      } else {
        const newIcon = await Image.create({
          imageName: model.icon.imageName,
          imageData: model.icon.imageData,
          imageURL: model.icon.imageURL,
          imagelocation: model.icon.imagelocation,
          imageDescription: model.icon.imageDescription,
        });

        const newQR = await Image.create({
          imageName: model.qr.imageName,
          imageData: model.qr.imageData,
          imageURL: model.qr.imageURL,
          imagelocation: model.qr.imagelocation,
          imageDescription: model.qr.imageDescription,
        });

        const createdFabric = await Fabric.create({
          name: model.name,
          customId: newCustomId.customId,
          description: model.description,
          information: model.information,
          listingPriority: model.listingPriority,
          colorId: model.colorId,
          patterrnId: model.patterrnId,
          materialId: model.materialId,
          characteristicsId: model.characteristicsId,
          seriesId: model.seriesId,
          opacity: model.opacity,
          weightId: model.weightId,
          unitTypeId: model.unitTypeId,
          icon: newIcon.id,
          qr: newQR.id,
          levelOfSafty: model.levelOfSafty,
          stockAlert: model.stockAlert,
          featured: model.featured,
          live: model.live,
          stockMinus: model.stockMinus,
          supplierId: model.supplierId,
        });

        const imgList = model.imageList as Image[];
        imgList.forEach(async (element) => {
          const img = await Image.create({
            imageName: element.imageName,
            imageData: element.imageData,
            imageURL: element.imageURL,
            imagelocation: element.imagelocation,
            imageDescription: element.imageDescription,
          });

          const modelImages = await FabricImages.create({
            fabricId: createdFabric.id,
            imageId: img.id,
          });
        });

        const relatedFabList = model.relatedFabric as RelatedFabric[];
        if(relatedFabList){
          relatedFabList.forEach(async (element) => {
            const newRelatedFabric = await RelatedFabric.create({
              fabricId: createdFabric.id,
              relatedFabricId: element.relatedFabricId,
            });
          });
        }
        
        let totalStock = 0;
        const stocckList = model.stockData as MaterialStock[];
        if(stocckList){
          stocckList.forEach(async (element) => {
            const newStock = await MaterialStock.create({
              customId: newCustomId.customId,
              wearhouseId: element.wearhouseId,
              showroomId: element.showroomId,
              value: element.value,
            });
            totalStock += element.value;
          });
  
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

        const categoryList = model.category as FabricItem[];
        if(categoryList){
          categoryList.forEach(async (element) => {
            const newFabricItem = await FabricItem.create({
              customId: newCustomId.customId,
              categoryId: element.categoryId,
              currency: element.currency,
              price: element.price,
              visibility: element.visibility,
              stockAlert: element.stockAlert,
              levelOfSafty: element.levelOfSafty,
              discount: element.discount,
            });
          });
        }
        
      }
    } catch (err: any) {
      const result = await Fabric.findOne({ where: { name: model.name } });

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
      const result = await Fabric.findOne({ where: { id: model.id } });
      if (!result) {
        return false;
      }
      else{
        result.name = model.name;
        result.description = model.description;
        result.information = model.information;
        result.listingPriority = model.listingPriority;
        result.colorId = model.colorId;
        result.patterrnId = model.patterrnId;
        result.materialId = model.materialId;
        result.characteristicsId = model.characteristicsId;
        result.seriesId = model.seriesId;
        result.opacity = model.opacity;
        result.weightId = model.weightId;
        result.unitTypeId = model.unitTypeId;
        result.levelOfSafty = model.levelOfSafty;
        result.stockAlert = model.stockAlert;
        result.featured = model.featured;
        result.live = model.live;
        result.stockMinus = model.stockMinus;
        result.supplierId = model.supplierId;
        await result.save();
      }

      const icon = await Image.findOne({ where: { id: result.icon } });
      if (icon) {
        icon.imageName = model.icon.imageName;
        icon.imageData = model.icon.imageData;
        icon.imageURL = model.icon.imageURL;
        icon.imagelocation = model.icon.imagelocation;
        icon.imageDescription = model.icon.imageDescription;
        await icon.save();
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

      const wimgList = (await FabricImages.findAll({
        where: { fabricId: model.id },
      })) as FabricImages[];

      await Promise.all(
        wimgList.map(async (imgElement) => {
          await Image.destroy({ where: { id: imgElement.imageId } });
        })
      );

      await FabricImages.destroy({ where: { fabricId: model.id } });

      const imgList = model.imageList as Image[];
      imgList.forEach(async (element) => {
        const img = await Image.create({
          imageName: element.imageName,
          imageData: element.imageData,
          imageURL: element.imageURL,
          imagelocation: element.imagelocation,
          imageDescription: element.imageDescription,
        });

        const modelImages = await FabricImages.create({
          fabricId: model.id,
          imageId: img.id,
        });
      });

      await RelatedFabric.destroy({ where: { fabricId: model.id } })
      const relatedFabList = model.relatedFabric as RelatedFabric[];
      relatedFabList.forEach(async (element) => {
        const newRelatedFabric = await RelatedFabric.create({
          fabricId: model.id,
          relatedFabricId: element.relatedFabricId,
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
      const result = await Fabric.findAll({ where: { id: id } });
      if (!result || result.length === 0) {
        throw new Error("Data not found!");
      }
      const Wlist: {
        id: number;
        name: string;
        customId: string;
        description: string;
        information: string;
        listingPriority: number;
        stockData: MaterialStock[];
        colorId: number;
        patterrnId: number;
        materialId: number;
        characteristicsId: number;
        seriesId: number;
        opacity: number;
        weightId: number;
        unitTypeId: number;
        icon: Image;
        qr: Image;
        imageList: Image[];
        relatedFabric: RelatedFabric[];
        levelOfSafty: { status : boolean, value : string };
        stockAlert: { status : boolean, value : string };
        featured: boolean;
        live: boolean;
        stockMinus: { status : boolean, value : string };
        category:FabricItem[];
        supplierId: Supplier;
        cost: Cost;
      }[] = [];
      
      await Promise.all(
        result.map(async (element) => {
          const stocData = (await MaterialStock.findAll({ where: { customId: element.customId }})) as MaterialStock[];
          const iconData = (await Image.findOne({ where: { id: element.icon }})) as Image;
          const qrData = (await Image.findOne({ where: { id: element.qr }})) as Image;
          const wimgList = (await FabricImages.findAll({ where: { fabricId: element.id }})) as FabricImages[];
          let imgList: Image[] = [];
          await Promise.all(
            wimgList.map(async (imgElement) => {
              const img = (await Image.findOne({where: { id: imgElement.imageId }})) as Image;
              imgList.push(img);
            })
          );
          const relatedFab = (await RelatedFabric.findAll({ where: { fabricId: element.id }})) as RelatedFabric[];
          const categoryData = (await FabricItem.findAll({ where: { customId: element.customId }})) as FabricItem[];
          const costData = (await Cost.findOne({ where: { customId: element.customId }})) as Cost;
          const supplierData = (await Supplier.findOne({ where: { id: element.supplierId }})) as Supplier;

          const tempModel = {
            id: element.id,
            name: element.name,
            customId: element.customId,
            description: element.description,
            information: element.information,
            listingPriority:element.listingPriority,
            stockData: stocData,
            colorId:element.colorId,
            patterrnId:element.patterrnId,
            materialId:element.materialId,
            characteristicsId:element.characteristicsId,
            seriesId:element.seriesId,
            opacity:element.opacity,
            weightId:element.weightId,
            unitTypeId:element.unitTypeId,
            icon: iconData,
            qr: qrData,
            imageList: imgList,
            relatedFabric: relatedFab,
            levelOfSafty: element.levelOfSafty,
            stockAlert: element.stockAlert,
            featured: element.featured,
            live: element.live,
            stockMinus: element.stockMinus,
            category: categoryData,
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
      const result = await Fabric.findAll();
      if (!result || result.length === 0) {
        throw new Error("Data not found!");
      }

      const Wlist: {
        id: number;
        name: string;
        customId: string;
        description: string;
        information: string;
        listingPriority: number;
        stockData: MaterialStock[];
        colorId: number;
        patterrnId: number;
        materialId: number;
        characteristicsId: number;
        seriesId: number;
        opacity: number;
        weightId: number;
        unitTypeId: number;
        icon: Image;
        qr: Image;
        imageList: Image[];
        relatedFabric: RelatedFabric[];
        levelOfSafty: { status : boolean, value : string };
        stockAlert: { status : boolean, value : string };
        featured: boolean;
        live: boolean;
        stockMinus: { status : boolean, value : string };
        category:FabricItem[];
        supplierId: Supplier;
        cost: Cost;
      }[] = [];
      

      await Promise.all(
        result.map(async (element) => {
          const stocData = (await MaterialStock.findAll({ where: { customId: element.customId }})) as MaterialStock[];
          const iconData = (await Image.findOne({ where: { id: element.icon }})) as Image;
          const qrData = (await Image.findOne({ where: { id: element.qr }})) as Image;
          const wimgList = (await FabricImages.findAll({ where: { fabricId: element.id }})) as FabricImages[];
          let imgList: Image[] = [];
          await Promise.all(
            wimgList.map(async (imgElement) => {
              const img = (await Image.findOne({where: { id: imgElement.imageId }})) as Image;
              imgList.push(img);
            })
          );
          const relatedFab = (await RelatedFabric.findAll({ where: { fabricId: element.id }})) as RelatedFabric[];
          const categoryData = (await FabricItem.findAll({ where: { customId: element.customId }})) as FabricItem[];
          const costData = (await Cost.findOne({ where: { customId: element.customId }})) as Cost;
          const supplierData = (await Supplier.findOne({ where: { id: element.supplierId }})) as Supplier;

          const tempModel = {
            id: element.id,
            name: element.name,
            customId: element.customId,
            description: element.description,
            information: element.information,
            listingPriority:element.listingPriority,
            stockData: stocData,
            colorId:element.colorId,
            patterrnId:element.patterrnId,
            materialId:element.materialId,
            characteristicsId:element.characteristicsId,
            seriesId:element.seriesId,
            opacity:element.opacity,
            weightId:element.weightId,
            unitTypeId:element.unitTypeId,
            icon: iconData,
            qr: qrData,
            imageList: imgList,
            relatedFabric: relatedFab,
            levelOfSafty: element.levelOfSafty,
            stockAlert: element.stockAlert,
            featured: element.featured,
            live: element.live,
            stockMinus: element.stockMinus,
            category: categoryData,
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
