import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { white } from '../utils/colors'

export default AddButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
  >
    <Entypo name='plus' size={30} color={white} />
  </TouchableOpacity>
)