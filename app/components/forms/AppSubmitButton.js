import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

function AppSubmitButton({ title }) {
  const { submitForm } = useFormikContext();
  return <AppButton title={title} onPress={submitForm} />;
}

export default AppSubmitButton;
