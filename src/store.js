import { configureStore } from "@reduxjs/toolkit";
import { charSlices } from "./Slices/ChartSlices";
import { UploadedFileSlice } from "./Slices/UploadedFileSlice";
import { SideBarSlice } from "./Slices/SideBarSlice";
import { FeatureEngineeringSlice } from "./Slices/FeatureEngineeringSlice";
import ModelBuilding from "./Slices/ModelBuilding";

export default configureStore({
  reducer: {
    charts: charSlices.reducer,
    uploadedFile: UploadedFileSlice.reducer,
    sideBar: SideBarSlice.reducer,
    featureEngineering: FeatureEngineeringSlice.reducer,
    modelBuilding: ModelBuilding
  },
});
