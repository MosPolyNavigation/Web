import {create} from 'zustand/react';
import {BtnName, Layout, State} from '../associations/enums.ts';

import {PlanData, RoomModel} from '../associations/types.ts';
import {PlanModel} from '../models/Plan/PlanModel.ts';

type State = {
	activeLayout: Layout
	previousLayout: Layout
	selectedRoom: null | string
	currentPlan: null | PlanData
	planModel: null | PlanModel
}

type Action = {
	changeSelectedRoom: (roomId: null | string) => void;
	controlBtnClickHandler: (btnName: BtnName) => void
	changeLayout: (layout: Layout) => void
	changeCurrentPlan: (plan: PlanData) => void
	changePlanModel: (
		planInf: PlanData,
		planSvgEl: SVGSVGElement,
		virtualSvg: SVGSVGElement, roomClickHandler: (room: RoomModel) => void,
	) => void
}

export function appStore() {
	return useAppStore.getState()
}

export const useAppStore = create<State & Action>()((set, get) => ({
	activeLayout: Layout.PLAN,
	previousLayout: Layout.PLAN,
	currentPlan: null,
	selectedRoom: null,
	planModel: null,
	
	controlBtnClickHandler: (btnName) => {
		const activeLayout = get().activeLayout;
		if(btnName === BtnName.MENU && activeLayout === Layout.PLAN) {
			get().changeLayout(Layout.MENU);
		} //Показать левое меню
		
		else if(btnName === BtnName.MENU_CLOSE && activeLayout === Layout.MENU) {
			get().changeLayout(Layout.PLAN);
		} //Скрыть левое меню
		
		else if(btnName === BtnName.BOTTOM_RIGHT) {
			if(activeLayout === Layout.PLAN)
				get().changeLayout(Layout.LOCATIONS);
			else if(activeLayout === Layout.LOCATIONS)
				get().changeLayout(Layout.PLAN);
			else if(activeLayout === Layout.SEARCH)
				get().changeLayout(get().previousLayout);
		} //Показать левое меню
		
		else if(btnName === BtnName.SEARCH && activeLayout !== Layout.SEARCH) {
			get().changeLayout(Layout.SEARCH);
		} //Скрыть левое меню
	},
	
	changeSelectedRoom: (roomId) => {
		if(get().selectedRoom !== roomId) {
			set(({selectedRoom: roomId}));
		}
		if(roomId) {
			set(({bottomCardState: State.COLLAPSED}));
		}
	},
	
	changeCurrentPlan: (plan) => {
		if(get().currentPlan !== plan) {
			set(({previousPlan: get().currentPlan}));
			set(({currentPlan: plan}));
			console.log(`План изменен на %c${plan.id}`, 'font-weight: bold;');
			console.log();
		}
	},
	
	changeLayout: (layout) => {
		if(layout !== get().activeLayout) {
			console.log(`Change layout to: %c${layout}}`, 'font-weight: bold;');
			set({previousLayout: get().activeLayout});
			set({activeLayout: layout});
		}
	},
	
	changePlanModel: (planInf, planSvgEl, virtualSvg, roomClickHandler) => {
		set({planModel: new PlanModel(planInf, planSvgEl, virtualSvg, roomClickHandler)});
	},
}));
