import { QueryRowFormat } from "@itwin/core-common";
import { IModelConnection, ScreenViewport } from "@itwin/core-frontend";


export class Visualization {
  
    public static hideHouseExterior = async (vp: ScreenViewport) => {

      const categoryIds = await Visualization.getCategoryIds(vp.iModel);
      vp.changeCategoryDisplay(categoryIds, true);
    }

    private static getCategoryIds = async (iModel: IModelConnection)=>{
      const categoriesToHide: string[] = [
        "'Defaut'",
        "'Rede_Rede Pluvial'",
        "'Utilities 1st'"
      ];
      const query = `SELECT ECInstanceId FROM BisCore.Category 
      WHERE CodeValue IN (${categoriesToHide.toString()})`
  
      const result = iModel.query(query, undefined, {rowFormat: QueryRowFormat.UseJsPropertyNames});
      const categoryIds = [];
  
      for await (const row of result){
        categoryIds.push(row.id);
      }

      return categoryIds;
    }
}