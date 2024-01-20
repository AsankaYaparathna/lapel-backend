import { Image } from "../../model/Common/Images";
import { Wearhouse } from "../../model/Warehouse/Warehouse/Wearhouse";
import { WarehouseImage } from "../../model/Warehouse/Warehouse/WearhouseImages";

interface IWarehouseRepo {
  create(warehouse: any): Promise<void>;
  update(warehouse: any): Promise<any>;
  delete(warehouseId: number): Promise<any>;
  getById(warehouseId: number): Promise<any>;
  get(): Promise<any>;
}

export class WarehouseRepo implements IWarehouseRepo {

  async create(warehouse: any): Promise<void> {
    try {
      const createdWarehouse = await Wearhouse.create({
        name: warehouse.name,
        address: warehouse.address,
        contactNo: warehouse.contactNo,
        description: warehouse.description
      });

      const imgList = warehouse.imageList as Image[];

      imgList.forEach(async element => {
        const img = await Image.create({
          imageName : element.imageName,
          imageData : element.imageData,
          imageURL : element.imageURL,
          imagelocation : element.imagelocation,
          imageDescription : element.imageDescription,
        });

        const wearhouseImages = await WarehouseImage.create({
          warehouseId : createdWarehouse.id,
          imageId : img.id,
        });

      });
      
      
    } catch (err: any) {
      const result = await Wearhouse.findOne({ where: { name: warehouse.name } });

      if (result) {
        throw new Error("Failed to create Warehouse! Warehouse with this name already exists!");
      }
      throw new Error("Failed to create Warehouse! | " + err.message);
    }
  }

  async update(warehouse: any): Promise<any> {
    try {
      const result = await Wearhouse.findOne({ where: { id: warehouse.id } });
      if (!result) {
        return false;
      }

      result.name = warehouse.name;
      result.address = warehouse.address;
      result.contactNo = warehouse.contactNo;
      result.description = warehouse.description;
      result.imageList = warehouse.imageList;
      await result.save();

      const wimgList = await WarehouseImage.findAll({ where: { warehouseId: warehouse.id } }) as WarehouseImage[];
        
      await Promise.all(wimgList.map(async (imgElement) => {
        await Image.destroy({ where: { id: imgElement.imageId } });
      }));
      
      await WarehouseImage.destroy({ where: { warehouseId: warehouse.id } });

      const imgList = warehouse.imageList as Image[];

      imgList.forEach(async element => {
        const img = await Image.create({
          imageName : element.imageName,
          imageData : element.imageData,
          imageURL : element.imageURL,
          imagelocation : element.imagelocation,
          imageDescription : element.imageDescription,
        });

        const wearhouseImages = await WarehouseImage.create({
          warehouseId : warehouse.id,
          imageId : img.id,
        });
      });
      

      return true;
    } catch (err: any) {
      throw new Error("Failed to update Warehouse! | " + err.message);
    }
  }

  async delete(warehouseId: number): Promise<any> {
    try {
      const result = await Wearhouse.findAll({ where: { id: warehouseId } });
      if (!result || result.length === 0) {
        throw new Error("Data not found!");
      }
  
      await Promise.all(result.map(async (element) => {
        const wimgList = await WarehouseImage.findAll({ where: { warehouseId: element.id } }) as WarehouseImage[];
        
        await Promise.all(wimgList.map(async (imgElement) => {
          await Image.destroy({ where: { id: imgElement.imageId } });
        }));
        await WarehouseImage.destroy({ where: { warehouseId: element.id } });
      }));
  
      await Wearhouse.destroy({ where: { id: warehouseId }});
      return true;
    }catch (err: any) {
      throw new Error("Failed to delete Warehouse! | " + err.message);
    }
  }

  async getById(warehouseId: number): Promise<any> {
    try {
      const result = await Wearhouse.findAll({ where: { id: warehouseId } });
      if (!result || result.length === 0) {
        throw new Error("Data not found!");
      }
  
      const Wlist: { id: number; name: string; address: { no: string; street: string; city: string; }; contactNo: string; description: string; imageList: Image[]; createdAt: any; updatedAt: any; }[] = [];
      
      await Promise.all(result.map(async (element) => {
        const wimgList = await WarehouseImage.findAll({ where: { warehouseId: element.id } }) as WarehouseImage[];
        
        let imgList: Image[] = [];
        await Promise.all(wimgList.map(async (imgElement) => {
          const img = await Image.findOne({ where: { id: imgElement.imageId } }) as Image;
          imgList.push(img);
        }));
  
        
        const wwaerhouseTemp = {
          id: element.id,
          name: element.name,
          address: element.address,
          contactNo: element.contactNo,
          description: element.description,
          imageList: imgList,
          createdAt: element.createdAt,
          updatedAt: element.updatedAt,
        };
  
        Wlist.push(wwaerhouseTemp);
      }));
  
      return Wlist;
    }  catch (err: any) {
      throw new Error("Failed to get Warehouse! | " + err.message);
    }
  }

  async get(): Promise<any> {
    try {
      const result = await Wearhouse.findAll();
      if (!result || result.length === 0) {
        throw new Error("Data not found!");
      }
  
      const Wlist: { id: number; name: string; address: { no: string; street: string; city: string; }; contactNo: string; description: string; imageList: Image[]; createdAt: any; updatedAt: any; }[] = [];
      
      await Promise.all(result.map(async (element) => {
        const wimgList = await WarehouseImage.findAll({ where: { warehouseId: element.id } }) as WarehouseImage[];
        
        let imgList: Image[] = [];
        await Promise.all(wimgList.map(async (imgElement) => {
          const img = await Image.findOne({ where: { id: imgElement.imageId } }) as Image;
          imgList.push(img);
        }));
  
        
        const wwaerhouseTemp = {
          id: element.id,
          name: element.name,
          address: element.address,
          contactNo: element.contactNo,
          description: element.description,
          imageList: imgList,
          createdAt: element.createdAt,
          updatedAt: element.updatedAt,
        };
  
        Wlist.push(wwaerhouseTemp);
      }));
  
      return Wlist;
    } catch (err: any) {
      throw new Error("Failed to get Warehouse! | " + err.message);
    }
  }
  
}
