import { api } from "boot/axios";

const createStock = (stock) => api.post(`stocks/CreateStock`, stock);
const updateStock = (stockId, stock) => api.put(`stocks/${stockId}`, stock);

const getList = () => api.get("stocks/getList");
const stockDelete = (id) => api.delete(`stocks/delete/${id}`);
const getStockItem = (id) => api.get(`stocks/${id}`);
const search = (name, count) => {
  if (count) return api.get(`Stocks/searchstock?name=${name}&count=${count}`);
  return api.get(`Stocks/searchstock?name=${name}`);
};
export { createStock, getList, stockDelete, getStockItem, updateStock, search };
