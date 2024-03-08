import { Image } from "../../model/Common/Images";
import { BlazerBodyMeasurement } from "../../model/Customer/Measurements/Blazer/BlazerBodyMeasurement";
import { BlazerStandardSize } from "../../model/Customer/Measurements/Blazer/BlazerStandardSize";
import { FullBodyMeasurement } from "../../model/Customer/Measurements/FullBody/FullBodyMeasurement";
import { ShirtBodyMeasurement } from "../../model/Customer/Measurements/Shirt/ShirtBodyMeasurement";
import { ShirtCopyFavorite } from "../../model/Customer/Measurements/Shirt/ShirtCopyFavorite";
import { ShirtStandardSize } from "../../model/Customer/Measurements/Shirt/ShirtStandardSize";
import { TrouserBodyMeasurement } from "../../model/Customer/Measurements/Trouser/TrouserBodyMeasurement";
import { TrouserCopyFavorite } from "../../model/Customer/Measurements/Trouser/TrouserCopyFavorite";
import { TrouserStandardSize } from "../../model/Customer/Measurements/Trouser/TrouserStandardSize";
import { WaistcoatBodyMeasurement } from "../../model/Customer/Measurements/Waistcoat/WaistcoatBodyMeasurement";
import { WaistcoatStandardSize } from "../../model/Customer/Measurements/Waistcoat/WaistcoatStandardSize";
import { User } from "../../model/Customer/User";
import { hashPassword, verifyPassword } from "../../utils/Utils";

interface IUserRepo {
  create(user: User): Promise<void>;
  updateMobileVerificationStatus(UserId: number, isVerified: boolean): Promise<void>;
  getOtpByUserMobile(mobileNumber: string): Promise<User | null>;
  update(modal: User): Promise<any>;
  delete(mId: number): Promise<any>;
  getById(mId: number): Promise<any>;
  get(): Promise<User[]>;
  login(mobileNumber: string, password: string): Promise<Boolean | null>;
  forgetPassword(model: User): Promise<void>;
  verifyPassword(user: User, providedPassword: string): Promise<boolean>;
  updateInfo(modal: any): Promise<any>;
  updateSecurity(modal: any): Promise<any>;
  updateAvatar(modal: any): Promise<any>;
  updateBillingAddress(modal: any): Promise<any>;
  updateDeliveryAddress(modal: any): Promise<any>;
  measurementGetByMobile(id : string): Promise<any>;
  getByMobileCheck(mobile: string): Promise<any>;
}

export class UserRepo implements IUserRepo {
  
  async create(model: User): Promise<void> {
    try {
      const encpw = hashPassword(model.password);
      model.password = encpw;
      await User.create({
        fullName: model.fullName,
        mobileNumber: model.mobileNumber,
        email: model.email,
        password: encpw,
        otp: model.otp,
        isMobileVerified: model.isMobileVerified,
        customerId : model.customerId,
        isActive : model.isActive,
        userType : model.userType
      });
    } catch (err : any) {
      const result = await User.findOne({ where: { mobileNumber : model.mobileNumber } });

      if (result) {
        throw new Error("Failed to create User!| User with this mobile number already exists!");
      }
      throw new Error("Failed to create User!| "+ err.message);
    }
  }

  async forgetPassword(model: User): Promise<void> {
    try {
      const encpw = hashPassword(model.password);

      const existUser = await User.findOne({ where: { mobileNumber : model.mobileNumber } });
      
      
      if(existUser){
        
        if(existUser.otp.toString().match(model.otp.toString())){
          existUser.password = encpw;
          existUser.isMobileVerified = true;
          await existUser.save();
        }
        else{
          throw new Error("OTP is invalied!");
        }
      }
      
      
    } catch (err : any) {
      throw new Error("Failed to update password!| | "+err.message);
    }
  }
  async verifyPassword(user: User, providedPassword: string): Promise<boolean> {
    return verifyPassword(user.password, providedPassword);
  }

  async updateMobileVerificationStatus(UserId: number, isVerified: boolean): Promise<void> {
    try {
      const result = await User.findOne({ where: { id: UserId } });

      if (!result) {
        throw new Error("User not found!");
      }

      result.isMobileVerified = isVerified;
      
      await result.save();
    } catch (err : any) {
      throw new Error("Failed to update mobile verification status! | "+err.message);
    }
  }

  async getOtpByUserMobile(mobileNumber: string): Promise<User | null> {
    try {
      const result = await User.findOne({
        where: { mobileNumber: mobileNumber },
        attributes: ['id', 'mobileNumber', 'otp', 'isMobileVerified'],
      });

      if (!result) {
        throw new Error("User not found!");
      }

      if (result) {
        return result;
      } else {
        return null;
      }
    } catch (err : any) {
      throw new Error("Failed to get OTP! | "+err.message);
    }
  }

  async login(mobileNumber: string, password: string): Promise<Boolean | null> {
    try {
      const result = await User.findOne({
        where: { mobileNumber: mobileNumber },
        attributes: ['id', 'mobileNumber', 'password', 'isMobileVerified'],
      });

      if (!result) {
        throw new Error("User not found!");
      }

      if (result) {
        if(verifyPassword(result.password, password)){
          if(result.isMobileVerified){
            return true;
          }
          else{
            throw new Error("User not verifyied!");
          }
        }
        else{
          return false;
        }
      } else {
        return null;
      }
    } catch (err : any) {
      throw new Error(""+err.message);
    }
  }

  async update(modal: User): Promise<any> {
    try {
      const result = await User.findOne({ where: { mobileNumber: modal.mobileNumber } });
      if (!result) {
        return false;
      }
      result.fullName = modal.fullName;
      //result.mobileNumber = modal.mobileNumber;
      result.email = modal.email;
      await result.save();
      return true;
    } catch (err : any) {
      throw new Error("Failed to update! | "+err.message);
    }
  }

  async updateOtp(modal: User): Promise<void> {
    try {
      const result = await User.findOne({ where: { mobileNumber: modal.mobileNumber }, });
      
      if (!result) {
        throw new Error("Data not found!");
      }

      result.otp = modal.otp;
      await result.save();
      
    } catch (err : any) {
      throw new Error("Failed to update! | "+err.message);
    }
  }

  async delete(mId: number): Promise<any> {
    try {
      const result = await User.findOne({ where: { id: mId } });
      if (!result) {
        return null;
      }
      await result.destroy();
      return true;
    } catch (err : any) {
      throw new Error("Failed to delete! | "+err.message);
    }
  }
  
  async getById(mId: number): Promise<any> {
    try {
      const result = await User.findOne({ where: { id: mId } });
      if (!result) {
        return null;
      }
      return result;
    } catch (err : any) {
      throw new Error("Failed to get! | "+err.message);
    }
  }

  async getByMobileCheck(mobile: string): Promise<any> {
    try {
      const result = await User.findOne({ where: { mobileNumber : mobile } }) as any;
      if (!result) {
        return null;
      }
      var image = await Image.findOne({ where: {id : result.avatar}});
      if(image){
        result.avatar = image;
      }
      return result;
    } catch (err : any) {
      throw new Error("Failed to get! | "+err.message);
    }
  }

  async getByEmail(email: string): Promise<any> {
    try {
      const result = await User.findOne({ where: { email : email } });
      if (!result) {
        return null;
      }
      return result;
    } catch (err : any) {
      throw new Error("Failed to get! | "+err.message);
    }
  }

  async get(): Promise<User[]> {
    try {
      const result = await User.findAll();
      if (!result) {
        throw new Error("Data not found!");
      }
      return result;
    } catch (err : any) {
      throw new Error("Failed to get! | "+err.message);
    }
  }

  //profile
  async updateInfo(modal: any): Promise<any> {
    try {
      const result = await User.findOne({ where: { mobileNumber: modal.mobileNumber } });
      if (!result) { return false; }

      result.fullName = modal.fullName;
      result.email = modal.email;
      await result.save();
      return true;
    } catch (err : any) {
      throw new Error("Failed to update! | "+err.message);
    }
  }

  async updateSecurity(modal: any): Promise<any> {
    try {
      const result = await User.findOne({ where: { mobileNumber: modal.mobileNumber } });
      if (!result) { return false; }
      const encpw = hashPassword(modal.newPassword);

      if(verifyPassword(result.password, modal.currentPassword)){
        result.password = encpw;
        await result.save();
        return true;
      }
      else{
        return false;
      }
      
    } catch (err : any) {
      throw new Error("Failed to update! | "+err.message);
    }
  }

  async updateAvatar(modal: any): Promise<any> {
    try {
      const result = await User.findOne({ where: { mobileNumber: modal.mobileNumber } });
      if (!result) { return false; }

      const avatar = await Image.create({
        imageName: modal.avatar.imageName,
        imageData: modal.avatar.imageData,
        imageURL: modal.avatar.imageURL,
        imagelocation: modal.avatar.imagelocation,
        imageDescription: modal.avatar.imageDescription,
      });
      result.avatar = avatar.id;
      await result.save();
      return true;
    } catch (err : any) {
      throw new Error("Failed to update! | "+err.message);
    }
  }
  
  async updateBillingAddress(modal: any): Promise<any> {
    try {
      const result = await User.findOne({ where: { mobileNumber: modal.mobileNumber } });
      if (!result) { return false; }

      result.billing = modal.billing;
      await result.save();
      return true;

    } catch (err : any) {
      throw new Error("Failed to update! | "+err.message);
    }
  }
  
  async updateDeliveryAddress(modal: any): Promise<any> {
    try {
      const result = await User.findOne({ where: { mobileNumber: modal.mobileNumber } });
      if (!result) { return false; }

      if(result.billing == null){ return false; }
      
      const newDelivery = modal.sameAsBilling ? result.billing : modal.delivery;
      result.delivery = newDelivery;
      result.sameAsBilling = modal.sameAsBilling;
      await result.save();
      return true;
      
    } catch (err : any) {
      throw new Error("Failed to update! | "+err.message);
    }
  }

  //Measurements
  async measurementGetByMobile(id : string): Promise<any> {
    try {
      const result = await User.findOne({ where: { mobileNumber : id } });
      if (!result) {
        return null;
      }

      const shirtBodyMeasurement = await ShirtBodyMeasurement.findOne({ where: { customerId : result.id } });
      const shirtCopyFavorite = await ShirtCopyFavorite.findOne({ where: { customerId : result.id } });
      const shirtStandardSize = await ShirtStandardSize.findOne({ where: { customerId : result.id } });

      const trouserBodyMeasurement = await TrouserBodyMeasurement.findOne({ where: { customerId : result.id } });
      const trouserCopyFavorite = await TrouserCopyFavorite.findOne({ where: { customerId : result.id } });
      const trouserStandardSize = await TrouserStandardSize.findOne({ where: { customerId : result.id } });

      const blazerBodyMeasurement = await BlazerBodyMeasurement.findOne({ where: { customerId : result.id } });
      const blazerStandardSize = await BlazerStandardSize.findOne({ where: { customerId : result.id} });

      const waistcoatBodyMeasurement = await WaistcoatBodyMeasurement.findOne({ where: { customerId : result.id } });
      const waistcoatStandardSize = await WaistcoatStandardSize.findOne({ where: { customerId : result.id } });

      const fullBodyMeasurement = await FullBodyMeasurement.findOne({ where: { customerId : result.id } });
    
      // var measurementData = {
      //   shirt : {
      //     bodyMeasurement : shirtBodyMeasurement,
      //     standerdSize : shirtStandardSize,
      //     copyFavorite : shirtCopyFavorite,
      //   },
      //   trouser : {
      //     bodyMeasurement : trouserBodyMeasurement,
      //     standerdSize : trouserStandardSize,
      //     copyFavorite : trouserCopyFavorite,
      //   },
      //   blazer : {
      //     bodyMeasurement : blazerBodyMeasurement,
      //     standerdSize : blazerStandardSize,
      //   },
      //   waistcoat : {
      //     bodyMeasurement : waistcoatBodyMeasurement,
      //     standerdSize : waistcoatStandardSize,
      //   },
      //   fullBody : {
      //     bodyMeasurement : fullBodyMeasurement
      //   }
      // }

      var measurementData = [
        {
          customProduct : 'Shirt',
          measurementType : 'Body Measurement',
          data : shirtBodyMeasurement
        },
        {
          customProduct : 'Shirt',
          measurementType : 'Standard Size',
          data : shirtStandardSize
        },
        {
          customProduct : 'Shirt',
          measurementType : 'Copy Favorite',
          data : shirtCopyFavorite
        },
        {
          customProduct : 'Trouser',
          measurementType : 'Body Measurement',
          data : trouserBodyMeasurement
        },
        {
          customProduct : 'Trouser',
          measurementType : 'Standard Size',
          data : trouserStandardSize
        },
        {
          customProduct : 'Trouser',
          measurementType : 'Copy Favorite',
          data : trouserCopyFavorite
        },
        {
          customProduct : 'Blazer',
          measurementType : 'Body Measurement',
          data : blazerBodyMeasurement
        },
        {
          customProduct : 'Blazer',
          measurementType : 'Standard Size',
          data : blazerStandardSize
        },
        {
          customProduct : 'Waistcoat',
          measurementType : 'Body Measurement',
          data : waistcoatBodyMeasurement
        },
        {
          customProduct : 'Waistcoat',
          measurementType : 'Standard Size',
          data : waistcoatStandardSize
        },
        {
          customProduct : 'FullBody',
          measurementType : 'Body Measurement',
          data : fullBodyMeasurement
        },
    ]

      return measurementData;
    } catch (err : any) {
      throw new Error("Failed to get! | "+err.message);
    }
  }

}
