import { signIn, signOut } from 'next-auth/react'
import React from 'react'

const page = () => {
  return (
    <div>
        hlo
        {/* <button onClick={() => signOut}>Signout</button>
        <button onClick={() => signIn}>SignIn</button> */}
    </div>
  )
}

export default page