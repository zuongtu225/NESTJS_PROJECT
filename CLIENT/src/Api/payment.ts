import { IPayment } from "../Interface";
import BaseAxios from "./requsetToken";

export const createPayment = (data: IPayment) => {
  return BaseAxios.post(`http://localhost:9000/api/v1/payments`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};

export const deletePayment = (id: number) => {
  return BaseAxios.delete(`http://localhost:9000/api/v1/payments/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
