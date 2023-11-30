import {    
    StyleSheet, 
    View, 
    Text, 
    SafeAreaView, 
    Pressable, 
    TextInput, 
    FlatList, 
    ActivityIndicator 
} from 'react-native'

import React, { useState, useEffect } from 'react'

import { AntDesign, MaterialIcons } from '@expo/vector-icons'

import { 
    FIRESTORE_DB, 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc 
} from '../../FirebaseConfig'

interface ShoppingItemProps {
    id: string;
    title: string;
    isChecked: boolean;
    getShoppingList: () => void;
}

const ShoppingItem: React.FC<ShoppingItemProps> = (props) => {

    const [isChecked, setIsChecked] = useState(props.isChecked);

    const updateIsChecked = async () => {
        const shoppingRef = doc(FIRESTORE_DB, "shopping", props.id);
        
        await updateDoc(shoppingRef, {isChecked: isChecked,})
    }

    const deleteShoppingItem = async () => {
        await deleteDoc(doc(FIRESTORE_DB, "shopping", props.id));
        props.getShoppingList();
    }

    useEffect(() => {
        updateIsChecked();
    }, [isChecked]);

    return (
        <View style={styles.container1}>
            <Pressable style={styles.checked} onPress={() => setIsChecked(!isChecked)}>
                {isChecked ? ( 
                    <AntDesign name="checkcircle" size={24} color="black" />
                ) : (
                    <AntDesign name="checkcircleo" size={24} color="black" /> 
                )}
            </Pressable>
            <Text style={styles.title}>{props.title}</Text>
            <Pressable onPress={deleteShoppingItem}>
                <MaterialIcons name="delete" size={24} color="black" />
            </Pressable>
        </View>
    )
}

const ShoppingItems = () => {

    const [title, setTitle] = useState("");
    const [shoppingList, setShoppingList] = useState<Array<{ id: string; }>>([]);

    const addShoppingItem = async () => {try {
        const docRef = await addDoc(collection(FIRESTORE_DB, "shopping"), {
          title: title,
          isChecked: false
        });
        console.log("Document written with ID: ", docRef.id);
        setTitle("");
      } catch (e) {
        console.error("Error adding document: ", e); }
    getShoppingList();
    };

    const getShoppingList = async () => {
        const querySnapshot = await getDocs(collection(FIRESTORE_DB, "shopping"));
        const shoppingListArray: Array<{ id: string; }> = [];
        
        querySnapshot.forEach((doc) => {
            shoppingListArray.push({
                ...doc.data(),
                id: doc.id,
            });
        });

        setShoppingList(shoppingListArray);
    };

    const deleteShoppingList = async () => {
        const querySnapshot = await getDocs(collection(FIRESTORE_DB, "shopping"));
        
        querySnapshot.docs.map((item) => deleteDoc(doc(FIRESTORE_DB, "shopping", item.id)));
        getShoppingList();
    }

    useEffect(() => {
        getShoppingList()
    }, []);
    
    return (
        <SafeAreaView style={styles.container2}>
            <View style={styles.header}>
                <Text style={styles.heading}>Shopping List</Text>
                <Text style={styles.noOfItems}>{shoppingList.length}</Text>
                <Pressable onPress={deleteShoppingList}>
                    <MaterialIcons name="delete" size={30} color="black" />
                </Pressable>
            </View>

            {shoppingList.length > 0 ? (
            <FlatList 
                data={shoppingList}
                renderItem={({ item }) => ( 
                    <ShoppingItem 
                        title={item.title} 
                        isChecked={item.isChecked} 
                        id={item.id}
                        getShoppingList={getShoppingList}
                    />
                )}
                keyExtractor={item => item.id}
            />
            ) : (
                <ActivityIndicator />
            )}
            
            <TextInput 
                placeholder='Enter Shopping Items' 
                style={styles.input} 
                value={title} 
                onChangeText={(text) => setTitle(text)}
                onSubmitEditing={addShoppingItem}
            />
        </SafeAreaView>
    )
}

export default ShoppingItems

const styles = StyleSheet.create({
    container1: {
        flexDirection: "row",
        alignSelf: "center",
        backgroundColor: "#5A5553",
        width: "90%",
        borderRadius: 10,
        padding: 13,
        alignItems: "center",
        marginTop: 15
    },
    container2: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        flexDirection: "row",
        width: "90%",
        padding: 10,
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    heading: {
        fontSize: 30,
        fontWeight: '500',
        flex: 1
    },
    noOfItems:{
        fontSize: 30,
        fontWeight: '500',
        marginRight: 20
    },
    input: {
        backgroundColor: '#C2C2C2',
        padding: 10,
        fontSize: 17,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 'auto'
    },
    title: {
        color: "#fff",
        fontSize: 20,
        flex: 1,
        fontWeight: "500"
    },
    delete: {
      alignItems: "center",
      justifyContent: "center",
      padding: 2,
    },
    checked: {
        paddingRight: 10,
        color: 'black'
    }
})