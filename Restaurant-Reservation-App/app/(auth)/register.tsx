import React, { useState } from "react";
import { View, Text, TextInput,  Button, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "@/context/AuthContext";
import Icons from "@/utils/Icons";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const { Register, isLoading } = useSession();
  const router = useRouter();

  const handleRegister = async () => {
    await Register(email, password, username);
    router.replace("/(app)/home");
  };

  if (isLoading) 
  {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconLogo }>
          <Icons name="shopping-basket" color="#BCF2F6" size={86}/>
          <Text style={styles.logoTitle}>EasyShopper</Text>
        </View> 
      </View>

      <View style={styles.regForm}>
        <Text style={styles.loginTitleTxt}>
           Register to 
           <Icons name="shopping-basket" color="black" size={20}/>
           EasyShopper
        </Text>      

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={{ borderBottomWidth: 1, marginBottom: 10, width: "80%" }}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{ borderBottomWidth: 1, marginBottom: 10, width: "80%" }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ borderBottomWidth: 1, marginBottom: 10, width: "80%" }}
        />
        <TextInput
          placeholder="Confirm Password"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          secureTextEntry
          style={{ borderBottomWidth: 1, marginBottom: 10, width: "80%" }}
        />
        <Button title="Register" onPress={handleRegister} />

        <Text >
          By registering you agree to <Text style={styles.link} 
            onPress={() => router.push("/tsNcs")}> 
            Terms & Conditiions
        </Text> and <Text style={styles.link} 
          onPress={() => router.push("/PoP")}> 
          Privacy Policy
        </Text> of the EasyShopper ShoppingList app.

        </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    backgroundColor: "#006BFF",
  },
  header:{
    width:"100%",
    height:"36%",
    backgroundColor:"#006BFF"
  },
  iconLogo:
  {
    flex:1,
    padding: 16,
    justifyContent:"center",
    alignItems:"center"
  },
  logoTitle: {
    fontSize: 24,
    fontWeight: "bold",
    // color: "#6200ea",
    color:"#BCF2F6",
    marginTop: 10,
  },

  regForm:{
    flex:1,
    width:"100%",
    // height:"64%",
    padding:16,
    // justifyContent: "center",
    alignItems: "center",    
    backgroundColor:"white",
    borderTopLeftRadius:56,
  },
  loginTitleTxt:{
    width:"100%",
    fontSize: 21,
    fontWeight: "bold",
    padding:8,
    textAlign:"right",
    alignItems:"center",
    textDecorationLine:"underline"

  },
  input: {
    width: "100%",
    borderColor: "black", 
    padding: 10,    
    borderBottomWidth: 1,
    marginTop: 28,
  },
  link: {
    marginTop: 10,
    color: "blue",
    textDecorationLine: "underline",
  },
});
