import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IBrand, ICategory } from "../../../../../Interface";
import { AppDispatch } from "../../../../../store";
import {
  getApiBrands,
  getApiCategories,
  getApiSizes,
  getDetailProduct,
} from "../../../../../store/action";
import { updateImage } from "../../../../../Api/images";

const EditProductForm = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const productDetail = useSelector(
    (state: any) => state?.productReducer?.productDetail
  );
  const categories = useSelector(
    (state: any) => state?.categoryReducer?.categories
  );
  const sizes = useSelector((state: any) => state?.sizeReducer?.sizes);

  const brands = useSelector((state: any) => state?.brandReducer?.brands);
  const [newProduct, setNewProduct] = useState<any>({
    id: productDetail.id,
    title: productDetail.title,
    brand: productDetail.brand.id,
    category: productDetail.category.id,
    stock: productDetail.stock,
    price: productDetail.price,
    description: productDetail.description,
  });
  const handleChangeImage = async (e: any, id: number) => {
    const formData = new FormData();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    for (let img of e.target.files) formData.append("image", img);
    await updateImage(id, formData, config);
    await dispatch(getDetailProduct(productDetail.id));
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const product = {
      ...newProduct,
      [name]: value,
    };
    setNewProduct(product);
  };
  useEffect(() => {
    dispatch(getApiCategories(null));
    dispatch(getApiBrands(null));
    dispatch(getApiSizes());
  }, []);

  useEffect(() => {
    props.handleGetData(newProduct);
  }, [newProduct]);

  return (
    <div>
      <div className="bg-white shadow-md rounded px-8  flex flex-col ">
        <div className="-mx-3 md:flex  ">
          <div className="md:w-1/2 px-3  md:mb-0">
            <label>Tên sản phẩm</label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              id="grid-first-name"
              type="text"
              name="title"
              value={newProduct.title}
              onChange={handleChange}
            />
          </div>
          <div className="md:w-1/2 px-3 ">
            <div className="relative">
              <label>Thương hiệu</label>
              <select
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                id="grid-state"
                name="brand"
                onChange={handleChange}
              >
                <option>{productDetail.brand?.title}</option>;
                {brands?.map((item: IBrand) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-[80%] px-3">
            <label>Mô tả</label>
            <textarea
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              id="grid-password"
              value={newProduct.description}
              name="description"
              onChange={handleChange}
            />
          </div>
          <div className="md:w-[20%] px-3 ">
            <div className="relative ">
              <label>Dung tích:</label>
              {/* size */}
              {productDetail?.productSizes?.map((item: any) => {
                const size = item.sizeId.size.slice(14);
                return (
                  <div key={item.id} className="mr-2 flex items-center">
                    <label className="block">{size}</label>
                    <input
                      type="checkbox"
                      className="w-50 h-50 cursor-pointer ml-4"
                      checked={item.id}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="-mx-3 md:flex mb-2">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label>Giá</label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="grid-city"
              type="number"
              value={newProduct.price}
              name="price"
              onChange={handleChange}
            />
          </div>
          <div className="md:w-1/2 px-3">
            <label>Số lượng</label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="grid-zip"
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleChange}
            />
          </div>
          <div className="md:w-1/2 px-3 ">
            <div className="relative">
              <label>Loại</label>
              <select
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                id="grid-state"
                name="category"
                onChange={handleChange}
              >
                <option>{productDetail.category.title}</option>;
                {categories?.map((item: ICategory) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="w-[100%]">
          {productDetail?.images?.map((item: any, index: number) => {
            return (
              <div
                key={item.id}
                className=" flex justify-between items-center  mt-5 mb-5"
              >
                <p>Ảnh {index + 1}</p>
                <img src={`${item.url}`} alt="" className="w-[50px] h-[50px]" />
                <input
                  type="file"
                  className="w-[50%]"
                  onChange={(e: any) => handleChangeImage(e, item.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;
