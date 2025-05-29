import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

export default function Formularz() {
  const [nazwa, setNazwa] = useState("");
  const [cena, setCena] = useState("");
  const [kupujacy, setKupujacy] = useState("");
  const [status, setStatus] = useState("");
  const [products, setProducts] = useState([]);

  // Function to fetch products from Supabase
  const fetchProducts = async () => {
    const { data, error } = await supabase.from("sklep").select("*");

    if (error) {
      console.error("Błąd pobierania produktów:", error);
      setStatus("Błąd pobierania produktów: " + error.message);
    } else {
      setProducts(data);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const dodajDoSklepu = async () => {
    if (!nazwa || !cena || !kupujacy) {
      return;
    }

    const { data, error } = await supabase
      .from("sklep")
      .insert([{ nazwa: nazwa, cena: parseFloat(cena), kupujacy: kupujacy }]);

    if (error) {
      console.error(error);
    } else {
      setNazwa("");
      setCena("");
      setKupujacy("");
      fetchProducts();
    }
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <TextInput
        placeholder="Nazwa produktu"
        value={nazwa}
        onChangeText={setNazwa}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Cena"
        value={cena}
        onChangeText={setCena}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Kupujący"
        value={kupujacy}
        onChangeText={setKupujacy}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <Button title="Dodaj produkt" onPress={dodajDoSklepu} />
      {status ? <Text style={{ marginTop: 10 }}>{status}</Text> : null}

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 30,
          marginBottom: 10,
        }}
      >
        Lista produktów:
      </Text>
      {products.length > 0 ? (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                borderWidth: 1,
                borderColor: "black",
                padding: 10,
                marginBottom: 5,
              }}
            >
              <Text>
                <Text style={{ fontWeight: "bold" }}>Nazwa:</Text> {item.nazwa}
              </Text>
              <Text>
                <Text style={{ fontWeight: "bold" }}>Cena:</Text> {item.cena} zł
              </Text>
              <Text>
                <Text style={{ fontWeight: "bold" }}>Kupujący:</Text>{" "}
                {item.kupujacy}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text>Brak produktów do wyświetlenia.</Text>
      )}
    </View>
  );
}
