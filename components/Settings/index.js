import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { axios, clearToken } from "../../Utils";
import language from "../../Language";
import Warning from "../../view/Warning";
import Button from "../../Elements/button";
import COLORS from "../../constants/colors";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import NoCliqueSelected from "../../view/noCliqueSelected";
import ModalContainer from "../../container/ModalContainer";
import { authActions } from "../../Redux/Reducer/authReducer";

export default function MySetting() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [clique, setClique] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState("Hello world");
  const { selectedClique, cliqueOptions } = useSelector(({ auth }) => auth) || {};
  const { setCliqueOptions, setSelectedClique, resetAll } = authActions;

  useEffect(() => {
    if (!isFocused) return;
    const selecCliqueData = cliqueOptions?.find(clique => clique._id === selectedClique) || null;
    setClique(selecCliqueData);
    return () => setClique(null);
  }, [selectedClique, cliqueOptions, isFocused]);

  const disConnectclique = async (cliqueId) => {
    try {
      setLoading(true);
      //await axios.post("/member/clique/disconnect", { cliqueId });
      const newCliqueOptions = await cliqueOptions?.filter(clique => clique._id !== cliqueId) || [];
      dispatch(setCliqueOptions(newCliqueOptions));
      dispatch(setSelectedClique(null));
    }
    catch (error) {
      console.error("Error disconnecting from clique", error);
    } finally {
      setLoading(false);
      onModalClose();
    }
  }

  const deleteAccount = async () => {
    try {
      setLoading(true);
      //await axios.delete("/member/delete");
      dispatch(resetAll());
      await clearToken();
    }
    catch (error) {
      console.error("Error In Account Deletion", error);
    } finally {
      setLoading(false);
      onModalClose();
    }
  }


  const onModalOpen = (type) => {
    setModalVisible(true);
    setModalData(ModalObj[type]);
  };

  const onModalClose = () => {
    setModalVisible(false);
    setModalData(null);
  };

  const ModalObj = {
    clique: (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 15,
      }}>
        <Warning />
        <Text
          style={{
            fontSize: 20,
            color: COLORS.blue,
            textAlign: 'center',
          }}
        >
          Are you sure you want to unsubscribe from this clique?
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: COLORS.grey,
            textAlign: 'center',
          }}
        >
          {language.cliqueClose}
        </Text>
        <Button handleSubmit={() => disConnectclique(selectedClique)} label="Confirm" btnStyle={styles.modalCnfBtn} isLoading={loading} />
      </View>
    ),
    account: (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 20,
      }}>
        <Warning />
        <Text
          style={{
            fontSize: 20,
            color: COLORS.blue,
            textAlign: 'center',
          }}
        >
          Are you sure you wish to delete your {language.clkclkText} profile?
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: COLORS.grey,
            textAlign: 'center',
          }}
        >
          {language.accountClose}
        </Text>
        <Button handleSubmit={deleteAccount} label="Confirm" btnStyle={styles.modalCnfBtn} isLoading={loading} />
      </View>
    )
  };

  return (
    <View style={{ padding: 16 }}>
      {!selectedClique ? (
        <NoCliqueSelected />
      ) : (
        <TouchableOpacity onPress={() => onModalOpen("clique")}>
          <View style={styles.card}>
            <Text style={styles.cardTxt}>
              disconnect me from {clique?.name}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => onModalOpen("account")}>
        <View style={styles.card} >
          <Text style={styles.cardTxt}>
            permanently delete my {language.clkclkText} account
          </Text>
        </View>
      </TouchableOpacity>
      <ModalContainer visible={modalVisible} onClose={onModalClose}>
        <View
          style={{
            padding: 20,
            backgroundColor: COLORS.white,
            borderRadius: 10,
          }}
        >
          <Text>{modalData}</Text>
        </View>
      </ModalContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontSize: 20,
  },
  cardTxt: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "200",
    fontFamily: "Poppins",
  },
  modalCnfBtn: {
    width: 100,
    backgroundColor: COLORS.orange
  }
});