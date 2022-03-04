export function formatQuery(filterBy: any | undefined): any {
    if (!filterBy) return {};

    const query: any = {};
    for (const [key, value] of Object.entries(filterBy)) {
        query[key] = new RegExp('^' + value);
    }
    return query;
}