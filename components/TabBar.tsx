import React, { useCallback, memo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { EColors } from "@/constants/Colors";
import { responsiveByHeight as rh, responsiveByWidth as rw } from '@/utils/responsive';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const getIconByRouteName = (routeName: string, color: string) => {
  switch (routeName) {
    case "Map":
      return <Feather name="map-pin" size={18} color={color} />;
    case "Settings":
      return <SimpleLineIcons name="settings" size={18} color={color} />;
    default:
      return <Feather name="home" size={18} color={color} />;
  }
};

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = useCallback(() => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        }, [navigation, route.key, route.name, route.params, isFocused]);

        return (
          <AnimatedTouchableOpacity
            layout={LinearTransition.springify().mass(0.5)}
            key={route.key}
            onPress={onPress}
            style={[
              styles.tabItem,
              { backgroundColor: isFocused ? EColors.white : "transparent" },
            ]}
          >
            {getIconByRouteName(
              label as string,
              isFocused ? EColors.color_130057 : EColors.white
            )}
            {isFocused && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={styles.text}
              >
                {label as string}
              </Animated.Text>
            )}
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: EColors.color_130057,
    width: "50%",
    alignSelf: "center",
    bottom: rh(40),
    borderRadius: rh(40),
    paddingHorizontal: rw(12),
    paddingVertical: rh(10),
    shadowColor: EColors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tabItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: rh(36),
    paddingHorizontal: rw(13),
    borderRadius: rh(30),
  },
  text: {
    color: EColors.color_130057,
    marginLeft: rw(8),
    fontWeight: "500",
  },
});

export default memo(TabBar);
