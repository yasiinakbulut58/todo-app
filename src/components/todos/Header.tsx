import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import DatePicker from "react-datepicker";

import styled from "styled-components";
import { ITodo } from "../../store/reducers/todosReducer";
import { Dropdown } from "../common/Dropdown";
import Icon from "../common/Icon";
import Modal from "../common/Modal";
import TaskModal from "./Modal";

type Props = {
  loading: boolean;
  addTodo: (todo: ITodo) => void;
  getTodos: (
    completed: string,
    createdAt_gte: Date,
    createdAt_lte?: Date,
  ) => void;
};

const list = [
  { value: "all", label: "All" },
  { value: "false", label: "Incompleted" },
  { value: "true", label: "Completed" },
];

const Header: React.FC<Props> = ({ loading, addTodo, getTodos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [completedStatus, setCompletedStatus] = useState("all");

  const onSubmit = useCallback(
    (values: { title: string; completed: boolean; deadline: Date }) => {
      addTodo({
        id: uuid(),
        title: values.title,
        completed: values.completed || false,
        createdAt: new Date().toLocaleString("tr-TR"),
        deadline: values.deadline
          ? values.deadline?.toLocaleString("tr-TR")
          : "",
      });
      setIsOpen(false);
    },
    [],
  );

  const [dateRange, setDateRange] = useState([
    new Date(new Date().getTime() - 86400000 * 50), // 50 days ago
    new Date(new Date().getTime() + 86400000),
  ]);
  const [startDate, endDate] = dateRange;

  return (
    <>
      <HeaderWrapper>
        <span>Todo List</span>
      </HeaderWrapper>
      <div className="header">
        <div className="filter">
          <Dropdown
            list={list}
            onSelected={(value) => {
              setCompletedStatus(value);
              getTodos(value, startDate, endDate);
            }}
            defaultValue="all"
          />
          <div className="date-filter">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              dateFormat="dd.MM.yyyy"
              autoComplete="off"
              endDate={endDate}
              onChange={(update: any) => {
                setDateRange(update);
                const [sD, eD] = update;
                if (sD && eD) {
                  getTodos(completedStatus, sD, eD);
                }
              }}
              isClearable={false}
              className="custom-datepicker"
            />
          </div>
        </div>
        <button
          className="btn btn-add"
          disabled={loading}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Icon name="add" />
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        title="Add Task"
      >
        <TaskModal
          type="add"
          onRequestClose={() => setIsOpen(false)}
          loading={loading}
          onSubmit={onSubmit}
        />
      </Modal>
    </>
  );
};

const HeaderWrapper = styled.div`
  color: #035687;
  font-weight: 600;
  font-size: 22px;
  text-align: center;
  margin-bottom: 10px;
`;

export default Header;
