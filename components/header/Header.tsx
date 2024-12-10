import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';


const Header = ({ headerType, title }: { headerType: "BACK" | "MODAL", title: string }) => {
    const router = useRouter();

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => router.back()}
                >
                    {
                        headerType === "BACK" && (
                            <Ionicons name="chevron-back-outline" size={26} color="black" />
                        )
                    }
                    {
                        headerType === "MODAL" && (
                            <Ionicons name="close-outline" size={26} color="black" />
                        )
                    }
                </TouchableOpacity>
                <Text style={{ fontSize: 16 }}>{title}</Text>
            </View>
        </View>
    );
};
{/* <ion-icon name="chevron-back-outline"></ion-icon> */ }
const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        borderRadius: 8,
        paddingLeft: 20
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Header;