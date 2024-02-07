import { WaistcoatBodyMeasurement } from "../../../model/Customer/Measurements/Waistcoat/WaistcoatBodyMeasurement";
import { WaistcoatStandardSize } from "../../../model/Customer/Measurements/Waistcoat/WaistcoatStandardSize";

interface IUserWaistcoatMeasurementRepo {
  bodyMeasurementCreate(model: any): Promise<void>;
  bodyMeasurementUpdate(model: any): Promise<any>;
  bodyMeasurementDelete(id: number): Promise<any>;
  bodyMeasurementGetById(id: number): Promise<any>;

  standardSizecreate(model: any): Promise<void>;
  standardSizeUpdate(model: any): Promise<any>;
  standardSizeGetById(id: number): Promise<any> ;
  standardSizeDelete(id: number): Promise<any>;
}

export class UserWaistcoatMeasurementRepo implements IUserWaistcoatMeasurementRepo {
  
  //body
  async bodyMeasurementCreate(model: any): Promise<void> {
    try {
      await WaistcoatBodyMeasurement.create(model);
    } catch (err : any) {
      throw new Error("Failed to create User measurement!| "+err.message);
    }
  }

  async bodyMeasurementUpdate(model: any): Promise<any> {
    try {
      const result = await WaistcoatBodyMeasurement.findOne({ where: { id : model.id } });
      if (result) {
        await result.update(model);
        return true;
    } else {
      return false;
    }
    } catch (err : any) {
      throw new Error("Failed to add User measurement!| "+err.message);
    }
  }

  async bodyMeasurementDelete(id: number): Promise<boolean> {
    try {
        const result = await WaistcoatBodyMeasurement.findOne({ where: { id : id } });
        if (result) {
            await result.destroy();
            return true;
        } else {return false; }
    } catch (error) {
        throw new Error("Failed to delete shirt body measurement: " + error);
    }
  }

  async bodyMeasurementGetById(id: number): Promise<any> {
      try {
        const result = await WaistcoatBodyMeasurement.findOne({ where: { id : id } });
          return result;
      } catch (error) {
          throw new Error("Failed to get shirt body measurement by ID: " + error);
      }
  }

  //standerd
  async standardSizecreate(model: any): Promise<void> {
    try {
      await WaistcoatStandardSize.create(model);
    } catch (err : any) {
      throw new Error("Failed to create User!| "+err.message);
    }
  }

  async standardSizeUpdate(model: any): Promise<any> {
    try {
        const result = await WaistcoatStandardSize.findByPk(model.id);
        if (result) {
            await result.update(model);
            return true;
        } else {
          return false;
        }
    } catch (error) {
        throw new Error("Failed to update shirt standard size: " + error);
    }
  }

  async standardSizeGetById(id: number): Promise<any> {
      try {
          const result = await WaistcoatStandardSize.findByPk(id);
          return result;
      } catch (error) {
          throw new Error("Failed to get shirt standard size by ID: " + error);
      }
  }

  async standardSizeDelete(id: number): Promise<any> {
      try {
          const result = await WaistcoatStandardSize.findByPk(id);
          if (result) {
              await result.destroy();
              return true;
          } else {return false; }
      } catch (error) {
          throw new Error("Failed to delete shirt standard size: " + error);
      }
  }
}
