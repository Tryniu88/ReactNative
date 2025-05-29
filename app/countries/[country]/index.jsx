import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function CountrieInfo() {
  const { country } = useLocalSearchParams();
  const [dane, setDane] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
      const data = await res.json();
      setDane(data[0]);
    };
    if (country) {
      fetchData();
    }
  }, [country]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#01497c",
        paddingTop: 60,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {dane ? (
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 24, marginBottom: 20 }}>
            {dane.name.common}
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            Stolica: {dane.capital?.[0]}
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            Populacja: {dane.population.toLocaleString()}
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            Region: {dane.region}
          </Text>
        </View>
      ) : (
        <Text style={{ color: "white" }}>Ładowanie danych...</Text>
      )}
    </View>
  );
}
