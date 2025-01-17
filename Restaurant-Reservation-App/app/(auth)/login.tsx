import React, { useState } from "react";
import {ActivityIndicator, View, Text, TextInput, Button, StyleSheet, Pressable } from "react-native";
import { useSession } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import Icons from "@/utils/Icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { SignIn, isLoading } = useSession();
  const router = useRouter();

  const handleGuestLogin = () => {
    SignIn("Guest", undefined, true).then(() => router.push("/(app)"))
  };

  const handleLogin = () => {
    SignIn(email, password).then(() => router.push("/(app)"));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconLogo }>
          <Icons name="logo" color="#BCF2F6" size={86}/>
          <Text style={styles.logoTitle}>ClimaVoyage</Text>
        </View> 
      </View>

      <View style={styles.loginForm}>
        <Text style={styles.loginTitleTxt}>
           Login to <Icons name="logo" color="black" size={20}/> ClimaVoyage
        </Text>

        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}  />
        <TextInput style={styles.input}placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry  />
        <Text style={styles.forgotPass_link}>Forgot Password</Text>
        <Pressable style={styles.loginBtn}
          onPress={handleLogin} >
          <Text style={styles.loginBtnTxt}>
            {isLoading ? "Loading..." : "Login"}
          </Text>
        </Pressable>  

        <View style={{flex:1, gap:16}}>
          <Text style={{textAlign:"center"}}>
            Don't have an account?
            <Text style={styles.link} onPress={() => router.push("/(auth)/register")}> Register Now</Text> 
          </Text>
          <Text style={{textAlign:"center"}}>  or </Text>

          <View style={styles.h_btn_group}>
            <Pressable style={styles.guest_button}
              onPress={handleGuestLogin}>
                <Text style={styles.loginBtnTxt}>Login as Guest</Text>
            </Pressable> 

            <Pressable style={styles.G_button} onPress={handleGuestLogin}>
              <Icons name="google" />
            </Pressable>

            <Pressable style={styles.F_button} onPress={handleGuestLogin}>
              <Icons name="facebook" />
            </Pressable>

            <Pressable style={styles.F_button} onPress={handleGuestLogin}>
              <Icons name="apple" color="grey" />
            </Pressable>
          </View>

        </View>          
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
  loginForm:{
    flex:1,
    width:"100%",
    // height:"64%",
    padding:16,
    justifyContent: "center",
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

  },
  input: {
    width: "100%",
    borderColor: "black", 
    padding: 10,    
    borderBottomWidth: 1,
    marginTop: 28,
  },

  forgotPass_link:{
    marginTop: 10,
    width:"100%",
    color: "red",
    fontWeight:700,
    textDecorationLine: "underline",
    textAlign:"right"
  },
  link: {
    marginTop: 10,
    color: "red",
    fontWeight:700,
    textDecorationLine: "underline",
  },

  loginBtn:{
    margin:16,
    padding:12,
    width:"100%",
    backgroundColor:"#006BFF",
    borderRadius:4,
  },

  loginBtnTxt:{
    textAlign:"center", 
    fontSize:18, 
    fontWeight:"bold", 
    color:"white"
  },

  h_btn_group:{

    width:"100%",
    height: 64,
    padding:8,
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    gap:8,
    backgroundColor:"white",
  },

  guest_button:{
    padding:8,    
    height:44,
    backgroundColor:"grey",
    borderRadius:8,
  },
  G_button:{    
    padding:8, 
    width:44,
    backgroundColor:"red",
    borderRadius:8,
  },

  F_button:{    
    padding:8, 
    width:44,
    backgroundColor:"lightgrey",
    borderRadius:8,
  },

 
});
