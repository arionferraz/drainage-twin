/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React, { useEffect, useState } from "react";
import {
  StagePanelLocation,
  StagePanelSection,
  UiItemsProvider,
  useActiveIModelConnection,
  Widget,
  WidgetState
} from "@itwin/appui-react";
import { Alert, Button, Label, LabeledSelect, SelectOption, TagContainer, Text, toaster, Textarea } from "@itwin/itwinui-react";

const _classList: SelectOption<string>[] = [
  { label: "sensor", value: "sensor" },
  // { label: "feedback", value: "feedback" },
  { label: "sensor-de-chuva", value: "sensor-de-chuva" },
];

const newsList = [
  {
    alert: "Perigo de alagamento!",
    reason: "Tubulação obstruída",
    description: "Seguimento entre os sensores 'sensor003' e 'sensor004' apresenta leitura de vazão inconsistentes e defasagem de nível de água"
  },
  {
    alert: "Perigo de alagamento!",
    reason: "Tubulação obstruída",
    description: "Seguimento entre os sensores 'sensor003' e 'sensor004' apresenta leitura de vazão inconsistentes e defasagem de nível de água"
  }
]

const LiveInfoWidget = () => {
  const iModelConnection = useActiveIModelConnection();
  const [selectedClass, setSelectedClass] = React.useState<string>(_classList[0].value);
  const tableList: JSX.Element[] = [];

  newsList.forEach(
    (news) => {
      tableList.push(
        <div className="news">
          <div>
          <h1>{news.alert}</h1>
          <h3>Motivo: {news.reason}</h3>
          <h3>{news.description}</h3>
          </div>
          <div>
            <img src="feed.jpeg" alt="" />
          </div>
        </div>

        
      )
    }
  );
  return (
    <div className="">
      {tableList}
    </div>
  );
};

export class LiveInfoWidgetProvider implements UiItemsProvider {
  public readonly id: string = "LiveInfoWidgetProvider";

  public provideWidgets(_stageId: string, _stageUsage: string, location: StagePanelLocation, _section?: StagePanelSection): ReadonlyArray<Widget> {
    const widgets: Widget[] = [];
    if (location === StagePanelLocation.Right) {
      widgets.push(
        {
          id: "LiveInfoWidget",
          label: "Notícias recentes",
          defaultState: WidgetState.Open,
          content: <LiveInfoWidget />,
        }
      );
    }
    return widgets;
  }
}
