import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import EditProductForm from "./FormEdit/EditProductForm";
import { IBrand, IProduct } from "../../../../Interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { getApiProducts } from "../../../../store/action";
import { updateProduct } from "../../../../Api";
import { toast } from "react-toastify";
export function EditModal(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(props.open);
  const [productUpdate, setProductUpdate] = useState<IProduct>();
  const [brandUpdate, setBrandUpdate] = useState<IBrand>();

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);
  const ClickClose = () => {
    props.handleClose(false);
  };
  const handleUpdate = async () => {
    switch (props.title) {
      case "PRODUCTS":
        const responseProduct: any = await updateProduct(productUpdate);
        if (responseProduct?.data?.success === true) {
          toast.success(responseProduct.data.message);
          props.handleClose(false);
          setTimeout(() => {
            dispatch(getApiProducts());
          }, 2000);
        } else {
          props.handleClose(false);
          toast.error("Tên sản phẩm đã được tạo vui lòng nhập tên khác");
        }
        break;
    }
  };
  console.log(brandUpdate);

  const handleGetData = (dataUpdate: any) => {
    setProductUpdate(dataUpdate);
    setBrandUpdate(dataUpdate);
  };

  return (
    <div>
      <Dialog open={open} handler={ClickClose}>
        <DialogHeader> Form Sửa </DialogHeader>
        <DialogBody divider>
          {props.title === "PRODUCTS" && (
            <div>
              <EditProductForm handleGetData={handleGetData} />
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={ClickClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>

          <Button color="green" onClick={handleUpdate}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
