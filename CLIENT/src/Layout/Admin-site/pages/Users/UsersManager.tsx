import React, { useEffect } from "react";
import AdminHeader from "../../components/layout/Header";
import AdminPagination from "../../components/table/AdminPagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { getApiUsers, getDetailUser } from "../../../../store/action";
import { updateStatusUser, updateUser } from "../../../../Api";
import { ToastContainer, toast } from "react-toastify";

const UsersManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: any) => state?.userReducer?.users);

  useEffect(() => {
    dispatch(getApiUsers());
  }, []);

  const handleStatus = async (status: any, id: number) => {
    const newStatus = +status === 1 ? true : false;
    const response = await updateStatusUser(newStatus, id);

    if (response.data.success === true) {
      toast.success(response.data.message);
      setTimeout(async () => {
        await dispatch(getApiUsers());
        await dispatch(getDetailUser());
      }, 1000);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div>
      <AdminHeader title={"USERS"} />
      <ToastContainer />
      <div className="content users">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                <th scope="col" className="px-6 py-3">
                  ID
                </th>

                <th scope="col" className="px-6 py-3">
                  Avatar
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Số điện thoại
                </th>
                <th scope="col" className="px-6 py-3">
                  Vai trò
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái
                </th>
                <th scope="col" className="px-6 py-3">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((item: any, index: number) => {
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
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4 ">
                      <img src={item.avatar} alt="" className="w-20 h-100 " />
                    </td>
                    <td className="px-6 py-4 ">{item.email}</td>
                    <td className="px-6 py-4">{item.phone}</td>
                    <td className="px-6 py-4">
                      <button>
                        {item.role.id === 1 ? "Quản trị viên" : "Người dùng"}
                      </button>
                    </td>
                    <td className="px-6 py-4 ">
                      {item.role.id === 2 && (
                        <select
                          onChange={(e: any) =>
                            handleStatus(e.target.value, item.id)
                          }
                        >
                          <option value={item.status ? 1 : 2}>
                            {item.status ? "Active" : "Block"}
                          </option>
                          <option value={item.status ? 2 : 1}>
                            {item.status ? "Block" : "Active"}
                          </option>
                        </select>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {item.role.id === 2 && (
                        <div>
                          <button className="w-30 bg-green-500 text-red-100 px-5 py-2 font-semibol m-2">
                            Xem
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* phân trang */}
          <div className="p-4">
            <AdminPagination />
          </div>
          {/* phân trang */}
        </div>
      </div>
    </div>
  );
};

export default UsersManager;
