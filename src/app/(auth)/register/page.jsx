"use client";
import React, { useActionState } from 'react'
import Link from 'next/link'
import { Register } from '@/actions/auth'

function RegisterForm() {
  const [state, action, isPending] = useActionState(Register, undefined);

  return (
    <div className='container w-1/2'>
      <h1 className='title'>Register</h1>

      <form action={action} className="space-y-4">

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id='email' value={state?.email} />
          {state?.errors?.email && <p className='text-red-500'>{state.errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id='password' />
          {state?.errors?.password && 
            <div className="error"> 
              <ul className="list-disc list-inside ml-4">
                {state.errors.password.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Email</label>
          <input type="email" name="confirmPassword" id='confirmPassword' />
          {state?.errors?.email && <p className='text-red-500'>{state.errors.email}</p>}
        </div>

        <div className="flex items-end gap-4">
          <button disabled={isPending} className='btn-primary'>
            {isPending ? 'Loading...' : 'Register'}
          </button>
        </div>

        <Link href="/login">Or Login here</Link>

      </form>
    </div>
  )
}

export default RegisterForm