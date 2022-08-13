import { useRef, useState } from "react";
import styled from "styled-components";
import useOnClickOutside from "../../hooks/useClickOutside";
import Icon from "./Icon";

type Props = {
  list: { value: any; label: string }[];
  defaultValue: string;
  onSelected: (selectedItem: any) => void;
};

export const Dropdown: React.FC<Props> = ({
  list,
  onSelected,
  defaultValue,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(defaultValue);

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setOpen(false));

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (e: any) => {
    const { id } = e.target;
    setSelectedItem(id);
    onSelected(id);
    setOpen(false);
  };

  return (
    <Container ref={ref}>
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedItem
          ? list?.find(
              (item: { value: any; label: string }) =>
                item.value === selectedItem,
            )?.label
          : "Please Select"}
        <div className={`arrow ${isOpen && "open"}`}>
          <Icon name="right-arrow" />
        </div>
      </div>
      <div className={`dropdown-body ${isOpen && "open"}`}>
        {list.map((item) => (
          <div
            key={item.label}
            className="dropdown-item"
            onClick={(e: any) => handleItemClick(e)}
            id={item.value}
          >
            <span
              className={`dropdown-item-dot ${
                item.value === selectedItem && "selected"
              }`}
            >
              •{" "}
            </span>
            {item.label}
          </div>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 170px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  background-color: white;
  position: relative;

  .dropdown-header {
    padding: 15px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dropdown-body {
    position: absolute;
    background: #fff;
    z-index: 1;
    width: 100%;
    padding: 5px;
    border-top: 1px solid #e5e8ec;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    display: none;
  }

  .dropdown-body.open {
    display: block;
  }

  .dropdown-item {
    padding: 10px;
  }

  .dropdown-item:hover {
    cursor: pointer;
    background-color: #dbdeed;
    border-radius: 10px;
  }

  .dropdown-item-dot {
    opacity: 0;
    color: #91a5be;
    transition: all 0.2s ease-in-out;
  }

  .dropdown-item-dot.selected {
    opacity: 1;
  }

  .arrow {
    font-weight: 600;
    font-size: 13px;
    color: #91a5be;
    transform: rotate(0deg);
    transition: all 0.2s ease-in-out;
    svg {
      width: 16px;
    }
  }

  .arrow.open {
    transform: rotate(90deg);
  }
`;
