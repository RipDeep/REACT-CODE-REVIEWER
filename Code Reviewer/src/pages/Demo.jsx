import React from 'react'
import HomePage from './HomePage'
import { useState } from 'react'

function Demo() {
    const [demoData, setDemoData] = useState(
        `def is_prime(n: int) -> bool:
    """Return True if n is a prime number, otherwise False."""
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    
    # Check only odd divisors up to √n
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True


# Example usage
if __name__ == "__main__":
    nums = [2, 3, 4, 17, 20, 97, 100]
    for num in nums:
        print(f"{num} -> {is_prime(num)}")
`
    )
    return (
        <div>
            <HomePage demoData={demoData}/>
        </div>
    )
}

export default Demo
