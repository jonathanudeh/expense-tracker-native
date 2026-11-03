import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../ui/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const {
    amount: defaultAmount = "",
    date: defaultDate = "",
    description: defaultDescription = "",
  } = defaultValues ?? {};

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [{ amount, date, description }, setInputs] = useState({
    amount: {
      value: defaultAmount.toString(),
      isValid: !!defaultAmount,
      // isValid: defaultAmount ? true : false,
    },
    date: {
      value: defaultDate ? getFormattedDate(new Date(defaultDate)) : "",
      isValid: !!defaultDate,
    },
    description: {
      value: defaultDescription,
      isValid: !!defaultDescription,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((prev) => {
      return {
        ...prev,
        [inputIdentifier]: { value: enteredValue, isValid: true }, //isValid always set to true when entering data but will be set to false when the validation happens

        //[inputIdentifier] allowa us to dynamically select the appropriate key eg: amount, date, description passed as the arg
      };
    });
  }

  function submitHandler() {
    const enteredAmount = +amount.value;
    const enteredDate = new Date(date.value);
    const enteredDescription = description.value.trim();

    const isAmountValid = !isNaN(enteredAmount) && enteredAmount > 0;
    const isDateValid =
      date.value.trim() !== "" && enteredDate.toString() !== "Invalid Date";
    const isDescriptionValid = enteredDescription.length > 0;

    setFormSubmitted(true);

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      // show feedback
      // Alert.alert("Invalid input", "Please check your texts");
      setInputs((prev) => {
        return {
          amount: { value: prev.amount.value, isValid: isAmountValid },
          date: { value: prev.date.value, isValid: isDateValid },
          description: {
            value: prev.description.value,
            isValid: isDescriptionValid,
          },
        };
      });

      return;
    }

    const expenseData = {
      amount: enteredAmount, //converts to number
      date: enteredDate.toISOString(),
      description: enteredDescription,
    };

    onSubmit(expenseData);
  }

  const isFormInvalid =
    !amount.isValid || !date.isValid || !description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>

      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!amount.isValid && formSubmitted}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (enteredValue) =>
              inputChangeHandler("amount", enteredValue),
            value: amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!date.isValid && formSubmitted}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: "10",
            onChangeText: (enteredValue) =>
              inputChangeHandler("date", enteredValue),
            value: date.value,
          }}
        />
      </View>

      <Input
        label="Description"
        invalid={!description.isValid && formSubmitted}
        textInputConfig={{
          multiline: true,
          autoCorrect: true,
          onChangeText: (enteredValue) =>
            inputChangeHandler("description", enteredValue),
          value: description.value,
        }}
      />

      {formSubmitted && isFormInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - Please check your entered data
        </Text>
      )}

      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
