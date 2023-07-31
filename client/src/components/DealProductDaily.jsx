import React, {useState, useEffect} from 'react'
import {RealTimeDown} from './index'
const DealProductDaily = () => {
    const [second, setSecond] = useState(0)
    const [minute, setMinute] = useState(0)
    const [houre, setHoure] = useState(0)

  const [prodCountDown, setProdCountDown] = useState(false)

  useEffect (() => {
    if (prodCountDown) {
        setHoure(13)
        setSecond(19)
        setMinute(8)
    }
  }, [prodCountDown])

  useEffect(() => {
    let imeInterval = setInterval(() => {
        if (second > 0) setSecond(pre => pre - 1)
        else {
            if (minute > 0) {
                setMinute(pre => pre - 1)
                setSecond(59)
            }
            else {
                if (houre > 0) {
                    setHoure(pre => pre - 1)
                    setSecond(59)
                    setMinute(59)
                }
                else {
                    setProdCountDown(true)
                }
            }
        }
    }, 1000)
    return () => {
        clearInterval(imeInterval)
    }
  }, [second, houre, minute, prodCountDown])
  return (
    <div>
        <div className='flex'>
            <RealTimeDown display = "Giờ" time = {houre}></RealTimeDown>
            <RealTimeDown display = "Phút" time = {minute}></RealTimeDown>
            <RealTimeDown display = "Giây" time = {second}></RealTimeDown>
        </div>
    </div>
  )
}

export default DealProductDaily