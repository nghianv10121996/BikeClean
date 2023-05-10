import { Text } from "react-native";
import { Calendar } from 'react-native-big-calendar';
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../utils/theme/colors";

const events = [
  {
    title: 'Meeting',
    start: new Date(),
    end: new Date(),
  }
]

const CalendarComponent = () => {
  return (
    <SafeAreaView style={{
      backgroundColor: colors.white,
      flex: 1
    }}>
      <Calendar
        bodyContainerStyle={{
          backgroundColor: colors.white
        }}
        mode="month"
        events={events}
        height={600}
      />
    </SafeAreaView>
  )
}

export default CalendarComponent;