import { KeyboardAvoidingView, Platform } from "react-native";
import cliqueView from "../../view/cliqueView";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NoCliqueSelected from "../../view/noCliqueSelected";

export default function Cliques() {
  const dispatch = useDispatch();
  const { cliqueOptions, selectedClique } =
    useSelector(({ auth }) => auth) || {};
  const [clique, setClique] = useState(null);

  useEffect(() => {
    const selectClique =
      cliqueOptions?.find(({ _id }) => _id === selectedClique) || null;
    setClique(selectClique);
  }, [cliqueOptions, selectedClique]);

  if (!clique) return <NoCliqueSelected />;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {!!clique && cliqueView(clique)}
    </KeyboardAvoidingView>
  );
}
