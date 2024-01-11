import { User } from "../model/User";
import { hashPassword, verifyPassword } from "../utils/Utils";

interface IUserRepo {
  create(user: User): Promise<void>;
  updateMobileVerificationStatus(UserId: number, isVerified: boolean): Promise<void>;
  getOtpByUserMobile(mobileNumber: string): Promise<User | null>;
  update(modal: User): Promise<any>;
  delete(mId: number): Promise<any>;
  getById(mId: number): Promise<any>;
  get(): Promise<User[]>;
  login(mobileNumber: string, password: string): Promise<Boolean | null>;
}

export class UserRepo implements IUserRepo {
  
  async create(model: User): Promise<void> {
    try {
      const encpw = hashPassword(model.password);//hashPassword(model.password);
      await User.create({
        fullName: model.fullName,
        mobileNumber: model.mobileNumber,
        email: model.email,
        password: encpw,
        otp: model.otp,
        isMobileVerified: model.isMobileVerified
      });
    } catch (err : any) {
      const result = await User.findOne({ where: { mobileNumber : model.mobileNumber } });

      if (result) {
        throw new Error("Failed to create User!| User with this mobile number already exists!");
          return;
      }
      throw new Error("Failed to create User!| | "+err.message);
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
      const result = await User.findOne({ where: { mobileNumber : mobile } });
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
}
