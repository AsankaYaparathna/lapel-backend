import { OpenTime } from "../../model/Warehouse/Showroom/OpeningTime";
import { Showroom } from "../../model/Warehouse/Showroom/Showroom";
import { ShowroomImages } from "../../model/Warehouse/Showroom/ShowroomImages";
import { Image } from "../../model/Common/Images";

interface IShowroomRepo {
  create(showroom: any): Promise<void>;
  update(showroom: any): Promise<any>;
  delete(showroomId: number): Promise<any>;
  getById(showroomId: number): Promise<any>;
  get(): Promise<any>;
}

export class ShowroomRepo implements IShowroomRepo {
  async create(showroom: any): Promise<void> {
    try {
      const createdShowroom =await Showroom.create({
        name: showroom.name,
        address: showroom.address,
        googleLocation: showroom.googleLocation,
        contactNo: showroom.contactNo,
        description: showroom.description,
        isLive: showroom.isLive,
      });

      const imgList = showroom.imageList as Image[];
     
      imgList.forEach(async element => {
        const img = await Image.create({
          imageName : element.imageName,
          imageData : element.imageData,
          imageURL : element.imageURL,
          imagelocation : element.imagelocation,
          imageDescription : element.imageDescription,
        });

        const showroomImages = await ShowroomImages.create({
          showroomId : createdShowroom.id,
          imageId : img.id,
        });
      });

      const timeList = showroom.timeList as OpenTime[];
      timeList.forEach(async element => {
        const time = await OpenTime.create({
          showroomId : createdShowroom.id,
          day : element.day,
          isOpen : element.isOpen,
          openFrom : element.openFrom,
          openTo : element.openTo
        });
      });

    } catch (err: any) {
      const result = await Showroom.findOne({ where: { name: showroom.name } });

      if (result) {
        throw new Error("Failed to create Showroom! Showroom with this name already exists!");
      }
      throw new Error("Failed to create Showroom! | " + err.message);
    }
  }

  async update(showroom: any): Promise<any> {
    try {
      const result = await Showroom.findOne({ where: { id: showroom.id } });
      if (!result) {
        return false;
      }

      result.name = showroom.name;
      result.address = showroom.address;
      result.googleLocation = showroom.googleLocation;
      result.contactNo = showroom.contactNo;
      result.description = showroom.description;
      result.isLive = showroom.isLive;
      await result.save();

      const wimgList = await ShowroomImages.findAll({ where: { showroomId: showroom.id } }) as ShowroomImages[];
        
      await Promise.all(wimgList.map(async (imgElement) => {
        await Image.destroy({ where: { id: imgElement.imageId } });
      }));
      
      await ShowroomImages.destroy({ where: { showroomId: showroom.id } });
      await OpenTime.destroy({ where: { showroomId: showroom.id } });

      const imgList = showroom.imageList as Image[];

      imgList.forEach(async element => {
        const img = await Image.create({
          imageName : element.imageName,
          imageData : element.imageData,
          imageURL : element.imageURL,
          imagelocation : element.imagelocation,
          imageDescription : element.imageDescription,
        });

        const showroomImages = await ShowroomImages.create({
          showroomId : showroom.id,
          imageId : img.id,
        });
      });

      const timeList = showroom.timeList as OpenTime[];
      timeList.forEach(async element => {
        const time = await OpenTime.create({
          showroomId : showroom.id,
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

  async delete(showroomId: number): Promise<any> {
    try {
      const result = await Showroom.findAll({ where: { id: showroomId } });
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
  
      await Showroom.destroy({ where: { id: showroomId }});
      return true;
    } catch (err: any) {
      throw new Error("Failed to delete Showroom! | " + err.message);
    }
  }

  async getById(showroomId: number): Promise<any> {
    try {
      const result = await Showroom.findAll({ where: { id: showroomId } });
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
