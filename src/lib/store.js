import { writable } from 'svelte/store';
import { Modules } from './Modules';

export const CurrentTab = writable([]);
export const OpenedTabs = writable([]);
export const AllTabs = writable(Modules);

let tabs = [];

export const addTab = (value) => {
	CurrentTab.set(value);
	tabs.push(value);
	OpenedTabs.set(tabs);
};

export const removeTab = (index) => {
	tabs = tabs.filter((value, i) => {
		return i != index;
	});
	OpenedTabs.set(tabs);
	CurrentTab.set(tabs[tabs.length - 1]);
};

export const getCurrentTab = () => {
	let field;
	CurrentTab.subscribe((value) => {
		field = value;
	});
    return field
}
