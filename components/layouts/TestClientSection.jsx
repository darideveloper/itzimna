"use client"

import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { useForm } from "react-hook-form"


export default function TestClientSection() {

  // Import react hook form required methods
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  /**
   * Function to handle form submit
   */
  function onSubmit(data) {
    console.log(data)
  }


  return (
    <section>

      {/* CLient button with a onClick */}
      <hr />
      <p>Client section</p>
      <hr />
      <p>Button (action)</p>
      <Button
        onClick={() => alert('Button clicked')}
      >
        This is a button link
      </Button>
      <br />
      <br />
      <br />

      {/* Form with react-hook-form */}
      <hr />
      <p>React Hook Form</p>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input 
          label="test-input"
          name="test-input"
          type="text"
          register={register}
          required={true}
          errors={errors}
          placeholder="test-input"
          errorMessage="This field is required"
        />

        <input type="submit" />
      </form>

    </section>
  )
}