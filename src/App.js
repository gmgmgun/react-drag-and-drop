import React, {useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import styled from "styled-components";
import Item from "./components/Item";

const List = () => {
  const [itemList, setItemList] = useState([
    {id: "1", text: "Item 1"},
    {id: "2", text: "Item 2"},
    {id: "3", text: "Item 3"},
    {id: "4", text: "Item 4"},
    {id: "5", text: "Item 5"},
    {id: "6", text: "Item 6"},
    {id: "7", text: "Item 7"},
    {id: "8", text: "Item 8"},
    {id: "9", text: "Item 9"},
    {id: "10", text: "Item 10"},
    {id: "11", text: "Item 11"},
    {id: "12", text: "Item 12"},
  ]);

  const moveItem = (dragIndex, hoverIndex) => {
    const draggedItem = itemList[dragIndex];
    const remainingItems = itemList.filter(
      (item, index) => index !== dragIndex
    );
    setItemList([
      ...remainingItems.slice(0, hoverIndex),
      draggedItem,
      ...remainingItems.slice(hoverIndex),
    ]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <StyledItemList>
        {itemList.map((item, index) => (
          <Item
            key={item.id}
            id={item.id}
            text={item.text}
            index={index}
            moveItem={moveItem}
          />
        ))}
      </StyledItemList>
    </DndProvider>
  );
};

const StyledItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
`;

export default List;
