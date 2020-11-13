import React from "react";
import {
  Keyboard,
  Modal,
  StyleSheet,
  TextInput,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import {
  AppForm,
  AppErrorMessage,
  AppFormField,
  AppSubmitButton,
} from "../components/forms";
import Card from "../components/Card";
import Screen from "../components/Screen";
import Carosel from "../components/Carosel";
import FeedItem from "../components/FeedItem";

import authApi from "../api/auth";
import useApi from "../hooks/useApi";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import ActivityIndicator from "../components/ActivityIndicator";

import i18n from "../config/i18n";

function LoginScreen() {
  //i18n
  const { t } = useTranslation();
  //Form initialValues
  const intialValues = {
    id: "",
    password: "",
  };
  //Form validationScheme
  const validationScheme = Yup.object({
    id: Yup.string().required(t("validation.id.is.required")).label(t("id")),
    password: Yup.string()
      .required(t("validation.password.is.required"))
      .label(t("password")),
  });
  //API & Form Submit
  const login = useApi(authApi.login);
  const handleSubmit = (values, { resetForm }) => {
    login.request(values);
    resetForm();
  };
  return (
    <Screen style={styles.container}>
      <ActivityIndicator visible={login.loading} />

      <AppForm
        initialValues={intialValues}
        onSubmit={handleSubmit}
        validationSchema={validationScheme}
      >
        <AppFormField
          name="id"
          keyboardType="email-address"
          placeholder={t("id")}
        ></AppFormField>

        <AppFormField
          name="password"
          placeholder={t("password")}
          secureTextEntry
          style={styles.password}
          textAlign="left"
        ></AppFormField>

        <AppErrorMessage error={t("api.error.login")} visible={login.error} />
        <AppSubmitButton title={t("button.login")}></AppSubmitButton>
      </AppForm>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 5,
  },
  password: {
    flex: 1,
    fontSize: 18,
  },
});
export default LoginScreen;
