import { Text, Pressable } from 'react-native'
import React from 'react'

export function FilterOptions({ days, label, selectedRange, setSelectedRange}) {
  return (
    <Pressable
      style={{
        backgroundColor: selectedRange === days ? '#000000' : '#ffffff',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 5,
      }}
    >
      <Text
        style={{
          color: selectedRange === days ? '#ffffff' : '#000000',
          fontWeight: 'bold',
        }}
        onPress={() => setSelectedRange(days)}
      >
        {label}
      </Text>
    </Pressable>
  )
}

export const MemorizedFilter = React.memo(FilterOptions);