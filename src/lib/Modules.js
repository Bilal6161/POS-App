import CreateProduct from '$lib/components/inventory/CreateProduct.svelte';
import AllProducts from '$lib/components/inventory/AllProducts.svelte';
import StockBalance from '$lib/components/inventory/StockBalance.svelte';
import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
import Billing from '$lib/components/pos/Billing.svelte';
import TreePage from '$lib/components/TreeView/TreePage.svelte';

export const Modules = [
	{
		name: 'Tree View',
		childs: [
			{
				name: 'Tree--t',
				component: TreePage
			},
		]
	},
	{
		name: 'Dashboard',
		childs: [
			{
				name: 'Dashboard',
				component: Dashboard
			}
		]
	},
	{
		name: 'Inventory',
		childs: [
			{
				name: 'Create Product',
				component: CreateProduct
			},
			{
				name: 'All Products',
				component: AllProducts
			},
			{
				name: 'Stock Balance',
				component: StockBalance
			}
		]
	},
	{
		name: 'Sale',
		childs: [
			{
				name: 'View Sales',
				component: ''
			},
			{
				name: 'View DSR',
				component: ''
			},
			{
				name: 'Manage Sales',
				component: ''
			}
		]
	},
	{
		name: 'Purchase',
		childs: [
			{
				name: 'Receive Order',
				component: ''
			},
			{
				name: 'Create Invoice',
				component: ''
			}
		]
	},
	{
		name: 'POS',
		childs: [
			{
				name: 'Billing',
				component: Billing
			},
			{
				name: 'View History',
				component: ''
			},
			{
				name: 'Order Return',
				component: ''
			}
		]
	},
	{
		name: 'Shipping',
		childs: [
			{
				name: 'not-in-use',
				component: ''
			},
			{
				name: 'not-in-use',
				component: ''
			},
			{
				name: 'not-in-use',
				component: ''
			}
		]
	},
	{
		name: 'Finance',
		childs: [
			{
				name: 'not-in-use',
				component: ''
			},
			{
				name: 'not-in-use',
				component: ''
			},
			{
				name: 'not-in-use',
				component: ''
			}
		]
	}
];
