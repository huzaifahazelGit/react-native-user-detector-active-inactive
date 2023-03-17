import React, { useState, useEffect } from "react";
import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useKeyboardHook } from "./useKeyboardhook";

const UserInactivity = ({
    children,
    style,
    skipKeyboard,
    currentScreen,
    timeForInactivity,
    onHandleActiveInactive,
    consoleTimer,
    consoleTouchScreen,
    consoleComponentChange,
    consoleLongPress,
}) => {
    const defaultStyle = {
        flex: 1,
    };

    const actualStyle = style || defaultStyle;
    const isKeyboard = useKeyboardHook();
    const [timer, setTimer] = useState(0);
    const [touchStarted, setTouchStarted] = useState(true);
    var interval;
    var interval1;

    useEffect(() => {
        if (touchStarted) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setTimer(0);
    }, [currentScreen]);

    useEffect(() => {
        consoleTimer && console.log("---Timer---", timer);
        if (timer == timeForInactivity) {
            onHandleActiveInactive();
        }
    }, [timer]);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                if (skipKeyboard) {
                    setTimeout(() => {
                        clearInterval(interval);
                        clearInterval(interval1);
                        setTimer(0);
                    }, 1000);
                }
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                if (skipKeyboard) {
                    interval1 = setInterval(() => {
                        setTimer((prevTimer) => prevTimer + 1);
                    }, 1000);
                }
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
            clearInterval(interval);
            clearInterval(interval1);
        };
    }, []);

    const resetTimer = () => {
        setTimer(0);
    };

    const handlePress = () => {
        consoleTouchScreen &&
            console.log(
                "---------- only Touchable Screen detect not keyboard detect  -----------------------"
            );
        if (!touchStarted) {
            setTouchStarted(true);
        } else {
            resetTimer();
        }
    };

    const handleLongPress = () => {
        consoleLongPress && console.log("------- Longpress --------");
        resetTimer();
    };

    const layoutChange = () => {
        consoleComponentChange && console.log("------ component Change -----");
        setTimer(0);
        if (isKeyboard.keyboardShown) {
            resetTimer();
        }
    };

    return (
        <TouchableWithoutFeedback
            onLongPress={handleLongPress}
            onPress={handlePress}
            onLayout={() => layoutChange()}
        >
            <View style={actualStyle}>{children}</View>
        </TouchableWithoutFeedback>
    );
};

export default UserInactivity;
