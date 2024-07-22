import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { Button, StyleSheet, Text, View } from 'react-native';
import StrokeText from '../../component/StrokeText';

export default function QrCodeScanner({ navigation }: any) {
	const [permission, requestPermission] = useCameraPermissions();

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
		<View style={styles.container}>
			<Text style={styles.message}>QR코드 스캔을 위해 권한 승인이 필요합니다.</Text>
			<Button onPress={requestPermission} title="권한 요청" />
		</View>
		);
	}

	const onScanned = (e:BarcodeScanningResult) => {
		// if (e.type == 'qr') {
		// 	navigation.navigate('QrCodeTest', {data: e.data});
		// }
	}

	return (
		<View style={styles.container}>
		<CameraView style={{flex: 1}} onBarcodeScanned={(e) => onScanned(e)}>
			<View style={styles.textContainer}>
				<StrokeText text={"QR코드를 스캔 해 주세요"} size={20} color={"white"} strokeColor={"black"}/>
			</View>
		</CameraView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	message: {
		textAlign: 'center',
	},
	textContainer: {
		flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
	},
});
