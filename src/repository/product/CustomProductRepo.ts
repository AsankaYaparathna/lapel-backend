import { Showroom } from "../../model/Warehouse/Showroom/Showroom";
import { ShowroomImages } from "../../model/Warehouse/Showroom/ShowroomImages";
import { Image } from "../../model/Common/Images";
import { CustomProduct } from "../../model/Product/Custom Product/CustomProduct";
import { CustomProductOption } from "../../model/Product/Custom Product/CustomProductOption";
import { OptionHidenRule } from "../../model/Product/Custom Product/OptionHidenRule";
import { SubOption } from "../../model/Product/Custom Product/SubOption";
import { SubOptionHidenRule } from "../../model/Product/Custom Product/SubOptionHidenRule";
import { SubOptionFabric } from "../../model/Product/Custom Product/SubOptionFabric";

interface ICustomProductRepo {
  create(model: any): Promise<void>;
  update(model: any): Promise<any>;
  delete(id: number): Promise<any>;
  getById(id: number): Promise<any>;
  get(): Promise<any>;
}

export class CustomProductRepo implements ICustomProductRepo {
  async create(model: any): Promise<void> {
    try {
      const result = await CustomProduct.findOne({ where: { categoryName: model.categoryName }, });
      if (result) {
        throw new Error(
          "Failed to create Custom Product! Custom Product with this name already exists!"
        );
      }
      const customProduct = await CustomProduct.create({
        categoryId: model.categoryId,
        categoryName: model.categoryName,
        categoryTypeId: model.categoryTypeId,
        isActive: true,
      });

      if (customProduct) {
        const optionModel = model.option as CustomProductOption[];
        var i = 0;
        optionModel.forEach(async (element) => {
          const opModel = model.option[i];
          
          const newOptionImage = await Image.create({
            imageName: opModel.image.imageName,
            imageData: opModel.image.imageData,
            imageURL: opModel.image.imageURL,
            imagelocation: opModel.image.imagelocation,
            imageDescription: opModel.image.imageDescription,
          });

          const customProductOption = await CustomProductOption.create({
            customProductId: customProduct.id,
            name: element.name,
            image: newOptionImage.id,
            style: element.style,
            contrast: element.contrast,
            accent: element.accent,
            optionGroup: element.optionGroup,
            hidden: element.hidden,
            front: element.front,
            back: element.back,
            description: element.description,
            frontViewOrder: element.frontViewOrder,
            backViewOrder: element.backViewOrder,
          });

          const optionHiddenRule = element.hideRules as OptionHidenRule[];
          optionHiddenRule.forEach(async (element) => {
            const newOptionImage = await OptionHidenRule.create({
              optionId: customProductOption.id,
              ruleId: element.id,
            });
          });

          var j = 0;
          const subOption = opModel.subOptions as SubOption[];
          
          subOption.forEach(async (element) => {
            const subOptionModel = opModel.subOptions[j];

            const image = await Image.create({
              imageName: subOptionModel.image.imageName,
              imageData: subOptionModel.image.imageData,
              imageURL: subOptionModel.image.imageURL,
              imagelocation: subOptionModel.image.imagelocation,
              imageDescription: subOptionModel.image.imageDescription,
            });

            const closeUpImage = await Image.create({
              imageName: subOptionModel.closeUpImage.imageName,
              imageData: subOptionModel.closeUpImage.imageData,
              imageURL: subOptionModel.closeUpImage.imageURL,
              imagelocation: subOptionModel.closeUpImage.imagelocation,
              imageDescription: subOptionModel.closeUpImage.imageDescription,
            });

            const subOption = await SubOption.create({
              optionId: customProductOption.id,
              title: element.title,
              price: element.price,
              viewStockItem: element.viewStockItem,
              description: element.description,
              image: image.id,
              closeUpImage: closeUpImage.id,
              order : element.order,
              isDefault : element.isDefault
            });

            if(element.isDefault){
              const opNew = await CustomProductOption.findOne({ where : { id : customProductOption.id }})
              if(opNew){
                opNew.defaultLoadingOption = subOption.id;
                await opNew.save();
              }
            }




            const subOptionHiddenRule = subOptionModel.hideRules as SubOptionHidenRule[];
            subOptionHiddenRule.forEach(async (element) => {
              const newOptionImage = await SubOptionHidenRule.create({
                subOptionId: subOption.id,
                ruleId: element.id,
              });
            });

            var k = 0;
            const subOptionFabric = subOptionModel.fabric as SubOptionFabric[];
            subOptionFabric.forEach(async (element) => {
              const subOptionFabricModel = subOptionModel.fabric[k];

              const front = await Image.create({
                imageName: subOptionFabricModel.front.imageName,
                imageData: subOptionFabricModel.front.imageData,
                imageURL: subOptionFabricModel.front.imageURL,
                imagelocation: subOptionFabricModel.front.imagelocation,
                imageDescription: subOptionFabricModel.front.imageDescription,
              });

              const frontFull = await Image.create({
                imageName: subOptionFabricModel.frontFull.imageName,
                imageData: subOptionFabricModel.frontFull.imageData,
                imageURL: subOptionFabricModel.frontFull.imageURL,
                imagelocation: subOptionFabricModel.frontFull.imagelocation,
                imageDescription:
                  subOptionFabricModel.frontFull.imageDescription,
              });

              const back = await Image.create({
                imageName: subOptionFabricModel.back.imageName,
                imageData: subOptionFabricModel.back.imageData,
                imageURL: subOptionFabricModel.back.imageURL,
                imagelocation: subOptionFabricModel.back.imagelocation,
                imageDescription: subOptionFabricModel.back.imageDescription,
              });

              const backFull = await Image.create({
                imageName: subOptionFabricModel.backFull.imageName,
                imageData: subOptionFabricModel.backFull.imageData,
                imageURL: subOptionFabricModel.backFull.imageURL,
                imagelocation: subOptionFabricModel.backFull.imagelocation,
                imageDescription:
                  subOptionFabricModel.backFull.imageDescription,
              });

              const subOptionFabric = await SubOptionFabric.create({
                subOptionId: subOption.id,
                customId: element.customId,
                name: element.name,
                front: front.id,
                frontFull: frontFull.id,
                back: back.id,
                backFull: backFull.id,
              });

              k++;
            });

            j++;
          });

          i++;
        });
      }
    } catch (err: any) {
      const result = await CustomProduct.findOne({ where: { categoryName: model.categoryName }, });

      if (result) {
        throw new Error(
          "Failed to create Custom Product! Custom Product with this name already exists!"
        );
      }
      throw new Error("Failed to create Fabric! | " + err.message);
    }
  }

  async update(model: any): Promise<any> {
    try {
      const customProduct = await CustomProduct.findOne({ where: { id: model.id }, });
      //custom product does not exixst
      if (!customProduct) { return false; } 
      
      //custom product exixst
      else { 
        //custom product update
        customProduct.categoryId = model.categoryId;
        customProduct.categoryName = model.categoryName;
        customProduct.categoryTypeId = model.categoryTypeId;
        await customProduct.save();

        const optionModel = model.option as CustomProductOption[];
        var i = 0;
        await optionModel.forEach(async (element) => {
          const resultOption = await CustomProductOption.findOne({ where: { customProductId: element.customProductId }, });
          const opModel = model.option[i];
          if (!resultOption) {
            const newOptionImage = await Image.create({
              imageName: opModel.image.imageName,
              imageData: opModel.image.imageData,
              imageURL: opModel.image.imageURL,
              imagelocation: opModel.image.imagelocation,
              imageDescription: opModel.image.imageDescription,
            });
  
            const customProductOption = await CustomProductOption.create({
              customProductId: customProduct.id,
              name: element.name,
              image: newOptionImage.id,
              style: element.style,
              contrast: element.contrast,
              accent: element.accent,
              optionGroup: element.optionGroup,
              hidden: element.hidden,
              front: element.front,
              back: element.back,
              description: element.description,
              frontViewOrder: element.frontViewOrder,
              backViewOrder: element.backViewOrder,
            });
  
            const optionHiddenRule = element.hideRules as OptionHidenRule[];
            await optionHiddenRule.forEach(async (element) => {
              const newOptionImage = await OptionHidenRule.create({
                optionId: customProductOption.id,
                ruleId: element.id,
              });
            });

            var j = 0;
            const subOption = opModel.subOptions as SubOption[];
            
            await subOption.forEach(async (element) => {
              const subOptionModel = opModel.subOptions[j];

              const image = await Image.create({
                imageName: subOptionModel.image.imageName,
                imageData: subOptionModel.image.imageData,
                imageURL: subOptionModel.image.imageURL,
                imagelocation: subOptionModel.image.imagelocation,
                imageDescription: subOptionModel.image.imageDescription,
              });

              const closeUpImage = await Image.create({
                imageName: subOptionModel.closeUpImage.imageName,
                imageData: subOptionModel.closeUpImage.imageData,
                imageURL: subOptionModel.closeUpImage.imageURL,
                imagelocation: subOptionModel.closeUpImage.imagelocation,
                imageDescription: subOptionModel.closeUpImage.imageDescription,
              });

              const subOption = await SubOption.create({
                optionId: customProductOption.id,
                title: element.title,
                price: element.price,
                viewStockItem: element.viewStockItem,
                description: element.description,
                image: image.id,
                closeUpImage: closeUpImage.id,
                order : element.order,
                isDefault : element.isDefault
              });
  
              if(element.isDefault){
                const opNew = await CustomProductOption.findOne({ where : { id : customProductOption.id }})
                if(opNew){
                  opNew.defaultLoadingOption = subOption.id;
                  await opNew.save();
                }
              }

              const subOptionHiddenRule = subOptionModel.hideRules as SubOptionHidenRule[];
              await subOptionHiddenRule.forEach(async (element) => {
                const newOptionImage = await SubOptionHidenRule.create({
                  subOptionId: subOption.id,
                  ruleId: element.id,
                });
              });

              var k = 0;
              const subOptionFabric = subOptionModel.fabric as SubOptionFabric[];
              await subOptionFabric.forEach(async (element) => {
                const subOptionFabricModel = subOptionModel.fabric[k];

                const front = await Image.create({
                  imageName: subOptionFabricModel.front.imageName,
                  imageData: subOptionFabricModel.front.imageData,
                  imageURL: subOptionFabricModel.front.imageURL,
                  imagelocation: subOptionFabricModel.front.imagelocation,
                  imageDescription: subOptionFabricModel.front.imageDescription,
                });

                const frontFull = await Image.create({
                  imageName: subOptionFabricModel.frontFull.imageName,
                  imageData: subOptionFabricModel.frontFull.imageData,
                  imageURL: subOptionFabricModel.frontFull.imageURL,
                  imagelocation: subOptionFabricModel.frontFull.imagelocation,
                  imageDescription:
                    subOptionFabricModel.frontFull.imageDescription,
                });

                const back = await Image.create({
                  imageName: subOptionFabricModel.back.imageName,
                  imageData: subOptionFabricModel.back.imageData,
                  imageURL: subOptionFabricModel.back.imageURL,
                  imagelocation: subOptionFabricModel.back.imagelocation,
                  imageDescription: subOptionFabricModel.back.imageDescription,
                });

                const backFull = await Image.create({
                  imageName: subOptionFabricModel.backFull.imageName,
                  imageData: subOptionFabricModel.backFull.imageData,
                  imageURL: subOptionFabricModel.backFull.imageURL,
                  imagelocation: subOptionFabricModel.backFull.imagelocation,
                  imageDescription:
                    subOptionFabricModel.backFull.imageDescription,
                });

                const subOptionFabric = await SubOptionFabric.create({
                  subOptionId: subOption.id,
                  customId: element.customId,
                  name: element.name,
                  front: front.id,
                  frontFull: frontFull.id,
                  back: back.id,
                  backFull: backFull.id,
                });

                k++;
              });

              j++;
            });
          } 
          else {
            const resultOptionImage = await Image.findOne({  where: { id: resultOption.image }, });
            if (resultOptionImage) {
              resultOptionImage.imageName = opModel.image.imageName;
              resultOptionImage.imageData = opModel.image.imageData;
              resultOptionImage.imageURL = opModel.image.imageURL;
              resultOptionImage.imagelocation = opModel.image.imagelocation;
              resultOptionImage.imageDescription = opModel.image.imageDescription;
              await resultOptionImage.save();
            } 

            resultOption.customProductId = customProduct.id;
            resultOption.name = element.name;
            //resultOption.image = resultOption.image;
            resultOption.style = element.style;
            resultOption.contrast = element.contrast;
            resultOption.accent = element.accent;
            resultOption.optionGroup = element.optionGroup;
            resultOption.hidden = element.hidden;
            resultOption.front = element.front;
            resultOption.back = element.back;
            resultOption.description = element.description;
            resultOption.frontViewOrder = element.frontViewOrder;
            resultOption.backViewOrder = element.backViewOrder;
            await resultOption.save();

            await OptionHidenRule.destroy({ where: { optionId: resultOption.id }, });
            const optionHiddenRule = element.hideRules as OptionHidenRule[];
            await optionHiddenRule.forEach(async (element) => {
              const newoptionHiddenRule = await OptionHidenRule.create({
                optionId: resultOption.id,
                ruleId: element.id,
              });
            });

            var j = 0;
            const subOpModel = opModel.subOptions;
            const subOption = subOpModel as SubOption[];
            await subOption.forEach(async (subElement) => {
              const resultSubOption = await SubOption.findOne({ where: { id: subElement.id }, });
              const subOptionModel = subOpModel[j];
              if (!resultSubOption) {
                const image = await Image.create({
                  imageName: subOptionModel.image.imageName,
                  imageData: subOptionModel.image.imageData,
                  imageURL: subOptionModel.image.imageURL,
                  imagelocation: subOptionModel.image.imagelocation,
                  imageDescription: subOptionModel.image.imageDescription,
                });
    
                const closeUpImage = await Image.create({
                  imageName: subOptionModel.closeUpImage.imageName,
                  imageData: subOptionModel.closeUpImage.imageData,
                  imageURL: subOptionModel.closeUpImage.imageURL,
                  imagelocation: subOptionModel.closeUpImage.imagelocation,
                  imageDescription: subOptionModel.closeUpImage.imageDescription,
                });
    
                const subOption = await SubOption.create({
                  optionId: resultOption.id,
                  title: subOptionModel.title,
                  price: subOptionModel.price,
                  viewStockItem: subOptionModel.viewStockItem,
                  description: subOptionModel.description,
                  image: image.id,
                  closeUpImage: closeUpImage.id,
                  order : subOptionModel.order,
                  isDefault : subOptionModel.isDefault
                });
    
                if(subOptionModel.isDefault){
                  const opNew = await CustomProductOption.findOne({ where : { id : resultOption.id }})
                  if(opNew){
                    opNew.defaultLoadingOption = subOption.id;
                    await opNew.save();
                  }
                }

                const subOptionHiddenRule = subOptionModel.hideRules as SubOptionHidenRule[];
                await subOptionHiddenRule.forEach(async (element) => {
                  const newOptionImage = await SubOptionHidenRule.create({
                    subOptionId: subOption.id,
                    ruleId: element.id,
                  });
                });

                var k = 0;
                const subOptionFabric = subOptionModel.fabric as SubOptionFabric[];
                await subOptionFabric.forEach(async (element) => {
                  const subOptionFabricModel = subOptionModel.fabric[k];

                  const front = await Image.create({
                    imageName: subOptionFabricModel.front.imageName,
                    imageData: subOptionFabricModel.front.imageData,
                    imageURL: subOptionFabricModel.front.imageURL,
                    imagelocation: subOptionFabricModel.front.imagelocation,
                    imageDescription: subOptionFabricModel.front.imageDescription,
                  });

                  const frontFull = await Image.create({
                    imageName: subOptionFabricModel.frontFull.imageName,
                    imageData: subOptionFabricModel.frontFull.imageData,
                    imageURL: subOptionFabricModel.frontFull.imageURL,
                    imagelocation: subOptionFabricModel.frontFull.imagelocation,
                    imageDescription:
                      subOptionFabricModel.frontFull.imageDescription,
                  });

                  const back = await Image.create({
                    imageName: subOptionFabricModel.back.imageName,
                    imageData: subOptionFabricModel.back.imageData,
                    imageURL: subOptionFabricModel.back.imageURL,
                    imagelocation: subOptionFabricModel.back.imagelocation,
                    imageDescription: subOptionFabricModel.back.imageDescription,
                  });

                  const backFull = await Image.create({
                    imageName: subOptionFabricModel.backFull.imageName,
                    imageData: subOptionFabricModel.backFull.imageData,
                    imageURL: subOptionFabricModel.backFull.imageURL,
                    imagelocation: subOptionFabricModel.backFull.imagelocation,
                    imageDescription:
                      subOptionFabricModel.backFull.imageDescription,
                  });

                  const subOptionFabric = await SubOptionFabric.create({
                    subOptionId: subOption.id,
                    customId: element.customId,
                    name: element.name,
                    front: front.id,
                    frontFull: frontFull.id,
                    back: back.id,
                    backFull: backFull.id,
                  });

                  k++;
                });

              } else {
                const image = await Image.findOne({ where: { id: resultSubOption.image }, });
                if (image) {
                  image.imageName = subOptionModel.image.imageName;
                  image.imageData = subOptionModel.image.imageData;
                  image.imageURL = subOptionModel.image.imageURL;
                  image.imagelocation = subOptionModel.image.imagelocation;
                  image.imageDescription = subOptionModel.image.imageDescription;
                  await image.save();
                }

                const closeUpImage = await Image.findOne({ where: { id: resultSubOption.closeUpImage }, });
                if (closeUpImage) {
                  closeUpImage.imageName = subOptionModel.closeUpImage.imageName;
                  closeUpImage.imageData = subOptionModel.closeUpImage.imageData;
                  closeUpImage.imageURL = subOptionModel.closeUpImage.imageURL;
                  closeUpImage.imagelocation = subOptionModel.closeUpImage.imagelocation;
                  closeUpImage.imageDescription =
                    subOptionModel.closeUpImage.imageDescription;
                  await closeUpImage.save();
                }

                resultSubOption.optionId = resultOption.id;
                resultSubOption.title = subElement.title;
                resultSubOption.price = subElement.price;
                resultSubOption.viewStockItem = subElement.viewStockItem;
                resultSubOption.description = subElement.description;
                // resultSubOption.image = subElement.image;
                // resultSubOption.closeUpImage = subElement.closeUpImage;
                resultSubOption.order = subElement.order;
                resultSubOption.isDefault = subElement.isDefault;
                await resultSubOption.save();

                if(subElement.isDefault){
                  const opNew = await CustomProductOption.findOne({ where : { id : resultOption.id }})
                  if(opNew){
                    opNew.defaultLoadingOption = resultSubOption.id;
                    await opNew.save();
                  }
                }

                await SubOptionHidenRule.destroy({ where: { subOptionId: resultSubOption.id }, });
                const subOptionHidenRule = subOptionModel.hideRules as SubOptionHidenRule[];
                await subOptionHidenRule.forEach(async (element) => {
                  const newsubOptionHidenRule = await SubOptionHidenRule.create(
                    {
                      subOptionId: subElement.id,
                      ruleId: element.id,
                    }
                  );
                });

                var k = 0;
                const subOptionFabric = subOptionModel.fabric as SubOptionFabric[];
                await subOptionFabric.forEach(async (fabElement) => {
                  const subOptionFabricModel = subOptionModel.fabric[k];

                  const resultSubOptionFab = await SubOptionFabric.findOne({ where: { id: fabElement.id }, });
                  
                  if (!resultSubOptionFab) {
                    const front = await Image.create({
                      imageName: subOptionFabricModel.front.imageName,
                      imageData: subOptionFabricModel.front.imageData,
                      imageURL: subOptionFabricModel.front.imageURL,
                      imagelocation: subOptionFabricModel.front.imagelocation,
                      imageDescription: subOptionFabricModel.front.imageDescription,
                    });
      
                    const frontFull = await Image.create({
                      imageName: subOptionFabricModel.frontFull.imageName,
                      imageData: subOptionFabricModel.frontFull.imageData,
                      imageURL: subOptionFabricModel.frontFull.imageURL,
                      imagelocation: subOptionFabricModel.frontFull.imagelocation,
                      imageDescription:
                        subOptionFabricModel.frontFull.imageDescription,
                    });
      
                    const back = await Image.create({
                      imageName: subOptionFabricModel.back.imageName,
                      imageData: subOptionFabricModel.back.imageData,
                      imageURL: subOptionFabricModel.back.imageURL,
                      imagelocation: subOptionFabricModel.back.imagelocation,
                      imageDescription: subOptionFabricModel.back.imageDescription,
                    });
      
                    const backFull = await Image.create({
                      imageName: subOptionFabricModel.backFull.imageName,
                      imageData: subOptionFabricModel.backFull.imageData,
                      imageURL: subOptionFabricModel.backFull.imageURL,
                      imagelocation: subOptionFabricModel.backFull.imagelocation,
                      imageDescription:
                        subOptionFabricModel.backFull.imageDescription,
                    });
      
                    const subOptionFabric = await SubOptionFabric.create({
                      subOptionId: subOptionModel.id,
                      customId: subOptionModel.customId,
                      name: element.name,
                      front: front.id,
                      frontFull: frontFull.id,
                      back: back.id,
                      backFull: backFull.id,
                    });
                  } 
                  else {

                    const front = await Image.findOne({ where: { id: resultSubOptionFab.front }, });
                    if (front) {
                      front.imageName = subOptionFabricModel.front.imageName;
                      front.imageData = subOptionFabricModel.front.imageData;
                      front.imageURL = subOptionFabricModel.front.imageURL;
                      front.imagelocation = subOptionFabricModel.front.imagelocation;
                      front.imageDescription = subOptionFabricModel.front.imageDescription;
                      await front.save();
                    }

                    const frontFull = await Image.findOne({ where: { id: resultSubOptionFab.frontFull }, });
                    if (frontFull) {
                      frontFull.imageName = subOptionFabricModel.frontFull.imageName;
                      frontFull.imageData = subOptionFabricModel.frontFull.imageData;
                      frontFull.imageURL = subOptionFabricModel.frontFull.imageURL;
                      frontFull.imagelocation = subOptionFabricModel.frontFull.imagelocation;
                      frontFull.imageDescription = subOptionFabricModel.frontFull.imageDescription;
                      await frontFull.save();
                    }

                    const back = await Image.findOne({ where: { id: resultSubOptionFab.back }, });
                    if (back) {
                      back.imageName = subOptionFabricModel.back.imageName;
                      back.imageData = subOptionFabricModel.back.imageData;
                      back.imageURL = subOptionFabricModel.back.imageURL;
                      back.imagelocation =
                        subOptionFabricModel.back.imagelocation;
                      back.imageDescription =
                        subOptionFabricModel.back.imageDescription;
                      await back.save();
                    }

                    const backFull = await Image.findOne({ where: { id: resultSubOptionFab.backFull }, });
                    if (backFull) {
                      backFull.imageName = subOptionFabricModel.backFull.imageName;
                      backFull.imageData = subOptionFabricModel.backFull.imageData;
                      backFull.imageURL = subOptionFabricModel.backFull.imageURL;
                      backFull.imagelocation = subOptionFabricModel.backFull.imagelocation;
                      backFull.imageDescription = subOptionFabricModel.backFull.imageDescription;
                      await backFull.save();
                    }

                    resultSubOptionFab.subOptionId = subElement.id;
                    resultSubOptionFab.customId = fabElement.customId;
                    resultSubOptionFab.name = fabElement.name;
                    // resultSubOptionFab.front = front ? front.id : 0;
                    // resultSubOptionFab.frontFull = frontFull ? frontFull.id : 0;
                    // resultSubOptionFab.back = back ? back.id : 0;
                    // resultSubOptionFab.backFull = backFull ? backFull.id : 0;
                    await resultSubOptionFab.save();
                  }
                  k++;
                });
              }
              j++;
            });
          }
          i++;
        });
      }

      return true;
    } catch (err: any) {
      throw new Error("Failed to update Fabric! | " + err.message);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const customProduct = await CustomProduct.findAll({ where: { id: id } });
      
      if (!customProduct || customProduct.length === 0) {
        throw new Error("Data not found!");
      }

      await CustomProduct.destroy({ where: { id: id } });
      await Promise.all(
        customProduct.map(async (elementCP) => {
          const optionData = await CustomProductOption.findAll({where: { customProductId: elementCP.id },});
          await CustomProductOption.destroy({ where: { customProductId: elementCP.id } });
          
          await Promise.all(optionData.map(async (elementCPO) => {
            await Image.destroy({ where: { id:  elementCPO.image } });
            await OptionHidenRule.destroy({ where: { optionId: elementCPO.id }, });

            const subOptionData = await SubOption.findAll({ where: { optionId: elementCPO.id }, });
            await SubOption.destroy({ where: { optionId: elementCPO.id } });
            await Promise.all(subOptionData.map(async (elementCPSO) => {
              
              await Image.destroy({ where: { id: elementCPSO.image } });
              await Image.destroy({ where: { id: elementCPSO.closeUpImage } });
              await SubOptionHidenRule.destroy({ where: { subOptionId: elementCPSO.id }, });

              const subOptionFabData = await SubOptionFabric.findAll({ where: { subOptionId: elementCPSO.id }, });
              await SubOptionFabric.destroy({ where: { subOptionId: elementCPSO.id } });
              
              await Promise.all(subOptionFabData.map(async (elementCPSOF) => {
                await Image.destroy({ where: { id:  elementCPSOF.front } });
                await Image.destroy({ where: { id:  elementCPSOF.frontFull } });
                await Image.destroy({ where: { id:  elementCPSOF.back } });
                await Image.destroy({ where: { id:  elementCPSOF.backFull } });
              }));
            }));
          }));
        })
      );
      return  true;
    } catch (err: any) {
      throw new Error("Failed to delete Custom Product! | " + err.message);
    }
  }

  async getById(id: number): Promise<any> {
    try {
      interface newOptionHideRule {
        id: number;
        optionId: number;
        ruleId: number;
      }

      interface newSubOptionHideRule {
        id: number;
        subOptionId: number;
        ruleId: number;
      }

      interface newCustomProdSubOptionFab {
        id: number;
        customId: string;
        name: string;
        front: Image;
        frontFull: Image;
        back: Image;
        backFull: Image;
      }

      interface newCustomProdSubOption {
        id: number;
        title: string;
        price: number;
        viewStockItem: boolean;
        description: string;
        image: Image;
        closeUpImage: Image;
        hideRules: newSubOptionHideRule[];
        fabric: newCustomProdSubOptionFab[];
      }

      interface newCustomProdOption {
        id: number;
        name: string;
        image: Image;
        style: boolean;
        accent: boolean;
        optionGroup: boolean;
        hidden: boolean;
        front: boolean;
        back: boolean;
        description: string;
        hideRules: newOptionHideRule[];
        subOptions: newCustomProdSubOption[];
      }

      interface newCustomProd {
        id: number;
        categoryId: string;
        categoryName: string;
        categoryTypeId: string;
        options: newCustomProdOption[];
        isActive: boolean;
      }

      const tempCuProduct: newCustomProd[] = [];
      const customProduct = await CustomProduct.findAll({ where: { id: id } });
      if (!customProduct || customProduct.length === 0) {
        throw new Error("Data not found!");
      }

      await Promise.all(
        customProduct.map(async (elementCP) => {
          const tempCuProOp: newCustomProdOption[] = [];
          const optionData = await CustomProductOption.findAll({where: { customProductId: elementCP.id },});
          
          await Promise.all(optionData.map(async (elementCPO) => {
            
            const optionImage = (await Image.findOne({ where: { id: elementCPO.image }, })) as Image;

            const tempCuProSubOp: newCustomProdSubOption[] = [];
            const subOptionData = await SubOption.findAll({ where: { optionId: elementCPO.id }, });
            await Promise.all(subOptionData.map(async (elementCPSO) => {
              
              const subimage = (await Image.findOne({ where: { id: elementCPSO.image }, })) as Image;
              const subcloseUpImage = (await Image.findOne({ where: { id: elementCPSO.closeUpImage }, })) as Image;

              const tempCuProSubOpFab: newCustomProdSubOptionFab[] = [];
              const subOptionFabData = await SubOptionFabric.findAll({ where: { subOptionId: elementCPSO.id }, });
              await Promise.all(subOptionFabData.map(async (elementCPSOF) => {
                const front = (await Image.findOne({
                  where: { id: elementCPSOF.front },
                })) as Image;
                const frontFull = (await Image.findOne({
                  where: { id: elementCPSOF.frontFull },
                })) as Image;
                const back = (await Image.findOne({
                  where: { id: elementCPSOF.back },
                })) as Image;
                const backFull = (await Image.findOne({
                  where: { id: elementCPSOF.backFull },
                })) as Image;

                const tempFab: newCustomProdSubOptionFab = {
                  id: elementCPSOF.id,
                  customId: elementCPSOF.customId,
                  name: elementCPSOF.name,
                  front: front,
                  frontFull: frontFull,
                  back: back,
                  backFull: backFull,
                };
                tempCuProSubOpFab.push(tempFab);
              }));

              const tempCuProSubOpHR: newSubOptionHideRule[] = [];
              const subOptionHideRuleData = await SubOptionHidenRule.findAll({ where: { subOptionId: elementCPSO.id }, });
              await Promise.all(subOptionHideRuleData.map(async (elementCPSOFHR) => {
                const temp: newSubOptionHideRule = {
                  id: elementCPSOFHR.id,
                  subOptionId: elementCPSOFHR.subOptionId,
                  ruleId: elementCPSOFHR.ruleId,
                };
                tempCuProSubOpHR.push(temp);
              }));

              const temp: newCustomProdSubOption = {
                id: elementCPSO.id,
                title: elementCPSO.title,
                price: elementCPSO.price,
                viewStockItem: elementCPSO.viewStockItem,
                description: elementCPSO.description,
                image: subimage,
                closeUpImage: subcloseUpImage,
                hideRules: tempCuProSubOpHR,
                fabric: tempCuProSubOpFab,
              };
              
              tempCuProSubOp.push(temp);
            }));

            const tempCuProOpHR: newOptionHideRule[] = [];
            const subOptionHideRuleData = await OptionHidenRule.findAll({ where: { optionId: elementCPO.id }, });
            await Promise.all(subOptionHideRuleData.map(async (elementCPSOFHR) => {
              const temp: newOptionHideRule = {
                id: elementCPSOFHR.id,
                optionId: elementCPSOFHR.optionId,
                ruleId: elementCPSOFHR.ruleId,
              };
              
              tempCuProOpHR.push(temp);
            }));

            const temp : newCustomProdOption ={
              id: elementCPO.id,
              name: elementCPO.name,
              image: optionImage,
              style: elementCPO.style,
              accent: elementCPO.accent,
              optionGroup: elementCPO.optionGroup,
              hidden: elementCPO.hidden,
              front: elementCPO.front,
              back: elementCPO.back,
              description: elementCPO.description,
              hideRules: tempCuProOpHR,
              subOptions: tempCuProSubOp
            };
            
            tempCuProOp.push(temp);
          }));

          const temp : newCustomProd ={
            id: elementCP.id,
            categoryId: elementCP.categoryId,
            categoryName: elementCP.categoryName,
            categoryTypeId: elementCP.categoryTypeId,
            options: tempCuProOp,
            isActive: elementCP.isActive,
          };
          
          tempCuProduct.push(temp);
        })
      );

      
      return await tempCuProduct;
    } catch (err: any) {
      throw new Error("Failed to get Custom Product! | " + err.message);
    }
  }

  async get(): Promise<any[]> {
    try {
      interface newOptionHideRule {
        id: number;
        optionId: number;
        ruleId: number;
      }

      interface newSubOptionHideRule {
        id: number;
        subOptionId: number;
        ruleId: number;
      }

      interface newCustomProdSubOptionFab {
        id: number;
        customId: string;
        name: string;
        front: Image;
        frontFull: Image;
        back: Image;
        backFull: Image;
      }

      interface newCustomProdSubOption {
        id: number;
        title: string;
        price: number;
        viewStockItem: boolean;
        description: string;
        image: Image;
        closeUpImage: Image;
        hideRules: newSubOptionHideRule[];
        fabric: newCustomProdSubOptionFab[];
        order : number;
      }

      interface newCustomProdOption {
        id: number;
        name: string;
        image: Image;
        style: boolean;
        accent: boolean;
        optionGroup: boolean;
        hidden: boolean;
        front: boolean;
        back: boolean;
        description: string;
        hideRules: newOptionHideRule[];
        subOptions: newCustomProdSubOption[];
        defaultLoadingOption : number;
      }

      interface newCustomProd {
        id: number;
        categoryId: string;
        categoryName: string;
        categoryTypeId: string;
        options: newCustomProdOption[];
        isActive: boolean;
      }

      const tempCuProduct: newCustomProd[] = [];
      const customProduct = await CustomProduct.findAll();
      if (!customProduct || customProduct.length === 0) {
        throw new Error("Data not found!");
      }

      await Promise.all(
        customProduct.map(async (elementCP) => {
          const tempCuProOp: newCustomProdOption[] = [];
          const optionData = await CustomProductOption.findAll({where: { customProductId: elementCP.id },});
          
          await Promise.all(optionData.map(async (elementCPO) => {
            
            const optionImage = (await Image.findOne({ where: { id: elementCPO.image }, })) as Image;

            const tempCuProSubOp: newCustomProdSubOption[] = [];
            const subOptionData = await SubOption.findAll({ where: { optionId: elementCPO.id }, });
            await Promise.all(subOptionData.map(async (elementCPSO) => {
              
              const subimage = (await Image.findOne({ where: { id: elementCPSO.image }, })) as Image;
              const subcloseUpImage = (await Image.findOne({ where: { id: elementCPSO.closeUpImage }, })) as Image;

              const tempCuProSubOpFab: newCustomProdSubOptionFab[] = [];
              const subOptionFabData = await SubOptionFabric.findAll({ where: { subOptionId: elementCPSO.id }, });
              await Promise.all(subOptionFabData.map(async (elementCPSOF) => {
                const front = (await Image.findOne({
                  where: { id: elementCPSOF.front },
                })) as Image;
                const frontFull = (await Image.findOne({
                  where: { id: elementCPSOF.frontFull },
                })) as Image;
                const back = (await Image.findOne({
                  where: { id: elementCPSOF.back },
                })) as Image;
                const backFull = (await Image.findOne({
                  where: { id: elementCPSOF.backFull },
                })) as Image;

                const tempFab: newCustomProdSubOptionFab = {
                  id: elementCPSOF.id,
                  customId: elementCPSOF.customId,
                  name: elementCPSOF.name,
                  front: front,
                  frontFull: frontFull,
                  back: back,
                  backFull: backFull,
                };
                tempCuProSubOpFab.push(tempFab);
              }));

              const tempCuProSubOpHR: newSubOptionHideRule[] = [];
              const subOptionHideRuleData = await SubOptionHidenRule.findAll({ where: { subOptionId: elementCPSO.id }, });
              await Promise.all(subOptionHideRuleData.map(async (elementCPSOFHR) => {
                const temp: newSubOptionHideRule = {
                  id: elementCPSOFHR.id,
                  subOptionId: elementCPSOFHR.subOptionId,
                  ruleId: elementCPSOFHR.ruleId,
                };
                tempCuProSubOpHR.push(temp);
              }));

              const temp: newCustomProdSubOption = {
                id: elementCPSO.id,
                title: elementCPSO.title,
                price: elementCPSO.price,
                viewStockItem: elementCPSO.viewStockItem,
                description: elementCPSO.description,
                image: subimage,
                closeUpImage: subcloseUpImage,
                hideRules: tempCuProSubOpHR,
                fabric: tempCuProSubOpFab,
                order : elementCPSO.order
              };
              
              tempCuProSubOp.push(temp);
            }));

            const tempCuProOpHR: newOptionHideRule[] = [];
            const subOptionHideRuleData = await OptionHidenRule.findAll({ where: { optionId: elementCPO.id }, });
            await Promise.all(subOptionHideRuleData.map(async (elementCPSOFHR) => {
              const temp: newOptionHideRule = {
                id: elementCPSOFHR.id,
                optionId: elementCPSOFHR.optionId,
                ruleId: elementCPSOFHR.ruleId,
              };
              
              tempCuProOpHR.push(temp);
            }));

            const temp : newCustomProdOption ={
              id: elementCPO.id,
              name: elementCPO.name,
              image: optionImage,
              style: elementCPO.style,
              accent: elementCPO.accent,
              optionGroup: elementCPO.optionGroup,
              hidden: elementCPO.hidden,
              front: elementCPO.front,
              back: elementCPO.back,
              description: elementCPO.description,
              hideRules: tempCuProOpHR,
              subOptions: tempCuProSubOp,
              defaultLoadingOption : elementCPO.defaultLoadingOption
            };
            
            tempCuProOp.push(temp);
          }));

          const temp : newCustomProd ={
            id: elementCP.id,
            categoryId: elementCP.categoryId,
            categoryName: elementCP.categoryName,
            categoryTypeId: elementCP.categoryTypeId,
            options: tempCuProOp,
            isActive: elementCP.isActive,
          };
          
          tempCuProduct.push(temp);
        })
      );

      
      return await tempCuProduct;
    } catch (err: any) {
      throw new Error("Failed to get Custom Product! | " + err.message);
    }
  }

  async getSubOptionById(id: number): Promise<any> {
    try {
      interface newOptionHideRule {
        id: number;
        optionId: number;
        ruleId: number;
      }

      interface newSubOptionHideRule {
        id: number;
        subOptionId: number;
        ruleId: number;
      }

      interface newCustomProdSubOptionFab {
        id: number;
        customId: string;
        name: string;
        front: Image;
        frontFull: Image;
        back: Image;
        backFull: Image;
      }

      interface newCustomProdSubOption {
        id: number;
        title: string;
        price: number;
        viewStockItem: boolean;
        description: string;
        image: Image;
        closeUpImage: Image;
        hideRules: newSubOptionHideRule[];
        fabric: newCustomProdSubOptionFab[];
      }

      interface newCustomProdOption {
        id: number;
        name: string;
        image: Image;
        style: boolean;
        accent: boolean;
        optionGroup: boolean;
        hidden: boolean;
        front: boolean;
        back: boolean;
        description: string;
        hideRules: newOptionHideRule[];
        subOptions: newCustomProdSubOption[];
      }

      interface newCustomProd {
        id: number;
        categoryId: string;
        categoryName: string;
        categoryTypeId: string;
        options: newCustomProdOption[];
        isActive: boolean;
      }

      
      const subOptionData = await SubOption.findOne({ where: { id: id } });
      if (!subOptionData ) {
        throw new Error("Data not found!");
      }

      const cuProSubOp: newCustomProdSubOption[] = [];
     
      const subimage = (await Image.findOne({ where: { id: subOptionData.image }, })) as Image;
      const subcloseUpImage = (await Image.findOne({ where: { id: subOptionData.closeUpImage }, })) as Image;
      
      const tempCuProSubOpFab: newCustomProdSubOptionFab[] = [];
      const subOptionFabData = await SubOptionFabric.findAll({ where: { subOptionId: subOptionData.id }, });
      await Promise.all(subOptionFabData.map(async (elementCPSOF) => {
        const front = (await Image.findOne({ where: { id: elementCPSOF.front }, })) as Image;
        const frontFull = (await Image.findOne({ where: { id: elementCPSOF.frontFull }, })) as Image;
        const back = (await Image.findOne({  where: { id: elementCPSOF.back }, })) as Image;
        const backFull = (await Image.findOne({ where: { id: elementCPSOF.backFull }, })) as Image;

        const tempFab: newCustomProdSubOptionFab = {
          id: elementCPSOF.id,
          customId: elementCPSOF.customId,
          name: elementCPSOF.name,
          front: front,
          frontFull: frontFull,
          back: back,
          backFull: backFull,
        };
        tempCuProSubOpFab.push(tempFab);
      }));

      const tempCuProSubOpHR: newSubOptionHideRule[] = [];
      const subOptionHideRuleData = await SubOptionHidenRule.findAll({ where: { subOptionId: subOptionData.id }, });
      await Promise.all(subOptionHideRuleData.map(async (elementCPSOFHR) => {
        const temp: newSubOptionHideRule = {
          id: elementCPSOFHR.id,
          subOptionId: elementCPSOFHR.subOptionId,
          ruleId: elementCPSOFHR.ruleId,
        };
        tempCuProSubOpHR.push(temp);
      }));

      const temp: newCustomProdSubOption = {
        id: subOptionData.id,
        title: subOptionData.title,
        price: subOptionData.price,
        viewStockItem: subOptionData.viewStockItem,
        description: subOptionData.description,
        image: subimage,
        closeUpImage: subcloseUpImage,
        hideRules: tempCuProSubOpHR,
        fabric: tempCuProSubOpFab,
      };
      
      cuProSubOp.push(temp);

      return await cuProSubOp;
    } catch (err: any) {
      throw new Error("Failed to get Custom Product! | " + err.message);
    }
  }
}
