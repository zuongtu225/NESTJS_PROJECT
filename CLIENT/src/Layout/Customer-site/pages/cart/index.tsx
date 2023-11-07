import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { VscHome } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { getCartByUser, getDetailUser } from "../../../../store/action";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { deleteCartItem, updateCart } from "../../../../Api";
import { ToastContainer, toast } from "react-toastify";
const CustomerCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const carts: any = useSelector((state: any) => state?.cartReducer?.carts);
  const minus = async (id: number) => {
    const cartItem = carts?.find((item: any) => item.id === id);
    if (cartItem.quantity > 1) {
      const upQuantity = cartItem.quantity - 1;
      await updateCart(id, { quantity: upQuantity });
      dispatch(getCartByUser());
    } else {
      toast.error("Phải có ít nhất một sản phẩm trong giỏ hàng");
    }
  };
  const plus = async (id: number) => {
    const cartItem = carts?.find((item: any) => item.id === id);
    const upQuantity = cartItem.quantity + 1;
    await updateCart(id, { quantity: upQuantity });
    dispatch(getCartByUser());
  };
  const deleteItemCart = async (idCart: number) => {
    const response: any = await deleteCartItem(idCart);
    if (response?.data?.success === true) {
      toast.success(response?.data?.message);
      setTimeout(() => {
        dispatch(getCartByUser());
      }, 1500);
    } else {
      toast.error(" Id sản phẩm không đúng");
    }
  };
  const checkout = () => {
    if (carts.length > 0) {
      navigate("/checkout");
    } else {
      toast.error("Không có sản phẩm để đặt hàng");
    }
  };
  const goToHistory = () => {
    navigate("/history");
  };
  useEffect(() => {
    dispatch(getDetailUser());
    dispatch(getCartByUser());
  }, []);

  return (
    <main>
      <ToastContainer />
      <div className="homeIndex container">
        <NavLink className="flex items-center gap-1" to={"/"}>
          Trang chủ <VscHome />
        </NavLink>
        <p id="historyClick" onClick={goToHistory}>
          Lịch sử đơn hàng
        </p>
      </div>
      <div className="cart-order container">
        <div className="cart-heading">
          <h2>Giỏ hàng</h2>
        </div>
        <div className="cart-item-flex">
          <p className="cart-item-count">0 sản phẩm</p>
          <NavLink to={"/"}>Tiếp tục mua hàng</NavLink>
        </div>
        <div className="cart-pay-wrapper flex">
          <div className="cart-oder-left">
            {carts?.map((item: any, index: number) => {
              const size = item.productSizeId?.sizeId?.size.slice(14);
              return (
                <div className="cart-item">
                  <p>{index + 1}</p>
                  <div className="item-img-info">
                    <img
                      src={`${item.productSizeId?.productId?.images[0]?.url}`}
                      alt=""
                    />
                    <div className="detail-product-order">
                      <p className="name">
                        {item.productSizeId?.productId?.title}
                      </p>
                    </div>
                  </div>
                  <div className="item-img-info">
                    <div className="detail-product-order">
                      <p className="name">{size}</p>
                    </div>
                  </div>
                  <div className="price-order hide-mobile">
                    {item.productSizeId?.productId?.price?.toLocaleString()} ₫
                  </div>
                  <div className="quantity-parent">
                    <button>
                      <AiOutlineMinus
                        onClick={() => minus(item.id)}
                        className="fa-solid fa-minus pl-2"
                      ></AiOutlineMinus>
                    </button>
                    <input value={`${item.quantity}`} />
                    <button>
                      <AiOutlinePlus
                        onClick={() => plus(item.id)}
                        className="fa-solid fa-plus pl-2"
                      ></AiOutlinePlus>
                    </button>
                  </div>
                  <div id="price-after">
                    {item.productSizeId?.productId?.price * item.quantity}₫
                  </div>
                  <RiDeleteBinLine
                    onClick={() => deleteItemCart(item.id)}
                    className="text-[20px] text-red-500 mr-5 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
          <div className="cart-oder-right">
            <div className="pay">
              <div className="total">
                <div className="field-discount">
                  <p>Mã giảm giá</p>
                  <p id="show-code-free">Nhập mã </p>
                </div>
                <div id="discount-show">
                  <input type="text" placeholder="Mã giảm giá" />
                  <button>Sử dụng</button>
                </div>
                <div className="transport">
                  <p>Phí vận chuyển:</p>
                  <p>20.000</p>
                </div>
                <div className="total-price">
                  <p>Tổng: </p>
                  <p id="printPrice" className="price pl-5 "></p>
                  <button className="pay-tottaly" onClick={checkout}>
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CustomerCart;
