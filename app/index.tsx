import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default function HomeScreen() {
	return (
		<View style={styles.container}>
			<Text>FATEC - App de Aprendizagem de Máquina</Text>
		</View>
	);
}
