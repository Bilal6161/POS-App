import { writable } from 'svelte/store';
import {Modules} from '$lib/Modules';

export const CurrentTab = writable(Modules[0]);
export const OpenedTabs = writable([Modules[0]]);
export const MenuVisible = writable(true);
export const Products = writable({});

export const addTab = (tab) => {
	OpenedTabs.update((openedTabs) => [...openedTabs, tab]);
	CurrentTab.set(tab);
};

export const removeTab = (index) => {
	OpenedTabs.update((openedTabs) => {
		return openedTabs.filter((value,i) => {
			return i != index
		})
	});
};

export const toggleMenu = () => {
	MenuVisible.update(oldval => !oldval)
}
