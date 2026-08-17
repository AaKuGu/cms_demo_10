export function buildProductFilter(filters = {}) {
    const query = {};

    if (filters.name) {
        query.name = { $regex: filters.name, $options: "i" };
    }

    if (filters.categoryId) {
        query.categoryId = filters.categoryId;
    }

    return query;
}
