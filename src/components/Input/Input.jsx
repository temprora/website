import React, { forwardRef, useId, useState } from 'react'
import './Input.css'

const Input = forwardRef(
  ({ label = 'Enter value', value, onChange, ...props }, ref) => {
    const id = useId()

    return (
      <div className="list_y input_area">
        {label && (
          <label htmlFor={id} className="mr_b_0">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          type="text"
          value={value}
          {...props}
          onChange={onChange}
        />
      </div>
    )
  }
)

export default Input
