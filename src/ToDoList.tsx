import React, { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setTodo] = useState("");
//   const [toDoError, setToDoErrot] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDoErrot("");
//     setTodo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (toDo.length < 10) {
//       return setToDoErrot("To do should be longer.");
//     }
//     console.log("submit");
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write a to do" />
//         <button>Add</button>
//         {toDoError !== "" ? toDoError : null}
//       </form>
//     </div>
//   );
// }

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  CheckingPassword: string;
  extraError?: string;
}

function ToDoList() {
  const { register, watch, handleSubmit, formState: { errors }, setError } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    }
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.CheckingPassword) {
      setError("CheckingPassword", { message: "Password are not the same." });
    }
    setError("extraError", { message: "Server offline." }, { shouldFocus: true })
  };

  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
        <input {...register("email", {
          required: "Email is required.",
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
            message: "Only naver.com emails allowed.",
          }
        })}
          placeholder="email" />
        <span>
          {errors?.email?.message}
        </span>
        <input {...register("firstName", {
          required: "write here",
          validate: {
            noNico: (value) => value.includes("nico") ? "no nicos allowed" : true,
            noNick: (value) => value.includes("nick") ? "no nick allowed" : true
          }
        })}
          placeholder="firstName" />
        <span>
          {errors?.firstName?.message}
        </span>
        <input {...register("lastName", {
          required: "write here",
          minLength: 5
        })}
          placeholder="nlastNameame" />
        <span>
          {errors?.lastName?.message}
        </span>
        <input {...register("password", {
          required: "write here",
          minLength: 5
        })} placeholder="password" />
        <span>
          {errors?.password?.message}
        </span>
        <input {...register("CheckingPassword", {
          required: "Pass is required", minLength: {
            value: 5,
            message: "Your password is too short."
          }
        })}
          placeholder="CheckingPassword" />
        <span>
          {errors?.CheckingPassword?.message}
        </span>
        <button>Add</button>
        <span>
          {errors?.extraError?.message}
        </span>
      </form>
    </div>
  );
}

export default ToDoList;