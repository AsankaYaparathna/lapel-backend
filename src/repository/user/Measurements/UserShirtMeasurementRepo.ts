import { ShirtBodyMeasurement } from "../../../model/Customer/Measurements/Shirt/ShirtBodyMeasurement";
import { ShirtCopyFavorite } from "../../../model/Customer/Measurements/Shirt/ShirtCopyFavorite";
import { ShirtStandardSize } from "../../../model/Customer/Measurements/Shirt/ShirtStandardSize";

interface IUserShirtMeasurementRepo {
  shirtBodyMeasurementCreate(model: any): Promise<void>;
  shirtBodyMeasurementUpdate(model: any): Promise<any>;
  shirtBodyMeasurementDelete(id: number): Promise<any>;
  getShirtBodyMeasurementById(id: number): Promise<any>;

  shirtStanSizeMeasurementCreate(model: any): Promise<void>;
  updateShirtStandardSize(model: any): Promise<any>;
  getShirtStandardSizeById(id: number): Promise<any> ;
  standardSizeDelete(id: number): Promise<any>;

  shirtCopyFavurementCreate(model: any): Promise<void>;
  updateShirtCopyFav(model: any): Promise<any>;
  getShirtCopyFavById(id: number): Promise<any>;
  deleteShirtCopyFav(id: number): Promise<any>;
}

export class UserShirtMeasurementRepo implements IUserShirtMeasurementRepo {
  
  //body
  async shirtBodyMeasurementCreate(model: any): Promise<void> {
    try {
      await ShirtBodyMeasurement.create(model);
    } catch (err : any) {
      throw new Error("Failed to create User measurement!| "+err.message);
    }
  }

  async shirtBodyMeasurementUpdate(model: any): Promise<any> {
    try {
      const result = await ShirtBodyMeasurement.findOne({ where: { id : model.id } });
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

  async shirtBodyMeasurementDelete(id: number): Promise<boolean> {
    try {
        const result = await ShirtBodyMeasurement.findOne({ where: { id : id } });
        if (result) {
            await result.destroy();
            return true;
        } else {return false; }
    } catch (error) {
        throw new Error("Failed to delete shirt body measurement: " + error);
    }
  }

  async getShirtBodyMeasurementById(id: number): Promise<any> {
      try {
        const result = await ShirtBodyMeasurement.findOne({ where: { id : id } });
          return result;
      } catch (error) {
          throw new Error("Failed to get shirt body measurement by ID: " + error);
      }
  }

  //standerd
  async shirtStanSizeMeasurementCreate(model: any): Promise<void> {
    try {
      await ShirtStandardSize.create(model);
    } catch (err : any) {
      throw new Error("Failed to create User!| "+err.message);
    }
  }

  async updateShirtStandardSize(model: any): Promise<any> {
    try {
        const result = await ShirtStandardSize.findByPk(model.id);
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

  async getShirtStandardSizeById(id: number): Promise<any> {
      try {
          const result = await ShirtStandardSize.findByPk(id);
          return result;
      } catch (error) {
          throw new Error("Failed to get shirt standard size by ID: " + error);
      }
  }

  async standardSizeDelete(id: number): Promise<any> {
      try {
          const result = await ShirtStandardSize.findByPk(id);
          if (result) {
              await result.destroy();
              return true;
          } else {return false; }
      } catch (error) {
          throw new Error("Failed to delete shirt standard size: " + error);
      }
  }

  //copyFav
  async shirtCopyFavurementCreate(model: any): Promise<void> {
    try {
      await ShirtCopyFavorite.create(model);
    } catch (err : any) {
      throw new Error("Failed to create User!| "+err.message);
    }
  }

  async updateShirtCopyFav(model: any): Promise<any> {
    try {
        const result = await ShirtCopyFavorite.findByPk(model.id);
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

  async getShirtCopyFavById(id: number): Promise<any> {
    try {
        const result = await ShirtCopyFavorite.findByPk(id);
        return result;
    } catch (error) {
        throw new Error("Failed to get shirt standard size by ID: " + error);
    }
  }

  async deleteShirtCopyFav(id: number): Promise<any> {
    try {
        const result = await ShirtCopyFavorite.findByPk(id);
        if (result) {
            await result.destroy();
            return true;
        } else {return false; }
    } catch (error) {
        throw new Error("Failed to delete shirt standard size: " + error);
    }
  }


}
