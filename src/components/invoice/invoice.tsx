import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import { styles } from "./style";
import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";

const Invoice = ({ invoiceData }) => {
  const { tableData, totalData, invoiceNumber, clientInfo, templeInfo } = invoiceData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, styles.textBold]}>INVOICE</Text>
            <Text>Invoice #{invoiceNumber}</Text>
          </View>
          <View style={styles.spaceY}>
            <Text style={styles.textBold}>Sevasangam</Text>
            <Text>Unit 101, Oxford Towers, 139,{"\n"}
            HAL Old Airport Rd,{"\n"}
            Kodihalli,Bangalore, {"\n"}
            560008
            </Text>
          </View>
        </View>

        <View style={[styles.spaceY, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        {/* User Info */}
        <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={[styles.billTo, styles.textBold]}>Bill To:</Text>
            <Text>{clientInfo.name}</Text>
            <Text>{clientInfo.email}</Text>
            <Text>{clientInfo.phone}</Text>
        </View>

        {/* Temple Info */}
        <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={[styles.billTo, styles.textBold]}>Donated To:</Text>
            <Text>{templeInfo.name}</Text>
            <Text>{templeInfo.phone}</Text>
            <Text>{templeInfo.address}</Text>
            <Text>{templeInfo.city}</Text>
        </View>
        </View>


        {/* Table */}
        <Table style={styles.table}>
          <TH style={[styles.tableHeader, styles.textBold]}>
            <TD style={styles.td}>Description</TD>
            <TD style={styles.td}>Quantity</TD>
            <TD style={styles.td}>Unit Price</TD>
            <TD style={styles.td}>Total</TD>
          </TH>
          {tableData.map((item, index) => (
            <TR key={index}>
              <TD style={styles.td}>{item.description}</TD>
              <TD style={styles.td}>{item.quantity}</TD>
              <TD style={styles.td}>₹{item.unitPrice.toFixed(2)}</TD>
              <TD style={styles.td}>₹{item.total.toFixed(2)}</TD>
            </TR>
          ))}
        </Table>

        {/* Totals */}
        <View style={styles.totals}>
          <View
            style={{
              minWidth: "256px",
            }}
          >
            {totalData.map((item) => (
              <View
                key={item.label}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <Text style={item.label === "Total" ? styles.textBold : {}}>
                  {item.label}
                </Text>
                <Text style={item.label === "Total" ? styles.textBold : {}}>
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
