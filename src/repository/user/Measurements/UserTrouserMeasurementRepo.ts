import { TrouserBodyMeasurement } from "../../../model/Customer/Measurements/Trouser/TrouserBodyMeasurement";
import { TrouserCopyFavorite } from "../../../model/Customer/Measurements/Trouser/TrouserCopyFavorite";
import { TrouserStandardSize } from "../../../model/Customer/Measurements/Trouser/TrouserStandardSize";

interface IUserTrouserMeasurementRepo {
  bodyMeasurementCreate(model: any): Promise<void>;
  bodyMeasurementUpdate(model: any): Promise<any>;
  bodyMeasurementDelete(id: number): Promise<any>;
  bodyMeasurementGetById(id: number): Promise<any>;

  standardSizecreate(model: any): Promise<void>;
  standardSizeUpdate(model: any): Promise<any>;
  standardSizeGetById(id: number): Promise<any> ;
  standardSizeDelete(id: number): Promise<any>;

  copyFavurementCreate(model: any): Promise<void>;
  copyFavUpdate(model: any): Promise<any>;
  copyFavGetById(id: number): Promise<any>;
  copyFavDelete(id: number): Promise<any>;
}

export class UserTrouserMeasurementRepo implements IUserTrouserMeasurementRepo {
  
  //body
  async bodyMeasurementCreate(model: any): Promise<void> {
    try {
      await TrouserBodyMeasurement.create(model);
    } catch (err : any) {
      throw new Error("Failed to create User measurement!| "+err.message);
    }
  }

  async bodyMeasurementUpdate(model: any): Promise<any> {
    try {
      const result = await TrouserBodyMeasurement.findOne({ where: { id : model.id } });
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
        const result = await TrouserBodyMeasurement.findOne({ where: { id : id } });
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
        const result = await TrouserBodyMeasurement.findOne({ where: { id : id } });
        return result;
      } catch (error) {
          throw new Error("Failed to get shirt body measurement by ID: " + error);
      }
  }

  //standerd
  async standardSizecreate(model: any): Promise<void> {
    try {
      await TrouserStandardSize.create(model);
    } catch (err : any) {
      throw new Error("Failed to create User!| "+err.message);
    }
  }

  async standardSizeUpdate(model: any): Promise<any> {
    try {
        const result = await TrouserStandardSize.findByPk(model.id);
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
          const result = await TrouserStandardSize.findByPk(id);
          return result;
      } catch (error) {
          throw new Error("Failed to get shirt standard size by ID: " + error);
      }
  }

  async standardSizeDelete(id: number): Promise<any> {
      try {
          const result = await TrouserStandardSize.findByPk(id);
          if (result) {
              await result.destroy();
              return true;
          } else {return false; }
      } catch (error) {
          throw new Error("Failed to delete shirt standard size: " + error);
      }
  }

  //copyFav
  async copyFavurementCreate(model: any): Promise<void> {
    try {
      await TrouserCopyFavorite.create(model);
    } catch (err : any) {
      throw new Error("Failed to create User!| "+err.message);
    }
  }

  async copyFavUpdate(model: any): Promise<any> {
    try {
        const result = await TrouserCopyFavorite.findByPk(model.id);
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

  async copyFavGetById(id: number): Promise<any> {
    try {
        const result = await TrouserCopyFavorite.findByPk(id);
        return result;
    } catch (error) {
        throw new Error("Failed to get shirt standard size by ID: " + error);
    }
  }

  async copyFavDelete(id: number): Promise<any> {
    try {
        const result = await TrouserCopyFavorite.findByPk(id);
        if (result) {
            await result.destroy();
            return true;
        } else {return false; }
    } catch (error) {
        throw new Error("Failed to delete shirt standard size: " + error);
    }
  }


}
