/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { MapLayerOptions, TileAdmin } from "@itwin/core-frontend";

// Sandbox provides map key values at runtime, however it's required to create your own account at map providers and
// get appropriate access tokens for your own projects (or exported Sandbox)
export const mapLayerOptions: MapLayerOptions = {
  BingMaps: {
    key: "key",
    value: process.env.REACT_APP_BING_MAPS_KEY || "", 
  },
  MapboxImagery: {
    key: "access_token",
    value: process.env.REACT_APP_MAPBOX_KEY || "",
  },
};

export const tileAdminOptions: TileAdmin.Props = {
  cesiumIonKey: process.env.REACT_APP_CESIUM_ION_KEY || "",
};
 