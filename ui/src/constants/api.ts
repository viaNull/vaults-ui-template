const MAIN_API_PATH = '/api';

type ApiRoutes = {
	'vault-snapshots': string;
	'vault-depositor': string;
};

const API_ROUTES: ApiRoutes = {
	'vault-snapshots': '/vaults/vault-snapshots',
	'vault-depositor': '/vaults/vault-depositor',
};

export const GET_API_ROUTE = (key: keyof ApiRoutes) => {
	return `${MAIN_API_PATH}${API_ROUTES[key]}`;
};
