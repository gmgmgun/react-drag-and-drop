import React, {useRef} from "react";
import {useDrag, useDrop, DndProvider} from "react-dnd";
import styled from "styled-components";

const Item = ({id, text, index, moveItem}) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "BOX",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{isDragging}, drag] = useDrag({
    type: "BOX",
    item: {id, index},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <DndProvider>
      <StyledItem ref={ref} style={{opacity: isDragging ? 0 : 1}}>
        {text}
      </StyledItem>
    </DndProvider>
  );
};

const StyledItem = styled.div`
  width: 100px;
`;

export default Item;
