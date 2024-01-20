import { OpenTime } from "../../model/Warehouse/Showroom/OpeningTime";
import { Showroom } from "../../model/Warehouse/Showroom/Showroom";
import { ShowroomImages } from "../../model/Warehouse/Showroom/ShowroomImages";
import { Image } from "../../model/Common/Images";
import { Fabric } from "../../model/Metirial/Fabric/Fabric";
import { CustomId } from "../../model/Common/CustomId";
import { FabricImages } from "../../model/Metirial/Fabric/FabricImages";
import { RelatedFabric } from "../../model/Metirial/Fabric/RelatedFabric";
import { MaterialStock } from "../../model/Metirial/Common/MaterialStock";

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
        customId : model.customId,
        referanceTable : "Fabric"
      });

      if(!newCustomId){
        throw new Error("This Custom Id is already exists! Try again");
      }
      else{
        const newIcon = await Image.create({
          imageName : model.icon.imageName,
          imageData : model.icon.imageData,
          imageURL : model.icon.imageURL,
          imagelocation : model.icon.imagelocation,
          imageDescription : model.icon.imageDescription,
        });

        const newQR = await Image.create({
          imageName : model.qr.imageName,
          imageData : model.qr.imageData,
          imageURL : model.qr.imageURL,
          imagelocation : model.qr.imagelocation,
          imageDescription : model.qr.imageDescription,
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
          levelOfSaftyValue: model.levelOfSaftyValue,
          isStockAlert: model.isStockAlert,
          stockAlertValue: model.stockAlertValue,
          featured: model.featured,
          live: model.live,
          stock: model.stock,
          stockValue: model.stockValue,
        });

        const imgList = model.imageList as Image[];
        imgList.forEach(async element => {
          const img = await Image.create({
            imageName : element.imageName,
            imageData : element.imageData,
            imageURL : element.imageURL,
            imagelocation : element.imagelocation,
            imageDescription : element.imageDescription,
          });
  
          const modelImages = await FabricImages.create({
            fabricId : createdFabric.id,
            imageId : img.id,
          });
        });

        const relatedFabList = model.relatedFabric as RelatedFabric[];
        relatedFabList.forEach(async element => {
          const newRelatedFabric = await RelatedFabric.create({
            fabricId : createdFabric.id,
            relatedFabricId : element.relatedFabricId,
          });
        });

        const stocckList = model.relatedFabric as MaterialStock[];
        stocckList.forEach(async element => {
          const newStock = await RelatedFabric.create({
            wearhouseId : element.wearhouseId,
            showroomId : element.showroomId,
            value : element.value,
          });
        });
      }

    } catch (err: any) {
      const result = await Fabric.findOne({ where: { name: model.name } });

      if (result) {
        throw new Error("Failed to create Fabric! Fabric with this name already exists!");
      }
      throw new Error("Failed to create Fabric! | " + err.message);
    }
  }

  async update(model: any): Promise<any> {
    try {
      const result = await Showroom.findOne({ where: { id: model.id } });
      if (!result) {
        return false;
      }

      result.name = model.name;
      result.address = model.address;
      result.googleLocation = model.googleLocation;
      result.contactNo = model.contactNo;
      result.description = model.description;
      result.isLive = model.isLive;
      await result.save();

      const wimgList = await ShowroomImages.findAll({ where: { showroomId: model.id } }) as ShowroomImages[];
        
      await Promise.all(wimgList.map(async (imgElement) => {
        await Image.destroy({ where: { id: imgElement.imageId } });
      }));
      
      await ShowroomImages.destroy({ where: { showroomId: model.id } });
      await OpenTime.destroy({ where: { showroomId: model.id } });

      const imgList = model.imageList as Image[];

      imgList.forEach(async element => {
        const img = await Image.create({
          imageName : element.imageName,
          imageData : element.imageData,
          imageURL : element.imageURL,
          imagelocation : element.imagelocation,
          imageDescription : element.imageDescription,
        });

        const showroomImages = await ShowroomImages.create({
          showroomId : model.id,
          imageId : img.id,
        });
      });

      const timeList = model.timeList as OpenTime[];
      timeList.forEach(async element => {
        const time = await OpenTime.create({
          showroomId : model.id,
          day : element.day,
          isOpen : element.isOpen,
          openFrom : element.openFrom,
          openTo : element.openTo
        });
      });
      return true;
    } catch (err: any) {
      throw new Error("Failed to update Showroom! | " + err.message);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const result = await Showroom.findAll({ where: { id: id } });
      if (!result || result.length === 0) {
        throw new Error("Data not found!");
      }
  
      await Promise.all(result.map(async (element) => {
        const wimgList = await ShowroomImages.findAll({ where: { showroomId: element.id } }) as ShowroomImages[];
        
        await Promise.all(wimgList.map(async (imgElement) => {
          await Image.destroy({ where: { id: imgElement.imageId } });
        }));
        await ShowroomImages.destroy({ where: { showroomId: element.id } });
      }));
  
      await Showroom.destroy({ where: { id: id }});
      return true;
    } catch (err: any) {
      throw new Error("Failed to delete Showroom! | " + err.message);
    }
  }

  async getById(id: number): Promise<any> {
    try {
      const result = await Showroom.findAll({ where: { id: id } });
      if (!result || result.length === 0) {
        throw new Error("Data not found!");
      }
  
      const Wlist: { 
        id: number; 
        name: string; 
        address: { no: string; street: string; city: string; }; 
        contactNo: {no1 : string; no2 : string}; 
        googleLocation : string;
        description: string; 
        imageList: Image[]; 
        timeList: OpenTime[]; 
        isLive : Boolean;
        createdAt: any; 
        updatedAt: any; 
      }[] = [];
      
      await Promise.all(result.map(async (element) => {
        const wimgList = await ShowroomImages.findAll({ where: { showroomId: element.id } }) as ShowroomImages[];
        
        let imgList: Image[] = [];
        await Promise.all(wimgList.map(async (imgElement) => {
          const img = await Image.findOne({ where: { id: imgElement.imageId } }) as Image;
          imgList.push(img);
        }));
        const tmList = await OpenTime.findAll({ where: { showroomId: element.id } }) as OpenTime[];
        
        
        const showroomTemp = {
          id: element.id,
          name: element.name,
          address: element.address,
          contactNo: element.contactNo,
          googleLocation : element.googleLocation,
          description: element.description,
          imageList: imgList,
          timeList: tmList,
          isLive : element.isLive,
          createdAt: element.createdAt,
          updatedAt: element.updatedAt,
        };
  
        Wlist.push(showroomTemp);
      }));
  
      return Wlist;
    }  catch (err: any) {
      throw new Error("Failed to get Showroom! | " + err.message);
    }
  }

  async get(): Promise<any[]> {
    try {
      const result = await Showroom.findAll();
      if (!result || result.length === 0) {
        throw new Error("Data not found!");
      }
  
      const Wlist: { 
        id: number; 
        name: string; 
        address: { no: string; street: string; city: string; }; 
        contactNo: {no1 : string; no2 : string}; 
        googleLocation : string;
        description: string; 
        imageList: Image[]; 
        timeList: OpenTime[]; 
        isLive: Boolean;
        createdAt: any; 
        updatedAt: any; 
      }[] = [];
      
      await Promise.all(result.map(async (element) => {
        const wimgList = await ShowroomImages.findAll({ where: { showroomId: element.id } }) as ShowroomImages[];
        
        let imgList: Image[] = [];
        await Promise.all(wimgList.map(async (imgElement) => {
          const img = await Image.findOne({ where: { id: imgElement.imageId } }) as Image;
          imgList.push(img);
        }));
        const tmList = await OpenTime.findAll({ where: { showroomId: element.id } }) as OpenTime[];
        
        
        const showroomTemp = {
          id: element.id,
          name: element.name,
          address: element.address,
          contactNo: element.contactNo,
          googleLocation : element.googleLocation,
          description: element.description,
          imageList: imgList,
          timeList: tmList,
          isLive : element.isLive,
          createdAt: element.createdAt,
          updatedAt: element.updatedAt,
        };
  
        Wlist.push(showroomTemp);
      }));
  
      return Wlist;

    
    }  catch (err: any) {
      throw new Error("Failed to get Showroom! | " + err.message);
    }
  }
}
