import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import { axios, formatAmount } from "../Utils";
import React, { useEffect, useState } from "react";
import COLORS from "../constants/colors";
import config from "../constants/config";

const initialState = {
  transDetails: null,
  userDetails: null,
  memberDetails: null,
};

export default function TransView({
  transactionId = null,
  clique: cliqueId = null,
  member: memberId = null,
  creditCode = null,
}) {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!memberId || !transactionId || !cliqueId) return;
    setLoading(true);
    (async () => {
      let apiData = {};
      try {
        const response = await axios.get(
          `/transactions?member=${memberId}&transaction=${transactionId}&clique=${cliqueId}`
        );
        apiData = response.data?.data?.[0] || {};
      } catch (error) {
        console.error("Error fetching transaction details:", error.message);
      } finally {
        const {
          userDetails = null,
          memberDetails = null,
          transactionDetails = null,
        } = apiData;
        setState({
          userDetails,
          memberDetails,
          transDetails: transactionDetails?.details,
        });
        setLoading(false);
      }
    })();
    return () => setState(initialState);
  }, [transactionId]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.orange} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
      {!loading && !state?.transDetails && <Text>No Data Found</Text>}

      {/* Header Row */}
      {!!state?.transDetails && (
        <View style={{ padding: 2 }}>
          <View style={styles.row}>
            <Text style={styles.headerCell}>ITEMS</Text>
            <Text style={styles.headerCell}>QTY</Text>
            <Text style={[styles.headerCell, styles.rightAlign]}>PRICE</Text>
            <Text style={[styles.headerCell, styles.rightAlign]}>TOTAL</Text>
          </View>

          {/* Items */}
          {state.transDetails?.details?.map((value, index) => (
            <View key={`item_${index}`} style={styles.row}>
              <Text style={styles.cell}>{value.productName}</Text>
              <Text style={styles.cell}>{value.quantity}</Text>
              <Text style={[styles.cell, styles.rightAlign]}>
                {formatAmount(value?.price)}
              </Text>
              <Text style={[styles.cell, styles.rightAlign]}>
                {formatAmount(value?.totalPrice)}
              </Text>
            </View>
          ))}

          {/* Voucher Section */}
          {state.transDetails?.voucherCode && (
            <View style={styles.row}>
              <Text style={styles.cell}>
                eReward #{state.transDetails?.voucherCode}
              </Text>
              <View style={[styles.cell]}>
                {!!state.transDetails?.voucherAmount && (
                  <Text style={styles.rightAlign}>
                    -{formatAmount(state.transDetails.voucherAmount)}
                  </Text>
                )}
                {!!state.transDetails?.freeProduct?.length && (
                  <Text>
                    you've got{" "}
                    <Text style={styles.boldFont}>
                      {state.transDetails?.freeProduct[0]?.quantity}
                    </Text>{" "}
                    free product of{" "}
                    <Text style={styles.boldFont}>
                      SKU- {state.transDetails.freeProduct[0]?.sku}
                    </Text>
                  </Text>
                )}
              </View>
            </View>
          )}

          {/* Summary Section */}
          <View style={styles.summarySection}>
            <View style={styles.row}>
              <Text style={[styles.cell, styles.rightAlign]}>Discount:</Text>
              <Text style={[styles.cell, styles.rightAlign]}>
                -{formatAmount(state.transDetails?.discount)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.cell, styles.rightAlign]}>Subtotal:</Text>
              <Text style={[styles.cell, styles.rightAlign]}>
                {formatAmount(state.transDetails?.subtotal)}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.rightAlign]}>Tax:</Text>
            <Text style={[styles.cell, styles.rightAlign]}>
              +{formatAmount(state.transDetails?.tax)}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={[styles.cell, styles.rightAlign, styles.totalText]}>
              Total:
            </Text>
            <Text style={[styles.cell, styles.rightAlign, styles.totalText]}>
              {formatAmount(state.transDetails?.total)}
            </Text>
          </View>

          {!!state.transDetails?.status && !!creditCode &&
            [config.creditCode["quick"], config.creditCode["detail"]].includes(creditCode) && (
              <Text style={[styles.cell, styles.rightAlign, styles.summarySection, styles.boldFont]}>
                status :{" "}
                <Text
                  style={{
                    color: Object.is(state.transDetails.status, "paid")
                      ? COLORS.green
                      : COLORS.orange,
                  }}
                >
                  {state.transDetails.status}
                </Text>
              </Text>
            )}
        </View>
      )}

      {!!state?.transDetails && (
        <View
          style={[
            {
              flex: 3,
              flexDirection: "column",
              textAlign: "right",
              marginBlock: 8,
            },
          ]}
        >
          {!!state.transDetails?.memo && (
            <Text>Transaction note(memo): {state.transDetails.memo}</Text>
          )}
          {state.transDetails?.docNumber && (
            <Text>QuickBooks Invoice No: #{state.transDetails.docNumber}</Text>
          )}
        </View>
      )}

      {/* Footer Section */}
      {!!state?.transDetails && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Order: #{state.transDetails?.transactionNum}
          </Text>
          <Text style={styles.footerText}>
            Representative: {state.userDetails?.firstName}{" "}
            {state.userDetails?.lastName}
          </Text>
          <Text style={styles.footerText}>
            {state.transDetails?.transactionDate}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boldFont: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    color: "gray",
  },
  cell: {
    flex: 2,
  },
  rightAlign: {
    textAlign: "right",
  },
  summarySection: {
    marginTop: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 8,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    justifyContent: "space-evenly",
  },
  footerText: {
    fontSize: 12,
    paddingInline: 4,
  },
});
