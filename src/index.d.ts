import React from "react";
import { StyleProp, ViewStyle } from "react-native";
export interface UserInactivityProps<T = unknown> {
  /**
   * get current screen for route name when screen or layout is rendering (change)
   */
  currentScreen?: any;

  /**
   * Number of seconds after which the view is considered inactive.
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
   * you may customize the screen routing (navigation) when app surface is active or inactive with function creating
   * you may create multiple condition if-else in handleActiveInactive function
   */
  onHandleActiveInactive: () => void;
}
declare const UserInactivity: React.FC<UserInactivityProps>;
export default UserInactivity;
