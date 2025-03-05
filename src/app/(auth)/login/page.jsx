"use client";
import React, { useActionState } from 'react'
import Link from 'next/link'
import { Login } from '@/actions/auth';

function LoginForm() {
  const [state, action, isPending] = useActionState(Login, undefined);

  return (
    <div className='container w-1/2'>
      <h1 className='title'>Login</h1>

      <form action={action} className="space-y-4">

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id='email' value={state?.email} />
          {state?.errors?.email && <p className='text-red-500'>{state.errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id='password' />
        </div>

        <div className="flex items-end gap-4">
          <button disabled={isPending} className='btn-primary'>
            {isPending ? 'Loading...' : 'Login'}
          </button>
        </div>

        <Link href="/register">Or sign up here</Link>

      </form>
    </div>
  )
}

export default LoginForm