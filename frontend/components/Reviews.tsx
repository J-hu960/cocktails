import { TReview } from '@/app/types'
import React from 'react'
import { Text, View } from 'react-native'


interface Props{
    reviews:TReview[] | undefined
}

const Reviews = ({reviews}:Props) => {
  return (
    reviews?.forEach(review=>(
        <View>
            <Text>{review.content}</Text>
        </View>
    ))
  )
}

export default Reviews
