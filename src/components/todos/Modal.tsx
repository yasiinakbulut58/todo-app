import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import styled from "styled-components";

import CustomInput from "../common/Input";
import CustomLabel from "../common/Label";
import Switch from "../common/Switch";
import { useEffect } from "react";

type Props = {
  type: "add" | "edit";
  loading: boolean;
  title?: string;
  deadline?: string;
  onRequestClose: () => void;
  onSubmit: (values: any) => void;
};

export const convertFromToLocaleString = (date: string) =>
  date ? `${date.slice(3, 5)}.${date.slice(0, 2)}${date.slice(5)}` : date;

const TaskModal: React.FC<Props> = ({
  type,
  loading,
  title,
  deadline,
  onRequestClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (deadline)
      setValue("deadline", new Date(convertFromToLocaleString(deadline)), {
        shouldValidate: true,
      });
  }, [deadline]);

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
            <CustomLabel htmlFor="text" style={{ display: "flex" }}>
              Task{" "}
              <div style={{ marginLeft: 2, color: "red", fontSize: "12px" }}>
                *
              </div>
            </CustomLabel>
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
                This field is required.
              </div>
            )}
            {errors.title && errors.title.type === "maxLength" && (
              <div style={{ marginTop: 5, color: "red", fontSize: "12px" }}>
                Max 50 character.
              </div>
            )}
          </div>
          <div
            style={{
              marginBottom: 20,
              display: "flex",
              flexDirection: "column",
              width: "max-content",
            }}
          >
            <CustomLabel htmlFor="text">Deadline</CustomLabel>
            <DatePicker
              selected={getValues("deadline") || null}
              dateFormat="dd.MM.yyyy HH:mm:ss"
              autoComplete="off"
              placeholderText="Please select a date"
              isClearable={true}
              clearButtonClassName="clear-button"
              showTimeInput
              {...register("deadline", { required: false })}
              onChange={(date) =>
                setValue("deadline", date, {
                  shouldValidate: true,
                })
              }
              className="custom-datetimepicker"
            />
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
            {type === "add" ? "Add Task" : "Update"}
          </button>
        </div>
      </Container>
    </form>
  );
};

const Container = styled.div`
  .custom-datetimepicker {
    height: 40px;
    border-radius: 10px;
    padding-bottom: 2px;
    padding-right: 25px;
    padding-left: 20px;
    border: 1px solid #035687;
    box-shadow: inset 0 0 0 100px #fff;
    background: #fff;
    -webkit-transition: 200ms;
    transition: 200ms;

    &::placeholder {
      transition: 200ms;
    }

    &:focus {
      outline: none;
      &::placeholder {
        transform: translateX(10%);
        color: transparent;
      }
    }

    &:focus,
    &:hover,
    &:active {
      border-color: #035687;
      box-shadow: 0 0 0 1px #035687;
    }

    :-ms-input-placeholder {
      opacity: 0.5;
    }

    ::placeholder {
      opacity: 0.5;
    }

    &:focus-visible {
      outline: initial;
    }
  }
  .clear-button {
    right: 2px;
    &::after {
      font-size: 13px;
      font-weight: 600;
    }

    &:hover {
      &::after {
        box-shadow: 0 0 0 2px #216ba5;
      }
    }
  }
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
