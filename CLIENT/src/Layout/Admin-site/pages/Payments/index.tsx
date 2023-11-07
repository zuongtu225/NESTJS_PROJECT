import React, { useEffect } from "react";
import Tabs from "../../components/layout/Tabs";
import AdminPagination from "../../components/table/AdminPagination";
import AdminHeader from "../../components/layout/Header";
import { getPayments } from "../../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { IPayment } from "../../../../Interface";
import { ToastContainer, toast } from "react-toastify";
import { deletePayment } from "../../../../Api/payment";

const PaymentManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const payments = useSelector((state: any) => state?.paymentReducer?.payments);
  const removePayment = async (id: number) => {
    await deletePayment(id);
    toast.success("Xóa thành công");
    dispatch(getPayments());
  };

  useEffect(() => {
    dispatch(getPayments());
  }, []);
  return (
    <div>
      <AdminHeader title={"PAYMENTS"} />
      <ToastContainer />
      <div className="content ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  STT
                </th>
                <th scope="col" className="px-20 py-3">
                  ID
                </th>
                <th scope="col" className="px-20 py-3">
                  Phương thức thanh toán
                </th>
                <th scope="col" className="px-7 py-3">
                  HÀNH ĐỘNG
                </th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((item: IPayment, index: number) => {
                return (
                  <tr className="p-10">
                    <td className="w-4 p-4">{index + 1}</td>
                    <td
                      scope="row"
                      className="px-20 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.id}
                    </td>

                    <td className="px-20 py-3">{item.title}</td>
                    <td className="px-5 py-3">
                      <button className="w-30 bg-green-500 text-red-100 px-5 py-2 font-semibol m-2">
                        Sửa
                      </button>
                      <button
                        onClick={() => removePayment(item.id)}
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

export default PaymentManager;
