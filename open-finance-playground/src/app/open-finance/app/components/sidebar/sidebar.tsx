"use client";
import React from "react";
import style from "./sidebar.module.css"; 
import SideBarFilter from "../sidebarFilter/sidebarFilter";
import { SimulatorState } from "../types/simulator";
import PayloadFilter from "../payloadFilter/payloadFilter";
import GuidelineCard from "../guideLineCard/guideLineCard";
import Router from "next/router";

type SideBarLayoutProps = {
  simulatorState: SimulatorState;
  setSimulatorState: React.Dispatch<React.SetStateAction<SimulatorState>>;
  payload? : Boolean;
  currentState?: number;
  selectedFlow?: "pisp" | "bio";
};

const SideBarLayout = ({ simulatorState, setSimulatorState ,payload, currentState, selectedFlow}: SideBarLayoutProps) => {
  
  
  return (
    < >
      
      {payload?<PayloadFilter currentState={currentState ?? 0} selectedFlow={selectedFlow} />:
      <div className={style.sidebarContent}>
      <SideBarFilter simulatorState={simulatorState} setSimulatorState={setSimulatorState}/>
      <GuidelineCard success={true}/>
      </div>}
    </>
  );
};

export default SideBarLayout; 