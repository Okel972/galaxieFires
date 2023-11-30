import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationProp} from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../FirebaseConfig'

interface RouterProps {
    navigation: NavigationProp<any, any>
}

const Separator = () => <View style={styles.separator} />;

const List = ({ navigation }: RouterProps) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button onPress={() => navigation.navigate('ShoppingItems')} title="Shopping"></Button>
            <Separator />
            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout"></Button>
            <Separator />
            <Text>List</Text>
        </View>
    )
}

export default List

const styles = StyleSheet.create({
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }
})