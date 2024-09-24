import { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";

import axios from "axios";
import CalendarStrip from "react-native-calendar-strip";

import Slot from "../components/Slot";
import NewPlayerModal from "../components/NewPlayerModal";

interface SlotModel {
  id: number;
  time: string;
  nineFee: string;
  eighteenFee: string;
  players: number;
}

export default function Booking() {
  const [data, setData] = useState<SlotModel[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("use effect");
    appointmentRetrieve(selectedDate);
  }, [selectedDate]);

  const appointmentRetrieve = (date: Date) => {
    setLoading(true);
    let data = JSON.stringify({
      BCC: {
        StrServer: "GSERVER",
        StrURL: "https://api_sandbox.EagleClubSystems.online",
        StrDatabase: "Sandbox",
        IntOrganizationID: 1,
        IntOperatorID: 2,
        EmailErrors: false,
        SignalRConnectionID: "",
        Information: "",
        PrinterName: "",
      },
      StrDate: "20240923",
      StrTime: "1637",
      TeePriceClassID: 70,
      IncludeExisting: true,
      Master_CarriageID: 93,
      Master_TeePriceClassIDs: ",70,",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api_sandbox.eagleclubsystems.online/api/online/OnlineAppointmentRetrieve",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        let fdate = getFormattedDate(date);
        let result = response.data.LstAppointment;
        let today = result.filter((x: any) => x.Date == fdate);
        console.log("appointment", fdate, today);

        let final = today.map((x: any, i: any) => ({
          id: i,
          date: x.Date,
          time: x.Time,
          nineFee: x.NineFee,
          eighteenFee: x.EighteenFee,
          players: 4,
        }));
        setData(final);
        console.log("data loaded");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const getFormattedDate = (date: Date): string => {
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    return (
      y.toString() + (m < 10 ? "0" + m.toString() : m.toString()) + d.toString()
    );
  };

  const onDateChangedHandler = (date: any) => {
    let d = new Date(date);
    console.log(d);
    setSelectedDate(d);
  };

  const endDate = () => {
    let today = new Date();
    let next = new Date();
    next.setDate(today.getDate() + 10);
    return next;
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSlotClick = () => {
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <CalendarStrip
        scrollable
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={{
          type: "background",
          duration: 200,
          highlightColor: "white",
        }}
        iconContainer={{ flex: 0.1 }}
        style={styles.calendar}
        calendarColor={"#1ab394"}
        calendarHeaderStyle={{ color: "white" }}
        dateNumberStyle={{ color: "white" }}
        dateNameStyle={{ color: "white" }}
        onDateSelected={onDateChangedHandler}
        selectedDate={selectedDate}
        minDate={new Date()}
        maxDate={endDate()}
        disabledDateNameStyle={{ color: "grey" }}
        disabledDateNumberStyle={{ color: "grey" }}
      />
      <View>
        {loading && (
          <View style={{ marginTop: 20 }}>
            <ActivityIndicator />
          </View>
        )}
      </View>
      <View style={styles.slotContainer}>
        <FlatList
          contentContainerStyle={{
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
          columnWrapperStyle={{
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
          key={data?.length}
          numColumns={data && data.length > 1 ? data?.length : 2}
          data={data}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Slot
                title={item.time}
                actual={item.nineFee}
                total={item.eighteenFee}
                players={item.players}
                onSlotClick={onSlotClick}
              ></Slot>
            </View>
          )}
        />
      </View>
      <NewPlayerModal
        isVisible={isModalVisible}
        onClose={onModalClose}
      ></NewPlayerModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  calendar: {
    paddingTop: 10,
    flex: 0.12,
    minHeight: 1,
    minWidth: 1,
  },
  slotContainer: {
    flex: 0.88,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    marginTop: 10,
  },
  item: {},
});
