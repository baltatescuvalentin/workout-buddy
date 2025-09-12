import { useState } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface IUserEditValue<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: string;
  id: Path<T>;
}

function UserEditValue<T extends FieldValues>({
  register,
  name,
  id,
}: IUserEditValue<T>) {
  const [editing, setEditing] = useState<boolean>(false);

  return <div></div>;
}

export default UserEditValue;
