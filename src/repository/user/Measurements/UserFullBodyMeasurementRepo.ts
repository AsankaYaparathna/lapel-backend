import { FullBodyMeasurement } from "../../../model/Customer/Measurements/FullBody/FullBodyMeasurement";

interface IUserFullBodyMeasurementRepo {
  bodyMeasurementCreate(model: any): Promise<void>;
  bodyMeasurementUpdate(model: any): Promise<any>;
  bodyMeasurementDelete(id: number): Promise<any>;
  bodyMeasurementGetById(id: number): Promise<any>;

}

export class UserFullBodyMeasurementRepo implements IUserFullBodyMeasurementRepo {
  
  //body
  async bodyMeasurementCreate(model: any): Promise<void> {
    try {
      await FullBodyMeasurement.create(model);
    } catch (err : any) {
      throw new Error("Failed to create User measurement!| "+err.message);
    }
  }

  async bodyMeasurementUpdate(model: any): Promise<any> {
    try {
      const result = await FullBodyMeasurement.findOne({ where: { id : model.id } });
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
        const result = await FullBodyMeasurement.findOne({ where: { id : id } });
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
        const result = await FullBodyMeasurement.findOne({ where: { id : id } });
          return result;
      } catch (error) {
          throw new Error("Failed to get shirt body measurement by ID: " + error);
      }
  }

}
