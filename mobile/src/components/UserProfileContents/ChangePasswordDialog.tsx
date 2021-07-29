import { Button, Dialog } from "react-native-paper";
import React, { useEffect, useRef, useState } from "react";
import { Formik, FormikProps } from "formik";
import { TextInput as NativeTextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
    adminEditPasswordValidationSchema,
    AdminField,
    adminPasswordInitialValues,
    adminUserFieldLabels,
    changePassValidationSchema,
    ChangePasswordField,
    changePasswordFieldLabels,
    changePasswordInitialValues,
    getPassChangeErrorMessageFromSubmissionError,
    handleSubmitChangePassword,
    handleUpdatePassword,
    IUser,
    TAdminPasswordValues,
    TPasswordValues,
} from "@cbr/common";
import Alert from "../Alert/Alert";
import { useStyles } from "./ChangePasswordDialog.styles";
import FormikPasswordTextInput from "../FormikPasswordTextInput/FormikPasswordTextInput";

export type Props = {
    isSelf: boolean;
    user: IUser;
    /**
     * Callback that is called when the dialog is dismissed (user cancels or password successfully
     * changed). The {@link visible} prop needs to be updated when this is called.
     *
     * @param isSubmitSuccess Whether the user's password was changed successfully.
     */
    onDismiss: (isSubmitSuccess: boolean) => void;
    /** Determines whether the dialog is visible. */
    visible: boolean;
};

const ChangePasswordDialog = ({ isSelf, user, onDismiss, visible }: Props) => {
    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const newPassRef = useRef<NativeTextInput>(null);
    const confirmNewPassRef = useRef<NativeTextInput>(null);

    const styles = useStyles();

    useEffect(() => {
        setSubmissionError(null);
    }, [visible]);

    // Pass dismissable={false} to prevent the user from tapping on the outside to dismiss.
    return (
        <Dialog dismissable={false} visible={visible} onDismiss={() => onDismiss(false)}>
            {isSelf ? (
                <Formik
                    initialValues={changePasswordInitialValues}
                    validationSchema={changePassValidationSchema}
                    onReset={() => setSubmissionError(null)}
                    onSubmit={async (values, formikHelpers) => {
                        return handleSubmitChangePassword(values, formikHelpers)
                            .then(() => {
                                setSubmissionError(null);
                                onDismiss(true);
                                formikHelpers.resetForm();
                            })
                            .catch((e: any) => {
                                setSubmissionError(getPassChangeErrorMessageFromSubmissionError(e));
                            });
                    }}
                >
                    {(formikProps: FormikProps<TPasswordValues>) => (
                        <>
                            <Dialog.Title>Change password</Dialog.Title>
                            <Dialog.ScrollArea>
                                <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
                                    {!formikProps.isSubmitting && submissionError ? (
                                        <Alert
                                            style={styles.alert}
                                            severity="error"
                                            text={submissionError}
                                            onClose={() => setSubmissionError(null)}
                                        />
                                    ) : null}

                                    <FormikPasswordTextInput
                                        fieldLabels={changePasswordFieldLabels}
                                        field={ChangePasswordField.oldPassword}
                                        textInputStyle={styles.passwordTextInput}
                                        formikProps={formikProps}
                                        returnKeyType="next"
                                        onSubmitEditing={() => newPassRef.current?.focus()}
                                    />

                                    <FormikPasswordTextInput
                                        fieldLabels={changePasswordFieldLabels}
                                        field={ChangePasswordField.newPassword}
                                        textInputStyle={styles.passwordTextInput}
                                        formikProps={formikProps}
                                        ref={newPassRef}
                                        returnKeyType="next"
                                        onSubmitEditing={() => confirmNewPassRef.current?.focus()}
                                    />

                                    <FormikPasswordTextInput
                                        fieldLabels={changePasswordFieldLabels}
                                        field={ChangePasswordField.confirmNewPassword}
                                        textInputStyle={styles.passwordTextInput}
                                        formikProps={formikProps}
                                        ref={confirmNewPassRef}
                                        returnKeyType="done"
                                        onSubmitEditing={formikProps.handleSubmit}
                                    />
                                </KeyboardAwareScrollView>
                            </Dialog.ScrollArea>
                            <Dialog.Actions>
                                <Button
                                    disabled={formikProps.isSubmitting}
                                    onPress={() => onDismiss(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={
                                        formikProps.isSubmitting ||
                                        Object.keys(formikProps.errors).length !== 0 ||
                                        Object.keys(formikProps.touched).length === 0
                                    }
                                    loading={formikProps.isSubmitting}
                                    onPress={formikProps.handleSubmit}
                                >
                                    Save
                                </Button>
                            </Dialog.Actions>
                        </>
                    )}
                </Formik>
            ) : (
                <Formik
                    initialValues={adminPasswordInitialValues}
                    validationSchema={adminEditPasswordValidationSchema}
                    onReset={() => setSubmissionError(null)}
                    onSubmit={async (values, formikHelpers) => {
                        return handleUpdatePassword(user.id, values, formikHelpers)
                            .then(() => {
                                setSubmissionError(null);
                                onDismiss(true);
                                formikHelpers.resetForm();
                            })
                            .catch((e: any) => setSubmissionError(`${e}`));
                    }}
                >
                    {(formikProps: FormikProps<TAdminPasswordValues>) => (
                        <>
                            <Dialog.Title>
                                Change password for {user.username} (ID {user.id})
                            </Dialog.Title>
                            <Dialog.ScrollArea>
                                <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
                                    {!formikProps.isSubmitting && submissionError ? (
                                        <Alert
                                            style={styles.alert}
                                            severity="error"
                                            text={submissionError}
                                            onClose={() => setSubmissionError(null)}
                                        />
                                    ) : null}

                                    <FormikPasswordTextInput
                                        fieldLabels={adminUserFieldLabels}
                                        field={AdminField.password}
                                        textInputStyle={styles.passwordTextInput}
                                        formikProps={formikProps}
                                        ref={newPassRef}
                                        returnKeyType="next"
                                        onSubmitEditing={() => confirmNewPassRef.current?.focus()}
                                    />

                                    <FormikPasswordTextInput
                                        fieldLabels={adminUserFieldLabels}
                                        field={AdminField.confirmPassword}
                                        textInputStyle={styles.passwordTextInput}
                                        formikProps={formikProps}
                                        ref={confirmNewPassRef}
                                        returnKeyType="done"
                                        onSubmitEditing={formikProps.handleSubmit}
                                    />
                                </KeyboardAwareScrollView>
                            </Dialog.ScrollArea>
                            <Dialog.Actions>
                                <Button
                                    disabled={formikProps.isSubmitting}
                                    onPress={() => onDismiss(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={
                                        formikProps.isSubmitting ||
                                        Object.keys(formikProps.errors).length !== 0 ||
                                        Object.keys(formikProps.touched).length === 0
                                    }
                                    loading={formikProps.isSubmitting}
                                    onPress={formikProps.handleSubmit}
                                >
                                    Save
                                </Button>
                            </Dialog.Actions>
                        </>
                    )}
                </Formik>
            )}
        </Dialog>
    );
};

export default ChangePasswordDialog;