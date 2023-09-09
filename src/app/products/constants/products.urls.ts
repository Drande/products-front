const resourceUrl: string = "http://localhost:3000/api/products";
const productsUrls = {
    getById: (id: string | number) => `${resourceUrl}/${id}`,
    getAll: resourceUrl,
    create: resourceUrl,
    update: (id: string | number) => `${resourceUrl}/${id}`,
    delete: (id: string | number) => `${resourceUrl}/${id}`,
};
export default productsUrls;