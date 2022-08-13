import { useForm } from "react-hook-form";
import styled from "styled-components";
import CustomInput from "../common/Input";

import CustomLabel from "../common/Label";

type Props = {
  type: "add" | "edit";
  title?: string;
  onSubmit: (values: any) => void;
  formIsLoading: boolean;
};

const TaskModal: React.FC<Props> = ({
  type,
  title,
  onSubmit,
  formIsLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <div className="content-body">
          <div
            style={{
              marginBottom: 20,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CustomLabel htmlFor="text">Task</CustomLabel>
            <CustomInput
              type="text"
              defaultValue={title}
              placeholder="Write task..."
              autoComplete="off"
              {...register("title", { required: true, maxLength: 50 })}
            />
            {errors.title && errors.title.type === "required" && (
              <div style={{ marginTop: 5, color: "red", fontSize: "12px" }}>
                Required.
              </div>
            )}
            {errors.title && errors.title.type === "maxLength" && (
              <div style={{ marginTop: 5, color: "red", fontSize: "12px" }}>
                Max 50 character.
              </div>
            )}
          </div>
        </div>
        <div className="footer">
          <button className="btn" type="submit" disabled={formIsLoading}>
            {type === "add" ? "Ekle" : "Güncelle"}
          </button>
        </div>
      </Container>
    </form>
  );
};

const Container = styled.div`
  .footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .btn {
      height: 32px;
      width: 130px;
      background: #035687;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      font-weight: 600;
      color: White;
      cursor: pointer;
      transition: 200ms;

      &:hover {
        box-shadow: 0 0 0 2px #035687;
      }
    }
    .btn[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

export default TaskModal;
