import { Category } from "../../model/Common/Category/Category";
import { CategoryType } from "../../model/Common/Category/CategoryType";
import { SubCategory } from "../../model/Common/Category/SubCategory";
import { Characteristics } from "../../model/Common/Characteristic";
import { Color } from "../../model/Common/Color";
import { Image } from "../../model/Common/Images";
import { Material } from "../../model/Common/Material";
import { Opacity } from "../../model/Common/Opacity";
import { Pattern } from "../../model/Common/Pattern";
import { Series } from "../../model/Common/Series";
import { UnitType } from "../../model/Common/UnitType";
import { Weight } from "../../model/Common/Weight";

interface ICommonRepo {
  //Color
  createColor(model: Color): Promise<void>;
  getColor(): Promise<Color[]>;

  //Pattern
  createPattern(model: Pattern): Promise<void>;
  getPattern(): Promise<Pattern[]>;
  
  //Material
  createMaterial(model: Material): Promise<void>;
  getMaterial(): Promise<Material[]>;

  //Characteristics
  createCharacteristics(model: Characteristics): Promise<void>;
  getCharacteristics(): Promise<Characteristics[]>;

  //Image
  createImage(model: Image): Promise<void>;
  getImageById(id: number): Promise<Image>;
  updateImage(model: Image): Promise<any>;
  deleteImage(id: number): Promise<any>;
  
  //Opacity
  createOpacity(model: Opacity): Promise<void>;
  getOpacity(): Promise<Opacity[]>;
  
  //Series
  createSeries(model: Series): Promise<void>;
  getSeries(): Promise<Series[]>;
  
  //Unit Type
  createUnitType(model: UnitType): Promise<void>;
  getUnitType(): Promise<UnitType[]>;

  //Weight
  createWeight(model: Weight): Promise<void>;
  getWeight(): Promise<Weight[]>;

  //Category Type
  createCategoryType(model: CategoryType): Promise<void>;
  getCategoryType(): Promise<CategoryType[]>;
  getCategoryTypeById(id: number): Promise<CategoryType>;
  updateCategoryType(model: CategoryType): Promise<any>;
  deleteCategoryType(id: number): Promise<any>;

  //Category
  createCategory(model: Category): Promise<void>;
  getCategoryById(id: number): Promise<any>;
  getCategory(): Promise<Category[]>;
  updateCategory(model: Category): Promise<any>;
  deleteCategory(id: number): Promise<any>;

  //Sub Category
  createSubCategory(model: SubCategory): Promise<void>;
  getSubCategory(): Promise<SubCategory[]>;
  getSubCategoryById(id: number): Promise<SubCategory>;
  updateSubCategory(model: SubCategory): Promise<any>;
  deleteSubCategory(id: number): Promise<any>;
}

export class CommonRepo implements ICommonRepo {
  //Color
  async createColor(model: Color): Promise<void> {
    try {
      await Color.create({
        colorCode : model.colorCode
      });
    } catch (err: any) {
      const result = await Color.findOne({ where: { colorCode: model.colorCode } });

      if (result) {
        throw new Error("Failed to create! this is already exists!");
      }
      throw new Error("Failed to create! | " + err.message);
    }
  }
  async getColor(): Promise<Color[]> {
    try {
      const result = await Color.findAll();

      if (!result) {
        throw new Error("Data not found!");
      }
      return result;
    } catch (err: any) {
      throw new Error("Failed to get Load data! | " + err.message);
    }
  }

  //Pattern
  async createPattern(model: Pattern): Promise<void> {
    try {
      await Pattern.create({
        name : model.name
      });
    } catch (err: any) {
      const result = await Pattern.findOne({ where: { name: model.name } });

      if (result) {
        throw new Error("Failed to create! this is already exists!");
      }
      throw new Error("Failed to create! | " + err.message);
    }
  }
  async getPattern(): Promise<Pattern[]> {
    try {
      const result = await Pattern.findAll();
      if (!result) {
        throw new Error("Data not found!");
      }
      return result;
    } catch (err: any) {
      throw new Error("Failed to get Load data! | " + err.message);
    }
  }

  //Material
  async createMaterial(model: Material): Promise<void> {
    try {
      await Material.create({
        name : model.name
      });
    } catch (err: any) {
      const result = await Material.findOne({ where: { name: model.name } });

      if (result) {
        throw new Error("Failed to create! this is already exists!");
      }
      throw new Error("Failed to create! | " + err.message);
    }
  }
  async getMaterial(): Promise<Material[]> {
    try {
      const result = await Material.findAll();
      if (!result) {
        throw new Error("Data not found!");
      }
      return result;
    } catch (err: any) {
      throw new Error("Failed to get Load data! | " + err.message);
    }
  }

  //Characteristics
  async createCharacteristics(model: Characteristics): Promise<void> {
    try {
      await Characteristics.create({
        name : model.name
      });
    } catch (err: any) {
      const result = await Characteristics.findOne({ where: { name: model.name } });

      if (result) {
        throw new Error("Failed to create! this is already exists!");
      }
      throw new Error("Failed to create! | " + err.message);
    }
  }
  async getCharacteristics(): Promise<Characteristics[]> {
    try {
      const result = await Characteristics.findAll();

      if (!result) {
        throw new Error("Data not found!");
      }
      return result;
    } catch (err: any) {
      throw new Error("Failed to get Load data! | " + err.message);
    }
  }

  //Image
  async createImage(model: Image): Promise<void> {
    try {
      await Image.create({
        imageName : model.imageName,
        imageData : model.imageData,
        imageDescription : model.imageDescription,
      });
    } catch (err: any) {
      throw new Error("Failed to create! | " + err.message);
    }
  }
  async getImageById(id: number): Promise<Image> {
    try {
      const result = await Image.findOne({ where : { id: id}});
      if (!result) {
        throw new Error("Data not found!");
      }
      return result;
    } catch (err: any) {
      throw new Error("Failed to get Load data! | " + err.message);
    }
  }
  async updateImage(model: Image): Promise<any> {
    try {
      const result = await Image.findOne({ where: { id: model.id } });
      if (!result) { return false; }

      result.imageName = model.imageName;
      result.imageData = model.imageData;
      result.imageDescription = model.imageDescription;
      await result.save();
      return true;
    } catch (err: any) {
      throw new Error("Failed to update Image! | " + err.message);
    }
  }
  async deleteImage(id: number): Promise<any> {
    try {
      const result = await Image.findOne({ where: { id: id } });
      if (!result) { return null; }
      await result.destroy();
      return true;
    } catch (err: any) {
      throw new Error("Failed to delete Image! | " + err.message);
    }
  }

  //Opacity
  async createOpacity(model: Opacity): Promise<void> {
    try {
      await Opacity.create({
        name : model.name
      });
    } catch (err: any) {
      const result = await Opacity.findOne({ where: { name: model.name } });

      if (result) {
        throw new Error("Failed to create! this is already exists!");
      }
      throw new Error("Failed to create! | " + err.message);
    }
  }
  async getOpacity(): Promise<Opacity[]> {
    try {
      const result = await Opacity.findAll();

      if (!result) {
        throw new Error("Data not found!");
      }
      return result;
    } catch (err: any) {
      throw new Error("Failed to get Load data! | " + err.message);
    }
  }

  //Series
  async createSeries(model: Series): Promise<void> {
    try {
      await Series.create({
        name : model.name
      });
    } catch (err: any) {
      const result = await Series.findOne({ where: { name: model.name } });

      if (result) {
        throw new Error("Failed to create! this is already exists!");
      }
      throw new Error("Failed to create! | " + err.message);
    }
  }
  async getSeries(): Promise<Series[]> {
    try {
      const result = await Series.findAll();

      if (!result) {
        throw new Error("Data not found!");
      }
      return result;
    } catch (err: any) {
      throw new Error("Failed to get Load data! | " + err.message);
    }
  }

  //Unit Type
  async createUnitType(model: UnitType): Promise<void> {
    try {
      await UnitType.create({
        name : model.name
      });
    } catch (err: any) {
      const result = await UnitType.findOne({ where: { name: model.name } });

      if (result) {
        throw new Error("Failed to create! this is already exists!");
      }
      throw new Error("Failed to create! | " + err.message);
    }
  }
  async getUnitType(): Promise<UnitType[]> {
    try {
      const result = await UnitType.findAll();

      if (!result) {
        throw new Error("Data not found!");
      }
      return result;
    } catch (err: any) {
      throw new Error("Failed to get Load data! | " + err.message);
    }
  }

   //Weight
   async createWeight(model: Weight): Promise<void> {
    try {
      await Weight.create({
        name : model.name
      });
    } catch (err: any) {
      const result = await Weight.findOne({ where: { name: model.name } });

      if (result) {
        throw new Error("Failed to create! this is already exists!");
      }
      throw new Error("Failed to create! | " + err.message);
    }
  }
  async getWeight(): Promise<Weight[]> {
    try {
      const result = await Weight.findAll();

      if (!result) {
        throw new Error("Data not found!");
      }
      return result;
    } catch (err: any) {
      throw new Error("Failed to get Load data! | " + err.message);
    }
  }

  //Category Type
  async createCategoryType(model: CategoryType): Promise<void> {
    try {
      await CategoryType.create({
        typeName : model.typeName
      });
    } catch (err: any) {
      throw new Error("Failed to create Category Type! | " + err.message);
    }
  }
  async getCategoryType(): Promise<CategoryType[]> {
    try {
      const result = await CategoryType.findAll();
      if (!result) {
        throw new Error("Data not found!");
      }
      return result;
    } catch (err: any) {
      throw new Error("Failed to get Category Type data! | " + err.message);
    }
  }
  async getCategoryTypeById(id: number): Promise<CategoryType> {
    try {
      const result = await CategoryType.findOne({ where : { id: id}});
      if (!result) {
        throw new Error("Data not found!");
      }
      return result;
    } catch (err: any) {
      throw new Error("Failed to get Category Type data! | " + err.message);
    }
  }
  async updateCategoryType(model: CategoryType): Promise<any> {
    try {
      const result = await CategoryType.findOne({ where: { id: model.id } });
      if (!result) { return false; }

      result.typeName = model.typeName;
      await result.save();
      return true;
    } catch (err: any) {
      throw new Error("Failed to update Category Type! | " + err.message);
    }
  }
  async deleteCategoryType(id: number): Promise<any> {
    try {
      const result = await CategoryType.findOne({ where: { id: id } });
      if (!result) { return null; }
      await result.destroy();
      return true;
    } catch (err: any) {
      throw new Error("Failed to delete Category Type! | " + err.message);
    }
  }

  //Category
  async createCategory(model: Category): Promise<void> {
    try {
      await Category.create({
        categoryType : model.categoryType,
        categoryName : model.categoryName,
        categoryDescription : model.categoryDescription,

      });
    } catch (err: any) {
      throw new Error("Failed to create! | " + err.message);
    }
  }
  async getCategoryById(id: number): Promise<any> {
    try {
      const result = await Category.findOne({ where : { id: id}});
      if (!result) {
        throw new Error("Data not found!");
      }
      return result;
    } catch (err: any) {
      throw new Error("Failed to get Category Type data! | " + err.message);
    }
  }
  async getCategory(): Promise<Category[]> {
    try {
      const result = await Category.findAll();
      if (!result) {
        throw new Error("Data not found!");
      }
      return result;
    } catch (err: any) {
      throw new Error("Failed to get Category data! | " + err.message);
    }
  }
  async updateCategory(model: Category): Promise<any> {
    try {
      const result = await Category.findOne({ where: { id: model.id } });
      if (!result) { return false; }

      result.categoryType = model.categoryType;
      result.categoryName = model.categoryName;
      result.categoryDescription = model.categoryDescription;
      await result.save();
      return true;
    } catch (err: any) {
      throw new Error("Failed to update Category! | " + err.message);
    }
  }
  async deleteCategory(id: number): Promise<any> {
    try {
      const result = await Category.findOne({ where: { id: id } });
      if (!result) { return null; }
      await result.destroy();
      return true;
    } catch (err: any) {
      throw new Error("Failed to delete Category! | " + err.message);
    }
  }

  //Sub Category
  async createSubCategory(model: SubCategory): Promise<void> {
    try {
      await SubCategory.create({
        subcategoryName : model.subcategoryName,
        subcategoryDescription : model.subcategoryDescription,
        categoryId : model.categoryId,
      });
    } catch (err: any) {
      throw new Error("Failed to create Sub Category! | " + err.message);
    }
  }
  async getSubCategory(): Promise<SubCategory[]> {
    try {
      const result = await SubCategory.findAll();
      if (!result) {
        throw new Error("Data not found!");
      }
      return result;
    } catch (err: any) {
      throw new Error("Failed to get Sub Category data! | " + err.message);
    }
  }
  async getSubCategoryById(id: number): Promise<SubCategory> {
    try {
      const result = await SubCategory.findOne({ where : { id: id}});
      if (!result) {
        throw new Error("Data not found!");
      }
      return result;
    } catch (err: any) {
      throw new Error("Failed to get Sub Category! | " + err.message);
    }
  }
  async updateSubCategory(model: SubCategory): Promise<any> {
    try {
      const result = await SubCategory.findOne({ where: { id: model.id } });
      if (!result) { return false; }

      result.subcategoryName = model.subcategoryName;
      result.subcategoryDescription = model.subcategoryDescription;
      result.categoryId = model.categoryId;
      await result.save();
      return true;
    } catch (err: any) {
      throw new Error("Failed to update Sub Category! | " + err.message);
    }
  }
  async deleteSubCategory(id: number): Promise<any> {
    try {
      const result = await SubCategory.findOne({ where: { id: id } });
      if (!result) { return null; }
      await result.destroy();
      return true;
    } catch (err: any) {
      throw new Error("Failed to delete Sub Category! | " + err.message);
    }
  }
}
