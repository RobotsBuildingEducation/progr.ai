import React, { useEffect, useState } from "react";
import { VStack, Button, Text } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { translation } from "../../utility/translation";

const SelectOrderQuestion = ({
  step,
  items,
  setItems,
  onLearnClick,
  userLanguage,
}) => {
  console.log("step", step);
  // Handles the end of a drag operation
  const [borderSwitches, setBorderSwitches] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  let indexMatcher = (newItems) => {
    console.log("running from mount");
    let answerSet = step.question.answer;

    let switches = {
      0: false,
      1: false,
      2: false,
      3: false,
    };

    for (let i = 0; i < answerSet.length; i++) {
      for (let j = 0; j < newItems.length; j++) {
        if (newItems[j] === answerSet[i] && i == j) {
          switches[i] = true;
        }
      }
    }

    setBorderSwitches(switches);
  };
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);
    console.log("reorderedItems", reorderedItems);

    setItems(reorderedItems);
  };

  useEffect(() => {
    indexMatcher(items);
  }, [items]);

  return (
    <VStack spacing={4}>
      <Button onMouseDown={onLearnClick} colorScheme="purple">
        {translation[userLanguage]["app.button.learn"]}
      </Button>
      {/* <Text>Order the items correctly:</Text> */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        marginBottom: "8px",
                        padding: "16px",
                        border: `${borderSwitches[index] ? "3" : "1"}px solid ${
                          borderSwitches[index] ? "#5ad5ac" : "gray"
                        }`,
                        borderRadius: "4px",
                        backgroundColor: "white",
                        boxShadow: "0 2px 3px rgba(0,0,0,0.1)",
                      }}
                    >
                      {item}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </VStack>
  );
};

export default SelectOrderQuestion;
