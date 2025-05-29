import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";

export default function Coutries() {
  const router = useRouter();
  const [flagi, setFlagi] = useState([]);

  useEffect(() => {
    const fetchFlags = async () => {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setFlagi(data);
    };
    fetchFlags();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#01497c",
        paddingTop: 60,
        alignItems: "center",
      }}
    >
      <FlatList
        data={flagi}
        keyExtractor={(item, index) => index}
        numColumns={2}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.navigate({
                pathname: "countries/[country]",
                params: { country: `${item.name.common}` },
              })
            }
          >
            <Image
              style={{ width: 150, height: 100, margin: 5 }}
              source={{ uri: item.flags?.png }}
              contentFit="contain"
            />
          </Pressable>
        )}
      />
    </View>
  );
}
