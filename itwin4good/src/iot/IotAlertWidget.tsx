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
import { Alert, Button, Label, LabeledSelect, SelectOption, TagContainer, Text, toaster, Textarea, FileUpload } from "@itwin/itwinui-react";
import { IotAlert } from "./IotAlert";
import { Entity } from "./IotAlertApi";
import "./IotAlert.scss";

const _classList: SelectOption<string>[] = [
  { label: "sensor", value: "sensor" },
  // { label: "feedback", value: "feedback" },
  { label: "sensor-de-chuva", value: "sensor-de-chuva" },
];

const IotAlertWidget = () => {
  const iModelConnection = useActiveIModelConnection();
  const [selectedClass, setSelectedClass] = React.useState<string>(_classList[0].value);
  const [selectedElementId, setSelectedElementId] = React.useState<string>();
  const [entities, setEntities] = useState<Record<string, Entity[]>>({});
  const [alerts, setAlerts] = React.useState<IotAlert[]>([]);

  useEffect(() => {
    async function initialize() {
      if (!iModelConnection)
        return;

      const queriedEntities: Record<string, Entity[]> = {};
      for (const { value: className } of _classList) {
        const rows: Entity[] = [];
        const query = `SELECT EcInstanceId, SmartDeviceId FROM DgnCustomItemTypes_HouseSchema.
        SmartDevice WHERE SmartDeviceType = '${className}'`;
        for await (const row of iModelConnection.createQueryReader(query)) {
          rows.push({ id: row[0], label: row[1] });
        }
        queriedEntities[className] = rows;
      }

      console.log(queriedEntities)

      setEntities(queriedEntities);
      setSelectedElementId(queriedEntities[selectedClass][0].id);
    }

    initialize().catch((error) => console.error(error));
  }, [iModelConnection, selectedClass]);

  const onCreateAlert = () => {
    if (selectedElementId) {
      const label = Object.values(entities)
        .flat()
        .find((e) => e.id === selectedElementId)?.label;
      const alert = new IotAlert(selectedElementId, label);
      alert.display();
      setAlerts([...alerts, alert]);
    }
  };

  const onClearAllAlerts = () => {
    alerts.forEach((alert) => alert.remove());
    setAlerts([]);
    toaster.closeAll();
  };

  const onClassChange = (className: string) => {
    setSelectedClass(className);
    setSelectedElementId(entities[className][0].id);
  };

  const removeAlert = (entityId: string) => {
    const alert = alerts.find((item) => item.elementId === entityId);
    if (alert) {
      alert.remove();
      setAlerts(alerts.filter((f) => f.elementId !== alert.elementId));
    }
  };

  const enableCreateAlertButton = selectedElementId && !alerts.map((m) => m.elementId).includes(selectedElementId);

  const getEntityOptions = (): SelectOption<string>[] => {
    return entities[selectedClass]
      ? entities[selectedClass].map((entity) => ({ value: entity.id, label: entity.label }))
      : [];
  };

  return (
    <div className="sample-options">
      <div className="sample-grid">
        
          <LabeledSelect label="Classe:" value={selectedClass} options={_classList} onChange={onClassChange} disabled={!iModelConnection} />
          <LabeledSelect label="Elemento:" value={selectedElementId} options={getEntityOptions()} onChange={setSelectedElementId} disabled={!iModelConnection} />
          <input type="file"></input>
          <Textarea></Textarea>
        <div className="sample-buttons">
          <Button styleType="high-visibility" onClick={onCreateAlert} disabled={!enableCreateAlertButton}>Criar Alerta</Button>
          <Button onClick={onClearAllAlerts} disabled={alerts.length === 0}>Limpar todos alertas</Button>
        </div>
      </div>
      <div className="active-alerts">
        <Label>Alertas ativos</Label>
        <TagContainer>
          {!alerts.length && <Text variant="small">Ainda não existem alertas</Text>}
          {alerts.map((alert, index) => alert.render(index, removeAlert))}
        </TagContainer>
      </div>
      <Alert type="informational" className="instructions">
        Selecione uma classe e instância. Então clique em "Criar Alerta" para disparar um alerta.
      </Alert>
    </div>
  );
};

export class IotAlertWidgetProvider implements UiItemsProvider {
  public readonly id: string = "IotAlertWidgetProvider";

  public provideWidgets(_stageId: string, _stageUsage: string, location: StagePanelLocation, _section?: StagePanelSection): ReadonlyArray<Widget> {
    const widgets: Widget[] = [];
    if (location === StagePanelLocation.Bottom) {
      widgets.push(
        {
          id: "IotAlertWidget",
          label: "Feedbacks de usuário",
          defaultState: WidgetState.Open,
          content: <IotAlertWidget />,
        }
      );
    }
    return widgets;
  }
}
