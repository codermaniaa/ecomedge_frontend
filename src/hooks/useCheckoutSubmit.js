import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "react-use-cart";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

//internal import
import useAsync from "@hooks/useAsync";
import { UserContext } from "@context/UserContext";
import OrderServices from "@services/OrderServices";
import CouponServices from "@services/CouponServices";
import { notifyError, notifySuccess } from "@utils/toast";
import SettingServices from "@services/SettingServices";
import { useOrder } from "@context/OrderContext";


const useCheckoutSubmit = () => {
  const {
    state: { userInfo, shippingAddress },
    dispatch,
  } = useContext(UserContext);
  const [error, setError] = useState("");
  const [total, setTotal] = useState("");
  const [couponInfo, setCouponInfo] = useState({});
  const [minimumAmount, setMinimumAmount] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [shippingDetails, setShippingDetails] = useState();
  const [tax, setTax] = useState([]);
  const [taxCalRes, setCalRes] = useState("");

  const [selectItemId, setSelectItemId] = useState("");
  const [shippingState, setShippingState] = useState("select state");
  const [billingState, setBillingState] = useState("select state");
  const [useFormSubmit, setUseFormSubmit] = useState({});
  const [shippingContactInfo, setShippingContactInfo] = useState("");
  const [shippingPersonInfo, setShippingPersonInfo] = useState("");
  const [orderResponse, setOrderResponse] = useState(null);
  const { setOrderData } = useOrder();


  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const couponRef = useRef("");
  const { isEmpty, emptyCart, items, cartTotal } = useCart();
  console.log("items.prices.salePrice",items);
  const totalSalePrice = items.map(items => items.prices.salePrice * items.quantity).reduce((acc, curr) => acc + curr, 0);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { data } = useAsync(CouponServices.getAllCoupons);
  console.log("CouponServices..", data);
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  const currency = globalSetting?.default_currency || "₹";
  const getShippingDetails = () => {
    SettingServices.getShippingDetails().then((res) => {
      if (res) {
        if (res?.success === true) {
          setShippingDetails(res?.shippingDetailsdData);
        }
      }
    });
  };
  // const SubmitShippingData = async (data) => {};
  const handleAddress = (e) => {
    const val = e.target.value;
    setUseFormSubmit({ ...useFormSubmit, [e.target.name]: val });
  };
  const handleSameDetails = (e) => {
    const checked = e.target.checked;
    if (checked === true) {
      // SubmitShippingData();

      setValue("BIllingAddress", useFormSubmit.address);
      setValue("BIllingCity", useFormSubmit.city);
      setValue("BIllingZipCode", useFormSubmit.zipCode);
      setBillingState(shippingState);
    } else {
      console.log("step2");
      setValue("BIllingAddress", "");
      setValue("BIllingCity", "");
      setValue("BIllingZipCode", "");
      setBillingState("select state");
    }
  };
  // -------------------------------tax calculation--------------------------------------------
  const handleUpdate = () => {
    const arr = [];
    for (let ele of items) {
      const data = {
        totalPrice: ele?.itemTotal,
        quantity: ele?.quantity,
        tax: ele?.tax,
        _id: ele?._id,
        title: ele?.title,
        // variant: ele?.variant,
        pricePerUnit: ele?.price,
        state: shippingState,
        discountPerUnit: ele?.prices?.discount,
        totalPrice: ele?.prices?.price,
        salePrice: ele?.prices?.salePrice,
      };
      arr.push(data);
    }
    OrderServices.taxCredential(arr).then((res) => {
      if (res?.success === true) {
        // notifySuccess(res.message);
        setCalRes(res?.result);
      } else {
        // notifyError(res.message);
      }
    });
  };

  useEffect(() => {
    if (items) {
      handleUpdate();
    }
  }, [items, shippingState]);

  useEffect(() => {
    if (Cookies.get("couponInfo")) {
      const coupon = JSON.parse(Cookies.get("couponInfo"));
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountType);
      setMinimumAmount(coupon.minimumAmount);
    }
  }, [isCouponApplied]);

  const TaxCal = (items) => {
    let taxArr = [];

    items.forEach((ele) => {
      let totalTax = 0;
      let textName = [];
      ele?.tax?.forEach((item) => {
        if (item.taxType === "percentage") {
          totalTax = totalTax + (ele?.prices?.salePrice * ele?.quantity * (item?.amount / 100));
          console.log("ele?.prices?.salePrice",ele?.prices?.salePrice);
          console.log("ele?.prices?.salePrice",totalTax);
          console.log("ele?.prices?.salePrice",item?.amount);
          console.log("ele?.prices?.salePrice",ele);
          textName.push(item?.taxName);
        } else if (item.taxType === "flatin") {
          totalTax = totalTax + parseFloat(item.amount);
          textName.push(item?.taxName);
        }
      });

      let obj = {
        productName: ele?.slug,
        taxName: textName,
        totalTax: totalTax,
      };
      taxArr.push(obj);
    });
    setTax(taxArr);
  };

  useEffect(() => {
    getShippingDetails();
    TaxCal(items);
  }, [items]);

  //remove coupon if total value less then minimum amount of coupon
  useEffect(() => {
    if (minimumAmount - discountAmount > total || isEmpty) {
      setDiscountPercentage(0);
      Cookies.remove("couponInfo");
    }
  }, [minimumAmount, total]);

  //calculate total and discount value
  //calculate total and discount value
  useEffect(() => {
    const discountProductTotal = items?.reduce(
      (preValue, currentValue) => preValue + currentValue.itemTotal,
      0
    );

    let totalValue = "";
    let subTotal = parseFloat(totalSalePrice + Number(shippingCost)).toFixed(2);
    const discountAmount =
      discountPercentage?.taxType === "fixed"
        ? discountPercentage?.value
        : discountProductTotal * (discountPercentage?.value / 100);
    console.log("discountProductTotal..", discountProductTotal);
    const discountAmountTotal = discountAmount ? discountAmount : 0;
    let totalTax = 0;
    for (let ele of tax) {
      totalTax = totalTax + ele?.totalTax;
    }
console.log("totalTax.checkout",totalTax);
    totalValue = Number(subTotal) - discountAmountTotal;
    setDiscountAmount(discountAmountTotal);
    const totalAmount = totalValue + totalTax;
    console.log("totalValue..", totalValue);
    console.log("totalTax..", totalTax);

    setTotal(totalAmount);
  }, [cartTotal, shippingCost, discountPercentage, tax]);

  //if not login then push user to home page
  // useEffect(() => {
  //   if (!userInfo) {
  //     router.push("/");
  //   }

  //   setValue("firstName", shippingAddress.firstName);
  //   setValue("lastName", shippingAddress.lastName);
  //   setValue("address", shippingAddress.address);
  //   setValue("contact", shippingAddress.contact);
  //   setValue("email", shippingAddress.email);
  //   setValue("city", shippingAddress.city);
  //   setValue("country", shippingAddress.country);
  //   setValue("zipCode", shippingAddress.zipCode);
  // }, []);

  // State to hold order response
  const submitHandler = async (data) => {
    dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: data });
    Cookies.set("shippingAddress", JSON.stringify(data));
    setIsCheckoutSubmit(true);
    setError("");
    setUseFormSubmit(data)
    console.log("submitHandler..", data);

    function extractCartData(items) {
      const cartData = items.map((item) => {
        return {
          product: item._id,
          quantity: item.quantity,
          itemprice: item?.prices?.salePrice,
          productName: item?.title,
        };
      });
      return cartData;
    }

    let orderInfo = {
      user_info: {
        name: `${data.firstName} ${data.lastName}`,
        // user:userInfo._id,
        contact: data.contact,
        email: data.email,
        address: data.address,
        state: shippingState,
        city: data.city,
        zipCode: data.zipCode,
        gstnumber: data.gstnumber
      },
      user: userInfo._id,
      paymentMethod: data.paymentMethod,
      shippingOption: data.shippingOption,
      status: "Pending",
      cart: taxCalRes,
      subTotal: cartTotal,
      shippingCost: shippingCost,
      discount: discountAmount,
      total: total,
    };
    // userInfo = {
    //   name: `${data.firstName} ${data.lastName}`,
    //   // user:userInfo._id,
    //   contact: data.contact,
    //   email: data.email,
    //   address: data.address,
    //   state: shippingState,
    //   city: data.city,
    //   zipCode: data.zipCode,
    // };

    let BillingInfo = {
      user_info: userInfo,
      shippingOption: data.shippingOption,
      paymentMethod: data.paymentMethod,
      status: "Pending",
      cart: items,
      subTotal: cartTotal,
      shippingCost: shippingCost,
      discount: discountAmount,
      total: total,
    };

    if (data.paymentMethod === "Card") {
      if (!stripe || !elements) {
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      // console.log('error', error);

      if (error && !paymentMethod) {
        setError(error.message);
        setIsCheckoutSubmit(false);
      } else {
        setError("");
        const orderData = {
          ...orderInfo,
          cardInfo: paymentMethod,
        };

        handlePaymentWithStripe(orderData);

        // console.log('cardInfo', orderData);
        return;
      }
    }
    if (data.paymentMethod === "Cash") {
      // const res = await OrderServices.addOrder(orderInfo); // Make the API call to add order

      // Store the order response in state
      OrderServices.addOrder(orderInfo)
        .then((res) => {
          setOrderResponse(res?.order);
          setOrderData(res?.order);
          console.log(res?.order, 'OrderServicesInvoice')
          Cookies.remove("couponInfo");
          sessionStorage.removeItem("products");
          setIsCheckoutSubmit(false);
          console.log("orderResponse...... ", orderResponse);
          router.push(`/order/${res?.order?.user}`);
          notifySuccess("Your Order Confirmed!");
          emptyCart();
        })
        .catch((err) => {
          notifyError(err.message);
          setIsCheckoutSubmit(false);
        });
    }
    // reset();
  };
  // submit
  const handlePaymentWithStripe = async (order) => {
    try {
      // console.log('try goes here!', order);
      // const updatedOrder = {
      //   ...order,
      //   currency: 'usd',
      // };
      OrderServices.createPaymentIntent(order)
        .then((res) => {
          stripe.confirmCardPayment(res.client_secret, {
            payment_method: {
              card: elements.getElement(CardElement),
            },
          });

          const orderData = {
            ...order,
            cardInfo: res,
          };
          OrderServices.addOrder(orderData)
            .then((res) => {
              router.push(`/order/${res._id}`);
              notifySuccess("Your Order Confirmed!");
              Cookies.remove("couponInfo");
              emptyCart();
              sessionStorage.removeItem("products");
              setIsCheckoutSubmit(false);
            })
            .catch((err) => {
              notifyError(err ? err?.response?.data?.message : err.message);
              setIsCheckoutSubmit(false);
            });
          // console.log('res', res, 'paymentIntent', paymentIntent);
        })

        .catch((err) => {
          notifyError(err ? err?.response?.data?.message : err.message);
          setIsCheckoutSubmit(false);
        });
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err.message);
      setIsCheckoutSubmit(false);
    }
  };

  const handleShippingCost = (value, id) => {
    setShippingCost(value);
    setSelectItemId(id);
    setShippingContactInfo("");
    setShippingPersonInfo("");
    setValue("contactInfo", "");
    setValue("PersonInfo", "");
  };
  const handleShippingContactInfo = (val) => {
    setShippingContactInfo(val);
    setValue("contactInfo", val);
  };

  const handleShippingPersonInfo = (val) => {
    setShippingPersonInfo(val);
    setValue("PersonInfo", val);
  };

  const handleCouponCode = (e) => {
    console.log("couponRef..", e);
    e.preventDefault();
    if (!couponRef.current.value) {
      notifyError("Please Input a Coupon Code!");
      return;
    }
    const result = data.coupons.filter(coupons => coupons.couponCode === couponRef.current.value);
    if (result.length < 1) {
      notifyError("Please Input a Valid Coupon!");
      return;
    }

    if (dayjs().isAfter(dayjs(result[0]?.endTime))) {
      notifyError("This coupon is not valid!");
      return;
    }

    if (total < result[0]?.minimumAmount) {
      notifyError(
        `Minimum Rs: ${result[0].minimumAmount} required for Apply this coupon!`
      );
      return;
    } else {
      notifySuccess(
        `Your Coupon ${result[0].couponCode} is Applied on ${result[0].productType}!`
      );
      setIsCouponApplied(true);
      setMinimumAmount(result[0]?.minimumAmount);
      setDiscountPercentage(result[0].discountType);
      dispatch({ type: "SAVE_COUPON", payload: result[0] });
      Cookies.set("couponInfo", JSON.stringify(result[0]));
    }
  };

  return {
    handleSubmit,
    submitHandler,
    handleShippingCost,
    register,
    errors,
    showCard,
    setShowCard,
    error,
    stripe,
    couponInfo,
    couponRef,
    handleCouponCode,
    discountPercentage,
    discountAmount,
    shippingCost,
    total,
    isEmpty,
    items,
    cartTotal,
    currency,
    isCheckoutSubmit,
    isCouponApplied,
    shippingDetails,
    tax,
    taxCalRes,
    selectItemId,
    handleSameDetails,
    billingState,
    setBillingState,
    shippingState,
    setShippingState,
    handleAddress,
    handleShippingContactInfo,
    handleShippingPersonInfo,
    orderResponse,
    setOrderResponse
  };
};

export default useCheckoutSubmit;


