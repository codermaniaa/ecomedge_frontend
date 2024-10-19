import React from "react";
import { useEffect, useState } from "react";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image
} from "@react-pdf/renderer";
import logoDark from "@/assets/img/logo/Admin logo light.svg";
import { showDateFormat } from "@/utils/dateFormate";

// Register fonts
Font.register({
  family: "Open Sans",
  fonts: [
    { src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf" },
    { src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf", fontWeight: 600 },
  ]
});
const styles = StyleSheet.create({
  page: {
    marginRight: 10,
    marginBottom: 20,
    marginLeft: 10,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 29,
    lineHeight: 1.5,
  },
  table: {
    display: "table",
    width: "auto",
    color: "#4b5563",
    marginRight: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginTop: 0,
    borderRadius: "8px",
    borderColor: "#e9e9e9",
    borderStyle: "solid",
    borderWidth: 0.5,
    padding: 0,
    textAlign: "left",
  },
  tableRow: {
    // margin: 'auto',
    flexDirection: "row",
    paddingBottom: 2,
    paddingTop: 2,
    textAlign: "left",
    borderWidth: 0.8,
    borderColor: "#E5E7EB",
    borderBottom: "0",
  },
  tableRowHeder: {
    // margin: 'auto',
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    paddingBottom: 4,
    paddingTop: 4,
    paddingLeft: 0,
    borderBottomWidth: 0.8,
    borderColor: "#E5E7EB",
    borderStyle: "solid",
    textTransform: "uppercase",
    textAlign: "left",
  },
  tableCol: {
    width: "25%",
    textAlign: "left",

    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderLeftWidth: 0.5,
    // borderTopWidth: 0.5,
    // borderBottomWidth: 0.5,
    // borderColor: '#d1d5db',
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
    // textAlign:'center',
    paddingLeft: "0",
    paddingRight: "0",
    marginLeft: "13",
    marginRight: "13",
  },

  tableCellQuantity: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
    textAlign: "center",
    paddingLeft: "0",
    paddingRight: "0",
    marginLeft: "12",
    marginRight: "12",
  },

  invoiceFirst: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 18,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottom: 1,
    borderColor: "#f3f4f6",
    // backgroundColor:'#EEF2FF',
  },
  invoiceSecond: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 12,
    marginLeft: "13",
    marginRight: "13",
  },
  invoiceThird: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderTop: 1,
    borderColor: "#ffffff",
    backgroundColor: "#f4f5f7",
    borderRadius: 12,
    marginLeft: "13",
    marginRight: "13",

    // backgroundColor:'#F2FCF9',
  },
  logo: {
    width: 64,
    height: 25,
    bottom: 5,
    right: 10,
    marginBottom: 10,
    textAlign: "right",
    color: "#4b5563",
    
    fontWeight: "bold",
    fontSize: 10.3,

    marginRight: "39%",
    textTransform: "uppercase",
  },
  title: {
    color: "#2f3032",
    
    fontWeight: "bold",
    fontSize: 8.1,
    textTransform: "uppercase",
  },
  info: {
    fontSize: 9,
    color: "#6b7280",
  },
  infoCost: {
    fontSize: 10,
    color: "#6b7280",
    marginLeft: "4%",
    marginTop: "7px",
    textAlign: "left",
    width: "25%",
  },
  invoiceNum: {
    fontSize: 9,
    color: "#6b7280",
    marginLeft: "6%",
  },
  topAddress: {
    fontSize: 10,
    color: "#6b7280",
    width: "100%",
    marginRight: "62%",
    textAlign: "right",
    whiteSapce: "nowrap",
  },
  amount: {
    fontSize: 10,
    color: "#ef4444",
  },
  totalAmount: {
    fontSize: 10,
    color: "#ef4444",
    
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "right",
  },
  status: {
    color: "#10b981",
  },
  quantity: {
    color: "#1f2937",
    textAlign: "center",
  },
  itemPrice: {
    color: "#1f2937",
    textAlign: "left",
  },
  header: {
    color: "#6b7280",
    fontSize: 9,
    
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "left",
  },

  thanks: {
    color: "#22c55e",
  },
  infoRight: {
    textAlign: "right",
    fontSize: 9,
    color: "#6b7280",
    width: "25%",
    marginRight: "39%",
    
  },
  titleRight: {
    textAlign: "right",
    
    fontWeight: "bold",
    fontSize: 8.1,
    width: "25%",
    marginRight: "39%",
    textTransform: "uppercase",
    color: "#2f3032",
  },
  topBg: {
    // backgroundColor:'#EEF2FF',
  },
  invoiceDiv: {
    alignItems: "baseline",
  },
});
const InvoiceForDownload = ({ data, currency, globalSetting }) => {
  const [totalTax, setTotalTax] = useState(0);
  useEffect(() => {
    let totalTaxAmount = 0;
    data.cart.forEach(item => {
      item.tax["GST 18"].forEach(tax => {
        totalTaxAmount += tax.taxAmount;
      });
    });
    setTotalTax(totalTaxAmount);
  })
  // Language Translation RMK
  // const { t } = useTranslation();
  console.log("InvoiceForDownload", data);
  console.log("globalSetting", globalSetting);
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.invoiceFirst}>
            <View style={styles.invoiceDiv}>
              <Text
                style={{
                  // 
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  alignItems: "baseline",
                }}
              >
                {"invoice"}
              </Text>
              <Text style={styles.info}>
                Status :{" "}
                {data?.status === "Merged" && (
                  <Text style={{ color: "#eab308" }}>{data?.status}</Text>
                )}
                {data?.status === "Pending" && (
                  <Text style={{ color: "#eab308" }}>{data?.status}</Text>
                )}
                {data?.status === "Processing" && (
                  <Text style={{ color: "#14b8a6" }}>{data?.status}</Text>
                )}
                {data?.status === "POS-Completed" && (
                  <Text style={{ color: "#14b8a6" }}>{data?.status}</Text>
                )}
                {data?.status === "Fully Returned" && (
                  <Text style={{ color: "#14b8a6" }}>{data?.status}</Text>
                )}
                {data?.status === "Partial Returned" && (
                  <Text style={{ color: "#14b8a6" }}>{data?.status}</Text>
                )}
                {data?.status === "Delivered" && (
                  <Text style={{ color: "#22c55e" }}>{data?.status}</Text>
                )}
                {data?.status === "Cancel" && (
                  <Text style={{ color: "#f43f5e" }}>{data?.status}</Text>
                )}
                {data?.status === "Deleted" && (
                  <Text style={{ color: "#f43f5e" }}>{data?.status}</Text>
                )}
              </Text>

            </View>

            {/* <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{
                  flexDirection: "row",
                  marginLeft: 80,
                  marginTop: 35,
                  textAlign: "right",
                }}
              >
                <Image
                  src={logoDark}
                  alt="TriDyota"
                  style={{
                    width: 90,
                    alignItems: "right",
                    textAlign: "right",
                    float: "right",
                  }}
                />
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  color: "#888",
                  marginTop: 2,
                  textAlign: "right",
                }}
              >
                {globalSetting?.address}
                {"\n"}
                {globalSetting?.contact}
                {"\n"}
                {globalSetting?.email}
                {"\n"}
                {globalSetting?.website}
              </Text>
            </View> */}
          </View>
          <View style={styles.invoiceSecond}>
            <View style={{ width: "25%", alignItems: "baseline" }}>
              <Text style={[styles.title, { fontSize: 10 }]}>{"date"}</Text>
              <Text
                style={{
                  fontSize: 9,
                  color: "#6b7280",
                  textAlign: "left",
                }}
              >
                {data?.createdAt !== undefined && (
                  <Text>
                    {showDateFormat(
                      data?.createdAt
                    )}
                  </Text>
                )}
              </Text>
            </View>
            <View style={{ width: "25%", alignItems: "baseline" }}>
              <Text style={styles.title}>
                <Text
                  style={{ width: "25%", alignItems: "baseline", fontSize: 10 }}
                >
                  {"InvoiceNo"}
                </Text>
              </Text>
              <Text style={styles.title}>
                <Text style={{ textAlign: "left" }}>
                  <Text
                    style={{
                      fontSize: 9,
                      color: "#6b7280",
                      marginLeft: "4%",
                      marginTop: "7px",
                      textAlign: "left",
                    }}
                  >
                    #{data?.invoiceDetails?.invoiceNumber}
                  </Text>
                </Text>
              </Text>
            </View>

            <View
              style={{ width: "25%", alignItems: "baseline", float: "right" }}
            >
              <Text style={styles.title}>
                <Text
                  style={{
                    fontSize: 10,
                    float: "right",
                    textAlign: "right",
                    alignItems: "baseline",
                  }}
                >
                  {"InvoiceTo"}
                </Text>
              </Text>
              <Text style={styles.title}>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 9,
                    // textTransform: "lowercase",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 9,
                      color: "#6b7280",
                      marginTop: "7px",
                      textAlign: "right",
                      // textTransform: "lowercase",
                    }}
                  >
                    {data?.user_info?.name}
                    {"\n"}
                    {data?.user_info?.contact}
                    {"\n"}
                    {data?.user_info?.email}
                    {"\n"}
                    {data?.user_info?.address?.substring(0, 30)}
                    {"\n"}
                    {data?.user_info?.city}, {data?.user_info?.country},{" "}
                    {"\n"}
                    {data?.user_info?.zipCode}
                    {"\n"}
                    {"GST No"}:
                    {data?.user_info?.gstnumber}
                  </Text>
                </Text>
              </Text>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.tableRowHeder}>
              {/* <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  <span style={styles.header}>{t('sr')}</span>
                </Text>
              </View> */}
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  <Text
                    style={{
                      color: "#6b7280",
                      fontSize: 9,
                      
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      textAlign: "left",
                    }}
                  >
                    Product Title
                  </Text>
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  <Text
                    style={{
                      color: "#6b7280",
                      fontSize: 9,
                      // 
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      textAlign: "center",
                    }}
                  >
                    {"Quantity"}
                  </Text>
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  <Text
                    style={{
                      color: "#6b7280",
                      fontSize: 9,
                      // 
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      textAlign: "left",
                    }}
                  >
                    {"ItemPrice"}
                  </Text>
                </Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  <Text
                    style={{
                      color: "#6b7280",
                      fontSize: 9,
                      // 
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      textAlign: "right",
                    }}
                  >
                    {"Amount"}
                  </Text>
                </Text>
              </View>
            </View>
            {data?.cart?.map((item, i) => (
              <View key={i} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item.title?.substring(0, 20)}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellQuantity}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        textAlign: "center",
                        alignItems: "center",
                        // 
                      }}
                    >
                      {item.quantity}
                    </Text>
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    <Text
                      style={{
                        fontSize: 10,
                        textAlign: "left",
                        // 
                        fontWeight: "bold",
                      }}
                    >

                      {(item.salePrice).toFixed(2)}
                    </Text>
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    <Text
                      style={{
                        fontSize: 10,
                        // 
                        fontWeight: "bold",
                        textAlign: "right",
                      }}
                    >

                      {((item.salePrice) * item.quantity
                      ).toFixed(2)}
                    </Text>
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginTop: 8,
              paddingTop: 8,
              borderTopWidth: 1,
              borderColor: "#E5E7EB",
              borderStyle: "solid",
            }}
          >
            <View style={{ width: "30%", alignItems: "flex-end" }}>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                {"Payment Method"}:
                {data.paymentMethod}
              </Text>
            </View>
            <View style={{ width: "30%", alignItems: "flex-end" }}>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                {"Shipping Cost"}:
                {data.shippingCost}
              </Text>
            </View>
            <View style={{ width: "30%", alignItems: "flex-end" }}>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                {"Discount"}:
                {data.discount}
              </Text>
            </View>
            <View style={{ width: "30%", alignItems: "flex-end" }}>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                {"Total tax"}:
                {(totalTax ? totalTax : 0)}
              </Text>
            </View>
            <View style={{ width: "30%", alignItems: "flex-end" }}>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                {"Total"}:
                {data?.total}
              </Text>
            </View>
          </View>
          <View style={{ width: "60%", paddingTop: "10px" }}>
            <Text style={{ fontSize: 10 }}>
              {"Thank you for your purchase!"}
            </Text>
          </View>

        </Page>
      </Document>

    </>
  );
};

export default InvoiceForDownload;
