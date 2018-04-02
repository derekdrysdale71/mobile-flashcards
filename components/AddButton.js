import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'

export default AddButton = ({ navigate }) => (
  <TouchableOpacity
    onPress={navigate('AddDeck')}
  >
    <Entypo name='minus' size={30} color={purple} />
  </TouchableOpacity>
)