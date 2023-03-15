<h1 align="center">react-native-user-detector-active-inactive</h1>

<div align="center">

![npm version](https://img.shields.io/badge/version-0.0.5-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/huzaifahazelGit/react-native-user-detector-active-inactive)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/huzaifahazelGit/react-native-user-detector-active-inactive/pulse)
[![code issues](https://img.shields.io/badge/Issues%3F-yes-red.svg)](https://github.com/huzaifahazelGit/react-native-user-detector-active-inactive/issues)

</div>

> A React Native component that notifies if the user/screen is active behaviour or not (i.e. when the app surface hasn't been touched for more than a certain amount of second ).You may customize to set the time anagist different screen when app is active or inactive, Also You may customize the changing of screen routing when app surface hasn't been touched ( Inactive behaviour) after complete duration of timeForInactivity. Timer will be reset when navigate screen and layout or component change then timer re-initialized from zero ,
> Also then timer will to be reset & timer will be stopped when keyboard appears

As of version 0.0.5, `react-native-user-detector-active-inactive` customize the function props with (onHandleActiveInactive) for setting the screen routing (navigation) when app-surface is active or inactive behaviour with function props (onHandleActiveInactive) and
Also may able to check console when props (console flag) will be keep to true.
Also resets the timer & timer will be stopped or not when the keyboard appears or disappears.If skipKeyboard property set to true, then timer will be stopped and app-surface will not move to In-active behaviour

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
   * if it is not used than timer will not to be reset when navigate another screen   */
  currentScreen?: string;
  /**
   * Number of seconds after which the view is considered inactive beahviour.
   * If it changed, the timer restarts and the view is considered active until
   * the new timer expires.
   * It defaults to  second when you send a props at timeForInactivity .
   */
  timeForInactivity?: number;

  /**
   * Children components to embed inside UserInactivity's View.
   * If any children component is pressed,    `onHandleActiveInactive` is called after
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
   *  It defaults to false  when set to props than not showing timer in console   .
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
   * customization setting for screen routing when app-surface is active or in-active beahviour
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
          currentScreen={currentRoute} // get screen name, if used than timer will to to be reset when navigating screen otherwise not to reset
          timeForInactivity={10}  // means 10 second
          onHandleActiveInactive={handleActiveInactive} // customization setting for navigating screen routing when app-surface is active or in-active beahviour
          consoleTimer={true} // To check the timer in console
          // style={{flex:1}}   // customize style
        >
  );
}

```

Also, please checkout the [example on Snack/Expo](https://snack.expo.dev/@huzaifa1998/react-native-user-detector-active-inactive).

## 💪 Practical Example 1 (Explaination)

```tsx
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UserInactivity from "react-native-user-detector-active-inactive";

const App = () => {
  const [currentRoute, setCurrentRoute] = useState("");
  let timeForInactivity;

 // customize to set different timeForInactivity angainst multiple screen when app-surface is active or in-active behaviour
  currentRoute == "ClerkId" ||
  currentRoute == "InvoiceNumber" ||
    ? (timeForInactivity = 10)
    : (timeForInactivity = 30);
  currentRoute == "TipDoller" && (timeForInactivity = 10);
  currentRoute == "TapProcess" && (timeForInactivity = 20);

  // get current screen for route Name
  const onStateChange = (state: any) => {
    setCurrentRoute(state?.routes[state.index]?.name);
  };

  const handleActiveInactive = () => {
    //  customization setting for navigating screen routing when app-surface is active or in-active beahviour
    if (
      currentRoute == "ClerkId" ||
      currentRoute == "InvoiceNumber" ||
      currentRoute == "Merchant_Cart"
    ) {
      // navigation.navigate("TransactionMenu")
      navigate("TransactionMenu");
    } else {
      navigate("SaleWelcome");
    }
  };

  return (
        <UserInactivity
          currentScreen={currentRoute} // get screen name if not used than timer will not to be reset
          timeForInactivity={timeForInactivity} // time in  second
          onHandleActiveInactive={handleActiveInactive} // customization setting for navigating screen routing when app-surface is active or in-active beahviour
          skipKeyboard={false} //  If set to true, then timer will be stopped and app will not move to In-active behaviour
          consoleTimer={true} //  To check the timer in console
          consoleTouchScreen={true} //  To check the detection when screen touchable in console
          consoleComponentChange={true} //  To check the component or layout  when change in console
          consoleLongPress={true} //  To check the detection when long pressing at screen touchable in console
          // style={{flex:1}}   // customize style
        >
          <NavigationContainer
            theme={appTheme as any}
            ref={navigationRef}
            onStateChange={onStateChange} // get actual data about navigation screen route
          >
            <Routes />
          </NavigationContainer>
        </UserInactivity>
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

## 💪 Example 2

```tsx
import React from "react";
import UserInactivity from "react-native-user-detector-active-inactive";
import { useRoute } from "@react-navigation/native";
function BaseScreen(props) {
  const route = useRoute();
  const screenName = route.name; // get current screen name for route navigation
  const handleActiveInactive = () => {
    props.navigation.navigate("Home");
  };

  return (
    <UserInactivity
      style={props.style}
      timeForInactivity={props.timer}
      currentScreen={screenName} // add this line for getting the screen route name
      onHandleActiveInactive={handleActiveInactive}
      consoleTimer={true}
    >
      {props.children}
    </UserInactivity>
  );
}

export default BaseScreen;
```

## 💪 Method to Get current route screen name for naviagtion in any screen

```sh
   import { useRoute } from '@react-navigation/native';
   // below this lines used inside function
   const route = useRoute();
   const screenName = route.name;
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/huzaifahazelGit/react-native-user-detector-active-inactive).
The code is short, throughly commented and well tested, so you should feel quite comfortable working on it.

- If you have any doubt or suggestion, please open an issue or contact me via email (huzaifajunaid.hazel@gmail.com)

## 🦄 Show your support

Give a ⭐️ if this project helped or inspired you!

## 👤 Author

**Muhammad Huzaifa Junaid**
**huzaifajunaid.hazel@gmail.com**

- Github: [@huzaifahazelGit](https://github.com/huzaifahazelGit)

## 🚀 Demo Related Package

- please checkout the [example on Snack/Expo](https://snack.expo.dev/@huzaifa1998/react-native-user-detector-active-inactive).
