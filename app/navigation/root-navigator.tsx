import React from "react"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MainNavigator } from "./main-navigator"

export type RootParamList = {
    mainStack: undefined
}

const Stack = createNativeStackNavigator<RootParamList>()

const RootStack = () => {
return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen
            name="mainStack"
            component={MainNavigator}
            options={{
                headerShown: false,
            }}
        />
    </Stack.Navigator>
)
}

export const RootNavigator = React.forwardRef<
    NavigationContainerRef<any>,
    Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
return (
    <NavigationContainer {...props} ref={ref}>
        <RootStack />
    </NavigationContainer>
)
})

RootNavigator.displayName = "RootNavigator"
