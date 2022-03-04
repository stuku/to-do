export function countPage(totalCount: number, pageSize: number): number {
    if (typeof totalCount !== "number" || typeof pageSize !== "number") {
        return 0;
    }
    return Math.ceil(totalCount / pageSize) == 0 ? 1 : Math.ceil(totalCount / pageSize);
}