import { AbstractWidgetProps, CommonToolbarItem, ToolbarItemUtilities } from "@itwin/appui-abstract";
import { StagePanelLocation, StagePanelSection, StageUsage, ToolbarOrientation, ToolbarUsage, UiItemsProvider, Widget } from "@itwin/appui-react";
import { SmartDeviceListWidgetComponent } from "../components/widgets/SmartDeviceListWidgetComponent";
import { Visualization } from "../Visualization";
import { IModelApp } from "@itwin/core-frontend";

export class SmartDeviceUiItemsProvider implements UiItemsProvider {
    public readonly id = "SmartDeviceUiProvider";
    //private _toggleWalls: boolean = false;

    /*public provideToolbarButtonItems(stageId: string, stageUsage: string, toolbarUsage: ToolbarUsage, toolbarOrientation: ToolbarOrientation) : CommonToolbarItem[]{
        const toolbarButtonItems: CommonToolbarItem[] = [];
        
        if (stageUsage === StageUsage.General && toolbarUsage === ToolbarUsage.ContentManipulation && toolbarOrientation ===  ToolbarOrientation.Vertical) {

            const toggleWallsButton = ToolbarItemUtilities.createActionButton(
                "ToggleWalls",
                1000,
                "icon-element",
                "Toggle Walls Tool",
                () =>{
                    this._toggleWalls = !this._toggleWalls;
                    //Visualization.hideHouseExterior(IModelApp.viewManager.selectedView!, this._toggleWalls)
                }
            );

            toolbarButtonItems.push(toggleWallsButton)
        }

        return toolbarButtonItems;
    }*/
    
    public provideWidgets(stageId: string, stageUsage: string, location: StagePanelLocation, section?: StagePanelSection) : readonly Widget[]{
        const widgets: Widget[] = [];
        

        if(location === StagePanelLocation.Right){
            console.log("Caiu aqui uma vez")
            widgets.push({
                id: "smartDeviceListWidget",
                label: "Smart Devices",
                content: <SmartDeviceListWidgetComponent/>});
        }
        

        return widgets as Widget[];
    }
}


// export class IotAlertWidgetProvider implements UiItemsProvider {
//     public readonly id: string = "IotAlertWidgetProvider";
  
//     public provideWidgets(_stageId: string, _stageUsage: string, location: StagePanelLocation, _section?: StagePanelSection): ReadonlyArray<Widget> {
//       const widgets: Widget[] = [];
//       if (location === StagePanelLocation.Bottom) {
//         widgets.push(
//           {
//             id: "IotAlertWidget",
//             label: "Alertas de IoT",
//             defaultState: WidgetState.Open,
//             content: <IotAlertWidget />,
//           }
//         );
//       }
//       return widgets;
//     }
//   }