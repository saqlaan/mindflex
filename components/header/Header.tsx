import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@ui-kitten/components';


const Header = ({ headerType, title, hasBackButton=true, rightNode }: { headerType?: "BACK" | "MODAL", title: string, hasBackButton?: boolean, rightNode?:React.ReactNode }) => {
    const router = useRouter();

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, marginBottom: 20 }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10,  }}>
                {
                    hasBackButton && (
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
                    ) 
                }
                <Text style={{ fontSize: 20 }}>{title}</Text>
            </View>
            {rightNode}
        </View>
    );
};
{/* <ion-icon name="chevron-back-outline"></ion-icon> */ }
const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        borderRadius: 8,

    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Header;