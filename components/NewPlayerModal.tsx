import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Button,
  GestureResponderEvent,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Formik } from "formik";
import * as Yup from "yup";
import React from "react";

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export default function NewPlayerModal({ isVisible, onClose }: Props) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>New Player</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={28} />
          </Pressable>
        </View>
        <View
          style={{ alignItems: "center", justifyContent: "center", margin: 20 }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              alignSelf: "flex-start",
              marginLeft: 20,
            }}
          >
            Player Details:
          </Text>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              phone: "",
              email: "",
              confirmEmail: "",
            }}
            onSubmit={(values) => console.log(values)}
            validationSchema={Yup.object({
              firstName: Yup.string().required("* mandatory"),
              lastName: Yup.string().required("* mandatory"),
              phone: Yup.string().required("* mandatory"),
              email: Yup.string()
                .email("invalid email address")
                .required("* mandatory"),
              confirmEmail: Yup.string()
                .email("invalid email address")
                .required("* mandatory"),
            })}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter First Name"
                  placeholderTextColor={"#ddd"}
                  id="firstName"
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                />
                {touched.firstName && errors.firstName ? (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                ) : null}
                <TextInput
                  style={styles.input}
                  placeholder="Enter Last Name"
                  placeholderTextColor={"#ddd"}
                  id="lastName"
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                />
                {touched.lastName && errors.lastName ? (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                ) : null}
                <TextInput
                  style={styles.input}
                  placeholder="Enter Phone Number"
                  placeholderTextColor={"#ddd"}
                  id="phone"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                />
                {touched.phone && errors.phone ? (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                ) : null}
                <TextInput
                  style={styles.input}
                  placeholder="Enter Email Address"
                  placeholderTextColor={"#ddd"}
                  id="email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {touched.email && errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Email Address"
                  placeholderTextColor={"#ddd"}
                  id="confirmEmail"
                  onChangeText={handleChange("confirmEmail")}
                  onBlur={handleBlur("confirmEmail")}
                  value={values.confirmEmail}
                />
                {touched.confirmEmail && errors.confirmEmail ? (
                  <Text style={styles.errorText}>{errors.confirmEmail}</Text>
                ) : null}
                <Pressable
                  style={styles.button}
                  onPress={handleSubmit as (e?: GestureResponderEvent) => void}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "90%",
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "10%",
    backgroundColor: "#1ab394",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  formContainer: {
    padding: 20,
    width: "100%",
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    paddingLeft: 6,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  errorText: {
    color: "red",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: "#1ab394",
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
