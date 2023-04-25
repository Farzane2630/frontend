import React, { useEffect, useState } from 'react'

export default function LandingCounter({ count }) {
  const [counter, setCounter] = useState(0)

  useEffect(() => {

    let interval = setInterval(() => {
      setCounter(prev => prev + 1)
    }, 100);

    if (counter === count) {
      return clearInterval(interval)
    }
    return () => clearInterval(interval)

  }, [counter])

  return (
    <span className="landing-status__count"> {counter} </span>
  )
}
