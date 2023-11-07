import React, { useEffect } from "react";
import Tabs from "../../components/layout/Tabs";
import AdminPagination from "../../components/table/AdminPagination";
import AdminHeader from "../../components/layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { getApiBrands } from "../../../../store/action";
import { IBrand } from "../../../../Interface";
import { ToastContainer, toast } from "react-toastify";
import { deleteBrand } from "../../../../Api/brands";

const BrandsManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const brands = useSelector((state: any) => state?.brandReducer?.brands);
  const removeBrand = async (id: number) => {
    await deleteBrand(id);
    toast.success("Xóa thành công");
    dispatch(getApiBrands());
  };
  useEffect(() => {
    dispatch(getApiBrands());
  }, []);

  return (
    <div>
      <AdminHeader title="BRANDS" />
      <ToastContainer />
      <div className="content ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-20 py-3">
                  ID
                </th>
                <th scope="col" className="px-20 py-3">
                  Thương hiệu
                </th>
                <th scope="col" className="px-7 py-3">
                  HÀNH ĐỘNG
                </th>
              </tr>
            </thead>
            <tbody>
              {brands?.map((item: IBrand, index: number) => {
                return (
                  <tr className="p-10">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td
                      scope="row"
                      className="px-20 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </td>

                    <td className="px-20 py-3">{item.title}</td>
                    <td className="px-5 py-3">
                      <button className="w-30 bg-green-500 text-red-100 px-5 py-2 font-semibol m-2">
                        Sửa
                      </button>
                      <button
                        onClick={() => removeBrand(item.id)}
                        className="bg-red-600   text-red-200 px-5 py-2 font-semibol"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BrandsManager;
