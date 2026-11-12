import * as React from "react";
import { SmartDeviceDecorator } from "../decorators/SmartDeviceDecorator";
import { IModelApp, StandardViewId } from "@itwin/core-frontend";

export function SmartDeviceListWidgetComponent() {
    const [smartTableList, setSmartTableList] = React.useState<JSX.Element[]>([]);
    React.useEffect(() => {
        (async () => {
            const values = await SmartDeviceDecorator.getSmartDeviceData();
            const tableList: JSX.Element[] = [];

            // values.forEach(value => {
            //     tableList.push(
            //         <tr onClick={async ()=>{ await IModelApp.viewManager.selectedView!.zoomToElements(value.id, { animateFrustumChange: true, }); }}>
            //             <th>{value.smartDeviceType}</th>
            //             <th>{value.smartDeviceId}</th>
            //         </tr>
            //     )
            // })

            let status = ["working", "partial", "not-working"]
            let statusText = ["Em perfeita operação", "Precisa de manutenção", "Estado crítico" ]
            let statusPerc = [100,70,40]

            let aux = 0;
            for(let i=0; i < values.length; i++){
                if(aux == 3){
                    aux = 0;
                }
                let value = values[i]
                let classNameAux = "image " + status[aux]
                tableList.push(
                    <div className="sensor-wrapper">
                        <div className={classNameAux} data-progress={statusPerc[aux]}>
                            <img src="https://cdn4.iconfinder.com/data/icons/30-oil-and-gas-industry-3/512/06_Pipeline-512.png" alt="" />
                            {/* <img src="sensortub2.jpeg" alt="" />  */}
                        </div>
                        <div className="infos">
                            <h1>Saúde tubulação - {i + 1}</h1>
                            <h2>{statusText[aux]}</h2>
                        </div>
                        {/* <th>{value.smartDeviceType}</th>
                        <th>{value.smartDeviceId}</th> */}
                    </div>
                )
                aux ++;
            }

            setSmartTableList(tableList);
        })();
    }, [])

    return (
    //     <table className="smart-table">
    //         <tbody>
    //             <tr>
    //                 <th>SmartDeviceType</th>
    //                 <th>SmartDeviceId</th>
    //             </tr>
    //             {smartTableList}
    //         </tbody>
    //     </table>

        <div className="smart-sensors">
            {smartTableList}
        </div>
    )
}