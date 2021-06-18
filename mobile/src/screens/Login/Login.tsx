import React, { useContext, useRef, useState } from "react";
import { Image, TextInput as NativeTextInput, useWindowDimensions, View } from "react-native";
import useStyles from "./Login.styles";
import LoginBackgroundSmall from "./LoginBackgroundSmall";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";
import Alert, { AlertSeverity } from "../../components/Alert/Alert";
import LoginBackground from "./LoginBackground";

enum LoginStatus {
    INITIAL,
    SUBMITTING,
    FAILED,
}

const Login = () => {
    const theme = useTheme();
    const styles = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(LoginStatus.INITIAL);

    // This is for selecting the next TextInput: https://stackoverflow.com/a/59626713
    // Importing RN's TextInput as NativeTextInput fixes the typing as mentioned in
    // https://github.com/callstack/react-native-paper/issues/1453#issuecomment-699163546
    const passwordTextRef = useRef<NativeTextInput>(null);

    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        if (!username.length || !password.length) {
            setStatus(LoginStatus.FAILED);
            return;
        }
        setStatus(LoginStatus.SUBMITTING);

        const loginSucceeded = await login(username, password);
        if (!loginSucceeded) {
            setStatus(LoginStatus.FAILED);
        }
    };

    const { width, height } = useWindowDimensions();

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
        >
            {width <= 600 ? (
                <LoginBackgroundSmall style={styles.background} height={height * 1.05} />
            ) : (
                <LoginBackground style={styles.background} height={height * 2} />
            )}

            <View style={styles.formContainer}>
                <Image
                    style={styles.logo}
                    resizeMode="contain"
                    source={require("../../../assets/hha_logo_white.png")}
                />

                <Text style={styles.loginHeader}>Login</Text>
                <View style={{ margin: 10 }} />

                {status === LoginStatus.FAILED ? (
                    <>
                        <Alert severity="error" text="Login failed. Please try again." />
                        <View style={{ margin: 10 }} />
                    </>
                ) : status === LoginStatus.SUBMITTING ? (
                    <>
                        <Alert severity="info" text="Logging in" />
                        <View style={{ margin: 10 }} />
                    </>
                ) : (
                    <></>
                )}
                {/*
                    React Native Paper does not have "standard styling" TextFields as described in
                    https://material-ui.com/components/text-fields/. They only have the outlined
                    and filled ("flat") stylings:
                    https://callstack.github.io/react-native-paper/text-input.html
                */}
                <TextInput
                    label="Username"
                    value={username}
                    onChangeText={(newUsername) => setUsername(newUsername)}
                    mode="flat"
                    blurOnSubmit={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoCompleteType="username"
                    textContentType="username"
                    onSubmitEditing={() => passwordTextRef.current?.focus()}
                />
                <View style={{ margin: 10 }} />
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={(newPassword) => setPassword(newPassword)}
                    mode="flat"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoCompleteType="password"
                    textContentType="password"
                    onSubmitEditing={handleLogin}
                    ref={passwordTextRef}
                />
                <View style={{ margin: 10 }} />
                <Button
                    color={theme.colors.accent}
                    contentStyle={{ backgroundColor: theme.colors.accent }}
                    disabled={status === LoginStatus.SUBMITTING}
                    loading={status === LoginStatus.SUBMITTING}
                    onPress={handleLogin}
                    mode="contained"
                >
                    Login
                </Button>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default Login;
