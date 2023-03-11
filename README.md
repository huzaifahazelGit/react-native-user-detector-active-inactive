<h1 align="center">react-native-user-detector-active-inactive</h1>

> A React Native component that notifies if the user is active behaviour or not (i.e. when the app surface hasn't been touched for more than a certain amount of second ).You may customize to set the time anagist different screen when app is active or inactive, Also You may customize the changing of screen routing when app surface hasn't been touched ( Inactive behaviour) after complete duration of timeForInactivity.

As of version 0.0.3, `react-native-user-detector-active-inactive` customize the function props with (onHandleActiveInactive) for setting the screen routing (navigation) when app surface is active or inactive behaviour with function props (onHandleActiveInactive) and
Also may able to check console when props (console flag) will be keep to true.

# Install

Install `react-native-user-detector-active-inactive` into your project using:

```bash
npm install react-native-user-detector-active-inactive
```

```bash
yarn add react-native-user-detector-active-inactive
```

## 🔑 Key features

- 💪 written in TypeScript
- 🥇 supports generic timers (you're no longer constrained to `setTimeout`)
- 🥇 reset time when detect screen or component rendering (change)
- 🥇 reset time when Long pressing at screen or component rendering (change)
- ⚠️ optional to reset capability of the timer when keyboard open with props ( skipKeyboard={false} )
- ⚠️ optional to check capability of the timer running with props ( consoleTimer ={true} )
- ⚠️ optional to check capability of the screen detection with props ( consoleTouchScreen ={true} )
- ⚠️ optional to check capability of the Component changing with props ( consoleComponentChange ={true} )
- ⚠️ optional to check capability of the Long Pressing detection with props ( consoleLongPress ={true} )
- 💪 you may customize the screen routing (navigation) when app surface is active or inactive behaviour with function props (onHandleActiveInactive)
- ✨ you may customize to set multiple timeForInactivity against different screen or to set single timeForInactivity for all screen
- ✔️ the core logic of this component no other dependencies be used

## ❔ How to use

This package primarily exposes a single functional component, [UserInactivity](src/index.js).
The signature of the `UserInactivity` React props is the following:

```typescript
interface UserInactivityProps<T = unknown> {
  /**
   * get current screen for route name when screen or layout  is rendering (change)
   */
  currentScreen?: any;
  /**
   * Number of seconds after which the view is considered inactive beahviour.
   * If it changed, the timer restarts and the view is considered active until
   * the new timer expires.
   * It defaults to  second when you send a props at timeForInactivity .
   */
  timeForInactivity?: number;

  /**
   * Children components to embed inside UserInactivity's View.
   * If any children component is pressed, `onAction` is called after
   * `timeForInactivity` seconds. not millisecond
   */

  children: React.ReactNode;

  /**
   * If set to true, then timer will to be reset & timer will be stopped when keyboard appears but when the timer will to be again reset when keyboard disappear
   * If set to true, then timer will be stopped and app-surface will not to be In-active behaviour
   * if set to false, the timer will to be reset and timer will not to be stopped when keyboard appears or disappear
   */

  skipKeyboard?: boolean;
  /**
   * Optional custom style for UserInactivity's View.
   * It defaults to { flex: 1 }.
   */

  style?: StyleProp<ViewStyle>;
  /**
   * If it's explicitly set to `true` than you may check to console when timer running,
   * It defaults to true for ease of checking time  when set to props  .
   */

  consoleTimer?: boolean;
  /**
   * If it's explicitly set to `true` than you may check to console when timer running,
   * If it's explicitly set to `false` than you may not check to console for timer running,
   * It defaults to true when set to props flag will be true .
   */

  consoleTouchScreen?: boolean;
  /**
   * If it's explicitly set to `true` than you may check to console when detection the screen touch,
   * It defaults to false when set to props .
   */

  consoleComponentChange?: boolean;
  /**
   * If it's explicitly set to `true` than you may check to console when conponent or layout, screen rendering (change),
   * It defaults to false when set to props .
   */
  consoleLongPress?: boolean;

  /**
   * you may customize the screen routing (navigation) when app surface is active  or inactive behaviour  with function creating
   * you may create multiple condition if-else in handleActiveInactive function
   */
  onHandleActiveInactive: () => void;
}
```

## ✨ The default UserInactivity can be used like this

```tsx
import UserInactivity from 'react-native-user-detector-active-inactive';

export default () => {
  const [currentRoute, setCurrentRoute] = useState("");
  const handleActiveInactive = () => {
    // you may customize this navigation
    if (
      currentRoute == "ClerkId" ||
      currentRoute == "InvoiceNumber"
    ) {
      navigate("TransactionMenu");
    } else {
      navigate("SaleWelcome");
    }
  };
  return (
       <UserInactivity
          currentScreen={currentRoute}
          timeForInactivity={10}  // means 10 second
          onHandleActiveInactive={handleActiveInactive}
          consoleTimer={true}
        >
  );
}

```

## 💪 Practical Example 1 (Explaination)

```tsx
import { Provider, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { darkThemeStyle, defaultTheme } from "@theme";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import SplashScreen from "react-native-splash-screen";
import UserInactivity from "react-native-user-detector-active-inactive";
const App = () => {
  let appTheme = isEnabledOne ? darkThemeStyle : defaultTheme;
  const [currentRoute, setCurrentRoute] = useState("");
  let timeForInactivity;

  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

 // customize different timeForInactivity angainst multiple screen
  currentRoute == "ClerkId" ||
  currentRoute == "InvoiceNumber" ||
    ? (timeForInactivity = 10)
    : (timeForInactivity = 30);
  currentRoute == "TipDoller" && (timeForInactivity = 10);
  currentRoute == "TapProcess" && (timeForInactivity = 20);

  const onStateChange = (state: any) => {
    setCurrentRoute(state?.routes[state.index]?.name);
  };

  const handleActiveInactive = () => {
    // customization according screen routing
    if (
      currentRoute == "ClerkId" ||
      currentRoute == "InvoiceNumber" ||
      currentRoute == "Merchant_Cart" ||
      currentRoute == "EnterAmount" ||
      currentRoute == "TipDoller" ||
      currentRoute == "TapProcess" ||
      currentRoute == "SelectAccount" ||
      currentRoute == "Tap_Merchant_Cart"
    ) {
      // navigation.navigate("TransactionMenu")
      navigate("TransactionMenu");
    } else {
      navigate("SaleWelcome");
    }
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <CustomLoader />
        <UserInactivity
          currentScreen={currentRoute}
          timeForInactivity={timeForInactivity}
          onHandleActiveInactive={handleActiveInactive}
          skipKeyboard={false}
          consoleTimer={true}
          consoleTouchScreen={true}
          consoleComponentChange={true}
          consoleLongPress={true}
        >
          <NavigationContainer
            theme={appTheme as any}
            ref={navigationRef}
            onStateChange={onStateChange}
          >
            <Routes />
          </NavigationContainer>
        </UserInactivity>
      </SafeAreaProvider>
    </Provider>
  );
};
export default App;
```

## 💪 Example 1 (Explaination How to access navigate service file & method of use below defined )

```sh
import { navigate } from './services/nav.service'
```

```tsx
import * as React from "react";
export const navigationRef: any = React.createRef();
export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}
export const getCurrentRoute = () => {
  const route = navigationRef.getCurrentRoute();
  return route.name;
};
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/huzaifahazelGit/react-native-user-detector-active-inactive).
The code is short, throughly commented and well tested, so you should feel quite comfortable working on it.
If you have any doubt or suggestion, please open an issue.

## 🦄 Show your support

Give a ⭐️ if this project helped or inspired you!

## 👤 Author

**Muhammad Huzaifa Junaid**
**huzaifajunaid.hazel@gmail.com**

- Github: [@huzaifahazelGit](https://github.com/huzaifahazelGit)

## 🚀 Demo Related Package

- comming soon
