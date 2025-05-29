import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <View>
      <Link href="/supabase">supabase</Link>
      <Link href="/countries">Kraje</Link>
    </View>
  );
}
