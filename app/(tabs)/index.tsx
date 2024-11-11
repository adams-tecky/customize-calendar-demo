import { Image, StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Calendar } from "react-native-calendars";
import { useRef, useState } from "react";

import { View, Text, Animated, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState("");
  const slideAnim = useRef(new Animated.Value(400)).current;

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    // Slide in the view
    Animated.timing(slideAnim, {
      toValue: 0, // Slide to visible position
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSlideView = () => {
    // Slide out the view
    Animated.timing(slideAnim, {
      toValue: 300, // Slide back to off-screen
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <View style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <Calendar
            onDayPress={handleDayPress}
            markingType="multi-period"
            theme={{
              "stylesheet.day.basic": {
                base: {
                  height: 50, // Set this to the desired height
                  justifyContent: "center",
                  alignItems: "center",
                },
              },
            }}
            markedDates={{
              "2024-11-14": {
                periods: [
                  { startingDay: true, endingDay: true, color: "#5f9ea0" },
                ],
              },
            }}
          />
        </ThemedView>
        <Animated.View
          style={[
            styles.slideView,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.selectedDateText}>
            Selected Date: {selectedDate}
          </Text>
          <TouchableOpacity onPress={closeSlideView} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  slideView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedDateText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  closeButton: {
    padding: 10,
    alignSelf: "center",
    backgroundColor: "#007AFF",
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
