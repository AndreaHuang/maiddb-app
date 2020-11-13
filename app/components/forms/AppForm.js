import React from "react";
import { Formik } from "formik";
function AppForm({ children, initialValues, onSubmit, validationSchema }) {
  // console.log(validationSchema);
  // console.log(initialValues);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
