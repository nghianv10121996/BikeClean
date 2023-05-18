import { Calendar } from 'react-native-big-calendar';
import { SafeAreaView } from "react-native-safe-area-context";
import * as styles from "./calendar.styles";

const events = [
  {
    title: 'Meeting',
    start: new Date(),
    end: new Date(),
  }
]

const CalendarComponent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        bodyContainerStyle={styles.calendarContainer}
        mode="week"
        events={events}
        height={600}
      />
    </SafeAreaView>
  )
}

export default CalendarComponent;