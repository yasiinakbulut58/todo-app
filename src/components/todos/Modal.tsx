import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import CustomInput from "../common/Input";

import CustomLabel from "../common/Label";
import Switch from "../common/Switch";

type Props = {
  type: "add" | "edit";
  loading: boolean;
  title?: string;
  onRequestClose: () => void;
  onSubmit: (values: any) => void;
};

const TaskModal: React.FC<Props> = ({
  type,
  loading,
  title,
  onRequestClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
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
              autoFocus
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
        <div
          style={{
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CustomLabel htmlFor="completed">Completed</CustomLabel>
          <Controller
            render={() => (
              <Switch
                defaultChecked={false}
                onChange={(e) => {
                  const { checked } = e.target;
                  setValue("completed", checked, {
                    shouldValidate: true,
                  });
                }}
              />
            )}
            name="completed"
            control={control}
          />
        </div>
        <div className="footer">
          <button
            className="btn btn-cancel"
            disabled={loading}
            onClick={onRequestClose}
            type="button"
          >
            Cancel
          </button>
          <button className="btn" disabled={loading} type="submit">
            {type === "add" ? "Create Task" : "Update"}
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
    gap: 10px;

    .btn {
      height: 32px;
      width: max-content;
      padding: 0 10px;
      background: rgb(111 187 21);
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      font-weight: 600;
      color: White;
      cursor: pointer;
      transition: 200ms;

      &.btn-cancel {
        background: rgb(219, 222, 237);
        &:hover {
          box-shadow: 0 0 0 2px rgb(219, 222, 237);
        }
      }

      &:hover {
        box-shadow: 0 0 0 2px rgb(111 187 21);
      }
    }
    .btn[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

export default TaskModal;
